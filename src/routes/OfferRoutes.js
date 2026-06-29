import { Routes, Route } from "react-router-dom";

import OfferListPage from "../pages/Offers/OfferListPage";
import OfferCreatePage from "../pages/Offers/OfferCreatePage";
import OfferEditPage from "../pages/Offers/OfferEditPage";

const OfferRoutes = () => {
  return (
    <Routes>

      <Route
        path="/offers"
        element={<OfferListPage />}
      />

      <Route
        path="/offers/create"
        element={<OfferCreatePage />}
      />

      <Route
        path="/offers/edit/:id"
        element={<OfferEditPage />}
      />

    </Routes>
  );
};

export default OfferRoutes;