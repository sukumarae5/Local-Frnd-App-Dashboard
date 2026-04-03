import React, { useEffect, useState } from "react";
import { Modal, Form, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addOfferRequest,
  resetAddOfferState,
  offersFetchRequest,
} from "../../features/Offers/OffersActions";

const initialFormData = {
  title: "",
  description: "",
  image: null,
  redirect_url: "/coins",
  priority: "",
  start_date: "",
  end_date: "",
  status: 1,
};

const OffersAddForm = ({ show, handleClose }) => {
  const dispatch = useDispatch();

  const { addLoading = false, addSuccess = false, addError = "" } =
    useSelector((state) => state.offers || {});

  const [formData, setFormData] = useState(initialFormData);
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    if (show) {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      setFormData(initialFormData);
      setPreviewUrl("");
      dispatch(resetAddOfferState());
    }
  }, [show, dispatch]);

  useEffect(() => {
    if (addSuccess) {
      dispatch(offersFetchRequest());
      dispatch(resetAddOfferState());
      handleClose();
    }
  }, [addSuccess, dispatch, handleClose]);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "priority" || name === "status"
          ? value === ""
            ? ""
            : Number(value)
          : value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      return;
    }

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setFormData((prev) => ({
      ...prev,
      image: file,
    }));

    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert("Please enter title.");
      return;
    }

    if (formData.priority === "") {
      alert("Please enter priority.");
      return;
    }

    if (!formData.image) {
      alert("Please upload an image.");
      return;
    }

    const payload = new FormData();
    payload.append("title", formData.title.trim());
    payload.append("description", formData.description.trim());
    payload.append("image", formData.image);
    payload.append("redirect_url", formData.redirect_url || "/coins");
    payload.append("priority", String(Number(formData.priority)));
    payload.append("start_date", formData.start_date || "");
    payload.append("end_date", formData.end_date || "");
    payload.append("status", String(Number(formData.status)));

    for (const pair of payload.entries()) {
      console.log(pair[0], pair[1]);
    }

    dispatch(addOfferRequest(payload));
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header
        closeButton
        style={{
          background: "#2d3447",
          borderBottom: "none",
          marginTop:"15px"
        }}
      >
        <Modal.Title style={{ color: "#fff" }}>Add Offer</Modal.Title>
      </Modal.Header>

      <Modal.Body
        style={{
          background: "linear-gradient(180deg,#8c00ff,#c93ae7)",
          padding: "25px",
        }}
      >
        {addError && (
          <div style={{ color: "#fff", marginBottom: "10px" }}>
            {addError}
          </div>
        )}

        <Form onSubmit={handleSubmit}>
          <Row className="g-3">
            <Col md={6}>
              <Form.Label style={{ color: "#fff" }}>Title</Form.Label>
              <Form.Control
                name="title"
                value={formData.title}
                onChange={handleChange}
                style={{
                  borderRadius: "12px",
                  height: "50px",
                  background: "#eee",
                }}
              />
            </Col>

            <Col md={6}>
              <Form.Label style={{ color: "#fff" }}>Priority</Form.Label>
              <Form.Control
                type="number"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                onWheel={(e) => e.target.blur()}
                style={{
                  borderRadius: "12px",
                  height: "50px",
                  background: "#eee",
                }}
              />
            </Col>

            <Col md={12}>
              <div
                style={{
                  background: "rgba(255,255,255,0.1)",
                  padding: "10px",
                  borderRadius: "10px",
                }}
              >
                <div style={{ color: "#fff", marginBottom: "8px" }}>
                  Upload Image
                </div>

                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{
                    borderRadius: "12px",
                    height: "50px",
                    background: "#eee",
                  }}
                />

                {previewUrl && (
                  <img
                    src={previewUrl}
                    alt="preview"
                    style={{
                      marginTop: "10px",
                      width: "120px",
                      height: "90px",
                      borderRadius: "10px",
                      objectFit: "cover",
                    }}
                  />
                )}
              </div>
            </Col>

            <Col md={6}>
              <Form.Label style={{ color: "#fff" }}>Redirect URL</Form.Label>
              <Form.Control
                name="redirect_url"
                value={formData.redirect_url}
                onChange={handleChange}
                style={{
                  borderRadius: "12px",
                  height: "50px",
                  background: "#eee",
                }}
              />
            </Col>

            <Col md={6}>
              <Form.Label style={{ color: "#fff" }}>Status</Form.Label>
              <Form.Select
                name="status"
                value={formData.status}
                onChange={handleChange}
                style={{
                  borderRadius: "12px",
                  height: "50px",
                  background: "#eee",
                }}
              >
                <option value={1}>Active</option>
                <option value={0}>Inactive</option>
              </Form.Select>
            </Col>

            <Col md={6}>
              <Form.Label style={{ color: "#fff" }}>Start Date</Form.Label>
              <Form.Control
                type="datetime-local"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                style={{
                  borderRadius: "12px",
                  height: "50px",
                  background: "#eee",
                }}
              />
            </Col>

            <Col md={6}>
              <Form.Label style={{ color: "#fff" }}>End Date</Form.Label>
              <Form.Control
                type="datetime-local"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
                style={{
                  borderRadius: "12px",
                  height: "50px",
                  background: "#eee",
                }}
              />
            </Col>

            <Col md={12}>
              <Form.Label style={{ color: "#fff" }}>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="description"
                value={formData.description}
                onChange={handleChange}
                style={{
                  borderRadius: "12px",
                  background: "#eee",
                }}
              />
            </Col>
          </Row>

          <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
            <Button type="submit" disabled={addLoading}>
              {addLoading ? "Saving..." : "Save"}
            </Button>
            <Button
              variant="secondary"
              onClick={handleClose}
              disabled={addLoading}
            >
              Cancel
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default OffersAddForm;