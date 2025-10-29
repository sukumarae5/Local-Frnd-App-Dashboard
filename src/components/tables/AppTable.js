import React from "react";
import { Table } from "react-bootstrap";

export default function AppTable({ columns = [], data = [], tableProps = {} }) {
  const wrapperStyle = {
    padding: "1rem",
    backgroundColor: "#f8f9fa",
    borderRadius: "12px",
  };

  const tableStyle = {
    borderCollapse: "separate",
    borderSpacing: "0",
    border: "1px solid #dee2e6",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  };

  const theadStyle = {
    background: "linear-gradient(135deg, #343a40, #495057)",
    color: "white",
    textTransform: "uppercase",
    letterSpacing: "0.03em",
    fontWeight: 600,
  };

  const thTdCommon = {
    border: "1px solid #dee2e6",
    padding: "0.75rem 1rem",
    textAlign: "left",
    verticalAlign: "middle",
  };

  const noRecordStyle = {
    textAlign: "center",
    padding: "1rem",
    fontStyle: "italic",
    color: "#6c757d",
  };

  const hoverRowStyle = {
    transition: "all 0.2s ease-in-out",
  };

  return (
    <div style={wrapperStyle}>
      <Table striped bordered hover responsive style={tableStyle} {...tableProps}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} style={theadStyle}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} style={noRecordStyle}>
                No records found
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr
                key={row.id ?? idx}
                style={{
                  ...hoverRowStyle,
                }}
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
                  <td key={col.key} style={thTdCommon}>
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
