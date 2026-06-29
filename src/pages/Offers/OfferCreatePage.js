import React from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import BasicDetails from "../../components/Offers/BasicDetails";
import BannerImages from "../../components/Offers/BannerImages";
import BannerContents from "../../components/Offers/BannerContents";
import FeatureSection from "../../components/Offers/FeatureSection";
import ButtonSection from "../../components/Offers/ButtonSection";
import LivePreview from "../../components/Offers/LivePreview";
import { OFFER_TEMPLATES } from "../../utils/OfferTemplates";
import useOfferBuilder from "../../hooks/UserOfferBulider";

import { addOfferRequest } from "../../features/Offers/OffersActions";

const OfferCreatePage = () => {
  const dispatch = useDispatch();

  const { saving } = useSelector((state) => state.offers);

  const { offer, setOffer } = useOfferBuilder();

  const template =
  OFFER_TEMPLATES[offer.banner_type] ||
  OFFER_TEMPLATES.COIN;
  //////////////////////////////////////////////////////

  const handleSubmit = () => {
    const formData = new FormData();

    formData.append("banner_type", offer.banner_type);

    formData.append("priority", offer.priority);

    formData.append("target_audience", offer.target_audience);

    formData.append("redirect_url", offer.redirect_url);

    formData.append("status", offer.status);

    formData.append("start_date", offer.start_date);

    formData.append("end_date", offer.end_date);

    if (offer.background_image) {
      formData.append(
        "background_image",
        offer.background_image
      );
    }

    if (offer.right_image) {
      formData.append(
        "right_image",
        offer.right_image
      );
    }

    formData.append(
      "contents",
      JSON.stringify(offer.contents)
    );

    formData.append(
      "features",
      JSON.stringify(offer.features)
    );

    formData.append(
      "button",
      JSON.stringify(offer.button)
    );

    dispatch(addOfferRequest(formData));
  };

  //////////////////////////////////////////////////////

  return (
    <Container fluid className="py-4">

      <Row>

        {/* LEFT */}

        <Col lg={7}>

          <Card className="mb-3">

            <Card.Header>

              <h4>Basic Details</h4>

            </Card.Header>

            <Card.Body>

              <BasicDetails
                offer={offer}
                setOffer={setOffer}
              />

            </Card.Body>

          </Card>

          <Card className="mb-3">

            <Card.Header>

              <h4>Banner Images</h4>

            </Card.Header>

            <Card.Body>

              <BannerImages
                offer={offer}
                setOffer={setOffer}
              />

            </Card.Body>

          </Card>

          <Card className="mb-3">

            <Card.Header>

              <h4>Banner Contents</h4>

            </Card.Header>

            <Card.Body>

              <BannerContents
                offer={offer}
                setOffer={setOffer}
              />

            </Card.Body>

          </Card>

<Card className="mb-3">
  <Card.Header>
    <h4>Features Test</h4>
  </Card.Header>

  <Card.Body>
    <FeatureSection
      offer={offer}
      setOffer={setOffer}
    />
  </Card.Body>
</Card>

          <Card className="mb-3">

        {template.button && (
  <Card className="mb-3">

    <Card.Header>
      <h4>Button</h4>
    </Card.Header>

    <Card.Body>

      <ButtonSection
        offer={offer}
        setOffer={setOffer}
      />

    </Card.Body>

  </Card>
)}

            <Card.Body>

              <ButtonSection
                offer={offer}
                setOffer={setOffer}
              />

            </Card.Body>

          </Card>

          <Button
            variant="primary"
            size="lg"
            onClick={handleSubmit}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Offer"}
          </Button>

        </Col>

        {/* RIGHT */}

        <Col lg={5}>

          <Card>

            <Card.Header>

              <h4>Live Preview</h4>

            </Card.Header>

            <Card.Body>

              <LivePreview
                offer={offer}
              />

            </Card.Body>

          </Card>

        </Col>

      </Row>

    </Container>
  );
};

export default OfferCreatePage;