"use client";
import React, { useEffect, useRef, useState } from "react";
import ToggleBlock from "editorjs-toggle-block";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Delimiter from "@editorjs/delimiter";
import Table from "@editorjs/table";
import CodeTool from "@editorjs/code";
import Alert from "editorjs-alert";
import List from "@editorjs/list";
import Checklist from "@editorjs/checklist";
import Paragraph from "@editorjs/paragraph";
import { useParams } from "next/navigation";
import GenerateFromAI from "./GenerateFromAI";

const Texteditor = () => {
  const params = useParams();
  const { docid, workspaceid } = params;
  const editorInstance = useRef(null); // Editor instance reference
  const [workspace, setWorkspace] = useState(null);
  const [docs, setDocs] = useState([]);
  const [currentDoc, setCurrentDoc] = useState(null);
  const saveTimeoutRef = useRef(null); // Reference to manage debounce timing

  useEffect(() => {
    initEditor(); // Initialize the editor when component mounts
    return () => {
      if (editorInstance.current) {
        // editorInstance.current.destroy(); // Cleanup on unmount
        // editorInstance.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (workspaceid) fetchWorkspaceData();
  }, [workspaceid]);

  useEffect(() => {
    if (docs && docid && editorInstance.current) {
      const doc = docs.find((d) => d?.id === docid);
      setCurrentDoc(doc || null);

      if (doc?.output) {
        setTimeout(() => {
          editorInstance.current?.render(doc.output);
        }, 300);
      }
    }
  }, [docid, docs]);

  useEffect(() => {
    if (workspaceid && workspace) {
      const timeout = setTimeout(() => {
        updateWorkspace();
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [workspaceid, workspace]);

  const fetchWorkspaceData = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}workspaces?workspaceid=${workspaceid}`
      );
      const data = await res.json();
      if (data) {
        setWorkspace(data);
        setDocs(data?.docs || []);
      }
    } catch (error) {
      console.error("Error fetching workspace data:", error);
    }
  };

  const updateWorkspace = async () => {
    if (workspace && workspaceid) {
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}workspaces`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workspaceid, workspace }),
      });
    }
  };

  const saveDocument = () => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      editorInstance.current.save().then((output) => {
        setCurrentDoc((prev) => ({ ...prev, output }));
        setWorkspace((prev) => {
          if (!prev || !prev.docs) return prev;
          return {
            ...prev,
            docs: prev.docs.map((doc) =>
              doc?.id === docid ? { ...doc, output } : doc
            ),
          };
        });
      });
    }, 500); // Debounce save operation
  };

  const initEditor = () => {
    if (editorInstance.current) return;

    editorInstance.current = new EditorJS({
      holder: "editorjs",
      autofocus: true,
      placeholder: "Start typing your document here...",
      onChange: saveDocument, // Save document on any change
      tools: {
        header: Header,
        delimiter: Delimiter,
        table: Table,
        alert: {
          class: Alert,
          inlineToolbar: true,
          shortcut: "CMD+SHIFT+A",
          config: {
            alertTypes: [
              "primary",
              "secondary",
              "info",
              "success",
              "warning",
              "danger",
              "light",
              "dark",
            ],
            defaultType: "primary",
            messagePlaceholder: "Enter something",
          },
        },
        list: {
          class: List,
          inlineToolbar: true,
          shortcut: "CMD+SHIFT+L",
          config: { defaultStyle: "unordered" },
        },
        checklist: {
          class: Checklist,
          shortcut: "CMD+SHIFT+C",
          inlineToolbar: true,
        },
        toggle: {
          class: ToggleBlock,
          inlineToolbar: true,
        },
        code: {
          class: CodeTool,
          shortcut: "CMD+SHIFT+P",
        },
      },
    });
  };

  return (
    <div className="w-full">
      <div
        id="editorjs"
        className="flex justify-start ml-6 w-full relative bottom-[400px] p-10"
      ></div>

      <div className="fixed bottom-20 md:ml-80 left-0 z-10">
        <GenerateFromAI
          setGeneratedOutput={(output) => {
            if (editorInstance.current) {
              editorInstance.current.render(output);
            } else {
              console.error("Editor instance not initialized.");
            }
          }}
        />
      </div>
    </div>
  );
};

export default Texteditor;
