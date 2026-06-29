import React from "react";
import getContentValue from "../../utils/getContentValue";

const RewardPreview = ({ offer }) => {
  const brand = getContentValue(offer.contents, "brand");
  const title1 = getContentValue(offer.contents, "title1");
  const title2 = getContentValue(offer.contents, "title2");
  const subtitle = getContentValue(offer.contents, "subtitle");
  const reward = getContentValue(offer.contents, "reward");

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
          : "linear-gradient(135deg,#FF9800,#FF5722)",
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
              marginBottom: 0,
              fontWeight: 800,
            }}
          >
            {title1 || "Invite Friends"}
          </h2>

          <h2
            style={{
              marginTop: 5,
              fontWeight: 800,
            }}
          >
            {title2 || "Earn Rewards"}
          </h2>

          <p
            style={{
              marginTop: 15,
              opacity: .95,
            }}
          >
            {subtitle ||
              "Invite your friends and receive exciting rewards."}
          </p>

          <div
            style={{
              marginTop: 20,
              padding: "12px 20px",
              borderRadius: 30,
              display: "inline-block",
              background: "#FFD700",
              color: "#222",
              fontWeight: 700,
              fontSize: 18,
            }}
          >
            🎁 {reward || "Get 100 Coins"}
          </div>

          {/* Features */}

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
                    width: 34,
                    height: 34,
                    borderRadius: 17,
                    background: "rgba(255,255,255,.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 10,
                    fontWeight: 700,
                  }}
                >
                  {feature.icon.charAt(0).toUpperCase()}
                </div>

                <div>

                  <div
                    style={{
                      fontWeight: 700,
                    }}
                  >
                    {feature.title}
                  </div>

                  <small>

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
                padding: "12px 30px",
                background:
                  offer.button.button_color || "#fff",
                color:
                  offer.button.text_color || "#FF5722",
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
                width: 180,
                height: 220,
                border: "2px dashed rgba(255,255,255,.4)",
                borderRadius: 20,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Reward Image
            </div>

          )}
        </div>

      </div>

    </div>
  );
};

export default RewardPreview;