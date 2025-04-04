// /pages/api/generate-doc.js

import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const promptTemplates = {
  nda: ({ company, counterparty, country, purpose, duration }) => `
    Bir gizlilik sözleşmesi hazırla:
    - Taraf 1: ${company}
    - Taraf 2: ${counterparty}
    - Ülke/Yargı: ${country}
    - Sözleşme Süresi: ${duration}
    - Konu: ${purpose}
    Lütfen sade, yasal ve profesyonel bir Türkçe ile yaz.
  `,

  freelance: ({ company, counterparty, country, purpose, duration }) => `
    Bir freelance hizmet sözleşmesi yaz:
    - Müşteri: ${company}
    - Hizmeti Sunan: ${counterparty}
    - Ülke/Yargı: ${country}
    - Süre: ${duration}
    - Hizmet Tanımı: ${purpose}
    Profesyonel bir sözleşme diliyle Türkçe olarak hazırla.
  `,

  tokenomics: ({ company, purpose }) => `
    ${company} adlı bir Web3 projesi için tokenomics özeti oluştur:
    - Proje Amacı: ${purpose}
    - Token kullanım alanları, dağıtım oranları ve arz detaylarını belirt.
    - Sade, teknik ama anlaşılır Türkçe ile açıkla.
  `,
};

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { type, inputs } = req.body;

  if (!promptTemplates[type]) return res.status(400).json({ error: "Belge türü geçersiz." });

  const prompt = promptTemplates[type](inputs);

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.5,
    });

    const output = completion.choices[0].message.content;
    res.status(200).json({ output });
  } catch (error) {
    console.error("OpenAI Hatası:", error);
    res.status(500).json({ error: "Belge oluşturulamadı." });
  }
}