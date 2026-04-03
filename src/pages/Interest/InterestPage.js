import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, Form } from "react-bootstrap";
import {
  fetchInterestRequest,
  addInterestRequest,
  resetAddInterestState,
  editInterestRequest,
  resetEditInterestState,
  deleteInterestRequest,
  resetDeleteInterestState,
} from "../../features/Interest/InterestAction";
import AppTable from "../../components/tables/AppTable";
import { AppButtonRow } from "../../components/button/AppButton";
import AppPagination from "../../components/pagination/AppPagination";

const gradientBg =
  "linear-gradient(180deg, #5B2D8B 0%, #7B3FE4 40%, #7527b0ff 70%, #6f15a4ff 100%)";

const InterestPage = () => {
  const dispatch = useDispatch();

  const {
    loading,
    interests,
    error,
    addLoading,
    addSuccess,
    addError,
    editLoading,
    editSuccess,
    editError,
    deleteLoading,
    deleteSuccess,
    deleteError,
  } = useSelector((state) => state.interest);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [interestName, setInterestName] = useState("");
  const [editInterestName, setEditInterestName] = useState("");
  const [selectedInterest, setSelectedInterest] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    dispatch(fetchInterestRequest());
  }, [dispatch]);

  useEffect(() => {
    if (addSuccess) {
      alert("✅ Interest added successfully!");
      setShowAddModal(false);
      setInterestName("");
      dispatch(resetAddInterestState());
    }
  }, [addSuccess, dispatch]);

  useEffect(() => {
    if (editSuccess) {
      alert("✅ Interest updated successfully!");
      setShowEditModal(false);
      setEditInterestName("");
      setSelectedInterest(null);
      dispatch(resetEditInterestState());
    }
  }, [editSuccess, dispatch]);

  useEffect(() => {
    if (deleteSuccess) {
      alert("✅ Interest deleted successfully!");
      dispatch(resetDeleteInterestState());
    }
  }, [deleteSuccess, dispatch]);

  useEffect(() => {
    if (deleteError) {
      alert(deleteError);
      dispatch(resetDeleteInterestState());
    }
  }, [deleteError, dispatch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [interests]);

  const handleEdit = (row) => {
    setSelectedInterest(row);
    setEditInterestName(row?.name || "");
    setShowEditModal(true);
  };

  const handleDelete = (row) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${row?.name}"?`
    );

    if (confirmDelete) {
      dispatch(deleteInterestRequest(row.id));
    }
  };

  const handleAddInterest = (e) => {
    e.preventDefault();

    if (!interestName.trim()) {
      alert("Please enter interest name");
      return;
    }

    dispatch(
      addInterestRequest({
        name: interestName.trim(),
      })
    );
  };

  const handleUpdateInterest = (e) => {
    e.preventDefault();

    if (!editInterestName.trim()) {
      alert("Please enter interest name");
      return;
    }

    if (!selectedInterest?.id) {
      alert("Interest id not found");
      return;
    }

    dispatch(
      editInterestRequest({
        id: selectedInterest.id,
        data: {
          name: editInterestName.trim(),
        },
      })
    );
  };

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return (interests || []).slice(startIndex, startIndex + itemsPerPage);
  }, [interests, currentPage]);

  const columns = [
    {
      key: "sno",
      label: "S.No",
      render: (row, index) => (currentPage - 1) * itemsPerPage + index + 1,
    },
    {
      key: "id",
      label: "ID",
    },
    {
      key: "name",
      label: "Interest Name",
    },
    {
      key: "created_at",
      label: "Created At",
      render: (row) =>
        row?.created_at
          ? new Date(row.created_at).toLocaleDateString("en-GB")
          : "-",
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
        background: "#050505",
        padding: "24px",
      }}
    >
      <div
        style={{
          background: "linear-gradient(180deg, #1c2233 0%, #1b2130 100%)",
          borderRadius: "24px",
          overflow: "hidden",
          boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
          border: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div
          style={{
            padding: "24px 30px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <h2
            style={{
              margin: 0,
              color: "#fff",
              fontSize: "28px",
              fontWeight: "700",
            }}
          >
            Interest Page
          </h2>

          <Button
            onClick={() => setShowAddModal(true)}
            style={{
              background: "linear-gradient(135deg, #a855f7, #7c3aed)",
              border: "none",
              borderRadius: "16px",
              padding: "14px 22px",
              fontWeight: "600",
              fontSize: "16px",
              boxShadow: "0 8px 20px rgba(124, 58, 237, 0.35)",
            }}
          >
            + Add Interest
          </Button>
        </div>

        <div style={{ padding: "22px" }}>
          {loading && <p style={{ color: "#fff" }}>Loading...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          {deleteLoading && <p style={{ color: "#fff" }}>Deleting...</p>}

          {!loading && !error && (
            <>
              <AppTable columns={columns} data={paginatedData || []} />

              <AppPagination
                totalItems={interests?.length || 0}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </>
          )}
        </div>
      </div>

      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
        <Modal.Header
          closeButton
          style={{
            background: gradientBg,
            color: "#fff",
            borderBottom: "none",
          }}
        >
          <Modal.Title>Add Interest</Modal.Title>
        </Modal.Header>

        <Form onSubmit={handleAddInterest}>
          <Modal.Body
            style={{
              background: gradientBg,
              color: "#fff",
            }}
          >
            <Form.Group>
              <Form.Label style={{ color: "#fff" }}>Interest Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter interest name"
                value={interestName}
                onChange={(e) => setInterestName(e.target.value)}
                style={{
                  background: "rgba(255,255,255,0.15)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  color: "#fff",
                  borderRadius: "10px",
                }}
              />
            </Form.Group>

            {addError && (
              <p style={{ color: "#ffb3b3", marginTop: "10px" }}>{addError}</p>
            )}
          </Modal.Body>

          <Modal.Footer
            style={{
              background: gradientBg,
              borderTop: "none",
            }}
          >
            <Button
              variant="secondary"
              onClick={() => setShowAddModal(false)}
              style={{ borderRadius: "10px" }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={addLoading}
              style={{
                background: "#FFD60A",
                border: "none",
                color: "#000",
                borderRadius: "10px",
                fontWeight: "600",
              }}
            >
              {addLoading ? "Saving..." : "Add Interest"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header
          closeButton
          style={{
            background: gradientBg,
            color: "#fff",
            borderBottom: "none",
          }}
        >
          <Modal.Title>Edit Interest</Modal.Title>
        </Modal.Header>

        <Form onSubmit={handleUpdateInterest}>
          <Modal.Body
            style={{
              background: gradientBg,
              color: "#fff",
            }}
          >
            <Form.Group>
              <Form.Label style={{ color: "#fff" }}>Interest Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter interest name"
                value={editInterestName}
                onChange={(e) => setEditInterestName(e.target.value)}
                style={{
                  background: "rgba(255,255,255,0.15)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  color: "#fff",
                  borderRadius: "10px",
                }}
              />
            </Form.Group>

            {editError && (
              <p style={{ color: "#ffb3b3", marginTop: "10px" }}>{editError}</p>
            )}
          </Modal.Body>

          <Modal.Footer
            style={{
              background: gradientBg,
              borderTop: "none",
            }}
          >
            <Button
              variant="secondary"
              onClick={() => setShowEditModal(false)}
              style={{ borderRadius: "10px" }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={editLoading}
              style={{
                background: "#FFD60A",
                border: "none",
                color: "#000",
                borderRadius: "10px",
                fontWeight: "600",
              }}
            >
              {editLoading ? "Updating..." : "Update Interest"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default InterestPage;