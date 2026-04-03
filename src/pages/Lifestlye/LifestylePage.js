import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  lifestyleFetchRequest,
  lifestyleAddRequest,
  lifestyleAddReset,
  lifestyleUpdateRequest,
  lifestyleUpdateReset,
  lifestyleDeleteRequest,
  lifestyleDeleteReset,
} from "../../features/Lifestyle/LifestyleAction";
import { fetchLifestylecategoryRequest } from "../../features/Lifestylecategory/LifestylecategoryAction";
import { AppButtonRow } from "../../components/button/AppButton";

const LifestylePage = () => {
  const dispatch = useDispatch();

  const {
    loading,
    lifestyleData,
    error,
    addLoading,
    addSuccess,
    addError,
    updateLoading,
    updateSuccess,
    updateError,
    deleteLoading,
    deleteSuccess,
    deleteError,
  } = useSelector((state) => state.lifestyle);

  const {
    loading: categoryLoading,
    lifestylecategory,
    error: categoryError,
  } = useSelector((state) => state.lifestylecategory);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [selectedLifestyle, setSelectedLifestyle] = useState(null);

  const [formData, setFormData] = useState({
    category_id: "",
    lifestyle_name: "",
  });

  useEffect(() => {
    dispatch(lifestyleFetchRequest());
    dispatch(fetchLifestylecategoryRequest());
  }, [dispatch]);

  useEffect(() => {
    if (addSuccess) {
      alert("Lifestyle added successfully");
      handleResetModal();
      dispatch(lifestyleAddReset());
      dispatch(lifestyleFetchRequest());
    }
  }, [addSuccess, dispatch]);

  useEffect(() => {
    if (updateSuccess) {
      alert("Lifestyle updated successfully");
      handleResetModal();
      dispatch(lifestyleUpdateReset());
      dispatch(lifestyleFetchRequest());
    }
  }, [updateSuccess, dispatch]);

  useEffect(() => {
    if (deleteSuccess) {
      alert("Lifestyle deleted successfully");
      dispatch(lifestyleDeleteReset());
      dispatch(lifestyleFetchRequest());
    }
  }, [deleteSuccess, dispatch]);

  const handleResetModal = () => {
    setShowModal(false);
    setModalType("add");
    setSelectedLifestyle(null);
    setFormData({
      category_id: "",
      lifestyle_name: "",
    });
  };

  const handleOpenAddModal = () => {
    setModalType("add");
    setSelectedLifestyle(null);
    setFormData({
      category_id: "",
      lifestyle_name: "",
    });
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setModalType("edit");
    setSelectedLifestyle(item);
    setFormData({
      category_id: item?.category_id ? String(item.category_id) : "",
      lifestyle_name: item?.name || item?.lifestyle_name || "",
    });
    setShowModal(true);
  };

  const handleDelete = (item) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${item?.name || item?.lifestyle_name}"?`
    );

    if (confirmDelete) {
      dispatch(lifestyleDeleteRequest(item.lifestyle_id));
    }
  };

  const handleCloseModal = () => {
    handleResetModal();
    dispatch(lifestyleAddReset());
    dispatch(lifestyleUpdateReset());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (modalType === "add") {
      dispatch(
        lifestyleAddRequest({
          category_id: Number(formData.category_id),
          name: formData.lifestyle_name.trim(),
        })
      );
    } else {
      dispatch(
        lifestyleUpdateRequest({
          lifestyle_id: selectedLifestyle?.lifestyle_id,
          category_id: Number(formData.category_id),
          name: formData.lifestyle_name.trim(),
        })
      );
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "24px",
        background:
          "linear-gradient(180deg, #5B2D8B 0%, #7B3FE4 40%, #7527b0ff 70%, #6f15a4ff 100%)",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "24px",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <h2
            style={{
              fontWeight: "700",
              color: "#ffffff",
              margin: 0,
              fontSize: "28px",
            }}
          >
            Lifestyle Page
          </h2>

          <button
            onClick={handleOpenAddModal}
            style={{
              padding: "10px 18px",
              borderRadius: "10px",
              border: "none",
              background: "linear-gradient(135deg, #22c55e, #16a34a)",
              color: "#ffffff",
              fontWeight: "600",
              fontSize: "15px",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
            }}
          >
            + Add Lifestyle
          </button>
        </div>

        {loading && (
          <div
            style={{
              textAlign: "center",
              fontSize: "18px",
              fontWeight: "600",
              color: "#ffffff",
              marginTop: "40px",
            }}
          >
            Loading lifestyle data...
          </div>
        )}

        {error && (
          <div
            style={{
              textAlign: "center",
              color: "#ffb4b4",
              fontSize: "16px",
              fontWeight: "600",
              marginTop: "20px",
            }}
          >
            {error}
          </div>
        )}

        {deleteError && (
          <div
            style={{
              textAlign: "center",
              color: "#ffb4b4",
              fontSize: "16px",
              fontWeight: "600",
              marginBottom: "16px",
            }}
          >
            {deleteError}
          </div>
        )}

        {categoryError && (
          <div
            style={{
              textAlign: "center",
              color: "#ffb4b4",
              fontSize: "16px",
              fontWeight: "600",
              marginBottom: "16px",
            }}
          >
            {categoryError}
          </div>
        )}

        {!loading && !error && lifestyleData?.length === 0 && (
          <div
            style={{
              textAlign: "center",
              fontSize: "16px",
              fontWeight: "500",
              color: "#ffffff",
              marginTop: "30px",
            }}
          >
            No lifestyle data found
          </div>
        )}

        {!loading && !error && lifestyleData?.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "20px",
            }}
          >
            {lifestyleData.map((item, index) => (
              <div
                key={item.lifestyle_id || index}
                style={{
                  position: "relative",
                  background:
                    "linear-gradient(180deg, #5B2D8B 0%, #7B3FE4 40%, #7527b0ff 70%, #6f15a4ff 100%)",
                  borderRadius: "16px",
                  padding: "20px",
                  boxShadow: "0 6px 16px rgba(0,0,0,0.18)",
                  border: "1px solid rgba(255,255,255,0.18)",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "12px",
                    right: "12px",
                    zIndex: 10,
                    opacity: deleteLoading ? 0.6 : 1,
                    pointerEvents: deleteLoading ? "none" : "auto",
                  }}
                >
                  <AppButtonRow
                    onEdit={() => handleEdit(item)}
                    onDelete={() => handleDelete(item)}
                  />
                </div>

                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #22c55e, #3b82f6)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontSize: "24px",
                    fontWeight: "bold",
                    marginBottom: "16px",
                  }}
                >
                  {(item.name || item.lifestyle_name)?.charAt(0) || "L"}
                </div>

                <h3
                  style={{
                    margin: "0 0 10px 0",
                    color: "#ffffff",
                    fontSize: "20px",
                    fontWeight: "700",
                    paddingRight: "110px",
                  }}
                >
                  {item.name || item.lifestyle_name || "No Lifestyle Name"}
                </h3>

                <p
                  style={{
                    margin: "8px 0",
                    color: "#ffffff",
                    fontSize: "15px",
                  }}
                >
                  <strong style={{ color: "#ddd6fe" }}>Category Name:</strong>{" "}
                  {item.category_name || "No Category"}
                </p>

                <p
                  style={{
                    margin: "8px 0",
                    color: "#e5e7eb",
                    fontSize: "14px",
                  }}
                >
                  <strong style={{ color: "#ddd6fe" }}>Lifestyle ID:</strong>{" "}
                  {item.lifestyle_id || "-"}
                </p>

                <p
                  style={{
                    margin: "8px 0",
                    color: "#e5e7eb",
                    fontSize: "14px",
                  }}
                >
                  <strong style={{ color: "#ddd6fe" }}>Category ID:</strong>{" "}
                  {item.category_id || "-"}
                </p>
              </div>
            ))}
          </div>
        )}

        {showModal && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.55)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 999,
              padding: "16px",
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: "500px",
                background:
                  "linear-gradient(180deg, #5B2D8B 0%, #7B3FE4 40%, #7527b0ff 70%, #6f15a4ff 100%)",
                borderRadius: "16px",
                padding: "24px",
                boxShadow: "0 20px 50px rgba(0,0,0,0.35)",
                border: "1px solid rgba(255,255,255,0.18)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    color: "#ffffff",
                    fontWeight: "700",
                  }}
                >
                  {modalType === "add" ? "Add Lifestyle" : "Edit Lifestyle"}
                </h3>

                <button
                  onClick={handleCloseModal}
                  style={{
                    border: "none",
                    background: "transparent",
                    fontSize: "22px",
                    cursor: "pointer",
                    color: "#ffffff",
                  }}
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "16px" }}>
                  <label style={labelStyle}>Category ID</label>
                  <select
                    name="category_id"
                    value={formData.category_id}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                    disabled={categoryLoading}
                  >
                    <option value="">
                      {categoryLoading
                        ? "Loading category..."
                        : "Select category id"}
                    </option>
                    {lifestylecategory?.map((item, index) => (
                      <option key={item.id || index} value={item.id}>
                        {item.id} - {item.name || item.title || "Category"}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ marginBottom: "16px" }}>
                  <label style={labelStyle}>Lifestyle Name</label>
                  <input
                    type="text"
                    name="lifestyle_name"
                    value={formData.lifestyle_name}
                    onChange={handleChange}
                    placeholder="Enter lifestyle name"
                    required
                    style={inputStyle}
                  />
                </div>

                {modalType === "add" && addError && (
                  <div
                    style={{
                      color: "#ffd6d6",
                      marginBottom: "14px",
                      fontWeight: "600",
                    }}
                  >
                    {addError}
                  </div>
                )}

                {modalType === "edit" && updateError && (
                  <div
                    style={{
                      color: "#ffd6d6",
                      marginBottom: "14px",
                      fontWeight: "600",
                    }}
                  >
                    {updateError}
                  </div>
                )}

                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "12px",
                    marginTop: "20px",
                  }}
                >
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    style={{
                      padding: "10px 16px",
                      borderRadius: "10px",
                      border: "1px solid rgba(255,255,255,0.35)",
                      background: "#ffffff",
                      color: "#374151",
                      fontWeight: "600",
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={modalType === "add" ? addLoading : updateLoading}
                    style={{
                      padding: "10px 18px",
                      borderRadius: "10px",
                      border: "none",
                      background: "linear-gradient(135deg, #22c55e, #16a34a)",
                      color: "#ffffff",
                      fontWeight: "600",
                      cursor: "pointer",
                    }}
                  >
                    {modalType === "add"
                      ? addLoading
                        ? "Saving..."
                        : "Add Lifestyle"
                      : updateLoading
                      ? "Updating..."
                      : "Update Lifestyle"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const labelStyle = {
  display: "block",
  marginBottom: "8px",
  fontWeight: "600",
  color: "#ffffff",
};

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "10px",
  border: "1px solid rgba(255,255,255,0.25)",
  outline: "none",
  fontSize: "15px",
  boxSizing: "border-box",
  background: "#ffffff",
  color: "#000000",
};

export default LifestylePage;