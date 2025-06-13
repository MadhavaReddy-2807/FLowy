const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};


 export const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {text: "Reference to:{\n   \"time\": 1550476186479,\n   \"blocks\": [\n      {\n         \"id\": \"oUq2g_tl8y\",\n         \"type\": \"header\",\n         \"data\": {\n            \"text\": \"Editor.js\",\n            \"level\": 2\n         }\n      },\n      {\n         \"id\": \"zbGZFPM-iI\",\n         \"type\": \"paragraph\",\n         \"data\": {\n            \"text\": \"Hey. Meet the new Editor. On this page you can see it in action — try to edit this text. Source code of the page contains the example of connection and configuration.\"\n         }\n      },\n      {\n         \"id\": \"qYIGsjS5rt\",\n         \"type\": \"header\",\n         \"data\": {\n            \"text\": \"Key features\",\n            \"level\": 3\n         }\n      },\n      {\n         \"id\": \"XV87kJS_H1\",\n         \"type\": \"list\",\n         \"data\": {\n            \"style\": \"unordered\",\n            \"items\": [\n               \"It is a block-styled editor\",\n               \"It returns clean data output in JSON\",\n               \"Designed to be extendable and pluggable with a simple API\"\n            ]\n         }\n      },\n      {\n         \"id\": \"AOulAjL8XM\",\n         \"type\": \"header\",\n         \"data\": {\n            \"text\": \"What does it mean «block-styled editor»\",\n            \"level\": 3\n         }\n      },\n      {\n         \"id\": \"cyZjplMOZ0\",\n         \"type\": \"paragraph\",\n         \"data\": {\n            \"text\": \"Workspace in classic editors is made of a single contenteditable element, used to create different HTML markups. Editor.js <mark class=\\\"cdx-marker\\\">workspace consists of separate Blocks: paragraphs, headings, images, lists, quotes, etc</mark>. Each of them is an independent contenteditable element (or more complex structure) provided by Plugin and united by Editor's Core.\"\n         }\n      }\n   ],\n   \"version\": \"2.8.1\"\n} "},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "```json\n{\n  \"time\": 1678886400000,\n  \"blocks\": [\n    {\n      \"id\": \"title-block\",\n      \"type\": \"header\",\n      \"data\": {\n        \"text\": \"Grocery TODO List\",\n        \"level\": 1\n      }\n    },\n    {\n      \"id\": \"list-block-1\",\n      \"type\": \"checklist\",\n      \"data\": {\n        \"items\": [\n          {\n            \"text\": \"Milk\",\n            \"checked\": false\n          },\n          {\n            \"text\": \"Eggs\",\n            \"checked\": true\n          },\n          {\n            \"text\": \"Bread\",\n            \"checked\": false\n          }\n        ]\n      }\n    },\n    {\n      \"id\": \"paragraph-block-1\",\n      \"type\": \"paragraph\",\n      \"data\": {\n        \"text\": \"Don't forget to check for sales!\"\n      }\n    },\n    {\n      \"id\": \"list-block-2\",\n      \"type\": \"checklist\",\n      \"data\": {\n        \"items\": [\n          {\n            \"text\": \"Apples\",\n            \"checked\": false\n          },\n          {\n            \"text\": \"Bananas\",\n            \"checked\": false\n          },\n          {\n            \"text\": \"Oranges\",\n            \"checked\": true\n          }\n\n        ]\n      }\n    },\n    {\n      \"id\": \"delimiter-block\",\n      \"type\": \"delimiter\",\n      \"data\": {}\n    },\n    {\n      \"id\": \"header-block-2\",\n      \"type\": \"header\",\n      \"data\": {\n        \"text\": \"Special Items\",\n        \"level\": 2\n      }\n    },\n    {\n      \"id\": \"list-block-3\",\n      \"type\": \"checklist\",\n      \"data\": {\n        \"items\": [\n          {\n            \"text\": \"Birthday Cake\",\n            \"checked\": false\n          },\n          {\n            \"text\": \"Candles\",\n            \"checked\": false\n          }\n        ]\n      }\n    }\n  ],\n  \"version\": \"2.25.0\" \n}\n```\n\n\n\nThis template utilizes several common editor.js blocks:\n\n* **header:**  For titles and section headings.\n* **checklist:** Ideal for TODO lists, allowing items to be checked off.\n* **paragraph:**  For general text content.\n* **delimiter:** A visual separator between sections.\n\n\nKey improvements over a simple list:\n\n* **Structure:** The use of headers and a delimiter creates a more organized and readable list.\n* **Flexibility:**  The template can be easily expanded with more items, sections, or other block types (e.g., images, tables).\n* **Interactivity:** Checklists provide a clear way to mark items as complete.\n* **Data Integrity:**  The JSON format ensures that the list data can be easily saved, loaded, and manipulated.\n\n\nRemember to install the `checklist` plugin in your editor.js instance to use this template effectively. You can find installation instructions in the official editor.js documentation."},
        ],
      },
    ],
  });




