import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

const API_KEY = process.env.API_KEY || '';

// Initialize client securely (assuming env var is present in the build environment)
const ai = new GoogleGenAI({ apiKey: API_KEY });

const SYSTEM_INSTRUCTION = `
你现在是“国信达智能助手”，北京国信达数据技术有限公司的房地产专业分析专家。
你的职责是辅助用户分析中国房地产市场数据，重点关注宏观经济、房企经营、土地市场和楼市走向（尤其是北京及一线城市）。

你的知识库包括：
1. 宏观经济：GDP、政策法规、利率变动。
2. 房企信息：财务状况、土地储备、销售排行。
3. 土地市场：成交价格、溢价率、流拍情况。
4. 楼市行情：新房及二手房价格趋势、库存周期。

回答要求：
1. 必须使用中文回答。
2. 语气专业、客观、简洁，使用数据驱动的语言。
3. 如果用户询问屏幕上展示的数据，假设你能看到上下文中的图表和表格。
4. 使用Markdown格式优化排版（如使用列表、加粗强调关键数据）。
`;

export const streamChatResponse = async (
  history: ChatMessage[], 
  newMessage: string,
  onChunk: (text: string) => void
): Promise<void> => {
  if (!API_KEY) {
    onChunk("错误：未配置API密钥。请检查环境变量设置。");
    return;
  }

  try {
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
      history: history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }))
    });

    const result = await chat.sendMessageStream({ message: newMessage });

    for await (const chunk of result) {
        if (chunk.text) {
            onChunk(chunk.text);
        }
    }

  } catch (error) {
    console.error("Gemini API Error:", error);
    onChunk("\n\n(系统提示: 分析引擎连接中断，请稍后再试。)");
  }
};