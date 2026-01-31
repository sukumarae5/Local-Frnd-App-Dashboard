// ✅ src/pages/Languages/LanguagePage.js
import React, { useEffect, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchLanguagesRequest,
  deleteLanguageRequest,
} from "../../features/Languages/LanguagesAction";
import AppTable from "../../components/tables/AppTable";

const LanguagePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, data, error } = useSelector((state) => state.language);

  // ✅ fetch on load
  useEffect(() => {
    dispatch(fetchLanguagesRequest());
  }, [dispatch]);

  // ✅ go to Add page
  const openAddPage = () => {
    navigate("/languagepage/add");
  };

  // ✅ go to Edit page (PASS ROW DATA)
  const openEditPage = useCallback(
    (row) => {
      navigate(`/languagepage/edit/${row.id}`, { state: { row } });
    },
    [navigate]
  );

  // ✅ delete ONLY
  const handleDelete = useCallback(
    (row) => {
      const ok = window.confirm(
        `Are you sure you want to delete "${row.name_en}"?`
      );
      if (!ok) return;
      dispatch(deleteLanguageRequest(row.id));
    },
    [dispatch]
  );

  // ✅ columns
  const columns = useMemo(
    () => [
      { key: "sn", label: "#", render: (_, idx) => idx + 1 },
      { key: "id", label: "ID" },
      { key: "code", label: "Code" },
      { key: "name_en", label: "English Name" },
      { key: "native_name", label: "Native Name" },
      {
        key: "direction",
        label: "Direction",
        render: (row) => (row.direction === "rtl" ? "RTL" : "LTR"),
      },
      {
        key: "status",
        label: "Status",
        render: (row) => (row?.status ? "Active" : "Inactive"),
      },
      {
        key: "actions",
        label: "Actions",
        render: (row) => (
          <div style={{ display: "flex", gap: "10px" }}>
            {/* ✅ EDIT ICON (NOW FUNCTIONAL) */}
            <button
              type="button"
              title="Edit"
              onClick={() => openEditPage(row)}   // ✅ CONNECTED HERE
              style={{
                width: "34px",
                height: "34px",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.15)",
                background: "rgba(255,255,255,0.05)",
                color: "#bbb",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ✏️
            </button>

            {/* ✅ DELETE ICON (FUNCTIONAL) */}
            <button
              type="button"
              onClick={() => handleDelete(row)}
              title="Delete"
              style={{
                width: "34px",
                height: "34px",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.25)",
                background: "rgba(255,255,255,0.08)",
                color: "#fff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              🗑️
            </button>
          </div>
        ),
      },
    ],
    [handleDelete, openEditPage]
  );

  return (
    <div
      className="p-3"
      style={{ backgroundColor: "#2F3545C9", minHeight: "100vh" }}
    >
      {/* Header */}
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <h2 style={{ color: "#ffffff", margin: 0 }}>Languages</h2>

        <button
          type="button"
          onClick={openAddPage}
          style={{
            background: "linear-gradient(135deg, #D56CFF, #4F8EFF)",
            color: "#ffffff",
            border: "none",
            padding: "8px 14px",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          ➕ Add Language
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {loading ? (
        <p className="text-white">Loading languages...</p>
      ) : (
        <AppTable columns={columns} data={Array.isArray(data) ? data : []} />
      )}
    </div>
  );
};

export default LanguagePage;
