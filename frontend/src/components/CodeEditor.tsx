import { useEffect, useRef, useState } from "react";
import Editor, { OnMount } from "@monaco-editor/react";
import { getAutocomplete } from "../api/autocomplete";

interface CodeEditorProps {
  value: string;
  onChange: (val: string) => void;
  ws: WebSocket | null;
}

export default function CodeEditor({ value, onChange, ws }: CodeEditorProps) {
  const [suggestion, setSuggestion] = useState("");
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  const typingTimeout = useRef<NodeJS.Timeout | null>(null);
  const editorRef = useRef<any>(null);

  const handleEditorMount: OnMount = (editor, monaco) => {
    editorRef.current = { editor, monaco };

    editor.onDidChangeCursorPosition(() => {
      updatePopupPosition();
    });
  };

  const updatePopupPosition = () => {
    if (!editorRef.current) return;

    const editor = editorRef.current.editor;
    const position = editor.getPosition();
    if (!position) return;

    const layout = editor.getScrolledVisiblePosition(position);
    if (!layout) return;

    setPos({
      top: layout.top + layout.height + 5,
      left: layout.left + 10,
    });
  };

  const handleChange = (code: string | undefined) => {
    if (!code) return;
    onChange(code);

    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(code);
    }

    if (typingTimeout.current) clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(() => {
      fetchSuggestion(code);
    }, 600);
  };

  const fetchSuggestion = async (code: string) => {
    try {
      const cursor = code.length;
      const res = await getAutocomplete(code, cursor);
      setSuggestion(res.suggestion);
      setShowSuggestion(true);
      updatePopupPosition();
    } catch (e) {
      console.log("autocomplete error");
    }
  };

  return (
    <div style={{ position: "relative", height: "100%", borderRadius: "8px", overflow: "hidden", border: "1px solid #333", boxShadow: "0 10px 40px rgba(0,0,0,0.3)" }}>
      <Editor
        height="100%"
        defaultLanguage="python"
        value={value}
        onChange={handleChange}
        onMount={handleEditorMount}
        theme="vs-dark"
        options={{
          fontSize: 14,
          minimap: { enabled: true },
          scrollBeyondLastLine: false,
          fontFamily: "'Fira Code', 'Consolas', monospace",
        }}
      />

      {showSuggestion && suggestion && (
        <div
          style={{
            position: "absolute",
            top: pos.top,
            left: pos.left,
            padding: "12px 16px",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            borderRadius: 8,
            fontSize: 13,
            maxWidth: 400,
            boxShadow: "0 4px 20px rgba(102, 126, 234, 0.4)",
            zIndex: 50,
            whiteSpace: "pre-wrap",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
            <span style={{ fontSize: 16 }}>💡</span>
            <span>{suggestion}</span>
          </div>
        </div>
      )}
    </div>
  );
}