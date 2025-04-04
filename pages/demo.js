import { Card, CardContent } from "@/components/ui/card";
import DownloadPDF from "@/components/download_pdf";

const demoContent = `
GİZLİLİK SÖZLEŞMESİ (NDA)

Bu sözleşme, ACME Teknoloji A.Ş. ("Taraf 1") ile Delta Yazılım Ltd. ("Taraf 2") arasında, Türkiye Cumhuriyeti yargı yetkisi altında, tarafların birbirleriyle paylaşacağı gizli bilgilerin korunmasına dair koşulları belirlemek amacıyla, 01.04.2025 tarihinde imzalanmıştır.

Taraflar, işbu sözleşme kapsamında paylaşılacak tüm teknik, ticari ve finansal bilgilerin gizliliğini korumayı ve üçüncü taraflarla paylaşmamayı kabul eder. Bu yükümlülük, sözleşmenin sona ermesinden sonra da 12 ay boyunca geçerliliğini sürdürür.

Tarafların bu sözleşme kapsamındaki yükümlülüklerini ihlal etmesi durumunda, diğer taraf maddi ve manevi tazminat talep etme hakkına sahiptir.

İşbu sözleşme, taraflarca okunarak karşılıklı olarak kabul edilmiş ve elektronik ortamda imzalanmıştır.
`;

export default function DemoPage() {
  return (
    <div className="min-h-screen p-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Örnek Belge (Demo)</h1>

      <Card className="w-full max-w-3xl">
        <CardContent className="p-6 whitespace-pre-wrap text-sm text-gray-800">
          {demoContent}
        </CardContent>
      </Card>

      <DownloadPDF text={demoContent} fileName="demo-belge.pdf" />
    </div>
  );
}
