// src/pages/Languages/LanguageEditForm.js

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import LanguagesForms from "../../components/forms/LanguagesForms";
import {
  editLanguageRequest,
  fetchLanguagesRequest,
} from "../../features/Languages/LanguagesAction";

const LanguageEditForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  const { loading, data } = useSelector((state) => state.language);

  // ✅ Try to get row from navigation state (fast)
  const stateRow = location?.state?.row || null;

  const [formData, setFormData] = useState({
    id: "",
    code: "",
    name_en: "",
    native_name: "",
    direction: "ltr",
    status: true,
  });

  // ✅ On load: if list is empty, fetch it (needed when user refreshes edit page)
  useEffect(() => {
    if (!data || data.length === 0) {
      dispatch(fetchLanguagesRequest());
    }
  }, [dispatch, data]);

  // ✅ Prefill form: prefer stateRow, else find from redux by id param
  useEffect(() => {
    const editId = stateRow?.id || params?.id;

    if (!editId) return;

    const found = stateRow || data?.find((r) => String(r.id) === String(editId));

    if (found) {
      setFormData({
        id: found.id,
        code: found.code || "",
        name_en: found.name_en || "",
        native_name: found.native_name || "",
        direction: found.direction || "ltr",
        status: !!found.status,
      });
    }
  }, [stateRow, params?.id, data]);

  // ✅ Handle input change (supports checkbox too)
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ✅ Submit edit
  const handleSubmit = (e) => {
    e.preventDefault();

    // must include id for edit saga
    dispatch(editLanguageRequest(formData));

    // ✅ after save navigate back
    // (If you want to wait for success, we can do that too)
    navigate("/languagepage");
};

  // ✅ Cancel
const handleCancel = () => {
    navigate("/languagepage");
};

return (
    <div style={{backgroundColor:"#2F3545C9"}}>
   <div className="container py-4">
  <h3 className="text-center mb-4 text-white">
    Edit Language
  </h3>

  <LanguagesForms
    formData={formData}
    onChange={handleChange}
    onSubmit={handleSubmit}
    onCancel={handleCancel}
    loading={loading}
  />
</div>
</div>

);
};

export default LanguageEditForm;
