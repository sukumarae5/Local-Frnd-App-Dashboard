import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, Form } from "react-bootstrap";
import {
  fetchLifestylecategoryRequest,
  addLifestylecategoryRequest,
  updateLifestylecategoryRequest,
  deleteLifestylecategoryRequest,
} from "../../features/Lifestylecategory/LifestylecategoryAction";
import { AppButtonRow } from "../../components/button/AppButton";

const LifestylecategoryPage = () => {
  const dispatch = useDispatch();

  const {
    loading,
    lifestylecategory,
    error,
    addLoading,
    updateLoading,
  } = useSelector((state) => state.lifestylecategory);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [addFormData, setAddFormData] = useState({
    name: "",
  });

  const [editFormData, setEditFormData] = useState({
    name: "",
  });

  useEffect(() => {
    dispatch(fetchLifestylecategoryRequest());
  }, [dispatch]);

  const handleOpenAddModal = () => {
    setAddFormData({ name: "" });
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
    setAddFormData({ name: "" });
  };

  const handleOpenEditModal = (item) => {
    setSelectedItem(item);
    setEditFormData({
      name: item.name || "",
    });
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedItem(null);
    setEditFormData({ name: "" });
  };

  const handleAddChange = (e) => {
    setAddFormData({
      name: e.target.value,
    });
  };

  const handleEditChange = (e) => {
    setEditFormData({
      name: e.target.value,
    });
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();

    const payload = {
      name: addFormData.name,
    };

    dispatch(addLifestylecategoryRequest(payload));
    alert("Lifestyle category added successfully");
    handleCloseAddModal();
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();

    if (!selectedItem?.id) return;

    const payload = {
      id: selectedItem.id,
      formData: {
        ...selectedItem,
        name: editFormData.name,
      },
    };

    dispatch(updateLifestylecategoryRequest(payload));
    alert("Lifestyle category updated successfully");
    handleCloseEditModal();
  };

  const handleDelete = (item) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${item.name || item.title}"?`
    );

    if (confirmDelete) {
      dispatch(deleteLifestylecategoryRequest(item.id));
      alert("Lifestyle category deleted successfully");
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #5B2D8B 0%, #7B3FE4 40%, #7527b0 70%, #6f15a4 100%)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <h2
          style={{
            fontWeight: "700",
            color: "#ffffff",
            margin: 0,
            fontSize: "28px",
          }}
        >
          Lifestyle Category Page
        </h2>

        <Button
          onClick={handleOpenAddModal}
          style={{
            background: "linear-gradient(135deg,#22c55e,#16a34a)",
            border: "none",
            borderRadius: "10px",
            padding: "10px 18px",
            fontWeight: "600",
            color: "#ffffff",
            boxShadow: "0 4px 12px rgba(34,197,94,0.30)",
          }}
        >
          + Add Category
        </Button>
      </div>

      {loading && (
        <div
          style={{
            color: "#ffffff",
            fontSize: "16px",
            fontWeight: "500",
            marginBottom: "16px",
          }}
        >
          Loading...
        </div>
      )}

      {error && (
        <div
          style={{
            color: "#ffe4e6",
            background: "rgba(239, 68, 68, 0.18)",
            border: "1px solid rgba(255,255,255,0.15)",
            padding: "12px 16px",
            borderRadius: "12px",
            marginBottom: "18px",
          }}
        >
          {error}
        </div>
      )}

      {!loading && !error && lifestylecategory?.length === 0 && (
        <div
          style={{
            color: "#f8fafc",
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.12)",
            padding: "14px 16px",
            borderRadius: "12px",
            marginBottom: "20px",
          }}
        >
          No lifestyle category data found.
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "18px",
        }}
      >
        {lifestylecategory?.map((item, index) => (
          <div
            key={item.id || index}
            style={{
              borderRadius: "18px",
              padding: "18px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
              border: "1px solid rgba(255,255,255,0.14)",
              position: "relative",
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 100%)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "10px",
                marginBottom: "14px",
              }}
            >
              <h4
                style={{
                  margin: 0,
                  color: "#ffffff",
                  fontSize: "18px",
                  fontWeight: "700",
                  lineHeight: "1.4",
                  wordBreak: "break-word",
                }}
              >
                {item.name || item.title || "No Name"}
              </h4>

              <AppButtonRow
                onEdit={() => handleOpenEditModal(item)}
                onDelete={() => handleDelete(item)}
              />
            </div>

            <p
              style={{
                margin: "8px 0",
                color: "#e2e8f0",
                fontSize: "14px",
                lineHeight: "1.6",
              }}
            >
              <strong style={{ color: "#ffffff" }}>ID:</strong>{" "}
              {item.id || "N/A"}
            </p>

            <p
              style={{
                margin: "8px 0",
                color: "#e2e8f0",
                fontSize: "14px",
                lineHeight: "1.6",
              }}
            >
              <strong style={{ color: "#ffffff" }}>Status:</strong>{" "}
              {item.status !== undefined ? String(item.status) : "N/A"}
            </p>

            <p
              style={{
                margin: "8px 0 0 0",
                color: "#e2e8f0",
                fontSize: "14px",
                lineHeight: "1.6",
                wordBreak: "break-word",
              }}
            >
              <strong style={{ color: "#ffffff" }}>Description:</strong>{" "}
              {item.description || "No description"}
            </p>
          </div>
        ))}
      </div>

      <Modal show={showAddModal} onHide={handleCloseAddModal} centered>
        <Modal.Header
          closeButton
          closeVariant="white"
          style={{
            background:
              "linear-gradient(180deg, #5B2D8B 0%, #7B3FE4 40%, #7527b0ff 70%, #6f15a4ff 100%)",
            borderBottom: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          <Modal.Title style={{ color: "#ffffff" }}>
            Add Lifestyle Category
          </Modal.Title>
        </Modal.Header>

        <Form onSubmit={handleAddSubmit}>
          <Modal.Body
            style={{
              background:
                "linear-gradient(180deg, #5B2D8B 0%, #7B3FE4 40%, #7527b0ff 70%, #6f15a4ff 100%)",
              color: "#ffffff",
            }}
          >
            <Form.Group className="mb-3">
              <Form.Label style={{ color: "#ffffff", fontWeight: "600" }}>
                Name
              </Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={addFormData.name}
                onChange={handleAddChange}
                placeholder="Enter category name"
                required
                style={{
                  background: "#ffffff",
                  color: "#000000",
                  border: "1px solid rgba(255,255,255,0.25)",
                  borderRadius: "10px",
                  padding: "12px 14px",
                }}
              />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer
            style={{
              background:
                "linear-gradient(180deg, #5B2D8B 0%, #7B3FE4 40%, #7527b0ff 70%, #6f15a4ff 100%)",
              borderTop: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            <Button variant="secondary" onClick={handleCloseAddModal}>
              Cancel
            </Button>

            <Button type="submit" variant="success" disabled={addLoading}>
              {addLoading ? "Adding..." : "Add"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal show={showEditModal} onHide={handleCloseEditModal} centered >
        <Modal.Header
          closeButton
          closeVariant="white"
          style={{
            background:
              "linear-gradient(180deg, #5B2D8B 0%, #7B3FE4 40%, #7527b0ff 70%, #6f15a4ff 100%)",
             borderBottom: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          <Modal.Title style={{ color: "#ffffff" }}>
            Edit Lifestyle Category
          </Modal.Title>
        </Modal.Header>

        <Form onSubmit={handleEditSubmit}>
          <Modal.Body
            style={{
              background:
                "linear-gradient(180deg, #5B2D8B 0%, #7B3FE4 40%, #7527b0ff 70%, #6f15a4ff 100%)",
              color: "#ffffff",
            }}
          >
            <Form.Group className="mb-3">
              <Form.Label style={{ color: "#ffffff", fontWeight: "600" }}>
                Name
              </Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={editFormData.name}
                onChange={handleEditChange}
                placeholder="Enter category name"
                required
                style={{
                  background: "#ffffff",
                  color: "#000000",
                  border: "1px solid rgba(255,255,255,0.25)",
                  borderRadius: "10px",
                  padding: "12px 14px",
                }}
              />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer
            style={{
               background:
                "linear-gradient(180deg, #5B2D8B 0%, #7B3FE4 40%, #7527b0ff 70%, #6f15a4ff 100%)",
              borderTop: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            <Button variant="secondary" onClick={handleCloseEditModal}>
              Cancel
            </Button>

            <Button type="submit" variant="primary" disabled={updateLoading}>
              {updateLoading ? "Updating..." : "Update"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default LifestylecategoryPage;