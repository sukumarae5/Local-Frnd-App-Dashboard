// src/pages/users/UserEditFormDesign.jsx

import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import UserForm from "../../components/forms/UserForms";
import { userEditRequest } from "../../features/user/userAction";

const formatDate = (dateValue) => {
  if (!dateValue) return "";

  const value = String(dateValue).trim();

  // Handles YYYY-MM-DD and ISO date values.
  if (/^\d{4}-\d{2}-\d{2}/.test(value)) {
    return value.slice(0, 10);
  }

  // Handles DD-MM-YYYY.
  if (/^\d{2}-\d{2}-\d{4}$/.test(value)) {
    const [day, month, year] = value.split("-");
    return `${year}-${month}-${day}`;
  }

  // Handles DD/MM/YYYY.
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
    const [day, month, year] = value.split("/");
    return `${year}-${month}-${day}`;
  }

  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  return parsedDate.toISOString().slice(0, 10);
};

const isEmpty = (value) =>
  value === "" ||
  value === null ||
  value === undefined;

const getLanguageId = (language) =>
  language?.language_id ??
  language?.languageId ??
  language?.id ??
  "";

const getLanguageName = (language) =>
  language?.language_name ??
  language?.languageName ??
  language?.name ??
  language?.title ??
  "";

const getUserLanguageId = (row) =>
  row?.language_id ??
  row?.languageId ??
  row?.language?.language_id ??
  row?.language?.languageId ??
  row?.language?.id ??
  "";

const getLanguageArray = (data) => {
  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data?.data)) {
    return data.data;
  }

  if (Array.isArray(data?.languages)) {
    return data.languages;
  }

  if (Array.isArray(data?.results)) {
    return data.results;
  }

  return [];
};

const getBackendErrorMessage = (error) => {
  if (typeof error === "string") {
    return error;
  }

  return (
    error?.response?.data?.message ||
    error?.data?.message ||
    error?.message ||
    "Unable to update user."
  );
};

const createBackendFieldErrors = (message) => {
  const fieldErrors = {};

  const missingFieldsText = message.split(
    /Missing(?: required)? fields:/i
  )[1];

  if (!missingFieldsText) {
    return fieldErrors;
  }

  const fieldMap = {
    mobile_number: "mobile",
    profile_status: "profileStatus",
    coin_balance: "coins",
    location_lat: "lat",
    location_log: "lon",
    location_lon: "lon",
    date_of_birth: "dob",
    language_id: "languageId",
  };

  missingFieldsText
    .split(",")
    .map((field) => field.trim())
    .filter(Boolean)
    .forEach((field) => {
      const formField = fieldMap[field] || field;

      const readableField = field
        .replace(/_/g, " ")
        .replace(/\b\w/g, (letter) =>
          letter.toUpperCase()
        );

      fieldErrors[formField] =
        `${readableField} is required.`;
    });

  return fieldErrors;
};

