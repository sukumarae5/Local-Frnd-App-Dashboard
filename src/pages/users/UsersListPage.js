import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userFetchRequest } from "../../features/user/userAction";
import AppTable from "../../components/tables/AppTable";
import AppButton from "../../components/button/AppButton"; // ✅ corrected folder name (buttons)

const UserListPage = () => {
  const [q, setQ] = useState("");
  const dispatch = useDispatch();

  const { loading, user, error } = useSelector((s) => s.user || {});
  const users = Array.isArray(user) ? user : [];

  useEffect(() => {
    dispatch(userFetchRequest()); // initial load
  }, [dispatch]);

  const onSearch = (e) => {
    e.preventDefault();
    dispatch(userFetchRequest(q));
  };

  // Handlers for button actions
  const handleView = (row) => {
    alert(`Viewing user: ${row.firstName} ${row.lastName}`);
  };

  const handleEdit = (row) => {
    alert(`Editing user: ${row.firstName} ${row.lastName}`);
  };

  const handleDelete = (row) => {
    const confirmDelete = window.confirm(`Are you sure to delete ${row.firstName}?`);
    if (confirmDelete) alert(`Deleted user: ${row.firstName}`);
  };

  // ✅ Define table columns with inline Action buttons
  const columns = useMemo(
    () => [
      { key: "id", label: "ID" },
      {
        key: "name",
        label: "Name",
        render: (row) => `${row.firstName ?? ""} ${row.lastName ?? ""}`.trim(),
      },
      { key: "email", label: "Email" },
      { key: "phone", label: "Phone" },
      {
        key: "company",
        label: "Company",
        render: (row) => row?.company?.name || "-",
      },
      {
        key: "actions",
        label: "Actions",
        render: (row) => (
          <div style={{ display: "flex", gap: "6px", justifyContent: "center" }}>
            <AppButton
              onView={() => handleView(row)}
              onEdit={() => handleEdit(row)}
              onDelete={() => handleDelete(row)}
            />
          </div>
        ),
      },
    ],
    []
  );

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      <h2 style={{ margin: "1rem 0" }}>User List</h2>

      {/* 🔍 Search Bar */}
      <form onSubmit={onSearch} style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search name/email..."
          style={{
            flex: 1,
            padding: "0.6rem 0.8rem",
            borderRadius: 8,
            border: "1px solid #ced4da",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "0.6rem 1rem",
            borderRadius: 8,
            border: "1px solid #0d6efd",
            background: "#0d6efd",
            color: "white",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </form>

      {/* 🧾 Table Display */}
      {loading && <p>Loading…</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <AppTable
          columns={columns}
          data={users}
          tableProps={{ size: "sm" }}
        />
      )}
    </div>
  );
};

export default UserListPage;
