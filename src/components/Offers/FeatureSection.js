import React from "react";
import { Row, Col, Form, Button, Card } from "react-bootstrap";

const ICONS = [
  "shield",
  "lock",
  "wallet",
  "gift",
  "star",
  "microphone",
  "phone",
  "privacy",
  "security",
  "verified",
];

const FeatureSection = ({ offer, setOffer }) => {
  /////////////////////////////////////////////////////

  const addFeature = () => {
    setOffer((prev) => ({
      ...prev,
      features: [
        ...prev.features,
        {
          icon: "shield",
          title: "",
          description: "",
          sort_order: prev.features.length + 1,
        },
      ],
    }));
  };

  /////////////////////////////////////////////////////

  const removeFeature = (index) => {
    const features = [...offer.features];

    features.splice(index, 1);

    setOffer((prev) => ({
      ...prev,
      features,
    }));
  };

  /////////////////////////////////////////////////////

  const updateFeature = (index, field, value) => {
    const features = [...offer.features];

    features[index][field] = value;

    setOffer((prev) => ({
      ...prev,
      features,
    }));
  };

  /////////////////////////////////////////////////////

  return (
    <>

      {offer.features.map((feature, index) => (

        <Card
          className="mb-3"
          key={index}
        >

          <Card.Body>

            <Row className="g-3">

              <Col md={3}>

                <Form.Group>

                  <Form.Label>

                    Icon

                  </Form.Label>

                  <Form.Select
                    value={feature.icon}
                    onChange={(e) =>
                      updateFeature(
                        index,
                        "icon",
                        e.target.value
                      )
                    }
                  >

                    {ICONS.map((icon) => (

                      <option
                        key={icon}
                        value={icon}
                      >
                        {icon}
                      </option>

                    ))}

                  </Form.Select>

                </Form.Group>

              </Col>

              <Col md={4}>

                <Form.Group>

                  <Form.Label>

                    Title

                  </Form.Label>

                  <Form.Control
                    value={feature.title}
                    onChange={(e) =>
                      updateFeature(
                        index,
                        "title",
                        e.target.value
                      )
                    }
                  />

                </Form.Group>

              </Col>

              <Col md={4}>

                <Form.Group>

                  <Form.Label>

                    Description

                  </Form.Label>

                  <Form.Control
                    value={feature.description}
                    onChange={(e) =>
                      updateFeature(
                        index,
                        "description",
                        e.target.value
                      )
                    }
                  />

                </Form.Group>

              </Col>

              <Col
                md={1}
                className="d-flex align-items-end"
              >

                <Button
                  variant="danger"
                  onClick={() =>
                    removeFeature(index)
                  }
                >
                  ✕

                </Button>

              </Col>

            </Row>

          </Card.Body>

        </Card>

      ))}

      <Button
        variant="success"
        onClick={addFeature}
      >
        + Add Feature
      </Button>

    </>
  );
};

export default FeatureSection;