const UserEditFormDesign = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    error: userError,
    success,
    message,
  } = useSelector((state) => state.user || {});

  const {
    loading: languageLoading,
    data: languageData,
    error: languageError,
  } = useSelector(
    (state) => state.language || {}
  );

  const [submitted, setSubmitted] =
    useState(false);

  const [
    backendFieldErrors,
    setBackendFieldErrors,
  ] = useState({});

  const row = location.state?.row ?? null;

  const languages = useMemo(
    () => getLanguageArray(languageData),
    [languageData]
  );

  const userLanguageId = useMemo(
    () => getUserLanguageId(row),
    [row]
  );

  const selectedLanguage = useMemo(() => {
    if (isEmpty(userLanguageId)) {
      return null;
    }

    return (
      languages.find(
        (language) =>
          String(getLanguageId(language)) ===
          String(userLanguageId)
      ) || null
    );
  }, [languages, userLanguageId]);

  const initialValues = useMemo(() => {
    if (!row) return {};

    const matchedLanguageId = selectedLanguage
      ? getLanguageId(selectedLanguage)
      : userLanguageId;

    return {
      id: row.user_id ?? row.id ?? "",
      name: row.name ?? "",
      username: row.username ?? "",
      mobile: row.mobile_number ?? "",
      email: row.email ?? "",
      age: row.age ?? "",
      gender: row.gender ?? "",
      profileStatus: row.profile_status ?? "",
      status: row.status ?? "",
      coins: row.coin_balance ?? "",
      lat: row.location_lat ?? "",
      lon:
        row.location_log ??
        row.location_lon ??
        "",
      dob: formatDate(row.date_of_birth),
      languageId: matchedLanguageId ?? "",
      languageName: selectedLanguage
        ? getLanguageName(selectedLanguage)
        : "",
      bio: row.bio ?? "",
    };
  }, [row, selectedLanguage, userLanguageId]);

  const handleClose = useCallback(() => {
    navigate("/dashboard/userlistpage", {
      replace: true,
    });
  }, [navigate]);

  useEffect(() => {
    if (!submitted || !userError) return;

    const errorMessage =
      getBackendErrorMessage(userError);

    setBackendFieldErrors(
      createBackendFieldErrors(errorMessage)
    );

    setSubmitted(false);
    window.alert(errorMessage);
  }, [userError, submitted]);

  useEffect(() => {
    if (!submitted || !success) return;

    window.alert(
      message || "User updated successfully."
    );

    setSubmitted(false);
    handleClose();
  }, [
    success,
    message,
    submitted,
    handleClose,
  ]);

  const handleFormSubmit = (values) => {
    const editId =
      values.id ??
      row?.user_id ??
      row?.id;

    if (!editId) {
      window.alert("User ID is missing.");
      return;
    }

    const dateOfBirth = formatDate(
      values.dob || row?.date_of_birth
    );

    const languageId =
      values.languageId ||
      values.language_id ||
      userLanguageId;

    const validationErrors = {};

    if (!dateOfBirth) {
      validationErrors.dob =
        "Date of birth is required.";
    }

    if (isEmpty(languageId)) {
      validationErrors.languageId =
        "Language is required.";
    }

    if (
      Object.keys(validationErrors).length > 0
    ) {
      setBackendFieldErrors(validationErrors);

      window.alert(
        "Date of birth and language are required."
      );

      return;
    }

    const apiData = {
      name:
        values.name?.trim() ||
        row?.name ||
        "",

      username:
        values.username?.trim() ||
        row?.username ||
        null,

      mobile_number:
        values.mobile?.trim() ||
        row?.mobile_number ||
        "",

      email:
        values.email?.trim() ||
        row?.email ||
        null,

      age: !isEmpty(values.age)
        ? Number(values.age)
        : row?.age ?? null,

      gender:
        values.gender ||
        row?.gender ||
        "",

      profile_status:
        values.profileStatus ??
        row?.profile_status ??
        "",

      status: !isEmpty(values.status)
        ? Number(values.status)
        : row?.status ?? null,

      coin_balance: !isEmpty(values.coins)
        ? Number(values.coins)
        : row?.coin_balance ?? 0,

      location_lat: !isEmpty(values.lat)
        ? Number(values.lat)
        : row?.location_lat ?? null,

      location_log: !isEmpty(values.lon)
        ? Number(values.lon)
        : row?.location_log ??
          row?.location_lon ??
          null,

      date_of_birth: dateOfBirth,
      language_id: Number(languageId),

      bio:
        values.bio?.trim() ||
        row?.bio ||
        null,
    };

    setBackendFieldErrors({});
    setSubmitted(true);

    dispatch(
      userEditRequest({
        id: editId,
        data: apiData,
      })
    );
  };

  useEffect(() => {
    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, []);

  if (!row) {
    return (
      <div style={styles.emptyContainer}>
        <p>No user data received for editing.</p>

        <button
          type="button"
          onClick={handleClose}
          style={styles.backButton}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <UserForm
        open
        mode="edit"
        initialValues={initialValues}
        onClose={handleClose}
        onSubmit={handleFormSubmit}
        backendErrors={backendFieldErrors}
        languages={languages}
        languageLoading={languageLoading}
        languageError={languageError}
      />
    </div>
  );
};

const styles = {
  container: {
    position: "fixed",
    inset: 0,
    zIndex: 1050,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    overflowY: "auto",
    background:
      "linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(30, 64, 175, 0.85))",
  },

  emptyContainer: {
    position: "fixed",
    inset: 0,
    zIndex: 1050,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "16px",
    background: "rgba(0, 0, 0, 0.75)",
    color: "#ffffff",
  },

  backButton: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default UserEditFormDesign;