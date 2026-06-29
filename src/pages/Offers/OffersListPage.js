import React, { useEffect, useMemo, useState } from "react";
import {
  Table,
  Card,
  Row,
  Col,
  Form,
  Button,
  Badge,
  Spinner,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  fetchOffersRequest,
  deleteOfferRequest,
} from "../../features/Offers/OffersActions";

const OfferListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    offers = [],
    loading = false,
    deleting = false,
    deleteSuccess = false,
  } = useSelector((state) => state.offers);

  const [search, setSearch] = useState("");
  const [bannerType, setBannerType] = useState("ALL");
  const [audience, setAudience] = useState("ALL");

  useEffect(() => {
    dispatch(fetchOffersRequest());
  }, [dispatch]);

  /*
   * Refresh the offers list after deleting an offer.
   */
  useEffect(() => {
    if (deleteSuccess) {
      dispatch(fetchOffersRequest());
    }
  }, [deleteSuccess, dispatch]);

  const filteredOffers = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return offers.filter((offer) => {
      const currentBannerType = String(
        offer?.banner_type || ""
      ).toUpperCase();

      const currentAudience = String(
        offer?.target_audience || ""
      ).toUpperCase();

      const matchesSearch =
        currentBannerType.toLowerCase().includes(searchValue) ||
        String(offer?.title || "")
          .toLowerCase()
          .includes(searchValue) ||
        String(offer?.id || "").includes(searchValue);

      const matchesType =
        bannerType === "ALL" ||
        currentBannerType === bannerType;

      const matchesAudience =
        audience === "ALL" ||
        currentAudience === audience;

      return matchesSearch && matchesType && matchesAudience;
    });
  }, [offers, search, bannerType, audience]);

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this offer?"
    );

    if (!confirmed) {
      return;
    }

    dispatch(deleteOfferRequest(id));
  };

  const getStatusBadge = (status) => {
    return Number(status) === 1 ? (
      <Badge bg="success">Active</Badge>
    ) : (
      <Badge bg="danger">Inactive</Badge>
    );
  };

  /*
   * The backend may return image_url or background_image.
   * This helper supports both.
   */
  const getOfferImage = (offer) => {
    const imagePath =
      offer?.image_url ||
      offer?.background_image ||
      offer?.image ||
      "";

    if (!imagePath) {
      return "";
    }

    /*
     * Cloudinary, S3, or any full URL.
     */
    if (
      imagePath.startsWith("http://") ||
      imagePath.startsWith("https://") ||
      imagePath.startsWith("data:image")
    ) {
      return imagePath;
    }

    /*
     * Use your API base URL when the backend returns a relative path.
     *
     * Example:
     * REACT_APP_API_IP=http://localhost:5000
     */
    const apiBaseUrl = (
      process.env.REACT_APP_API_IP || ""
    ).replace(/\/$/, "");

    const cleanImagePath = imagePath.replace(/^\//, "");

    return apiBaseUrl
      ? `${apiBaseUrl}/${cleanImagePath}`
      : `/${cleanImagePath}`;
  };

  return (
    <Card className="shadow">
      <Card.Header>
        <Row className="g-2 align-items-center">
          <Col md={3}>
            <h4 className="mb-0">Offers</h4>
          </Col>

          <Col md={3}>
            <Form.Control
              type="text"
              placeholder="Search by ID, title or banner..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />
          </Col>

          <Col md={2}>
            <Form.Select
              value={bannerType}
              onChange={(event) =>
                setBannerType(event.target.value)
              }
            >
              <option value="ALL">All Types</option>
              <option value="COIN">Coin</option>
              <option value="PRIVACY">Privacy</option>
              <option value="RJ">RJ</option>
              <option value="TRIAL">Trial</option>
              <option value="REWARD">Reward</option>
            </Form.Select>
          </Col>

          <Col md={2}>
            <Form.Select
              value={audience}
              onChange={(event) =>
                setAudience(event.target.value)
              }
            >
              <option value="ALL">All Audience</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </Form.Select>
          </Col>

          <Col md={2} className="text-end">
            <Button
              variant="primary"
              onClick={() =>
                navigate(
                  "/dashboard/offerspage/create"
                )
              }
            >
              + Add Offer
            </Button>
          </Col>
        </Row>
      </Card.Header>

      <Card.Body>
        {loading ? (
          <div className="text-center p-5">
            <Spinner animation="border" />
          </div>
        ) : (
          <Table hover responsive bordered>
            <thead>
              <tr>
                <th>ID</th>
                <th>Preview</th>
                <th>Title</th>
                <th>Banner</th>
                <th>Audience</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Start</th>
                <th>End</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredOffers.length > 0 ? (
                filteredOffers.map((offer) => {
                  const imageUrl =
                    getOfferImage(offer);

                  return (
                    <tr key={offer.id}>
                      <td>{offer.id}</td>

                      <td>
                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt={
                              offer.title ||
                              "Offer preview"
                            }
                            style={{
                              width: "120px",
                              height: "60px",
                              objectFit: "cover",
                              borderRadius: "8px",
                              border:
                                "1px solid #dee2e6",
                            }}
                            onError={(event) => {
                              console.error(
                                "Image failed to load:",
                                imageUrl
                              );

                              event.currentTarget.style.display =
                                "none";

                              const fallback =
                                event.currentTarget
                                  .nextElementSibling;

                              if (fallback) {
                                fallback.style.display =
                                  "inline";
                              }
                            }}
                          />
                        ) : null}

                        <span
                          style={{
                            display: imageUrl
                              ? "none"
                              : "inline",
                          }}
                        >
                          No image
                        </span>
                      </td>

                      <td>{offer.title || "-"}</td>

                      <td>
                        <Badge bg="primary">
                          {offer.banner_type || "-"}
                        </Badge>
                      </td>

                      <td>
                        {offer.target_audience || "-"}
                      </td>

                      <td>{offer.priority ?? "-"}</td>

                      <td>
                        {getStatusBadge(offer.status)}
                      </td>

                      <td>
                        {offer.start_date
                          ? offer.start_date.substring(
                              0,
                              10
                            )
                          : "-"}
                      </td>

                      <td>
                        {offer.end_date
                          ? offer.end_date.substring(
                              0,
                              10
                            )
                          : "-"}
                      </td>

                      <td>
                        <div
                          style={{
                            display: "flex",
                            gap: "8px",
                          }}
                        >
                          <Button
                            size="sm"
                            variant="warning"
                            onClick={() =>
                              navigate(
                                `/dashboard/offerspage/edit/${offer.id}`
                              )
                            }
                          >
                            Edit
                          </Button>

                          <Button
                            size="sm"
                            variant="danger"
                            disabled={deleting}
                            onClick={() =>
                              handleDelete(offer.id)
                            }
                          >
                            {deleting
                              ? "Deleting..."
                              : "Delete"}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={10}
                    className="text-center py-4"
                  >
                    No offers found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        )}
      </Card.Body>
    </Card>
  );
};

export default OfferListPage;