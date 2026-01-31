import React, { useMemo } from "react";
import { Button } from "react-bootstrap";

const AppPagination = ({
  totalItems = 0,
  itemsPerPage = 10,
  currentPage = 1,
  onPageChange,
  maxVisiblePages = 5,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const visiblePages = useMemo(() => {
    if (totalPages <= 0) return [];
    const start =
      Math.floor((currentPage - 1) / maxVisiblePages) * maxVisiblePages + 1;
    const end = Math.min(start + maxVisiblePages - 1, totalPages);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [currentPage, totalPages, maxVisiblePages]);

  if (totalPages <= 0) return null;

  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;

  return (
    <div className="d-flex justify-content-end mt-2 w-100 pe-3">
      <div
        className="d-flex align-items-center gap-2"
        style={{
          backgroundColor: "#ffffff",
          padding: "6px 8px",
          borderRadius: "12px",
          boxShadow: "0 8px 18px rgba(0,0,0,0.18)",
          flexWrap: "nowrap",       // ✅ keep single line
          whiteSpace: "nowrap",     // ✅ prevent wrapping
        }}
      >
        <Button
          disabled={isFirst}
          onClick={() => onPageChange(currentPage - 1)}
          style={{
            minWidth: "60px",
            height: "34px",
            borderRadius: "10px",
            backgroundColor: "#e9ecef",
            color: "#0d6efd",
            fontSize: "14px",
            fontWeight: 600,
            border: "none",
            opacity: isFirst ? 0.6 : 1,
          }}
        >
          Prev
        </Button>

        {visiblePages.map((page) => (
          <Button
            key={page}
            onClick={() => onPageChange(page)}
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "10px",
              backgroundColor: page === currentPage ? "#3b82f6" : "#e9ecef",
              color: page === currentPage ? "#ffffff" : "#0d6efd",
              fontSize: "14px",
              fontWeight: 700,
              border: "none",
            }}
          >
            {page}
          </Button>
        ))}

        <Button
          disabled={isLast}
          onClick={() => onPageChange(currentPage + 1)}
          style={{
            minWidth: "60px",
            height: "34px",
            borderRadius: "10px",
            backgroundColor: "#e9ecef",
            color: "#0d6efd",
            fontSize: "14px",
            fontWeight: 600,
            border: "none",
            opacity: isLast ? 0.6 : 1,
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default AppPagination;
