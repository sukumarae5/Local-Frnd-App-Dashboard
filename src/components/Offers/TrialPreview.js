import React from "react";
import getContentValue from "../../utils/getContentValue";

const TrialPreview = ({ offer }) => {
  const brand = getContentValue(offer.contents, "brand");
  const title1 = getContentValue(offer.contents, "title1");
  const title2 = getContentValue(offer.contents, "title2");
  const subtitle = getContentValue(offer.contents, "subtitle");

  return (
    <div
      style={{
        width: "100%",
        minHeight: 300,
        borderRadius: 24,
        overflow: "hidden",
        position: "relative",
        backgroundImage: offer.background_image
          ? `url(${
              typeof offer.background_image === "string"
                ? offer.background_image
                : URL.createObjectURL(offer.background_image)
            })`
          : "linear-gradient(135deg,#00C9A7,#845EC2)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#fff",
        padding: 24,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,.18)",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Left */}
        <div style={{ width: "58%" }}>
          <small
            style={{
              fontWeight: 700,
              letterSpacing: 1,
            }}
          >
            {brand || "LokalFrnd"}
          </small>

          <h2
            style={{
              marginTop: 20,
              marginBottom: 5,
              fontWeight: 800,
            }}
          >
            {title1 || "Start Your"}
          </h2>

          <h2
            style={{
              marginBottom: 20,
              fontWeight: 800,
            }}
          >
            {title2 || "Free Trial"}
          </h2>

          <p
            style={{
              fontSize: 15,
              opacity: .95,
            }}
          >
            {subtitle ||
              "Enjoy premium features with no commitment."}
          </p>

          {offer.button?.button_text && (
            <button
              style={{
                marginTop: 25,
                padding: "12px 30px",
                border: "none",
                borderRadius: 30,
                background:
                  offer.button.button_color || "#fff",
                color:
                  offer.button.text_color || "#00C9A7",
                fontWeight: 700,
              }}
            >
              {offer.button.button_text}
            </button>
          )}
        </div>

        {/* Right */}
        <div
          style={{
            width: "38%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {offer.right_image ? (
            <img
              src={
                typeof offer.right_image === "string"
                  ? offer.right_image
                  : URL.createObjectURL(offer.right_image)
              }
              alt=""
              style={{
                maxWidth: "100%",
                maxHeight: 220,
                objectFit: "contain",
              }}
            />
          ) : (
            <div
              style={{
                width: 170,
                height: 200,
                border: "2px dashed rgba(255,255,255,.4)",
                borderRadius: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Trial Image
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrialPreview;