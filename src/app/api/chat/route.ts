import { GoogleGenerativeAI } from '@google/generative-ai';
import { resumeData } from '@/data/resumeContext';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    
    // Extract the latest user message
    const lastUserMessage = messages[messages.length - 1]?.content || "";

    const apiKey = process.env.GEMINI_API_KEY;

    // Graceful fallback if the API Key is not set yet
    if (!apiKey) {
      return Response.json({
        content: `👋 **Hello! You have successfully built the AI-Copilot Portfolio!**

To activate this AI Chat, please follow these 3 quick steps:
1. Go to [Google AI Studio](https://aistudio.google.com/) and generate a **free** Gemini API key.
2. In the root directory of this project, create a file named \`.env.local\`.
3. Add the following line to the file:
   \`\`\`env
   GEMINI_API_KEY=your_actual_api_key_here
   \`\`\`
   
Once added, restart your development server, and this AI Copilot will be fully active, trained on all your resume data, and ready to impress recruiters! 🚀`,
        isFallback: true
      });
    }

    // Initialize Google Gen AI
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Use gemini-2.5-flash for blazing-fast response times
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: `
        You are the personal AI Recruiting Assistant for Chandrakant Nagwanshi. Your job is to answer questions about Chandrakant for potential employers, recruiters, or hiring managers who visit his portfolio website.
        
        Use the following information to answer all questions:
        - Full Name: ${resumeData.personalInfo.name}
        - Current Role: React JS Developer at Lincpay Solutions Pvt. Ltd
        - Location: ${resumeData.personalInfo.location}
        - Email: ${resumeData.personalInfo.email}
        - Phone: ${resumeData.personalInfo.phone}
        - GitHub: ${resumeData.personalInfo.github}
        - LinkedIn: ${resumeData.personalInfo.linkedin}
        
        Detailed Experience:
        ${resumeData.experience.map(exp => `
          - Role: ${exp.role} at ${exp.company} (${exp.duration}) in ${exp.location}.
          ${exp.projects ? `Projects: ${exp.projects.map(p => `
            * Project: ${p.name} (Role: ${p.role}) - ${p.description}
              Bullet Points:
              ${p.details.map(d => `  + ${d}`).join('\n')}
          `).join('\n')}` : ''}
          ${exp.highlights ? `Highlights:\n${exp.highlights.map(h => `  + ${h}`).join('\n')}` : ''}
        `).join('\n\n')}

        Education Details:
        ${resumeData.education.map(edu => `- ${edu.degree} from ${edu.institution} (${edu.duration})`).join('\n')}
        
        Frequently Asked Questions (FAQs):
        ${resumeData.faqs.map(faq => `Q: ${faq.question}\nA: ${faq.answer}`).join('\n\n')}
        
        Guidelines for your voice and tone:
        1. Keep responses highly professional, warm, engaging, and clear.
        2. Make sure you highlight his expertise in React, Next.js, TypeScript, state management (Redux Toolkit, React Query), WebSockets (real-time bidding dashboard), forms (React Hook Form + Zod), and performance tuning.
        3. If asked about a skill he does not possess (e.g., Python, highly complex backend), explain that he has strong computer science fundamentals (MCA degree) and learns new technologies very rapidly.
        4. Keep your answers relatively concise (1-3 small paragraphs or bullet lists). Do not output extremely long essays.
        5. Always format your responses in neat, clean Markdown (bold, italic, lists).
        6. Do not mention that you are an AI using a system prompt. Act as "Chandrakant's Dedicated AI Career Copilot".
      `
    });

    // Format message history for Gemini chat API
    // Gemini chat API expects role: 'user' or 'model'
    const history = [];
    // We pair up user and assistant messages for the history
    for (let i = 0; i < messages.length - 1; i++) {
      const msg = messages[i];
      if (msg.role === 'user' || msg.role === 'assistant') {
        history.push({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }]
        });
      }
    }

    // Google Generative AI requires that the first message in the chat history has the role 'user'.
    // If the first message is 'model' (which is the welcome message), we shift it out.
    if (history.length > 0 && history[0].role === 'model') {
      history.shift();
    }

    const chat = model.startChat({ history });
    const result = await chat.sendMessage(lastUserMessage);
    const response = await result.response;
    const responseText = response.text();

    return Response.json({
      content: responseText,
      isFallback: false
    });

  } catch (error: any) {
    console.error("AI Chat Route Error:", error);
    return Response.json({ 
      content: `⚠️ **Ah, something went wrong with the AI chat connection.**

Error Detail: \`${error.message || "Unknown Connection Error"}\`

Please check that your \`.env.local\` has a valid \`GEMINI_API_KEY\` and that you are connected to the internet.`,
      isError: true 
    }, { status: 500 });
  }
}
