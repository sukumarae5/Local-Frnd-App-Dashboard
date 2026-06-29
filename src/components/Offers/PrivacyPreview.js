import React from "react";
import getContentValue from "../../utils/getContentValue";

const PrivacyPreview = ({ offer }) => {
  const brand = getContentValue(offer.contents, "brand");
  const title1 = getContentValue(offer.contents, "title1");
  const title2 = getContentValue(offer.contents, "title2");
  const subtitle = getContentValue(offer.contents, "subtitle");

  return (
    <div
      style={{
        width: "100%",
        minHeight: 300,
        borderRadius: 25,
        overflow: "hidden",
        position: "relative",
        backgroundImage: offer.background_image
          ? `url(${
              typeof offer.background_image === "string"
                ? offer.background_image
                : URL.createObjectURL(offer.background_image)
            })`
          : "linear-gradient(135deg,#5C32D4,#B44EFF)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#fff",
        padding: 25,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,.20)",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          justifyContent: "space-between",
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
            {title1 || "Your Privacy"}
          </h2>

          <h2
            style={{
              marginTop: 5,
              fontWeight: 800,
            }}
          >
            {title2 || "Our Priority"}
          </h2>

          <p
            style={{
              marginTop: 15,
              opacity: .95,
            }}
          >
            {subtitle ||
              "Your information stays safe and secure."}
          </p>

          {/* Features */}

          <div style={{ marginTop: 30 }}>

            {offer.features.map((feature, index) => (

              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 15,
                }}
              >
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 20,
                    background: "rgba(255,255,255,.20)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
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

        </div>

        {/* Right */}

        <div
          style={{
            width: "38%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {offer.right_image ? (

            <img
              src={
                typeof offer.right_image === "string"
                  ? offer.right_image
                  : URL.createObjectURL(
                      offer.right_image
                    )
              }
              alt=""
              style={{
                width: "100%",
                maxHeight: 240,
                objectFit: "contain",
              }}
            />

          ) : (

            <div
              style={{
                width: 170,
                height: 170,
                border: "2px dashed rgba(255,255,255,.4)",
                borderRadius: 20,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Right Image
            </div>

          )}
        </div>

      </div>

      {offer.button?.button_text && (

        <button
          style={{
            position: "absolute",
            bottom: 25,
            left: 25,
            border: "none",
            borderRadius: 25,
            padding: "12px 30px",
            background:
              offer.button.button_color,
            color:
              offer.button.text_color,
            fontWeight: 700,
          }}
        >
          {offer.button.button_text}
        </button>

      )}

    </div>
  );
};

export default PrivacyPreview;