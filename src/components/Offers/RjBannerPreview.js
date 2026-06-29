import React from "react";
import getContentValue from "../../utils/getContentValue";

const RjBannerPreview = ({ offer }) => {
  const brand = getContentValue(offer.contents, "brand");
  const title1 = getContentValue(offer.contents, "title1");
  const title2 = getContentValue(offer.contents, "title2");
  const subtitle = getContentValue(offer.contents, "subtitle");

  return (
    <div
      style={{
        width: "100%",
        minHeight: 320,
        borderRadius: 24,
        overflow: "hidden",
        position: "relative",
        backgroundImage: offer.background_image
          ? `url(${
              typeof offer.background_image === "string"
                ? offer.background_image
                : URL.createObjectURL(offer.background_image)
            })`
          : "linear-gradient(135deg,#8A2387,#E94057,#F27121)",
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
          background: "rgba(0,0,0,.25)",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "100%",
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
              marginBottom: 0,
              fontWeight: 800,
            }}
          >
            {title1 || "Become an RJ"}
          </h2>

          <h2
            style={{
              marginTop: 5,
              fontWeight: 800,
            }}
          >
            {title2 || "Earn Money"}
          </h2>

          <p
            style={{
              marginTop: 15,
              opacity: .95,
            }}
          >
            {subtitle ||
              "Turn your voice into income with LokalFrnd."}
          </p>

          <div style={{ marginTop: 25 }}>
            {offer.features.map((feature, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 12,
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 18,
                    background: "rgba(255,255,255,.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 12,
                    fontWeight: 700,
                  }}
                >
                  {feature.icon.substring(0, 1).toUpperCase()}
                </div>

                <div>
                  <div
                    style={{
                      fontWeight: 700,
                    }}
                  >
                    {feature.title}
                  </div>

                  <small
                    style={{
                      opacity: .9,
                    }}
                  >
                    {feature.description}
                  </small>
                </div>
              </div>
            ))}
          </div>

          {offer.button?.button_text && (
            <button
              style={{
                marginTop: 20,
                border: "none",
                borderRadius: 30,
                padding: "12px 28px",
                fontWeight: 700,
                background:
                  offer.button.button_color || "#fff",
                color:
                  offer.button.text_color || "#8A2387",
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
                maxHeight: 250,
                objectFit: "contain",
              }}
            />
          ) : (
            <div
              style={{
                width: 180,
                height: 220,
                border: "2px dashed rgba(255,255,255,.4)",
                borderRadius: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              RJ Image
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RjBannerPreview;