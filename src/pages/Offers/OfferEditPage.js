import React, { useEffect } from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import BasicDetails from "../../components/Offers/BasicDetails";
import BannerImages from "../../components/Offers/BannerImages";
import BannerContents from "../../components/Offers/BannerContents";
import FeatureSection from "../../components/Offers/FeatureSection";
import ButtonSection from "../../components/Offers/ButtonSection";
import LivePreview from "../../components/Offers/LivePreview";

import useOfferBuilder from "../../hooks/UserOfferBulider";

import {
  fetchOfferRequest,
  updateOfferRequest,
} from "../../features/Offers/OffersActions";

import { OFFER_TEMPLATES } from "../../utils/OfferTemplates";

const OfferEditPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  const { offer, setOffer } = useOfferBuilder();

  const {
    selectedOffer,
    saving,
    success,
  } = useSelector((state) => state.offers);

  /////////////////////////////////////////////

  useEffect(() => {
    dispatch(fetchOfferRequest(id));
  }, [dispatch, id]);

  /////////////////////////////////////////////

  useEffect(() => {
    if (selectedOffer) {
      setOffer(selectedOffer);
    }
  }, [selectedOffer, setOffer]);

  /////////////////////////////////////////////

  useEffect(() => {
    if (success) {
      navigate("/dashboard/offerspage");
    }
  }, [success, navigate]);

  /////////////////////////////////////////////

  const template =
    OFFER_TEMPLATES[offer.banner_type] ||
    OFFER_TEMPLATES.COIN;

  /////////////////////////////////////////////

  const handleSubmit = () => {
    const formData = new FormData();

    formData.append(
      "banner_type",
      offer.banner_type
    );

    formData.append(
      "priority",
      offer.priority
    );

    formData.append(
      "target_audience",
      offer.target_audience
    );

    formData.append(
      "redirect_url",
      offer.redirect_url
    );

    formData.append(
      "status",
      offer.status
    );

    formData.append(
      "start_date",
      offer.start_date
    );

    formData.append(
      "end_date",
      offer.end_date
    );

    if (offer.background_image instanceof File) {
      formData.append(
        "background_image",
        offer.background_image
      );
    }

    if (offer.right_image instanceof File) {
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

    dispatch(
      updateOfferRequest({
        id,
        formData,
      })
    );
  };

  /////////////////////////////////////////////

  return (
    <Container fluid className="py-4">

      <Row>

        <Col lg={7}>

          <Card className="mb-3">
            <Card.Header>
              <h4>Edit Offer</h4>
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

              Banner Images

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

              Banner Contents

            </Card.Header>

            <Card.Body>

              <BannerContents
                offer={offer}
                setOffer={setOffer}
              />

            </Card.Body>

          </Card>

          {template.features && (

            <Card className="mb-3">

              <Card.Header>

                Features

              </Card.Header>

              <Card.Body>

                <FeatureSection
                  offer={offer}
                  setOffer={setOffer}
                />

              </Card.Body>

            </Card>

          )}

          {template.button && (

            <Card className="mb-3">

              <Card.Header>

                Button

              </Card.Header>

              <Card.Body>

                <ButtonSection
                  offer={offer}
                  setOffer={setOffer}
                />

              </Card.Body>

            </Card>

          )}

          <Button
            size="lg"
            onClick={handleSubmit}
            disabled={saving}
          >
            {saving
              ? "Updating..."
              : "Update Offer"}
          </Button>

        </Col>

        <Col lg={5}>

          <Card>

            <Card.Header>

              Live Preview

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

export default OfferEditPage;