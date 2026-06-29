import React from "react";
import { Row, Col, Form } from "react-bootstrap";

const ButtonSection = ({ offer, setOffer }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;

    setOffer((prev) => ({
      ...prev,
      button: {
        ...prev.button,
        [name]: value,
      },
    }));
  };

  return (
    <Row className="g-3">

      {/* Button Text */}

      <Col md={6}>
        <Form.Group>
          <Form.Label>Button Text</Form.Label>

          <Form.Control
            type="text"
            name="button_text"
            placeholder="Buy Now"
            value={offer.button.button_text}
            onChange={handleChange}
          />
        </Form.Group>
      </Col>

      {/* Redirect */}

      <Col md={6}>
        <Form.Group>
          <Form.Label>Redirect URL</Form.Label>

          <Form.Control
            type="text"
            name="redirect_url"
            placeholder="/coins"
            value={offer.button.redirect_url}
            onChange={handleChange}
          />
        </Form.Group>
      </Col>

      {/* Button Color */}

      <Col md={6}>
        <Form.Group>
          <Form.Label>Button Background</Form.Label>

          <Form.Control
            type="color"
            name="button_color"
            value={offer.button.button_color}
            onChange={handleChange}
          />
        </Form.Group>
      </Col>

      {/* Text Color */}

      <Col md={6}>
        <Form.Group>
          <Form.Label>Text Color</Form.Label>

          <Form.Control
            type="color"
            name="text_color"
            value={offer.button.text_color}
            onChange={handleChange}
          />
        </Form.Group>
      </Col>

    </Row>
  );
};

export default ButtonSection;