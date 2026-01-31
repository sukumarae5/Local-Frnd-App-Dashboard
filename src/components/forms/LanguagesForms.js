import React from "react";

const LanguagesForms = ({ formData, onChange, onSubmit, onCancel, loading }) => {
  return (
    <form
      onSubmit={onSubmit}
      className="container-fluid p-4 rounded"
      style={{
        background: "linear-gradient(135deg, #7F00FF, #BF28E1)", // ✅ background added
      }}
    >
      <div className="row g-3">

        {/* Code */}
        <div className="col-md-6">
          <label className="form-label text-white fw-semibold">
            Code
          </label>
          <input
            type="text"
            name="code"
            value={formData.code || ""}
            onChange={onChange}
            className="form-control"
            placeholder="en"
            required
          />
        </div>

        {/* English Name */}
        <div className="col-md-6">
          <label className="form-label text-white fw-semibold">
            English Name
          </label>
          <input
            type="text"
            name="name_en"
            value={formData.name_en || ""}
            onChange={onChange}
            className="form-control"
            placeholder="English"
            required
          />
        </div>

        {/* Native Name */}
        <div className="col-md-6">
          <label className="form-label text-white fw-semibold">
            Native Name
          </label>
          <input
            type="text"
            name="native_name"
            value={formData.native_name || ""}
            onChange={onChange}
            className="form-control"
            placeholder="English / हिंदी"
            required
          />
        </div>

        {/* Direction */}
        <div className="col-md-6">
          <label className="form-label text-white fw-semibold">
            Direction
          </label>
          <select
            name="direction"
            value={formData.direction || "ltr"}
            onChange={onChange}
            className="form-select"
          >
            <option value="ltr">LTR</option>
            <option value="rtl">RTL</option>
          </select>
        </div>

        {/* Status */}
        <div className="col-12">
          <div className="form-check mt-2">
            <input
              className="form-check-input"
              type="checkbox"
              name="status"
              checked={!!formData.status}
              onChange={onChange}
              id="statusCheck"
            />
            <label
              className="form-check-label text-white fw-semibold"
              htmlFor="statusCheck"
            >
              Active
            </label>
          </div>
        </div>

        {/* Buttons */}
        <div className="col-12 mt-4 d-flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="btn btn-light fw-semibold"
          >
            {loading ? "Saving..." : "Save"}
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="btn btn-outline-light"
          >
            Cancel
          </button>
        </div>

      </div>
    </form>
  );
};

export default LanguagesForms;
