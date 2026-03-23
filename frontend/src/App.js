import React, { useState, useCallback } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import StorePage from "./StorePage";
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
} from "reactflow";
import "reactflow/dist/style.css";
import axios from "axios";
import "./App.css";
import { Handle, Position } from "reactflow";

import {
  FiPlay,
  FiSave,
} from "react-icons/fi";
import { MdStore } from "react-icons/md";

function InputNode({ data }) {
  return (
    <div className="flow-node input-node">
      <div className="node-label">{data.label}</div>
      <textarea
        className="node-textarea"
        value={data.value}
        onChange={(e) => data.onChange(e.target.value)}
        placeholder="Type your prompt here..."
        rows={5}
      />
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

function ResultNode({ data }) {
  return (
    <div className="flow-node result-node">
      <Handle type="target" position={Position.Left} />
      <div className="node-label">{data.label}</div>
      <div className="node-result">{data.value}</div>
    </div>
  );
}

const nodeTypes = { inputNode: InputNode, resultNode: ResultNode };
const initialEdges = [{ id: "e1-2", source: "1", target: "2", animated: true }];

function App() {
  const [inputValue, setInputValue] = useState("");
  const [resultValue, setResultValue] = useState(
    "Response will appear here...",
  );
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");

  const handleInputChange = (val) => {
    setInputValue(val);
    setNodes((nds) =>
      nds.map((n) =>
        n.id === "1"
          ? {
              ...n,
              data: { ...n.data, value: val, onChange: handleInputChange },
            }
          : n,
      ),
    );
  };

  const makeNodes = (inputVal, resultVal) => [
    {
      id: "1",
      type: "inputNode",
      position: { x: 100, y: 200 },
      data: {
        label: "Your Prompt",
        value: inputVal,
        onChange: handleInputChange,
      },
    },
    {
      id: "2",
      type: "resultNode",
      position: { x: 500, y: 200 },
      data: { label: "AI Response", value: resultVal },
    },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(
    makeNodes("", "Response will appear here..."),
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const updateResult = useCallback(
    (val) => {
      setResultValue(val);
      setNodes((nds) =>
        nds.map((n) =>
          n.id === "2" ? { ...n, data: { ...n.data, value: val } } : n,
        ),
      );
    },
    [setNodes],
  );

  const runFlow = async () => {
    if (!inputValue.trim()) {
      alert("Please enter a prompt!");
      return;
    }
    setLoading(true);
    setSaveStatus("");
    updateResult("Thinking...");
    try {
      const res = await axios.post("https://ai-flow-backend2.onrender.com/api/ask-ai", {
        prompt: inputValue,
      });
      updateResult(res.data.response);
    } catch {
      updateResult("Error: Could not get a response. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  const saveToDatabase = async () => {
    if (
      !inputValue ||
      !resultValue ||
      resultValue.includes("appear here") ||
      resultValue === "Thinking..."
    ) {
      alert("Run the flow first!");
      return;
    }
    try {
      setSaveStatus("Saving...");
      await axios.post("https://ai-flow-backend2.onrender.com/api/save", {
        prompt: inputValue,
        response: resultValue,
      });
      setSaveStatus("✓ Saved!");
      setTimeout(() => setSaveStatus(""), 3000);
    } catch {
      setSaveStatus("Save failed");
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/store" element={<StorePage />} />
        <Route
          path="/"
          element={
            <div
              style={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                background: "#f8f9fa",
              }}
            >
              <div
                style={{
                  background: "#ffffff",
                  borderBottom: "1px solid #e9ecef",
                  padding: "16px 24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  boxShadow: "0 1px 2px rgba(0, 0, 0, 0.02)",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "24px" }}
                >
                  <span
                    style={{
                      fontSize: "18px",
                      fontWeight: "500",
                      color: "#212529",
                      letterSpacing: "-0.2px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    ✨ AI Flow
                  </span>
                  <Link
                    to="/store"
                    style={{
                      color: "#6c757d",
                      fontSize: "13px",
                      textDecoration: "none",
                      padding: "6px 0",
                      borderBottom: "2px solid transparent",
                      transition: "all 0.2s ease",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <MdStore size={14} /> Store
                  </Link>
                </div>

                <div
                  style={{ display: "flex", gap: "12px", alignItems: "center" }}
                >
                  <button
                    onClick={runFlow}
                    disabled={loading}
                    style={{
                      padding: "8px 16px",
                      borderRadius: "6px",
                      border: "1px solid #dee2e6",
                      background: loading ? "#f8f9fa" : "#ffffff",
                      color: loading ? "#adb5bd" : "#495057",
                      fontWeight: "500",
                      fontSize: "13px",
                      cursor: loading ? "not-allowed" : "pointer",
                      transition: "all 0.2s ease",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                    onMouseEnter={(e) => {
                      if (!loading) {
                        e.currentTarget.style.background = "#f8f9fa";
                        e.currentTarget.style.borderColor = "#ced4da";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!loading) {
                        e.currentTarget.style.background = "#ffffff";
                        e.currentTarget.style.borderColor = "#dee2e6";
                      }
                    }}
                  >
                    {loading ? (
                      <>⏳ Running...</>
                    ) : (
                      <>
                        <FiPlay size={12} /> Run Flow
                      </>
                    )}
                  </button>

                  <button
                    onClick={saveToDatabase}
                    style={{
                      padding: "8px 16px",
                      borderRadius: "6px",
                      border: "1px solid #dee2e6",
                      background: "#ffffff",
                      color: "#495057",
                      fontWeight: "500",
                      fontSize: "13px",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#f8f9fa";
                      e.currentTarget.style.borderColor = "#ced4da";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#ffffff";
                      e.currentTarget.style.borderColor = "#dee2e6";
                    }}
                  >
                    <FiSave size={12} /> Save to DB
                  </button>

                  {saveStatus && (
                    <span
                      style={{
                        padding: "6px 12px",
                        borderRadius: "6px",
                        fontSize: "12px",
                        background: saveStatus.includes("success")
                          ? "#f1f3f5"
                          : "#fff5f5",
                        color: saveStatus.includes("success")
                          ? "#2b8a3e"
                          : "#e03131",
                        border: `1px solid ${saveStatus.includes("success") ? "#e9ecef" : "#ffe3e3"}`,
                        animation: "fadeIn 0.2s ease",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      {saveStatus.includes("success") ? "✓" : "⚠"} {saveStatus}
                    </span>
                  )}
                </div>
              </div>

              {/* ReactFlow Container - unchanged styling */}
              <div style={{ flex: 1, position: "relative" }}>
                <ReactFlow
                  nodes={nodes}
                  edges={edges}
                  onNodesChange={onNodesChange}
                  onEdgesChange={onEdgesChange}
                  onConnect={onConnect}
                  nodeTypes={nodeTypes}
                  fitView
                >
                  <Controls />
                  <Background color="#aaa" gap={16} />
                </ReactFlow>
              </div>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
