import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { NotFoundContent } from "@/components/templates/NotFoundContent";

// Unmatched URLs render outside the (site) group, so this page brings its own chrome.
export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <NotFoundContent />
      </main>
      <Footer />
    </>
  );
}
