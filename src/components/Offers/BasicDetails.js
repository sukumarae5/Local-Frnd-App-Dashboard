import React from "react";
import { Row, Col, Form } from "react-bootstrap";

const BasicDetails = ({ offer, setOffer }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;

    setOffer((prev) => ({
      ...prev,
      [name]:
        name === "priority" || name === "status"
          ? Number(value)
          : value,
    }));
  };

  return (
    <Row className="g-3">
      {/* Banner Type */}
      <Col md={6}>
        <Form.Group>
          <Form.Label>Banner Type</Form.Label>

          <Form.Select
            name="banner_type"
            value={offer.banner_type}
            onChange={handleChange}
          >
            <option value="COIN">Coin Banner</option>

            <option value="PRIVACY">
              Privacy Banner
            </option>

            <option value="RJ">
              RJ Banner
            </option>

            <option value="TRIAL">
              Trial Banner
            </option>

            <option value="REWARD">
              Reward Banner
            </option>
          </Form.Select>
        </Form.Group>
      </Col>

      {/* Audience */}

      <Col md={6}>
        <Form.Group>

          <Form.Label>

            Target Audience

          </Form.Label>

          <Form.Select
            name="target_audience"
            value={offer.target_audience}
            onChange={handleChange}
          >
            <option value="ALL">All</option>

            <option value="MALE">Male</option>

            <option value="FEMALE">Female</option>
          </Form.Select>

        </Form.Group>
      </Col>

      {/* Priority */}

      <Col md={6}>
        <Form.Group>

          <Form.Label>

            Priority

          </Form.Label>

          <Form.Control
            type="number"
            name="priority"
            value={offer.priority}
            onChange={handleChange}
          />

        </Form.Group>
      </Col>

      {/* Status */}

      <Col md={6}>
        <Form.Group>

          <Form.Label>

            Status

          </Form.Label>

          <Form.Select
            name="status"
            value={offer.status}
            onChange={handleChange}
          >
            <option value={1}>
              Active
            </option>

            <option value={0}>
              Inactive
            </option>

          </Form.Select>

        </Form.Group>
      </Col>

      {/* Redirect */}

      <Col md={12}>
        <Form.Group>

          <Form.Label>

            Redirect URL

          </Form.Label>

          <Form.Control
            type="text"
            name="redirect_url"
            value={offer.redirect_url}
            onChange={handleChange}
            placeholder="/coins"
          />

        </Form.Group>
      </Col>

      {/* Start Date */}

      <Col md={6}>
        <Form.Group>

          <Form.Label>

            Start Date

          </Form.Label>

          <Form.Control
            type="datetime-local"
            name="start_date"
            value={offer.start_date}
            onChange={handleChange}
          />

        </Form.Group>
      </Col>

      {/* End Date */}

      <Col md={6}>
        <Form.Group>

          <Form.Label>

            End Date

          </Form.Label>

          <Form.Control
            type="datetime-local"
            name="end_date"
            value={offer.end_date}
            onChange={handleChange}
          />

        </Form.Group>
      </Col>
    </Row>
  );
};

export default BasicDetails;