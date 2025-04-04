import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import DownloadPDF from "@/components/download_pdf";

const documentTypes = [
  {
    id: "nda",
    name: "Gizlilik Sözleşmesi (NDA)",
    description: "Taraflar arası gizli bilgi paylaşımını düzenler."
  },
  {
    id: "freelance",
    name: "Freelance Hizmet Sözleşmesi",
    description: "Freelancer ile müşteri arasında hizmet şartlarını belirler."
  },
  {
    id: "tokenomics",
    name: "Tokenomics Özeti",
    description: "Web3 projeleri için token dağıtım, arz ve kullanım bilgisi."
  }
];

export default function DocuPromptFlow() {
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [formData, setFormData] = useState({
    company: "",
    counterparty: "",
    country: "",
    purpose: "",
    duration: ""
  });
  const [generatedText, setGeneratedText] = useState("");

  const handleGenerate = async () => {
    const res = await fetch("/api/generate-doc", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: selectedDoc.id,
        inputs: formData
      })
    });
    const data = await res.json();
    setGeneratedText(data.output);
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">DocuPrompt</h1>

      {!selectedDoc ? (
        <div className="grid gap-4 md:grid-cols-2">
          {documentTypes.map((doc) => (
            <Card
              key={doc.id}
              onClick={() => setSelectedDoc(doc)}
              className="cursor-pointer hover:shadow-lg transition"
            >
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold">{doc.name}</h2>
                <p className="text-sm text-gray-600">{doc.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold mb-4">{selectedDoc.name}</h2>

          <Input
            placeholder="Şirket Adınız"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          />
          <Input
            placeholder="Karşı Taraf Adı"
            value={formData.counterparty}
            onChange={(e) => setFormData({ ...formData, counterparty: e.target.value })}
          />
          <Input
            placeholder="Ülke / Yargı Yetkisi"
            value={formData.country}
            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
          />
          <Textarea
            placeholder="Amaç / Konu"
            value={formData.purpose}
            onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
          />
          <Input
            placeholder="Süre (örn. 12 ay)"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
          />

          <Button onClick={handleGenerate}>Belgeyi Oluştur</Button>

          {generatedText && (
            <div className="bg-gray-100 p-4 rounded mt-4 whitespace-pre-wrap">
              <h3 className="text-lg font-semibold mb-2">Oluşturulan Belge:</h3>
              <p>{generatedText}</p>
              <DownloadPDF text={generatedText} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}