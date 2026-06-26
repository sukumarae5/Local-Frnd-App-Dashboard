import React, { useEffect, useState, useCallback } from "react";
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

  const handleClose = useCallback(() => {
    dispatch(resetUpdateCoinsState());
    setFormData(initialFormData);
    onClose();
  }, [dispatch, onClose]);

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
  }, [updateSuccess, show, handleClose]);

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

  return (
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
          {updateError && (
            <div style={{ color: "#fff", marginBottom: "10px" }}>
              {updateError}
            </div>
          )}

          <Row className="g-3">
            <Col md={6}>
              <Form.Label style={{ color: "#fff" }}>Coins</Form.Label>
              <Form.Control
                type="number"
                name="coins"
                value={formData.coins}
                onChange={handleChange}
                required
              />
            </Col>

            <Col md={6}>
              <Form.Label style={{ color: "#fff" }}>Minutes</Form.Label>
              <Form.Control
                type="number"
                name="minutes"
                value={formData.minutes}
                onChange={handleChange}
                required
              />
            </Col>

            <Col md={6}>
              <Form.Label style={{ color: "#fff" }}>Original Price</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                name="original_price"
                value={formData.original_price}
                onChange={handleChange}
                required
              />
            </Col>

            <Col md={6}>
              <Form.Label style={{ color: "#fff" }}>Discount Percent</Form.Label>
              <Form.Control
                type="number"
                name="discount_percent"
                value={formData.discount_percent}
                onChange={handleChange}
                required
              />
            </Col>

            <Col md={6}>
              <Form.Label style={{ color: "#fff" }}>
                Price After Discount
              </Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                name="price_after_discount"
                value={formData.price_after_discount}
                onChange={handleChange}
                required
              />
            </Col>

            <Col md={6}>
              <Form.Label style={{ color: "#fff" }}>Status</Form.Label>
              <Form.Select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value={1}>Active</option>
                <option value={0}>Inactive</option>
              </Form.Select>
            </Col>
          </Row>

          <div style={{ display: "flex", gap: "10px", marginTop: "24px" }}>
            <Button type="submit" disabled={updateLoading}>
              {updateLoading ? "Updating..." : "Update"}
            </Button>

            <Button
              type="button"
              variant="secondary"
              onClick={handleClose}
              disabled={updateLoading}
            >
              Cancel
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
};

export default CoinsEditForm