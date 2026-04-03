import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCoinsRequest,
  resetUpdateCoinsState,
} from "../../features/Coins/CoinsActions";

const initialFormData = {
  id: "",
  coins: "",
  minutes: "",
  original_price: "",
  discount_percent: "",
  price_after_discount: "",
  status: 1,
};

const CoinsEditForm = ({ show, onClose, selectedCoin }) => {
  const dispatch = useDispatch();

  const {
    updateLoading = false,
    updateSuccess = false,
    updateError = "",
  } = useSelector((state) => state.coins || {});

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (show && selectedCoin) {
      dispatch(resetUpdateCoinsState());

      setFormData({
        id: selectedCoin?.id ?? "",
        coins: selectedCoin?.coins ?? "",
        minutes: selectedCoin?.minutes ?? "",
        original_price: selectedCoin?.original_price ?? "",
        discount_percent: selectedCoin?.discount_percent ?? "",
        price_after_discount: selectedCoin?.price_after_discount ?? "",
        status: Number(selectedCoin?.status ?? 1),
      });
    }
  }, [show, selectedCoin, dispatch]);

  useEffect(() => {
    if (updateSuccess && show) {
      handleClose();
    }
  }, [updateSuccess, show]);

  const handleClose = () => {
    dispatch(resetUpdateCoinsState());
    setFormData(initialFormData);
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const updated = {
      ...formData,
      [name]: value,
    };

    if (name === "original_price" || name === "discount_percent") {
      const original = parseFloat(
        name === "original_price" ? value : updated.original_price
      );
      const discount = parseFloat(
        name === "discount_percent" ? value : updated.discount_percent
      );

      if (!Number.isNaN(original) && !Number.isNaN(discount)) {
        const finalPrice = original - (original * discount) / 100;
        updated.price_after_discount = finalPrice.toFixed(2);
      } else {
        updated.price_after_discount = "";
      }
    }

    setFormData(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      id: Number(formData.id),
      coins: Number(formData.coins),
      minutes: Number(formData.minutes),
      original_price: String(formData.original_price),
      discount_percent: Number(formData.discount_percent),
      price_after_discount: String(formData.price_after_discount),
      status: Number(formData.status),
    };

    dispatch(updateCoinsRequest(payload));
  };

  const labelStyle = {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: "14px",
    marginBottom: "7px",
  };

  const inputStyle = {
    minHeight: "48px",
    borderRadius: "10px",
    border: "1px solid #d7d7d7",
    fontSize: "15px",
    padding: "10px 14px",
    boxShadow: "none",
  };

  const whiteButtonStyle = {
    background: "#ffffff",
    color: "#111111",
    border: "none",
    borderRadius: "10px",
    padding: "10px 22px",
    fontWeight: "700",
    fontSize: "15px",
    boxShadow: "none",
  };

  const transparentButtonStyle = {
    background: "transparent",
    color: "#ffffff",
    border: "1px solid rgba(255,255,255,0.85)",
    borderRadius: "10px",
    padding: "10px 22px",
    fontWeight: "600",
    fontSize: "15px",
    boxShadow: "none",
  };

  return (
    <>
      <style>
        {`
          .coins-edit-modal .modal-dialog {
            max-width: 820px;
          }

          .coins-edit-modal .modal-content {
            background: #2f3648;
            border: none;
            border-radius: 14px;
            overflow: hidden;
          }

          .coins-edit-modal .modal-header {
            background: #2f3648;
            color: #fff;
            border-bottom: 1px solid rgba(255,255,255,0.12);
            padding: 14px 18px;
          }

          .coins-edit-modal .modal-title {
            font-size: 18px;
            font-weight: 700;
            line-height: 1.2;
          }

          .coins-edit-modal .btn-close {
            filter: invert(1);
            opacity: 0.9;
          }

          .coins-edit-modal .form-control:focus,
          .coins-edit-modal .form-select:focus {
            border-color: #c76cff;
            box-shadow: 0 0 0 0.15rem rgba(199, 108, 255, 0.22);
          }
        `}
      </style>

      <Modal
        show={show}
        onHide={handleClose}
        centered
        backdrop="static"
        keyboard={!updateLoading}
        dialogClassName="coins-edit-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Coin Package</Modal.Title>
        </Modal.Header>

        <Form onSubmit={handleSubmit}>
          <Modal.Body
            style={{
              background:
                "linear-gradient(135deg, #7f00ff 0%, #a000ff 35%, #c026d3 70%, #b832e9 100%)",
              padding: "18px",
            }}
          >
            <div
              style={{
                borderRadius: "12px",
                padding: "16px",
              }}
            >
              {updateError ? (
                <div
                  style={{
                    color: "#ffdddd",
                    background: "rgba(255, 0, 0, 0.18)",
                    border: "1px solid rgba(255,255,255,0.18)",
                    padding: "10px 12px",
                    borderRadius: "8px",
                    marginBottom: "14px",
                    fontSize: "13px",
                    fontWeight: 500,
                  }}
                >
                  {updateError}
                </div>
              ) : null}

              <Row className="g-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label style={labelStyle}>Coins</Form.Label>
                    <Form.Control
                      type="number"
                      name="coins"
                      value={formData.coins}
                      onChange={handleChange}
                      required
                      style={inputStyle}
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label style={labelStyle}>Minutes</Form.Label>
                    <Form.Control
                      type="number"
                      name="minutes"
                      value={formData.minutes}
                      onChange={handleChange}
                      required
                      style={inputStyle}
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label style={labelStyle}>Original Price</Form.Label>
                    <Form.Control
                      type="number"
                      step="0.01"
                      name="original_price"
                      value={formData.original_price}
                      onChange={handleChange}
                      required
                      style={inputStyle}
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label style={labelStyle}>Discount Percent</Form.Label>
                    <Form.Control
                      type="number"
                      name="discount_percent"
                      value={formData.discount_percent}
                      onChange={handleChange}
                      required
                      style={inputStyle}
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label style={labelStyle}>Price After Discount</Form.Label>
                    <Form.Control
                      type="number"
                      step="0.01"
                      name="price_after_discount"
                      value={formData.price_after_discount}
                      onChange={handleChange}
                      required
                      style={inputStyle}
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label style={labelStyle}>Status</Form.Label>
                    <Form.Select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      style={inputStyle}
                    >
                      <option value={1}>Active</option>
                      <option value={0}>Inactive</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginTop: "24px",
                  flexWrap: "wrap",
                }}
              >
                <Button
                  type="submit"
                  disabled={updateLoading}
                  style={whiteButtonStyle}
                >
                  {updateLoading ? "Updating..." : "Update"}
                </Button>

                <Button
                  type="button"
                  onClick={handleClose}
                  disabled={updateLoading}
                  style={transparentButtonStyle}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Form>
      </Modal>
    </>
  );
};

export default CoinsEditForm;