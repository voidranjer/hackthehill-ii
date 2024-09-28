import { GoogleGenerativeAI } from '@google/generative-ai';

export async function gemini_prompt(prompt, setResponse, setLoading) {
    const genAI = new GoogleGenerativeAI(
        import.meta.env.VITE_GOOGLE_API_KEY,
    );
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    setLoading(true);
    try {
        const result = await model.generateContent(prompt);
        const response = result.response;
        setResponse(response.text());
    } catch (error) {
        console.error("Error generating content:", error);
        setResponse("An error occurred while generating the response.");
    } finally {
        setLoading(false);
    }
}