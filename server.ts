import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

// In-memory runtime leads store for demo (synced with client state)
let leadsDb: any[] = [];

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API 1: Healthcheck
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", service: "GURU ENERGY SES Portal" });
  });

  // API 2: Get Leads
  app.get("/api/leads", (req, res) => {
    res.json(leadsDb);
  });

  // API 3: Add Lead
  app.post("/api/leads", (req, res) => {
    const newLead = {
      id: Date.now().toString(),
      ...req.body,
      createdAt: new Date().toISOString()
    };
    leadsDb.unshift(newLead);
    res.status(201).json(newLead);
  });

  // API 4: Gemini AI Solar Consultant
  app.post("/api/ai-consult", async (req, res) => {
    try {
      const { question, history } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        // Return simulated high quality engineering response if API key not provisioned yet
        return res.json({
          answer: `Стандартний кошторис GURU ENERGY на сонячну станцію під ключ складає від $380 до $620 за 1 кВт залежно від типу (мережева для бізнесу чи гібридна з АКБ LiFePO4). Гарантія на панелі Longi/Jinko — 25 років!`
        });
      }

      const ai = new GoogleGenAI({ apiKey });

      const systemPrompt = `Ти головний інженер-експерт компанії GURU ENERGY в Україні.
Компанія займається встановленням сонячних електростанцій (СЕС) під ключ (мережеві для бізнесу, гібридні з акумуляторами Deye для дому, оформлення Зеленого тарифу та кредитів 0%).
Відповідай українською мовою професійно, ввічливо, точно, лаконічно (до 3 речень).
Орієнтовні ціни: гібридна 10 кВт з АКБ ≈ $6200; для бізнесу 30 кВт ≈ $11400. Окупність 2.8 - 4.5 роки.
Панелі Tier-1 (Longi Hi-MO 6, Jinko), інвертори Deye, Huawei.`;

      const formattedPrompt = `${systemPrompt}\n\nЗапитання клієнта: ${question}`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: formattedPrompt,
      });

      res.json({ answer: response.text || "Залиште контакт для точного розрахунку інженера!" });
    } catch (err: any) {
      console.error("Gemini Consult Error:", err.message);
      res.json({
        answer: "Для точного тепловізійного аналізу вашого даху та розрахунку окупності пропоную замовити дзвінок головного інженера GURU ENERGY!"
      });
    }
  });

  // Vite middleware mounting
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`GURU ENERGY Fullstack Server booted on http://0.0.0.0:${PORT}`);
  });
}

startServer();
