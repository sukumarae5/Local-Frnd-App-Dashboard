import React from "react";

const AppPagination = ({
  totalItems,
  itemsPerPage = 10,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Generate page numbers
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  if (totalPages === 0) return null;

  // ✅ Inline styles (close to table bottom)
  const containerStyle = {
    display: "flex",
    justifyContent: "flex-end", // right side alignment
    alignItems: "center",
    marginTop: "6px", // ✅ reduced gap from table
    marginRight: "24px",
    marginBottom: "10px", // small spacing from bottom
  };

  const paginationStyle = {
    display: "flex",
    gap: "6px",
    padding: "6px 10px",
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
  };

  const itemStyle = {
    fontSize: "0.85rem",
    borderRadius: "6px",
    padding: "4px 10px",
    border: "1px solid #dee2e6",
    cursor: "pointer",
    transition: "all 0.2s ease",
    color: "#0d6efd",
    backgroundColor: "white",
  };

  const activeItemStyle = {
    ...itemStyle,
    backgroundColor: "#0d6efd",
    color: "white",
    borderColor: "#0d6efd",
    fontWeight: "bold",
  };

  const disabledStyle = {
    opacity: 0.5,
    cursor: "not-allowed",
  };

  return (
    <div style={containerStyle}>
      <div style={paginationStyle}>
        {/* Prev Button */}
        <span
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          style={{
            ...itemStyle,
            ...(currentPage === 1 ? disabledStyle : {}),
          }}
        >
          Prev
        </span>

        {/* Page Numbers */}
        {pages.map((page) => (
          <span
            key={page}
            onClick={() => onPageChange(page)}
            style={page === currentPage ? activeItemStyle : itemStyle}
          >
            {page}
          </span>
        ))}

        {/* Next Button */}
        <span
          onClick={() =>
            currentPage < totalPages && onPageChange(currentPage + 1)
          }
          style={{
            ...itemStyle,
            ...(currentPage === totalPages ? disabledStyle : {}),
          }}
        >
          Next
        </span>
      </div>
    </div>
  );
};

export default AppPagination;
