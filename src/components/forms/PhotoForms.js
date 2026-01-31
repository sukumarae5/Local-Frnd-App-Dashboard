import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { EditPhotosRequest } from "../../features/photos/photosAction";

const nowString = () =>
  new Date().toISOString().slice(0, 19).replace("T", " ");

const buildFormFromPhoto = (p) => {
  if (!p) {
    return {
      photoId: "60001",
      userId: "510001",
      photoUrl: "",
      isPrimary: true,
      uploadTimestamp: nowString(),
      status: "active",
    };
  }

  return {
    photoId: (p.photo_id ?? "").toString(),
    userId: (p.user_id ?? "").toString(),
    photoUrl: p.photo_url || "",
    isPrimary: !!p.is_primary,
    uploadTimestamp: p.created_at
      ? new Date(p.created_at).toISOString().slice(0, 19).replace("T", " ")
      : nowString(),
    status: p.status || "active",
  };
};

const PhotoForms = ({ initialPhoto = null, onClose }) => {
  const fileRef = useRef(null);
  const location = useLocation();
  const params = useParams();
  const dispatch = useDispatch();
  const [submitting, setSubmitting] = useState(false);

  const navigationPhotoRow = location.state || null;
  const photoRow = initialPhoto || navigationPhotoRow;

  const [form, setForm] = useState(() => buildFormFromPhoto(photoRow));
  const [hover, setHover] = useState(false);

  useEffect(() => {
    setForm(buildFormFromPhoto(photoRow));
  }, [photoRow]);

  const handleChange = (key) => (e) => {
    const value = key === "isPrimary" ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, photoUrl: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    try {
      dispatch(
        EditPhotosRequest({
          user_id: Number(form.userId),
          photo_id: Number(form.photoId),
          data: {
            photo_url: form.photoUrl,
            is_primary: form.isPrimary ? 1 : 0,
            status: form.status,
          },
        })
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col lg={8} md={10}>
          <Card
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
              borderRadius: 16,
              overflow: "hidden",
              border: hover ? "4px solid #000" : "2px solid #bfbfbf",
              background: "linear-gradient(135deg, #7F00FF, #BF28E1)",
              boxShadow: hover
                ? "0 12px 24px rgba(0,0,0,0.35)"
                : "0 6px 14px rgba(0,0,0,0.2)",
              transition: "all 0.25s ease",
            }}
          >
            {/* HEADER */}
            <Card.Header
              style={{
                background: "transparent",
                border: "none",
                color: "#fff",
                padding: "24px",
              }}
            >
              <h4 style={{ margin: 0, fontWeight: 600 }}>
                {photoRow ? "Edit Photo" : "Create Photo"}
              </h4>
              <p style={{ marginTop: 8, opacity: 0.9 }}>
                Manage photo details, primary status, and upload information.
              </p>
            </Card.Header>

            {/* FULL FORM BODY WITH SAME GRADIENT */}
            <Card.Body style={{ padding: 24, color: "#fff" }}>
              <Form onSubmit={handleSubmit}>
                {/* ROW 1 */}
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Label className="fw-semibold text-white">
                      Photo ID
                    </Form.Label>
                    <Form.Control
                      value={form.photoId}
                      onChange={handleChange("photoId")}
                      className="bg-white"
                      style={{ borderRadius: 8 }}
                    />
                  </Col>
                  <Col md={6}>
                    <Form.Label className="fw-semibold text-white">
                      User ID
                    </Form.Label>
                    <Form.Control
                      value={form.userId}
                      onChange={handleChange("userId")}
                      className="bg-white"
                      style={{ borderRadius: 8 }}
                    />
                  </Col>
                </Row>

                {/* PREVIEW + URL */}
                <Row className="mb-3">
                  <Col md={4}>
                    <Form.Label className="fw-semibold text-white">
                      Preview
                    </Form.Label>
                    <div
                      style={{
                        width: 110,
                        height: 110,
                        borderRadius: 10,
                        background: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                      }}
                    >
                      {form.photoUrl ? (
                        <img
                          src={form.photoUrl}
                          alt="preview"
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      ) : (
                        <small>No image</small>
                      )}
                    </div>
                  </Col>

                  <Col md={8}>
                    <Form.Label className="fw-semibold text-white">
                      Photo URL
                    </Form.Label>
                    <Form.Control
                      value={form.photoUrl}
                      onChange={handleChange("photoUrl")}
                      className="bg-white mb-2"
                      style={{ borderRadius: 8 }}
                    />

                    <Form.Label className="fw-semibold text-white">
                      Upload Photo
                    </Form.Label>
                    <Form.Control
                      type="file"
                      ref={fileRef}
                      onChange={handleFile}
                      className="bg-white"
                      style={{ borderRadius: 8 }}
                    />
                  </Col>
                </Row>

                {/* PRIMARY + TIMESTAMP */}
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Check
                      type="switch"
                      label="Primary photo"
                      checked={form.isPrimary}
                      onChange={handleChange("isPrimary")}
                      className="text-white"
                    />
                  </Col>

                  <Col md={6}>
                    <Form.Label className="fw-semibold text-white">
                      Timestamp
                    </Form.Label>
                    <Form.Control
                      value={form.uploadTimestamp}
                      onChange={handleChange("uploadTimestamp")}
                      className="bg-white"
                      style={{ borderRadius: 8 }}
                    />
                  </Col>
                </Row>

                {/* STATUS */}
                <Row className="mb-4">
                  <Col md={6}>
                    <Form.Label className="fw-semibold text-white">
                      Status
                    </Form.Label>
                    <Form.Select
                      value={form.status}
                      onChange={handleChange("status")}
                      className="bg-white"
                      style={{ borderRadius: 8 }}
                    >
                      <option value="active">Active</option>
                      <option value="deleted">Deleted</option>
                    </Form.Select>
                  </Col>
                </Row>

                {/* BUTTONS */}
                <div className="d-flex justify-content-end gap-2">
                  {onClose && (
                    <Button variant="outline-light" onClick={onClose}>
                      Cancel
                    </Button>
                  )}
                  <Button variant="dark" type="submit">
                    Save
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PhotoForms;
