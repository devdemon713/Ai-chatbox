const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.askGemini = async (req, res) => {
  try {
    const { query, pageContext } = req.body;
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    // Use gemini-1.5-flash (stable and fast)
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
   

      USER QUESTION: "${query}"
    `;

    const result = await model.generateContent(prompt);
    res.json({ answer: result.response.text() });
  } catch (error) {
    console.error("Gemini Error:", error);
    res.status(500).json({ message: "AI Error", error: error.message });
  }
};