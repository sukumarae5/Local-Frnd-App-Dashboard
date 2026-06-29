import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button, Card } from "react-bootstrap";

const BannerImages = ({ offer, setOffer }) => {

  const [backgroundPreview, setBackgroundPreview] = useState("");
  const [rightPreview, setRightPreview] = useState("");

  ///////////////////////////////////////////////////////

  useEffect(() => {

    if (offer.background_image instanceof File) {

      const url = URL.createObjectURL(offer.background_image);

      setBackgroundPreview(url);

      return () => URL.revokeObjectURL(url);

    } else {

      setBackgroundPreview(offer.background_image || "");

    }

  }, [offer.background_image]);

  ///////////////////////////////////////////////////////

  useEffect(() => {

    if (offer.right_image instanceof File) {

      const url = URL.createObjectURL(offer.right_image);

      setRightPreview(url);

      return () => URL.revokeObjectURL(url);

    } else {

      setRightPreview(offer.right_image || "");

    }

  }, [offer.right_image]);

  ///////////////////////////////////////////////////////

  const handleBackground = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    setOffer((prev) => ({

      ...prev,

      background_image: file,

    }));

  };

  ///////////////////////////////////////////////////////

  const handleRight = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    setOffer((prev) => ({

      ...prev,

      right_image: file,

    }));

  };

  ///////////////////////////////////////////////////////

  const removeBackground = () => {

    setOffer((prev) => ({

      ...prev,

      background_image: null,

    }));

  };

  ///////////////////////////////////////////////////////

  const removeRight = () => {

    setOffer((prev) => ({

      ...prev,

      right_image: null,

    }));

  };

  ///////////////////////////////////////////////////////

  return (

    <Row className="g-4">

      {/* Background */}

      <Col md={6}>

        <Card>

          <Card.Header>

            Background Image

          </Card.Header>

          <Card.Body>

            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleBackground}
            />

            {

              backgroundPreview &&

              <div className="mt-3">

                <img
                  src={backgroundPreview}
                  alt=""
                  style={{
                    width: "100%",
                    height: 180,
                    objectFit: "cover",
                    borderRadius: 10
                  }}
                />

                <Button
                  className="mt-2"
                  variant="danger"
                  size="sm"
                  onClick={removeBackground}
                >

                  Remove

                </Button>

              </div>

            }

          </Card.Body>

        </Card>

      </Col>

      {/* Right Image */}

      <Col md={6}>

        <Card>

          <Card.Header>

            Right Side Image

          </Card.Header>

          <Card.Body>

            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleRight}
            />

            {

              rightPreview &&

              <div className="mt-3">

                <img
                  src={rightPreview}
                  alt=""
                  style={{
                    width: "100%",
                    height: 180,
                    objectFit: "contain",
                    borderRadius: 10
                  }}
                />

                <Button
                  className="mt-2"
                  variant="danger"
                  size="sm"
                  onClick={removeRight}
                >

                  Remove

                </Button>

              </div>

            }

          </Card.Body>

        </Card>

      </Col>

    </Row>

  );

};

export default BannerImages;