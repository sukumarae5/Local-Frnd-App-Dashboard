import React from "react";
import getContentValue from "../../utils/getContentValue";

const CoinBannerPreview = ({ offer }) => {
  const brand = getContentValue(offer.contents, "brand");
  const title1 = getContentValue(offer.contents, "title1");
  const title2 = getContentValue(offer.contents, "title2");
  const subtitle = getContentValue(offer.contents, "subtitle");
  const price = getContentValue(offer.contents, "price");
  const coins = getContentValue(offer.contents, "coins");
  const badge = getContentValue(offer.contents, "badge");

  return (
    <div
      style={{
        width: "100%",
        minHeight: 280,
        borderRadius: 24,
        overflow: "hidden",
        position: "relative",
        color: "#fff",
        backgroundImage: offer.background_image
          ? `url(${typeof offer.background_image === "string"
              ? offer.background_image
              : URL.createObjectURL(offer.background_image)})`
          : "linear-gradient(135deg,#5D32D5,#A84EF5)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: 24,
      }}
    >
      {/* Dark Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,.15)",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        {/* Left Side */}
        <div
          style={{
            width: "58%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <small
            style={{
              opacity: .9,
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            {brand || "LokalFrnd"}
          </small>

          <h2
            style={{
              marginTop: 15,
              marginBottom: 0,
              fontWeight: 800,
              lineHeight: 1.1,
            }}
          >
            {title1 || "Buy Coins,"}
          </h2>

          <h2
            style={{
              marginTop: 5,
              marginBottom: 15,
              fontWeight: 800,
              lineHeight: 1.1,
            }}
          >
            {title2 || "Unlock Connections"}
          </h2>

          <p
            style={{
              fontSize: 14,
              opacity: .95,
              marginBottom: 20,
            }}
          >
            {subtitle || "More Coins, More Conversations"}
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 15,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 700,
                }}
              >
                ₹{price || "199"}
              </div>

              <small>{coins || "300 Coins"}</small>
            </div>

            {badge && (
              <div
                style={{
                  background: "#FFD500",
                  color: "#111",
                  padding: "6px 12px",
                  borderRadius: 20,
                  fontWeight: 700,
                  fontSize: 12,
                }}
              >
                {badge}
              </div>
            )}
          </div>

          <button
            style={{
              marginTop: 20,
              width: 150,
              border: "none",
              borderRadius: 30,
              padding: "12px",
              fontWeight: 700,
              background:
                offer.button?.button_color || "#fff",
              color:
                offer.button?.text_color || "#6D28D9",
            }}
          >
            {offer.button?.button_text || "Buy Now"}
          </button>
        </div>

        {/* Right Side */}
        <div
          style={{
            width: "40%",
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
                maxWidth: "100%",
                maxHeight: 220,
                objectFit: "contain",
              }}
            />
          ) : (
            <div
              style={{
                width: 180,
                height: 180,
                border: "2px dashed rgba(255,255,255,.4)",
                borderRadius: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 13,
                color: "#fff",
              }}
            >
              Right Image
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoinBannerPreview;