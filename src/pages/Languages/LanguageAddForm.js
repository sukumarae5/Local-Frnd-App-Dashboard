// ✅ src/pages/Languages/LanguageAddForm.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LanguagesForms from "../../components/forms/LanguagesForms";
import {
  addLanguageRequest,
  fetchLanguagesRequest,
} from "../../features/Languages/LanguagesAction";

const LanguageAddForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.language);

  const [showAddModal, setShowAddModal] = useState(false);

  const [formData, setFormData] = useState({
    code: "",
    name_en: "",
    native_name: "",
    direction: "ltr",
    status: true,
  });

  // ✅ auto open modal when page loads
  useEffect(() => {
    setShowAddModal(true);
  }, []);

  // ✅ Cancel / Close → back to LanguagePage (NO 404)
  const closeModal = () => {
    setShowAddModal(false);
    navigate("/languagepage"); // ✅ correct route based on your AppRouter
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      code: formData.code.trim(),
      name_en: formData.name_en.trim(),
      native_name: formData.native_name.trim(),
      direction: formData.direction,
      status: formData.status,
    };

    console.log("ADD Language payload:", payload);

    dispatch(addLanguageRequest(payload));

    // ✅ refresh list (only if your saga doesn't auto refresh)
    dispatch(fetchLanguagesRequest());

    closeModal();
  };

  return (
    <div
      className="p-3"
      style={{ backgroundColor: "#2F3545C9", minHeight: "100vh" }}
    >
      {showAddModal && (
        <>
          <div
            className="modal fade show d-block"
            tabIndex="-1"
            role="dialog"
            aria-modal="true"
          >
            <div
              className="modal-dialog modal-dialog-centered"
              role="document"
              style={{
                maxWidth: "650px",   // ✅ width decreased (was modal-lg)
                width: "90%",
              }}
            >
              <div
                className="modal-content"
                style={{
                  backgroundColor: "#2F3545",
                  minHeight: "70vh", // ✅ height increased
                }}
              >
                <div className="modal-header">
                  <h5 className="modal-title text-white">Add Language</h5>
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    onClick={closeModal}
                  />
                </div>

                <div
                  className="modal-body"
                  style={{
                    maxHeight: "60vh",     // ✅ ensures body grows but doesn't overflow screen
                    overflowY: "auto",     // ✅ scroll inside if needed
                  }}
                >
                  {error && <div className="alert alert-danger">{error}</div>}

                  <LanguagesForms
                    formData={formData}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    onCancel={closeModal} // ✅ important
                    loading={loading}
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            className="modal-backdrop fade show"
            onClick={closeModal}
          ></div>
        </>
      )}
    </div>
  );
};

export default LanguageAddForm;
