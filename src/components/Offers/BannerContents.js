import React from "react";
import { Row, Col, Form } from "react-bootstrap";
import { OFFER_TEMPLATES } from "../../utils/OfferTemplates";

const BannerContents = ({ offer, setOffer }) => {
  const template =
    OFFER_TEMPLATES[offer.banner_type] ||
    OFFER_TEMPLATES.COIN;

  ////////////////////////////////////////////

  const getValue = (key) => {
    const item = offer.contents.find(
      (x) => x.content_key === key
    );

    return item ? item.content_value : "";
  };

  ////////////////////////////////////////////

  const updateValue = (key, value) => {
    const contents = [...offer.contents];

    const index = contents.findIndex(
      (x) => x.content_key === key
    );

    if (index > -1) {
      contents[index].content_value = value;
    } else {
      contents.push({
        content_key: key,
        content_value: value,
        sort_order: contents.length + 1,
      });
    }

    setOffer((prev) => ({
      ...prev,
      contents,
    }));
  };

  ////////////////////////////////////////////

  const getLabel = (key) => {
    switch (key) {
      case "brand":
        return "Brand";

      case "title1":
        return "Title Line 1";

      case "title2":
        return "Title Line 2";

      case "subtitle":
        return "Subtitle";

      case "price":
        return "Price";

      case "coins":
        return "Coins";

      case "badge":
        return "Badge";

      case "reward":
        return "Reward Text";

      default:
        return key;
    }
  };

  ////////////////////////////////////////////

  return (
    <Row className="g-3">

      {template.contents.map((field) => (

        <Col md={6} key={field}>

          <Form.Group>

            <Form.Label>

              {getLabel(field)}

            </Form.Label>

            <Form.Control
              value={getValue(field)}
              onChange={(e) =>
                updateValue(field, e.target.value)
              }
              placeholder={getLabel(field)}
            />

          </Form.Group>

        </Col>

      ))}

    </Row>
  );
};

export default BannerContents;