// components/download_pdf.js

import jsPDF from "jspdf";
import { Button } from "@/components/ui/button";

export default function DownloadPDF({ text = "", fileName = "docuprompt-belge.pdf" }) {
  const handleDownload = () => {
    const doc = new jsPDF();
    const lines = doc.splitTextToSize(text, 180);

    doc.setFontSize(12);
    doc.text(lines, 15, 20);
    doc.save(fileName);
  };

  return (
    <Button onClick={handleDownload} disabled={!text} className="mt-4">
      PDF Olarak İndir
    </Button>
  );
}