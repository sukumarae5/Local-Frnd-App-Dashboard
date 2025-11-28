// src/pages/photos/PhotoForms.js
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
  const params = useParams(); // if you need route params later
  const dispatch = useDispatch();
  const [submitting, setSubmitting] = useState(false);

  const navigationPhotoRow = location.state || null;
  const photoRow = initialPhoto || navigationPhotoRow;

  const [form, setForm] = useState(() => buildFormFromPhoto(photoRow));
  const [hover, setHover] = useState(false);

  console.log("PhotoForms form state:", form);

  useEffect(() => {
    setForm(buildFormFromPhoto(photoRow));
  }, [photoRow]);

  const handleChange = (key) => (e) => {
    const value = key === "isPrimary" ? e.target.checked : e.target.value;
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({
        ...prev,
        photoUrl: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    try {
      const payload = {
        user_id: Number(form.userId),
        photo_id: Number(form.photoId),
        data: {
          photo_url: form.photoUrl,
          is_primary: form.isPrimary ? 1 : 0,
          status: form.status,
        },
      };

      console.log("Dispatching EditPhotosRequest:", payload);
      dispatch(EditPhotosRequest(payload)); // only once

      // DO NOT reload/close here – saga will show alert & reload
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col lg={8} md={10}>
          {/* ==== 3D BLACK BORDER CARD ==== */}
          <Card
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className="shadow-sm"
            style={{
              borderRadius: 16,
              overflow: "hidden",
              border: hover ? "4px solid #000" : "2px solid #bfbfbf",
              boxShadow: hover
                ? `
                    inset 0 0 8px rgba(0,0,0,0.35), 
                    0 8px 18px rgba(0,0,0,0.25),
                    0 2px 4px rgba(0,0,0,0.15)
                  `
                : "0 2px 6px rgba(0,0,0,0.10)",
              transform: hover ? "translateY(-4px)" : "translateY(0)",
              transition: "all 0.25s ease",
            }}
          >
            <Card.Header
              className="bg-white border-0"
              style={{ padding: "20px 24px 0" }}
            >
              <h4 style={{ margin: 0, fontWeight: 600 }}>
                {photoRow ? "Edit Photo" : "Create Photo"}
              </h4>
              <p
                className="text-muted"
                style={{ marginTop: 8, marginBottom: 0 }}
              >
                Manage photo details, primary status, and upload information.
              </p>
            </Card.Header>

            <Card.Body style={{ padding: 24 }}>
              <Form onSubmit={handleSubmit}>
                {/* FIRST ROW */}
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="fw-semibold">Photo ID</Form.Label>
                      <Form.Control
                        type="text"
                        value={form.photoId}
                        onChange={handleChange("photoId")}
                        style={{ borderRadius: 8 }}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="fw-semibold">User ID</Form.Label>
                      <Form.Control
                        type="text"
                        value={form.userId}
                        onChange={handleChange("userId")}
                        style={{ borderRadius: 8 }}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* PREVIEW + URL */}
                <Row className="mb-3">
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label className="fw-semibold">Preview</Form.Label>
                      <div
                        style={{
                          width: 110,
                          height: 110,
                          borderRadius: 10,
                          border: "1px solid #e0e0e0",
                          background: "#fafafa",
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
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          <small style={{ color: "#888" }}>No image</small>
                        )}
                      </div>
                    </Form.Group>
                  </Col>

                  <Col md={8}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">Photo URL</Form.Label>
                      <Form.Control
                        type="text"
                        value={form.photoUrl}
                        onChange={handleChange("photoUrl")}
                        placeholder="Paste URL or upload"
                        style={{ borderRadius: 8 }}
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label className="fw-semibold">
                        Upload Photo
                      </Form.Label>
                      <Form.Control
                        type="file"
                        ref={fileRef}
                        onChange={handleFile}
                        style={{ borderRadius: 8 }}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* PRIMARY + TIMESTAMP */}
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="fw-semibold">Primary</Form.Label>
                      <Form.Check
                        type="switch"
                        label="Primary photo"
                        checked={form.isPrimary}
                        onChange={handleChange("isPrimary")}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="fw-semibold">Timestamp</Form.Label>
                      <Form.Control
                        type="text"
                        value={form.uploadTimestamp}
                        onChange={handleChange("uploadTimestamp")}
                        style={{ borderRadius: 8 }}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* STATUS */}
                <Row className="mb-4">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="fw-semibold">Status</Form.Label>
                      <Form.Select
                        value={form.status}
                        onChange={handleChange("status")}
                        style={{ borderRadius: 8 }}
                      >
                        <option value="active">Active</option>
                        <option value="deleted">Deleted</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                {/* BUTTONS */}
                <div className="d-flex justify-content-end gap-2">
                  {onClose && (
                    <Button
                      variant="outline-secondary"
                      onClick={onClose}
                      style={{ borderRadius: 8 }}
                    >
                      Cancel
                    </Button>
                  )}

                  <Button
                    type="submit"
                    variant="dark"
                    style={{ borderRadius: 8, paddingInline: 24 }}
                  >
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
