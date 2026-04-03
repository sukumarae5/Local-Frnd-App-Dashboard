import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import AppTable from "../../components/tables/AppTable";
import { AppButtonRow } from "../../components/button/AppButton";
import {
  offersFetchRequest,
  deleteOfferRequest,
} from "../../features/Offers/OffersActions";
import OffersAddForm from "./OffersAddForm";
import OffersEditForm from "./OffersEditForm";

const OffersListPage = () => {
  const dispatch = useDispatch();

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);

  const {
    loading = false,
    offers = [],
    error = "",
    deleteLoading = false,
  } = useSelector((state) => state.offers || {});

  useEffect(() => {
    dispatch(offersFetchRequest());
  }, [dispatch]);

  const formatDate = (value) => {
    if (!value) return "N/A";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "N/A";
    return date.toLocaleDateString("en-GB");
  };

  const sortedOffers = useMemo(() => {
    return [...offers].sort(
      (a, b) => (a?.priority ?? 999) - (b?.priority ?? 999)
    );
  }, [offers]);

  const handleAddOffer = () => {
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  const handleEdit = (row) => {
    setSelectedOffer(row);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedOffer(null);
  };

  const handleDelete = (row) => {
    if (!row?.id) return;

    const confirmDelete = window.confirm(
      `Are you sure you want to delete offer ID ${row.id}?`
    );

    if (!confirmDelete) return;

    dispatch(deleteOfferRequest(row.id));
  };

  const columns = [
    {
      key: "id",
      label: "ID",
      render: (row) => row?.id ?? "-",
    },
    {
      key: "image_url",
      label: "Image",
      render: (row) =>
        row?.image_url ? (
          <img
            src={row.image_url}
            alt={row?.title || "offer"}
            style={{
              width: "70px",
              height: "48px",
              objectFit: "cover",
              borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.25)",
            }}
          />
        ) : (
          "-"
        ),
    },
    {
      key: "title",
      label: "Title",
      render: (row) => row?.title || "-",
    },
    {
      key: "description",
      label: "Description",
      render: (row) => row?.description || "-",
    },
    {
      key: "priority",
      label: "Priority",
      render: (row) => row?.priority ?? "-",
    },
    {
      key: "start_date",
      label: "Start Date",
      render: (row) => formatDate(row?.start_date),
    },
    {
      key: "end_date",
      label: "End Date",
      render: (row) => formatDate(row?.end_date),
    },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <span
          style={{
            display: "inline-block",
            padding: "8px 18px",
            borderRadius: "999px",
            fontWeight: 700,
            fontSize: "14px",
            background:
              row?.status === 1
                ? "linear-gradient(135deg, #6D5BFF, #7C4DFF)"
                : "linear-gradient(135deg, #ef4444, #dc2626)",
            color: "#fff",
            minWidth: "82px",
            textAlign: "center",
          }}
        >
          {row?.status === 1 ? "Active" : "Inactive"}
        </span>
      ),
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
          onEdit={() => handleEdit(row)}
          onDelete={() => handleDelete(row)}
        />
      ),
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#05070b",
        padding: "28px 20px",
      }}
    >
      <div
        style={{
          background: "linear-gradient(180deg, #1a2134 0%, #1b1f2e 100%)",
          borderRadius: "24px",
          overflow: "hidden",
          boxShadow: "0 16px 40px rgba(0,0,0,0.45)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div
          className="d-flex justify-content-between align-items-center"
          style={{
            padding: "24px 28px",
            borderBottom: "1px solid rgba(255,255,255,0.10)",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <h2
            style={{
              color: "#fff",
              margin: 0,
              fontWeight: 400,
              fontSize: "20px",
            }}
          >
            Offers
          </h2>

          <Button
            onClick={handleAddOffer}
            style={{
              background: "linear-gradient(135deg, #A855F7, #6D5BFF)",
              border: "none",
              borderRadius: "16px",
              padding: "16px 28px",
              fontSize: "18px",
              fontWeight: "700",
              color: "#fff",
              boxShadow: "0 8px 24px rgba(139, 92, 246, 0.45)",
            }}
          >
            + Add Offer
          </Button>
        </div>

        <div style={{ padding: "26px 24px 10px 24px" }}>
          {loading && (
            <div style={{ color: "#fff", padding: "16px", fontWeight: 600 }}>
              Loading offers...
            </div>
          )}

          {deleteLoading && (
            <div style={{ color: "#fff", padding: "0 16px 16px", fontWeight: 600 }}>
              Deleting offer...
            </div>
          )}

          {error && (
            <div
              style={{
                color: "#fff",
                background: "rgba(239,68,68,0.18)",
                border: "1px solid rgba(239,68,68,0.35)",
                padding: "14px 16px",
                borderRadius: "12px",
                marginBottom: "16px",
              }}
            >
              {error}
            </div>
          )}

          {!loading && !error && (
            <AppTable columns={columns} data={sortedOffers} />
          )}
        </div>
      </div>

      <OffersAddForm
        show={showAddModal}
        handleClose={handleCloseAddModal}
      />

      <OffersEditForm
        show={showEditModal}
        handleClose={handleCloseEditModal}
        selectedOffer={selectedOffer}
      />
    </div>
  );
};

export default OffersListPage;