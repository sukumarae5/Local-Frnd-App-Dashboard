import React, { useEffect, useRef, useState } from "react";
import { Modal, Form, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  updateOfferRequest,
  resetUpdateOfferState,
  offersFetchRequest,
} from "../../features/Offers/OffersActions";

const getDateTimeLocalValue = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60000);
  return localDate.toISOString().slice(0, 16);
};

const buildInitialFormData = (selectedOffer) => ({
  title: selectedOffer?.title || "",
  description: selectedOffer?.description || "",
  image: null,
  existing_image_url: selectedOffer?.image_url || "",
  redirect_url: selectedOffer?.redirect_url || "/coins",
  priority:
    selectedOffer?.priority !== undefined && selectedOffer?.priority !== null
      ? Number(selectedOffer.priority)
      : "",
  start_date: getDateTimeLocalValue(selectedOffer?.start_date),
  end_date: getDateTimeLocalValue(selectedOffer?.end_date),
  status:
    selectedOffer?.status !== undefined && selectedOffer?.status !== null
      ? Number(selectedOffer.status)
      : 1,
});

const OffersEditForm = ({ show, handleClose, selectedOffer }) => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const { updateLoading = false, updateSuccess = false, updateError = "" } =
    useSelector((state) => state.offers || {});

  const [formData, setFormData] = useState(buildInitialFormData(selectedOffer));
  const [previewUrl, setPreviewUrl] = useState("");
  const [localError, setLocalError] = useState("");

  useEffect(() => {
    if (show && selectedOffer) {
      const initialData = buildInitialFormData(selectedOffer);
      setFormData(initialData);
      setPreviewUrl(initialData.existing_image_url || "");
      setLocalError("");
      dispatch(resetUpdateOfferState());
    }
  }, [show, selectedOffer, dispatch]);

  useEffect(() => {
    if (updateSuccess) {
      dispatch(offersFetchRequest());
      dispatch(resetUpdateOfferState());
      handleClose();
    }
  }, [updateSuccess, dispatch, handleClose]);

  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith("blob:")) {
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

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setLocalError("Please select a valid image file.");
      return;
    }

    if (previewUrl && previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }

    const localPreview = URL.createObjectURL(file);

    setLocalError("");
    setFormData((prev) => ({
      ...prev,
      image: file,
    }));
    setPreviewUrl(localPreview);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedOffer?.id) {
      setLocalError("Offer id is missing.");
      return;
    }

    if (!formData.title.trim()) {
      setLocalError("Please enter title.");
      return;
    }

    if (formData.priority === "") {
      setLocalError("Please enter priority.");
      return;
    }

    setLocalError("");

    const payload = new FormData();
    payload.append("title", formData.title.trim());
    payload.append("description", formData.description.trim());
    payload.append("redirect_url", formData.redirect_url || "/coins");
    payload.append("priority", String(Number(formData.priority)));
    payload.append("start_date", formData.start_date || "");
    payload.append("end_date", formData.end_date || "");
    payload.append("status", String(Number(formData.status)));

    // always send current/old image url
    payload.append(
      "existing_image_url",
      formData.existing_image_url || selectedOffer?.image_url || ""
    );

    // only send image if user selected a new one
    if (formData.image) {
      payload.append("image", formData.image);
    }

    console.log("selected id:", selectedOffer.id);
    for (const pair of payload.entries()) {
      console.log(pair[0], pair[1]);
    }

    dispatch(
      updateOfferRequest({
        id: selectedOffer.id,
        formData: payload,
      })
    );
  };

  const onClose = () => {
    setLocalError("");
    dispatch(resetUpdateOfferState());
    handleClose();
  };

  return (
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Header
        closeButton
        style={{
          background: "#2d3447",
          borderBottom: "none",
          marginTop: "15px",
        }}
      >
        <Modal.Title style={{ color: "#fff" }}>Edit Offer</Modal.Title>
      </Modal.Header>

      <Modal.Body
        style={{
          background: "linear-gradient(180deg,#8c00ff,#c93ae7)",
          padding: "25px",
        }}
      >
        {(localError || updateError) && (
          <div
            style={{
              color: "#fff",
              marginBottom: "12px",
              background: "rgba(255,255,255,0.15)",
              padding: "10px 12px",
              borderRadius: "10px",
            }}
          >
            {localError || updateError}
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
                  padding: "14px",
                  borderRadius: "12px",
                }}
              >
                <div
                  style={{
                    color: "#fff",
                    marginBottom: "10px",
                    fontWeight: "600",
                  }}
                >
                  Upload Image
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />

                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <Button
                    type="button"
                    onClick={handleUploadClick}
                    style={{
                      borderRadius: "12px",
                      padding: "10px 18px",
                      border: "none",
                      background: "#fff",
                      color: "#6a00f4",
                      fontWeight: "700",
                    }}
                  >
                    Upload Image
                  </Button>

                  <span style={{ color: "#fff", fontSize: "14px" }}>
                    {formData.image
                      ? formData.image.name
                      : formData.existing_image_url
                      ? "Current image available"
                      : "No file selected"}
                  </span>
                </div>

                {previewUrl && (
                  <img
                    src={previewUrl}
                    alt="preview"
                    style={{
                      marginTop: "14px",
                      width: "140px",
                      height: "100px",
                      borderRadius: "10px",
                      objectFit: "cover",
                      border: "2px solid rgba(255,255,255,0.3)",
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
            <Button type="submit" disabled={updateLoading}>
              {updateLoading ? "Updating..." : "Update"}
            </Button>

            <Button
              variant="secondary"
              onClick={onClose}
              disabled={updateLoading}
            >
              Cancel
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default OffersEditForm;