// src/pages/photos/PhotoListPage.js

import React, {
  useEffect,
  useMemo,
  useCallback,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPhotosRequest,
  DeletePhotosRequest,
} from "../../features/photos/photosAction";
import AppTable from "../../components/tables/AppTable";
import { AppButtonRow } from "../../components/button/AppButton";
import { Modal } from "react-bootstrap";
import PhotoForms from "../../components/forms/PhotoForms";

const PhotoListPage = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  // For modal
  const [showModal, setShowModal] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // reducer: { photos, isLoadingList, error }
  const { photos = [], isLoadingList, error } = useSelector(
    (state) => state.photo || {}
  );

  useEffect(() => {
    dispatch(fetchPhotosRequest());
  }, [dispatch]);

  // Filter photos using search
  const filteredPhotos = useMemo(() => {
    if (!search.trim()) return photos;

    const s = search.toLowerCase();

    return photos.filter((p) => {
      return (
        (p.photo_id + "").includes(s) ||
        (p.user_id + "").includes(s) ||
        (p.status + "").toLowerCase().includes(s) ||
        (p.is_primary ? "yes" : "no").includes(s)
      );
    });
  }, [search, photos]);

  const handleEdit = useCallback((row) => {
    console.log("Edit photo:", row);
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
        key: "photo_url",
        label: "Photo",
        render: (row) => (
          <img
            src={row.photo_url}
            alt={`Photo ${row.photo_id}`}
            style={{
              width: 80,
              height: 80,
              objectFit: "cover",
              borderRadius: 8,
              border: "1px solid #dee2e6",
            }}
          />
        ),
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

  if (isLoadingList) {
    return <div style={{ padding: "1rem" }}>Loading photos...</div>;
  }

  if (error) {
    return (
      <div style={{ padding: "1rem", color: "red" }}>
        {error}
      </div>
    );
  }

  return (
    <div style={{ padding: "1rem" }}>
      {/* HEADER ROW */}
      <div
        style={{
          marginBottom: "1rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3 style={{ marginLeft: "15px" }}>Photo Management</h3>

        {/* 🔍 SEARCH BAR WITH ICON */}
        <div
          style={{
            position: "relative",
            width: "240px",
            marginRight: "25px",
          }}
        >
          <i
            className="bi bi-search"
            style={{
              position: "absolute",
              left: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: "16px",
              color: "#666",
            }}
          ></i>

          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: "6px 12px 6px 34px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              width: "100%",
              fontSize: "14px",
            }}
          />
        </div>
      </div>

      <AppTable columns={columns} data={filteredPhotos} />

      {/* EDIT MODAL */}
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        size="lg"
        centered
        backdrop="static"
        style={{
          marginTop: "40px",
          marginLeft: "40px",
          padding: "10px",
        }}
      >
        <Modal.Header closeButton style={{marginRight:'10px'}}>
          <Modal.Title>
            <h2 style={{ marginLeft: "10px" }}>Edit Photo</h2>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body
          style={{
            padding: "20px",
          }}
        >
          {selectedPhoto && (
            <PhotoForms
              initialPhoto={selectedPhoto}
              onClose={handleCloseModal}
            />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PhotoListPage;
