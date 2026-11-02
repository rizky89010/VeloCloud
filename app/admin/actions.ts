"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createSession, destroySession, requireAdmin } from "@/lib/server/session";
import { adminCount, createAdmin, deleteAdmin, findAdminByCredentials, listAdmins, setAdminPassword } from "@/lib/server/admins";
import { deleteSubmission, STATUSES, updateSubmission } from "@/lib/server/submissions";
import { clear, clientIp, hit, recent } from "@/lib/server/rate-limit";

export type FormState = { error?: string; success?: string } | undefined;

const LOGIN_LIMIT = 5;
const LOGIN_WINDOW = 15 * 60 * 1000;

export async function login(_: FormState, formData: FormData): Promise<FormState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const key = `${await clientIp()}|${email}`;

  if (recent("login-fail", key, LOGIN_WINDOW) >= LOGIN_LIMIT) {
    return { error: "Too many failed attempts. Please wait 15 minutes and try again." };
  }

  const admin = email && password ? findAdminByCredentials(email, password) : null;
  if (!admin) {
    hit("login-fail", key, Number.MAX_SAFE_INTEGER, LOGIN_WINDOW);
    return { error: "Incorrect email or password." };
  }

  clear("login-fail", key);
  await createSession(admin.id);
  redirect("/admin");
}

export async function logout() {
  await destroySession();
  redirect("/admin/login");
}

const updateSchema = z.object({
  id: z.coerce.number().int().positive(),
  status: z.enum(STATUSES),
  notes: z.string().max(2000),
});

export async function saveSubmission(_: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const parsed = updateSchema.safeParse({
    id: formData.get("id"),
    status: formData.get("status"),
    notes: formData.get("notes") ?? "",
  });
  if (!parsed.success) return { error: "Invalid update." };
  updateSubmission(parsed.data.id, parsed.data.status, parsed.data.notes.trim());
  revalidatePath("/admin");
  return { success: "Saved." };
}

export async function removeSubmission(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  if (Number.isInteger(id) && id > 0) deleteSubmission(id);
  revalidatePath("/admin");
}

const passwordSchema = z.string().min(10, "Password must be at least 10 characters.").max(200);

export async function addAdmin(_: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const email = z.email().safeParse(String(formData.get("email") ?? "").trim().toLowerCase());
  const password = passwordSchema.safeParse(String(formData.get("password") ?? ""));
  if (!email.success) return { error: "Enter a valid email." };
  if (!password.success) return { error: password.error.issues[0].message };
  if (listAdmins().some((a) => a.email.toLowerCase() === email.data)) return { error: "That admin already exists." };
  createAdmin(email.data, password.data);
  revalidatePath("/admin/accounts");
  return { success: `Admin ${email.data} added.` };
}

export async function changePassword(_: FormState, formData: FormData): Promise<FormState> {
  const me = await requireAdmin();
  const password = passwordSchema.safeParse(String(formData.get("password") ?? ""));
  if (!password.success) return { error: password.error.issues[0].message };
  if (password.data !== formData.get("confirm")) return { error: "Passwords don't match." };
  setAdminPassword(me.id, password.data);
  return { success: "Your password has been updated." };
}

export async function removeAdmin(formData: FormData) {
  const me = await requireAdmin();
  const id = Number(formData.get("id"));
  // Never delete yourself or the last remaining admin.
  if (!Number.isInteger(id) || id === me.id || adminCount() <= 1) return;
  deleteAdmin(id);
  revalidatePath("/admin/accounts");
}
