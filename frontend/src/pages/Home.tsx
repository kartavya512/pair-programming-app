import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createRoom } from "../api/room";

export default function Home() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreate = async () => {
    if (!name.trim()) {
      alert("Please enter a room name");
      return;
    }

    try {
      setLoading(true);
      const result = await createRoom(name || "Untitled Room");
      navigate(`/room/${result.roomId}`);
    } catch (err) {
      alert("Failed to create room");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCreate();
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
    }}>
      <div style={{ maxWidth: 600, width: "100%" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 80,
            height: 80,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            borderRadius: 16,
            marginBottom: 24,
            boxShadow: "0 10px 40px rgba(102, 126, 234, 0.4)",
          }}>
            <span style={{ fontSize: 40 }}>💻</span>
          </div>
          <h1 style={{
            fontSize: 48,
            fontWeight: "bold",
            color: "white",
            marginBottom: 16,
            letterSpacing: "-0.5px",
          }}>
            Pair Programming
          </h1>
          <p style={{ color: "#b8c1ec", fontSize: 18 }}>
            Code together in real-time with AI-powered autocomplete
          </p>
        </div>

        <div style={{
          background: "rgba(30, 30, 46, 0.9)",
          borderRadius: 16,
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
          padding: 32,
          border: "1px solid rgba(255,255,255,0.1)",
        }}>
          <div style={{ marginBottom: 24 }}>
            <label style={{
              display: "block",
              color: "#b8c1ec",
              fontSize: 14,
              fontWeight: 500,
              marginBottom: 12,
            }}>
              Room Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter a name for your coding session"
              disabled={loading}
              style={{
                width: "100%",
                padding: "14px 16px",
                background: "rgba(0,0,0,0.3)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 8,
                color: "white",
                fontSize: 16,
                outline: "none",
                transition: "all 0.3s",
              }}
              onFocus={(e) => e.target.style.borderColor = "#667eea"}
              onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
            />
          </div>

          <button
            onClick={handleCreate}
            disabled={loading}
            style={{
              width: "100%",
              background: loading ? "#555" : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              fontWeight: 600,
              fontSize: 16,
              padding: "16px",
              borderRadius: 8,
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.3s",
              boxShadow: loading ? "none" : "0 4px 20px rgba(102, 126, 234, 0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
            onMouseEnter={(e) => !loading && (e.currentTarget.style.transform = "scale(1.02)")}
            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            {loading ? (
              <>
                <div style={{
                  width: 20,
                  height: 20,
                  border: "2px solid white",
                  borderTop: "2px solid transparent",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                }} />
                Creating Room...
              </>
            ) : (
              <>
                <span style={{ fontSize: 20 }}>➕</span>
                Create Room
              </>
            )}
          </button>

          <div style={{
            marginTop: 24,
            display: "flex",
            alignItems: "center",
            gap: 8,
            color: "#8892b0",
            fontSize: 14,
          }}>
            <span>👥</span>
            <span>Share the room URL with your pair programming partner</span>
          </div>
        </div>

        <div style={{
          marginTop: 32,
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
          color: "#8892b0",
          fontSize: 14,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{
              width: 8,
              height: 8,
              background: "#4ade80",
              borderRadius: "50%",
              animation: "pulse 2s ease-in-out infinite",
            }} />
            Real-time Sync
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span>✨</span>
            AI Autocomplete
          </div>
        </div>
      </div>
    </div>
  );
}