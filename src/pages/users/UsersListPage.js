import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {
  userDeleteRequest,
  userEditRequest,
  userFetchRequest,
} from "../../features/user/userAction";
import AppTable from "../../components/tables/AppTable";
import { AppButtonRow } from "../../components/button/AppButton";
import AppPagination from "../../components/pagination/AppPagination";
import "bootstrap-icons/font/bootstrap-icons.css";
import UserForm from "../../components/forms/UserForms";

const UserListPage = () => {
  const [q, setQ] = useState("");

  const [screen, setScreen] = useState("desktop"); // <-- ADDED

  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState("edit");
  const [formInitialValues, setFormInitialValues] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const dispatch = useDispatch();
  const { user } = useSelector((s) => s.user || {});
  const navigate = useNavigate();
  const location = useLocation();

  // ✔ Detect Screen Size
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w <= 576) setScreen("mobile");
      else if (w <= 992) setScreen("tablet");
      else setScreen("desktop");
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const users = useMemo(() => {
    if (Array.isArray(user)) return user;
    if (user && typeof user === "object") return [user];
    return [];
  }, [user]);

  useEffect(() => {
    dispatch(userFetchRequest());
  }, [dispatch]);

  // Search Debounce
  useEffect(() => {
    const delay = setTimeout(() => {
      dispatch(userFetchRequest(q));
    }, 400);
    return () => clearTimeout(delay);
  }, [q, dispatch]);

  useEffect(() => {
    if (!formOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = prev);
  }, [formOpen]);

  const toInitialValues = (r) => ({
    id: r.user_id,
    name: r.name ?? "",
    username: r.username ?? "",
    mobile: r.mobile_number ?? "",
    email: r.email ?? "",
    age: r.age ?? "",
    gender: r.gender ?? "",
    profileStatus: r.profile_status ?? "",
    status: r.status ?? "",
    coins: r.coin_balance ?? "",
    lat: r.location_lat ?? "",
    lon: r.location_log ?? "",
    dob: r.date_of_birth ?? "",
    bio: r.bio ?? "",
    otp: r.otp ?? "",
    createdAt: r.created_at ?? r.createdAt ?? "",
    updatedAt: r.updated_at ?? r.updatedAt ?? "",
  });

  const openEdit = (row) => {
    setFormMode("edit");
    setFormInitialValues(toInitialValues(row));
    setFormOpen(true);
    if (!location.pathname.endsWith("/edit")) navigate("edit");
  };

  const closeForm = () => {
    setFormOpen(false);
    if (location.pathname.endsWith("/edit"))
      navigate("/dashboard/userlistpage", { replace: true });
  };

  // wire table actions
  const handleView = (row) =>
    alert(`Viewing user: ${row.name ?? row.user_id}`);
  const handleEdit = (row) => openEdit(row);
  const handleDelete = (row) => {
  if (window.confirm(`Are you sure to delete ${row.name ?? row.user_id}?`)) {
    
    dispatch(
      userDeleteRequest({
        id: row.user_id,
        data: row, 
      })
    );
  }
};

  useEffect(() => {
    if (formOpen) return;
    if (location.pathname.endsWith("/edit")) {
      setFormMode("edit");
      setFormInitialValues({});
      setFormOpen(true);
    }
  }, [location.pathname]);

const handleFormSubmit = (values) => {
  const { id, user_id, ...rest } = values;
  const editId = id ?? user_id;

  const apiData = {
    
    name: rest.name,
    gender: rest.gender,
    age: rest.age,
    location_lat: rest.lat,
    location_log: rest.lon,
  };

  dispatch(
    userEditRequest({
      id: editId,
      data: apiData,
    })
  );

  closeForm();
};



  // Columns aligned to your API fields
  const columns = useMemo(
    () => [
      { key: "user_id", label: "ID" },
      { key: "name", label: "Name" },
      { key: "age", label: "Age", render: (r) => r.age ?? "-" },
      { key: "gender", label: "Gender", render: (r) => r.gender ?? "-" },
      { key: "email", label: "Email", render: (r) => r.email ?? "-" },
      {
        key: "mobile_number",
        label: "Phone",
        render: (r) => r.mobile_number ?? "-",
      },
      { key: "status", label: "Status", render: (r) => r.status ?? "-" },
      {
        key: "profile_status",
        label: "Profile",
        render: (r) => r.profile_status ?? "-",
      },
      {
        key: "location",
        label: "Location (lat, lon)",
        render: (r) => `${r.location_lat ?? "-"}, ${r.location_log ?? "-"}`,
      },
      {
        key: "coin_balance",
        label: "Coins",
        render: (r) => r.coin_balance ?? "-",
      },
      {
        key: "actions",
        label: "Actions",
        render: (row) => (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <AppButtonRow
              onView={() => alert(`View: ${row.name}`)}
              onEdit={() => openEdit(row)}
              onDelete={() => alert(`Delete: ${row.name}`)}
            />
          </div>
        ),
      },
    ],
    []
  );

  const pagedUsers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return users.slice(start, start + itemsPerPage);
  }, [users, currentPage]);

  return (
    <>
      {/* MAIN WRAPPER */}
      <div
        style={{
          padding: "1rem",
          backgroundColor: "#f8f9fc",
          minHeight: "100vh",
        }}
      >

        {/* Table */}
        <AppTable columns={columns} data={pagedUsers} />

        {/* Pagination */}
        <AppPagination
          totalItems={users.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />

        {/* Form */}
        <UserForm
          open={formOpen}
          mode={formMode}
          initialValues={formInitialValues}
          onClose={closeForm}
          onSubmit={() => {}}
        />
      </div>
    </>
  );
};

export default UserListPage;
