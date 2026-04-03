import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  coinsFetchRequest,
  deleteCoinsRequest,
} from "../../features/Coins/CoinsActions";
import AppTable from "../../components/tables/AppTable";
import { AppButtonRow } from "../../components/button/AppButton";
import CoinsAddForm from "./CoinsAddForm";
import CoinsEditForm from "./CoinsEditForm";

const CoinsListPage = () => {
  const dispatch = useDispatch();

  const {
    loading = false,
    coins = [],
    error = "",
    deleteLoading = false,
  } = useSelector((state) => state.coins || {});

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState(null);

  useEffect(() => {
    dispatch(coinsFetchRequest());
  }, [dispatch]);

  const coinsList = Array.isArray(coins)
    ? coins
    : Array.isArray(coins?.data)
    ? coins.data
    : [];

  const formatDate = (value) => {
    if (!value) return "N/A";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "N/A";
    return date.toLocaleDateString();
  };

  const getStatusBadge = (status) => {
    const isActive = Number(status) === 1;

    return (
      <span
        style={{
          padding: "5px 10px",
          borderRadius: "999px",
          background: isActive ? "#6d4aff" : "#5f677a",
          color: "#fff",
          fontSize: "12px",
          fontWeight: 500,
        }}
      >
        {isActive ? "Active" : "Inactive"}
      </span>
    );
  };

  const handleAddOpen = () => {
    setShowAddModal(true);
  };

  const handleAddClose = () => {
    setShowAddModal(false);
  };

  const handleEditOpen = (row) => {
    setSelectedCoin(row);
    setShowEditModal(true);
  };

  const handleEditClose = () => {
    setShowEditModal(false);
    setSelectedCoin(null);
  };

  const handleDelete = (row) => {
    if (!row?.id) return;

    const isConfirmed = window.confirm(
      `Are you sure you want to delete coin package ID ${row.id}?`
    );

    if (isConfirmed) {
      dispatch(deleteCoinsRequest(row.id));
    }
  };

  const columns = [
    {
      key: "id",
      label: "ID",
      render: (row) => row?.id ?? "N/A",
    },
    {
      key: "coins",
      label: "Coins",
      render: (row) => row?.coins ?? 0,
    },
    {
      key: "minutes",
      label: "Minutes",
      render: (row) => row?.minutes ?? 0,
    },
    {
      key: "original_price",
      label: "Original Price",
      render: (row) => `₹${row?.original_price ?? 0}`,
    },
    {
      key: "discount_percent",
      label: "Discount %",
      render: (row) => `${row?.discount_percent ?? 0}%`,
    },
    {
      key: "price_after_discount",
      label: "Final Price",
      render: (row) => `₹${row?.price_after_discount ?? 0}`,
    },
    {
      key: "status",
      label: "Status",
      render: (row) => getStatusBadge(row?.status),
    },
    {
      key: "created_at",
      label: "Created At",
      render: (row) => formatDate(row?.created_at),
    },
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <AppButtonRow
          onEdit={() => handleEditOpen(row)}
          onDelete={() => handleDelete(row)}
        />
      ),
    },
  ];

  if (loading) {
    return <div style={{ padding: "20px", color: "#fff" }}>Loading coins...</div>;
  }

  if (error) {
    return (
      <div style={{ padding: "20px", color: "red" }}>
        {typeof error === "string" ? error : "Something went wrong"}
      </div>
    );
  }

  return (
    <div
      className="container-fluid"
      style={{
        padding: "20px",
        minHeight: "100vh",
        background: "#111",
      }}
    >
      <div
        style={{
          background: "linear-gradient(180deg,#232838 0%,#1d2230 100%)",
          borderRadius: "18px",
          overflow: "hidden",
          boxShadow: "0 10px 24px rgba(0,0,0,0.22)",
        }}
      >
        <div
          style={{
            padding: "16px 20px",
            color: "#fff",
            borderBottom: "1px solid #3d4458",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              fontSize: "20px",
              fontWeight: "600",
            }}
          >
            Coin Packages
          </div>

          <button
            onClick={handleAddOpen}
            style={{
              border: "none",
              outline: "none",
              background: "linear-gradient(135deg, #b14dff, #6d4aff)",
              color: "#fff",
              padding: "10px 16px",
              borderRadius: "10px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              boxShadow: "0 6px 16px rgba(109,74,255,0.35)",
            }}
          >
            + Add Coin Package
          </button>
        </div>

        {deleteLoading ? (
          <div style={{ padding: "14px 16px", color: "#fff" }}>
            Deleting coin package...
          </div>
        ) : null}

        <div style={{ padding: "16px" }}>
          <AppTable
            columns={columns}
            data={coinsList}
            emptyMessage="No coin packages found"
          />
        </div>
      </div>

      <CoinsAddForm show={showAddModal} onClose={handleAddClose} />

      <CoinsEditForm
        show={showEditModal}
        onClose={handleEditClose}
        selectedCoin={selectedCoin}
      />
    </div>
  );
};

export default CoinsListPage;