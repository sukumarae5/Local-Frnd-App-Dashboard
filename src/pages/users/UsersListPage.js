import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userFetchRequest } from "../../features/user/userAction";
import AppTable from "../../components/tables/AppTable";
import { AppAddButton, AppButtonRow } from "../../components/button/AppButton"; // ✅ correct path & names
import AppPagination from "../../components/pagination/AppPagination";
import { FaSearch } from "react-icons/fa";

const UserListPage = () => {
  const [q, setQ] = useState("");

  // ✅ Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const dispatch = useDispatch();
  const { loading, user, error } = useSelector((s) => s.user || {});
  const users = Array.isArray(user) ? user : [];

  useEffect(() => {
    dispatch(userFetchRequest()); // initial load
  }, [dispatch]);

  // Reset to page 1 when list length changes (new fetch or new search results)
  useEffect(() => {
    setCurrentPage(1);
  }, [users.length]);

  const onSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);           // ✅ go back to first page on new search
    dispatch(userFetchRequest(q));
  };

  // Row action handlers
  const handleView = (row) => alert(`Viewing user: ${row.firstName} ${row.lastName}`);
  const handleEdit = (row) => alert(`Editing user: ${row.firstName} ${row.lastName}`);
  const handleDelete = (row) => {
    const ok = window.confirm(`Are you sure to delete ${row.firstName}?`);
    if (ok) alert(`Deleted user: ${row.firstName}`);
  };
  const handleAddUser = () => alert("Add new user form or modal can open here.");

  // Columns
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
          <div style={{ display: "flex", justifyContent: "center" }}>
            <AppButtonRow
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

  // ✅ Client-side pagination slice
  const pagedUsers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return users.slice(start, start + itemsPerPage);
  }, [users, currentPage]);

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      <h2 style={{ margin: "1rem 0", marginLeft: "300px" }}>User List</h2>

      {/* 🔍 Search (left) + Add (right) */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
          paddingRight: 24,
          paddingLeft: 24,
        }}
      >
        {/* Search */}
        <form
          onSubmit={onSearch}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            width: 250,
            position: "relative",
          }}
        >
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search..."
            aria-label="Search users"
            style={{
              width: "100%",
              padding: "0.45rem 2rem 0.45rem 0.8rem",
              borderRadius: 8,
              border: "1px solid #ced4da",
              fontSize: "0.9rem",
            }}
          />
          <FaSearch
            style={{
              position: "absolute",
              right: 10,
              color: "#6c757d",
              fontSize: "0.9rem",
              pointerEvents: "none",
            }}
          />
        </form>

        {/* Add User (top-right) */}
        <AppAddButton onAdd={handleAddUser} />
      </div>

      {/* 🧾 Table */}
      {loading && <p>Loading…</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <>
          <AppTable columns={columns} data={pagedUsers} tableProps={{ size: "sm" }} />

          {/* Page info (optional) */}
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginTop: 8, padding: "0 24px" }}>
            <span style={{ opacity: 0.8 }}>
              Showing{" "}
              {users.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} -{" "}
              {Math.min(currentPage * itemsPerPage, users.length)} of {users.length}
            </span>
          </div>

          {/* 📄 Pagination */}
          <AppPagination
            totalItems={users.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};

export default UserListPage;
