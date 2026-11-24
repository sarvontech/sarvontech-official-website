import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generateAIBlocks(userPrompt, history = []) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Missing VITE_GEMINI_API_KEY in .env file.");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ 
    model: "gemini-flash-latest",
    generationConfig: { responseMimeType: "application/json" }
  });

  const systemPrompt = `
You are an expert AI webpage builder. Your job is to convert the user's layout or content request into a strict JSON array of UI blocks.

Available block types and their schemas:
1. Heading: { "type": "heading", "content": "The Title text", "props": { "level": 1, "align": "center" }, "styles": {} } // level can be 1-6
2. Paragraph: { "type": "paragraph", "content": "The paragraph text...", "props": { "align": "left" }, "styles": {} }
3. Button: { "type": "button", "content": "Button Text", "props": { "url": "#", "align": "center" }, "styles": { "backgroundColor": "#0D9488" } }
4. Image: { "type": "image", "content": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800", "props": { "alt": "Description" } }
5. Row (Grid): { "type": "row", "props": { "cols": 3 }, "children": [] } // children is an array of columns
6. List: { "type": "list", "content": ["Item 1", "Item 2"], "props": { "ordered": false }, "styles": {} }
7. HTML Code: { "type": "html", "content": "<div class='my-element'>Custom raw HTML here. E.g. to create a counter you can write HTML, use style tags for CSS, and script tags for JS.</div>", "styles": {} }
8. Container (Bootstrap): { "type": "container", "children": [] } // children contains an array of blocks inside the container

CRITICAL NESTING RULES FOR ROWS & CONTAINERS:
If you use a "row", you must specify how many columns it has (1 to 12) via props.cols.
You MUST provide a "children" array inside the row object. The "children" array MUST contain an array of blocks for EACH column (0-indexed up to cols-1).
Example of a 2-column row:
{
  "type": "row",
  "props": { "cols": 2 },
  "children": [
    [ { "type": "heading", "content": "Col 1 Title" } ], // column 0 items
    [ { "type": "paragraph", "content": "Col 2 Text" } ] // column 1 items
  ]
}
If you use a "container", the "children" array MUST contain a single 1D array of blocks. Example:
{
  "type": "container",
  "children": [
    { "type": "heading", "content": "Inside Container" }
  ]
}

Return ONLY a valid JSON array of these block objects. Do not include any markdown, explanation, or HTML. Be highly creative with the copy and use unsplash images for placeholders. Ensure a professional corporate tech style.
  `;

  // Start chat session with optional history
  const chat = model.startChat({
    history: history.length > 0 ? history.map(msg => ({
      role: msg.role === 'ai' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    })) : []
  });

  const message = history.length === 0 ? `${systemPrompt}\n\nUser Request: ${userPrompt}` : userPrompt;
  const result = await chat.sendMessage(message);
  const text = result.response.text();
  
  try {
    const jsonBlocks = JSON.parse(text);
    return Array.isArray(jsonBlocks) ? jsonBlocks : [jsonBlocks];
  } catch (err) {
    console.error("Failed to parse Gemini response as JSON:", text);
    throw new Error("AI returned invalid data format.");
  }
}
