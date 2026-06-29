import React from "react";

import CoinBannerPreview from "./CoinBannerPreview";
import PrivacyBannerPreview from "./PrivacyPreview";
import RjBannerPreview from "./RjBannerPreview";
import TrialBannerPreview from "./TrialPreview";
import RewardBannerPreview from "./RewardPreview";

const LivePreview = ({ offer }) => {
  switch (offer.banner_type) {
    case "COIN":
      return <CoinBannerPreview offer={offer} />;

    case "PRIVACY":
      return <PrivacyBannerPreview offer={offer} />;

    case "RJ":
      return <RjBannerPreview offer={offer} />;

    case "TRIAL":
      return <TrialBannerPreview offer={offer} />;

    case "REWARD":
      return <RewardBannerPreview offer={offer} />;

    default:
      return <CoinBannerPreview offer={offer} />;
  }
};

export default LivePreview;