import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CodeEditor from "../components/CodeEditor";

export default function Room() {
  const { roomId } = useParams();
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [code, setCode] = useState("# Start coding here...\n");
  const [connected, setConnected] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const socket = new WebSocket(`ws://127.0.0.1:8000/ws/${roomId}`);

    socket.onopen = () => {
      console.log("WS Connected");
      setConnected(true);
    };

    socket.onmessage = (ev) => {
      setCode(ev.data);
    };

    socket.onclose = () => {
      setConnected(false);
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
      setConnected(false);
    };

    setWs(socket);

    return () => socket.close();
  }, [roomId]);

  const copyRoomUrl = () => {
    // Construct the proper room URL using the current origin and roomId
    const roomUrl = `${window.location.origin}/room/${roomId}`;
    
    navigator.clipboard.writeText(roomUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch((err) => {
      console.error("Failed to copy:", err);
      alert("Failed to copy URL to clipboard");
    });
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
      padding: 24,
    }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div style={{
          background: "rgba(30, 30, 46, 0.9)",
          borderRadius: 12,
          boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
          border: "1px solid rgba(255,255,255,0.1)",
          padding: 24,
          marginBottom: 24,
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 48,
                height: 48,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                borderRadius: 8,
              }}>
                <span style={{ fontSize: 24 }}>💻</span>
              </div>
              <div>
                <h2 style={{ fontSize: 24, fontWeight: "bold", color: "white", margin: 0 }}>
                  Room: {roomId}
                </h2>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
                  <div style={{
                    width: 8,
                    height: 8,
                    background: connected ? "#4ade80" : "#ef4444",
                    borderRadius: "50%",
                    animation: connected ? "pulse 2s ease-in-out infinite" : "none",
                  }} />
                  <span style={{ fontSize: 14, color: "#8892b0" }}>
                    {connected ? 'Connected' : 'Disconnected'}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={copyRoomUrl}
              style={{
                padding: "12px 24px",
                background: copied 
                  ? "linear-gradient(135deg, #10b981 0%, #059669 100%)" 
                  : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                fontWeight: 600,
                borderRadius: 8,
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
                transition: "all 0.3s",
                boxShadow: copied 
                  ? "0 4px 20px rgba(16, 185, 129, 0.4)"
                  : "0 4px 20px rgba(102, 126, 234, 0.4)",
              }}
              onMouseEnter={(e) => !copied && (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
            >
              <span>{copied ? "✓" : "👥"}</span>
              {copied ? "Copied!" : "Share Room"}
            </button>
          </div>

          {/* Display the room URL */}
          <div style={{
            marginTop: 16,
            padding: 12,
            background: "rgba(0,0,0,0.3)",
            borderRadius: 8,
            border: "1px solid rgba(255,255,255,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            flexWrap: "wrap",
          }}>
            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{ fontSize: 12, color: "#8892b0", marginBottom: 4 }}>
                Room URL:
              </div>
              <div style={{
                fontSize: 14,
                color: "#e2e8f0",
                fontFamily: "monospace",
                wordBreak: "break-all",
              }}>
                {window.location.origin}/room/{roomId}
              </div>
            </div>
          </div>
        </div>

        <div style={{ height: "calc(100vh - 280px)" }}>
          <CodeEditor value={code} onChange={setCode} ws={ws} />
        </div>
      </div>
    </div>
  );
}