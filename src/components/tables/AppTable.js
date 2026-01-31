// ✅ src/components/tables/AppTable.js
import React from "react";
import { Table, Button } from "react-bootstrap";
import { PencilSquare, X } from "react-bootstrap-icons";

export default function AppTable({ columns = [], data = [] }) {
  return (
    <div className="table-responsive rounded-4 shadow-lg overflow-hidden">
      <Table
        hover
        responsive
        className="mb-0"
        style={{
          /* 🔥 PURPLE → PINK GRADIENT */
          background:
            "linear-gradient(180deg, #5B2D8B 0%, #7B3FE4 40%, #7527b0ff 70%, #6f15a4ff 100%)",
          borderCollapse: "separate",
          borderSpacing: 0,
          borderRadius: "16px",

          /* ✅ FORCE WHITE TEXT */
          color: "#fff",
        }}
      >
        {/* ================= HEADER ================= */}
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="fw-bold text-nowrap"
                style={{
                  background: "transparent",
                  color: "#fff",
                  padding: "16px",
                  borderBottom: "2px solid rgba(255,255,255,0.6)",
                  textShadow: "0 1px 6px rgba(255,255,255,0.25)",
                }}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        {/* ================= BODY ================= */}
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                style={{
                  padding: "16px",
                  color: "#fff",
                  opacity: 0.85,
                }}
              >
                No records found
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr
                key={row?.photo_id || row?.id || idx}
                style={{
                  background: "transparent",
                  transition: "all 0.25s ease",
                  color: "#fff",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background =
                    "rgba(247, 37, 133, 0.15)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    style={{
                      padding: "14px 16px",
                      borderBottom: "1px solid rgba(255,255,255,0.35)",
                      verticalAlign: "middle",
                      background: "transparent",
                      color: "#fff",
                    }}
                  >
                    {/* ✅ FIX: If render exists, use it */}
                    {typeof col.render === "function" ? (
                      col.render(row, idx)
                    ) : col.key === "actions" ? (
                      /* fallback buttons if no render provided */
                      <div className="d-flex gap-2">
                        <Button
                          size="sm"
                          className="rounded-3"
                          style={{
                            backgroundColor: "#FFD60A",
                            border: "none",
                            color: "#000",
                          }}
                        >
                          <PencilSquare />
                        </Button>

                        <Button
                          size="sm"
                          className="rounded-3"
                          style={{
                            backgroundColor: "#E63946",
                            border: "none",
                            color: "#fff",
                          }}
                        >
                          <X size={18} />
                        </Button>
                      </div>
                    ) : (
                      row?.[col.key] ?? "-"
                    )}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
}
