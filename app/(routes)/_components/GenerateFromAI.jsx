import { LayoutGrid, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { chatSession } from "@/app/gemini/GoogleAIModel";

const GenerateFromAI = ({ setGeneratedOutput }) => {
  const [open, setOpen] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);

  const generateFromAI = async () => {
    if (!userInput) return;
    setLoading(true);
    try {
      const prompt = `Generate a JSON template for editor.js based on: ${userInput}. Ensure it's a valid JSON object without markdown formatting.`;
      const result = await chatSession.sendMessage(prompt);
      let responseText = await result.response.text(); // Await AI response

      console.log("Raw AI Response:", responseText);

      // **Fix: Remove Markdown Code Block Formatting**
      responseText = responseText.replace(/```json|```/g, "").trim();

      try {
        const output = JSON.parse(responseText); // Parse JSON output
        console.log("Parsed AI Output:", output);
        setGeneratedOutput(output);
      } catch (jsonError) {
        console.error("Error parsing AI response as JSON:", jsonError);
      }
    } catch (error) {
      console.error("Error generating AI response:", error);
    }
    setLoading(false);
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outline" onClick={() => setOpen(true)}>
        <LayoutGrid /> Generate AI Template
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
\        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Generative AI Template</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <label htmlFor="input-field">
              What do you want to write in the document?
            </label>
            <Input
              id="input-field"
              placeholder="Ex. Project Idea"
              onChange={(e) => setUserInput(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <Button variant="ghost" className="border" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button disabled={!userInput} onClick={generateFromAI}>
                {loading ? <Loader2 className="animate-spin" /> : "Generate"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GenerateFromAI;
