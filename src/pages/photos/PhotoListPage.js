import React, { useEffect, useMemo, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPhotosRequest,
  DeletePhotosRequest,
} from "../../features/photos/photosAction";
import AppTable from "../../components/tables/AppTable";
import { AppButtonRow } from "../../components/button/AppButton";
import { Modal } from "react-bootstrap";
import PhotoForms from "../../components/forms/PhotoForms";
import "bootstrap-icons/font/bootstrap-icons.css";

// ✅ import pagination
import AppPagination from "../../components/pagination/AppPagination"; // <-- adjust path if different

const BASE_URL = process.env.REACT_APP_API_BASE_URL || "";
const FALLBACK_IMG = "https://via.placeholder.com/80x80.png?text=No+Image";

const getPhotoUrl = (row) => {
  const raw =
    row?.photo_url ||
    row?.photo ||
    row?.url ||
    row?.image ||
    row?.photoPath ||
    "";

  if (!raw) return "";
  if (/^https?:\/\//i.test(raw)) return raw;

  return BASE_URL ? `${BASE_URL}${raw.startsWith("/") ? "" : "/"}${raw}` : raw;
};

const PhotoListPage = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  // ✅ pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // change as you like

  const [showModal, setShowModal] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const { photos = [], isLoadingList, error } = useSelector(
    (state) => state.photo || {}
  );

  useEffect(() => {
    dispatch(fetchPhotosRequest());
  }, [dispatch]);

  const filteredPhotos = useMemo(() => {
    if (!search.trim()) return photos;
    const s = search.toLowerCase();

    return photos.filter((p) => {
      const url = getPhotoUrl(p);
      return (
        String(p.photo_id || "").includes(s) ||
        String(p.user_id || "").includes(s) ||
        String(p.status || "").toLowerCase().includes(s) ||
        (p.is_primary ? "yes" : "no").includes(s) ||
        String(url || "").toLowerCase().includes(s)
      );
    });
  }, [search, photos]);

  // ✅ reset to page 1 when search results change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, photos.length]);

  // ✅ slice for current page
  const paginatedPhotos = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredPhotos.slice(start, start + itemsPerPage);
  }, [filteredPhotos, currentPage]);

  const handleEdit = useCallback((row) => {
    setSelectedPhoto(row);
    setShowModal(true);
  }, []);

  const handleDelete = useCallback(
    (row) => {
      if (
        window.confirm(
          `Are you sure you want to delete photo with ID ${row.photo_id}?`
        )
      ) {
        dispatch(
          DeletePhotosRequest({
            user_id: row.user_id,
            photo_id: row.photo_id,
          })
        );
      }
    },
    [dispatch]
  );

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPhoto(null);
  };

  const columns = useMemo(
    () => [
      { key: "photo_id", label: "Photo ID" },
      {
        key: "photo",
        label: "Photo",
        render: (row) => {
          const src = getPhotoUrl(row);
          return (
            <img
              src={src || FALLBACK_IMG}
              alt={`Photo ${row.photo_id}`}
              onError={(e) => (e.currentTarget.src = FALLBACK_IMG)}
              style={{
                width: 55,
                height: 55,
                borderRadius: 10,
                objectFit: "cover",
                border: "1px solid rgba(255,255,255,0.4)",
              }}
            />
          );
        },
      },
      { key: "user_id", label: "User ID" },
      {
        key: "is_primary",
        label: "Primary",
        render: (row) => (row.is_primary ? "Yes" : "No"),
      },
      { key: "status", label: "Status" },
      {
        key: "created_at",
        label: "Action At",
        render: (row) =>
          row.created_at ? new Date(row.created_at).toLocaleString() : "-",
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
    ],
    [handleEdit, handleDelete]
  );

  if (isLoadingList)
    return <div style={{ padding: "1rem" }}>Loading photos…</div>;
  if (error)
    return <div style={{ padding: "1rem", color: "red" }}>{error}</div>;

  return (
    <div
      style={{
        padding: "1rem",
        backgroundColor: "#2F3545C9",
        marginTop: "35px",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          marginBottom: "1rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3 style={{ marginLeft: "15px", color: "white" }}>
          Photo Management
        </h3>

        {/* GRADIENT SEARCH BAR */}
        <div
          style={{
            position: "relative",
            width: "240px",
            marginRight: "25px",
            background: "linear-gradient(135deg, #D56CFF, #4F8EFF)",
            borderRadius: "10px",
            padding: "2px",
          }}
        >
          <i
            className="bi bi-search"
            style={{
              position: "absolute",
              left: "14px",
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: "16px",
              color: "#fff",
              zIndex: 2,
            }}
          />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: "8px 12px 8px 36px",
              borderRadius: "8px",
              border: "none",
              width: "100%",
              fontSize: "14px",
              background: "rgba(255,255,255,0.15)",
              color: "#fff",
              outline: "none",
              backdropFilter: "blur(6px)",
            }}
          />
        </div>
      </div>

      {/* ✅ show paginated data */}
      <AppTable columns={columns} data={paginatedPhotos} />

      {/* ✅ bottom-right pagination */}
      <div style={{ marginTop: "10px" }}>
        <AppPagination
          totalItems={filteredPhotos.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          maxVisiblePages={5}
        />
      </div>

      {/* EDIT MODAL */}
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        size="lg"
        centered
        backdrop="static"
        contentClassName="bg-transparent border-0"
      >
        <Modal.Header
          closeButton
          style={{
            background: "transparent",
            border: "none",
            paddingBottom: 0,
            filter: "invert(1)",
          }}
        />
        <Modal.Body
          style={{
            background: "transparent",
            border: "none",
            paddingTop: 0,
          }}
        >
          {selectedPhoto && (
            <PhotoForms initialPhoto={selectedPhoto} onClose={handleCloseModal} />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PhotoListPage;
