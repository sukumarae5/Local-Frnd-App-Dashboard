import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

export default function AppTable({ columns = [], data = [], tableProps = {} }) {
  const [screen, setScreen] = useState("desktop");

  // Detect screen size
  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth <= 576) setScreen("mobile");
      else if (window.innerWidth <= 992) setScreen("tablet");
      else setScreen("desktop");
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const responsiveStyles = {
    mobile: {
      margin: "10px",
      padding: "0.5rem",
      cellPadding: "0.4rem",
      fontSize: "12px",
    },
    tablet: {
      margin: "20px",
      padding: "1rem",
      cellPadding: "0.7rem",
      fontSize: "14px",
    },
    desktop: {
      margin: "40px",
      padding: "1.5rem",
      cellPadding: "0.9rem",
      fontSize: "15px",
    },
  };

  const s = responsiveStyles[screen];

  return (
    <div
      style={{
        margin: s.margin,
        padding: s.padding,
        backgroundColor: "#fff",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        overflowX: "auto",
        minWidth: "300px",
      }}
    >
      <Table
        striped
        bordered
        hover
        responsive
        style={{
          fontSize: s.fontSize,
          borderCollapse: "separate",
          borderSpacing: 0,
          border: "1px solid #dee2e6",
          borderRadius: "10px",
          width: "100%",
          overflow: "hidden",
        }}
        {...tableProps}
      >
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                style={{
                  background: "linear-gradient(135deg, #343a40, #495057)",
                  color: "white",
                  textTransform: "uppercase",
                  letterSpacing: "0.03em",
                  fontWeight: 600,
                  padding: s.cellPadding,
                  textAlign: "left",
                  whiteSpace: "nowrap",
                }}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                style={{
                  textAlign: "center",
                  padding: "1rem",
                  fontStyle: "italic",
                  color: "#6c757d",
                }}
              >
                No records found
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr
                key={row.id ?? idx}
                style={{ transition: "0.2s ease-in-out", backgroundColor: "#fff" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#f1f3f5";
                  e.currentTarget.style.transform = "scale(1.01)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#fff";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    style={{
                      border: "1px solid #dee2e6",
                      padding: s.cellPadding,
                      verticalAlign: "middle",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {col.render ? col.render(row) : row[col.key]}
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
