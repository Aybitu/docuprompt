import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white p-8 flex flex-col items-center justify-center text-center">
      <h1 className="text-5xl font-bold mb-4">DocuPrompt</h1>
      <p className="text-xl text-gray-700 mb-6 max-w-2xl">
        Yapay zekâ destekli belge oluşturma aracı. NDA, freelance sözleşmesi, tokenomics özeti gibi belgeleri saniyeler içinde üretin.
      </p>
      <Link href="/generate">
        <Button size="lg">Hemen Deneyin</Button>
      </Link>

      <div className="mt-16 text-sm text-gray-400">
        Hazırlamak zahmetli, DocuPrompt ile saniyeler içinde hazır.
      </div>
    </div>
  );
}
