import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userFetchRequest } from "../../features/user/userAction";
import { callsFetchRequest } from "../../features/Calls/CallsAction";
import AppTable from "../../components/tables/AppTable";

const Dashboardmain = () => {
  const dispatch = useDispatch();

  const {
    loading: userLoading = false,
    user = [],
    error: userError = "",
  } = useSelector((state) => state.user || {});

  const {
    loading: callsLoading = false,
    calls = [],
    error: callsError = "",
  } = useSelector((state) => state.calls || {});

  const [growthView, setGrowthView] = useState("monthly");

  useEffect(() => {
    dispatch(userFetchRequest());
    dispatch(callsFetchRequest());
  }, [dispatch]);

  const users = Array.isArray(user) ? user : [];
  const callsList = Array.isArray(calls)
    ? calls
    : Array.isArray(calls?.data)
    ? calls.data
    : [];

  const totalUsers = users.length;

  const activeUsers = users.filter(
    (item) => (item?.status || "").toLowerCase() === "active"
  ).length;

  const totalCalls = callsList.length;
  const revenue = 0;

  const latestUsers = useMemo(() => {
    return [...users]
      .sort(
        (a, b) =>
          new Date(b?.created_at || 0).getTime() -
          new Date(a?.created_at || 0).getTime()
      )
      .slice(0, 6);
  }, [users]);

  const userGrowth = useMemo(() => {
    if (!users.length) return [];

    const grouped = {};

    users.forEach((item) => {
      if (!item?.created_at) return;

      const date = new Date(item.created_at);
      if (Number.isNaN(date.getTime())) return;

      let rawKey = "";
      let sortValue = 0;
      let formattedLabel = "";

      if (growthView === "weekly") {
        const weekStart = new Date(date);
        const day = weekStart.getDay();
        const diff = day === 0 ? -6 : 1 - day;
        weekStart.setDate(weekStart.getDate() + diff);
        weekStart.setHours(0, 0, 0, 0);

        rawKey = weekStart.toISOString().split("T")[0];
        sortValue = weekStart.getTime();

        formattedLabel = `Week ${weekStart.toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
        })}`;
      }

      if (growthView === "monthly") {
        const year = date.getFullYear();
        const month = date.getMonth();

        rawKey = `${year}-${String(month + 1).padStart(2, "0")}`;
        sortValue = new Date(year, month, 1).getTime();

        formattedLabel = new Date(year, month, 1).toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        });
      }

      if (growthView === "yearly") {
        const year = date.getFullYear();

        rawKey = `${year}`;
        sortValue = new Date(year, 0, 1).getTime();
        formattedLabel = `${year}`;
      }

      if (!grouped[rawKey]) {
        grouped[rawKey] = {
          rawKey,
          label: formattedLabel,
          count: 0,
          sortValue,
        };
      }

      grouped[rawKey].count += 1;
    });

    let result = Object.values(grouped).sort(
      (a, b) => a.sortValue - b.sortValue
    );

    if (growthView === "weekly") {
      result = result.slice(-8);
    }

    if (growthView === "monthly") {
      result = result.slice(-12);
    }

    if (growthView === "yearly") {
      result = result.slice(-8);
    }

    return result.map(({ label, count }) => ({ label, count }));
  }, [users, growthView]);

  const recentReports = [];
  const revenueConsumption = [];

  const formatNumber = (value) => {
    return Number(value || 0).toLocaleString();
  };

  const formatDate = (dateValue) => {
    if (!dateValue) return "N/A";
    const date = new Date(dateValue);
    if (Number.isNaN(date.getTime())) return "N/A";
    return date.toLocaleDateString();
  };

  const getDisplayName = (item) => {
    return (
      item?.name ||
      item?.username ||
      item?.mobile_number ||
      `User ${item?.user_id || ""}`
    );
  };

  const getStatusBadge = (status) => {
    const normalized = (status || "").toLowerCase();
    const isActive = normalized === "active";

    return (
      <span
        style={{
          padding: "5px 10px",
          borderRadius: "999px",
          background: isActive ? "#6d4aff" : "#5f677a",
          color: "#fff",
          fontSize: "12px",
          textTransform: "capitalize",
          display: "inline-block",
          fontWeight: 500,
        }}
      >
        {status || "N/A"}
      </span>
    );
  };

  const StatCard = ({ title, value, icon, color1, color2 }) => {
    return (
      <div
        style={{
          background: `linear-gradient(135deg, ${color1}, ${color2})`,
          borderRadius: "18px",
          padding: "20px",
          color: "#fff",
          minHeight: "120px",
          boxShadow: "0 10px 24px rgba(0,0,0,0.28)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <h6 style={{ margin: 0, fontSize: "16px", fontWeight: "500" }}>
            {title}
          </h6>

          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.18)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
            }}
          >
            {icon}
          </div>
        </div>

        <h2 style={{ margin: 0, fontSize: "30px", fontWeight: "700" }}>
          {value}
        </h2>
      </div>
    );
  };

  const LineChartBox = ({ title, data, view, onChangeView }) => {
    const chartWidth = 100;
    const chartHeight = 60;

    const safeData = data.length > 0 ? data : [{ label: "No Data", count: 0 }];
    const maxDataValue = Math.max(...safeData.map((item) => item.count), 1);

    const roundedMax =
      maxDataValue <= 10
        ? 10
        : maxDataValue <= 50
        ? Math.ceil(maxDataValue / 5) * 5
        : Math.ceil(maxDataValue / 10) * 10;

    const yAxisMax = roundedMax;
    const yAxisSteps = 5;

    const yLabels = Array.from({ length: yAxisSteps + 1 }, (_, i) => {
      return Math.round((yAxisMax / yAxisSteps) * (yAxisSteps - i));
    });

    const points = safeData
      .map((item, index) => {
        const x =
          safeData.length === 1
            ? chartWidth / 2
            : (index / (safeData.length - 1)) * chartWidth;

        const y = chartHeight - (item.count / yAxisMax) * chartHeight;
        return `${x},${y}`;
      })
      .join(" ");

    return (
      <div
        style={{
          background: "linear-gradient(180deg, #232838 0%, #1d2230 100%)",
          borderRadius: "18px",
          padding: "18px",
          minHeight: "320px",
          color: "#fff",
          boxShadow: "0 10px 24px rgba(0,0,0,0.22)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <div>
            <h5 style={{ margin: 0, fontWeight: 600 }}>{title}</h5>
            <div style={{ color: "#9ca3af", fontSize: "12px", marginTop: "4px" }}>
              {view === "weekly"
                ? "Last 8 weeks"
                : view === "monthly"
                ? "Last 12 months"
                : "Yearly trend"}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: "8px",
              flexWrap: "wrap",
              background: "#171b26",
              padding: "6px",
              borderRadius: "12px",
            }}
          >
            {["weekly", "monthly", "yearly"].map((item) => (
              <button
                key={item}
                onClick={() => onChangeView(item)}
                style={{
                  border: "none",
                  outline: "none",
                  padding: "8px 14px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontSize: "13px",
                  textTransform: "capitalize",
                  background:
                    view === item
                      ? "linear-gradient(135deg, #b14dff, #6d4aff)"
                      : "transparent",
                  color: "#fff",
                  fontWeight: view === item ? "600" : "500",
                  transition: "all 0.2s ease",
                }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {data.length === 0 ? (
          <div
            style={{
              height: "190px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#b7bfd6",
            }}
          >
            No growth data found
          </div>
        ) : (
          <>
            <div
              style={{
                display: "flex",
                gap: "12px",
                height: "190px",
              }}
            >
              <div
                style={{
                  width: "42px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  color: "#9ca3af",
                  fontSize: "12px",
                  paddingTop: "2px",
                }}
              >
                {yLabels.map((label, index) => (
                  <span key={index}>{label}</span>
                ))}
              </div>

              <div style={{ flex: 1, height: "100%" }}>
                <svg
                  viewBox={`0 0 ${chartWidth} ${chartHeight + 8}`}
                  preserveAspectRatio="none"
                  style={{ width: "100%", height: "100%" }}
                >
                  <defs>
                    <linearGradient id="growthFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#cc63ff" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="#cc63ff" stopOpacity="0.03" />
                    </linearGradient>
                  </defs>

                  {Array.from({ length: yAxisSteps + 1 }, (_, i) => {
                    const y = (chartHeight / yAxisSteps) * i;
                    return (
                      <line
                        key={i}
                        x1="0"
                        y1={y}
                        x2={chartWidth}
                        y2={y}
                        stroke="#394155"
                        strokeWidth="0.4"
                      />
                    );
                  })}

                  <polygon
                    points={`0,${chartHeight} ${points} ${chartWidth},${chartHeight}`}
                    fill="url(#growthFill)"
                  />

                  <polyline
                    points={points}
                    fill="none"
                    stroke="#d06bff"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />

                  {safeData.map((item, index) => {
                    const x =
                      safeData.length === 1
                        ? chartWidth / 2
                        : (index / (safeData.length - 1)) * chartWidth;

                    const y =
                      chartHeight - (item.count / yAxisMax) * chartHeight;

                    return (
                      <g key={index}>
                        <circle cx={x} cy={y} r="2.2" fill="#ffffff" />
                        <circle
                          cx={x}
                          cy={y}
                          r="3.4"
                          fill="transparent"
                          stroke="rgba(208,107,255,0.35)"
                          strokeWidth="0.8"
                        />
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${safeData.length}, minmax(0, 1fr))`,
                marginTop: "10px",
                marginLeft: "54px",
                gap: "6px",
              }}
            >
              {safeData.map((item, index) => (
                <div
                  key={index}
                  style={{
                    color: "#9ca3af",
                    fontSize: "11px",
                    textAlign: "center",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  title={item.label}
                >
                  {item.label}
                </div>
              ))}
            </div>

            <div
              style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
                marginTop: "16px",
              }}
            >
              {safeData.map((item, index) => (
                <div
                  key={index}
                  style={{
                    padding: "6px 10px",
                    borderRadius: "999px",
                    background: "#171b26",
                    color: "#c7cfdd",
                    fontSize: "12px",
                  }}
                >
                  {item.label}: <span style={{ color: "#fff" }}>{item.count}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    );
  };

  const BarChartBox = ({ title, data }) => {
    const safeData = data.length > 0 ? data : [0];
    const max = Math.max(...safeData, 1);

    return (
      <div
        style={{
          background: "linear-gradient(180deg, #232838 0%, #1d2230 100%)",
          borderRadius: "18px",
          padding: "18px",
          minHeight: "260px",
          color: "#fff",
          boxShadow: "0 10px 24px rgba(0,0,0,0.22)",
        }}
      >
        <h5 style={{ marginBottom: "20px", fontWeight: 600 }}>{title}</h5>

        {data.length === 0 ? (
          <div
            style={{
              height: "180px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#b7bfd6",
            }}
          >
            No revenue data found
          </div>
        ) : (
          <div
            style={{
              height: "180px",
              display: "flex",
              alignItems: "flex-end",
              gap: "12px",
              borderBottom: "1px solid #3d4458",
              paddingBottom: "10px",
            }}
          >
            {safeData.map((value, index) => (
              <div
                key={index}
                style={{
                  flex: 1,
                  height: `${(value / max) * 100}%`,
                  minHeight: "10px",
                  borderRadius: "8px 8px 0 0",
                  background: "linear-gradient(180deg, #d25fff, #5b88ff)",
                }}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  const latestUsersColumns = [
    {
      key: "user_id",
      label: "User ID",
      render: (row) => row?.user_id || "N/A",
    },
    {
      key: "name",
      label: "Name",
      render: (row) => getDisplayName(row),
    },
    {
      key: "mobile_number",
      label: "Mobile",
      render: (row) => row?.mobile_number || "N/A",
    },
    {
      key: "coin_balance",
      label: "Coins",
      render: (row) => row?.coin_balance ?? 0,
    },
    {
      key: "created_at",
      label: "Created At",
      render: (row) => formatDate(row?.created_at),
    },
    {
      key: "status",
      label: "Status",
      render: (row) => getStatusBadge(row?.status),
    },
  ];

  const recentReportsColumns = [
    {
      key: "reportType",
      label: "Report Type",
      render: (row) => row?.reportType || "N/A",
    },
    {
      key: "reportedBy",
      label: "Reported By",
      render: (row) => row?.reportedBy || "N/A",
    },
    {
      key: "reportedUser",
      label: "Reported User",
      render: (row) => row?.reportedUser || "N/A",
    },
    {
      key: "status",
      label: "Status",
      render: (row) => getStatusBadge(row?.status),
    },
  ];

  if (userLoading || callsLoading) {
    return <div style={{ color: "#fff" }}>Loading dashboard...</div>;
  }

  if (userError || callsError) {
    return (
      <div style={{ color: "red" }}>
        {typeof userError === "string" && userError
          ? userError
          : typeof callsError === "string" && callsError
          ? callsError
          : "Something went wrong"}
      </div>
    );
  }

  return (
    <div
      className="container-fluid"
      style={{ minHeight: "100vh", background: "#111", padding: "20px" }}
    >
      <div className="row g-4">
        <div className="col-12 col-sm-6 col-lg-3">
          <StatCard
            title="Total Users"
            value={formatNumber(totalUsers)}
            icon="👤"
            color1="#4a8cff"
            color2="#8d5dff"
          />
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <StatCard
            title="Active Users"
            value={formatNumber(activeUsers)}
            icon="🟢"
            color1="#6a5cff"
            color2="#cb5fff"
          />
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <StatCard
            title="Total Calls"
            value={formatNumber(totalCalls)}
            icon="📞"
            color1="#3c95ff"
            color2="#6c63ff"
          />
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <StatCard
            title="Revenue"
            value={`$${formatNumber(revenue)}`}
            icon="💰"
            color1="#7b61ff"
            color2="#db5dff"
          />
        </div>
      </div>

      <div className="row g-4 mt-1">
        <div className="col-12 col-lg-6">
          <LineChartBox
            title="User Growth"
            data={userGrowth}
            view={growthView}
            onChangeView={setGrowthView}
          />
        </div>

        <div className="col-12 col-lg-6">
          <BarChartBox
            title="Revenue & Coin Consumption"
            data={revenueConsumption}
          />
        </div>
      </div>

      <div className="row g-4 mt-1">
        <div className="col-12 col-lg-6">
          <div
            style={{
              background: "linear-gradient(180deg, #232838 0%, #1d2230 100%)",
              borderRadius: "18px",
              overflow: "hidden",
              boxShadow: "0 10px 24px rgba(0,0,0,0.22)",
            }}
          >
            <div
              style={{
                padding: "16px 18px",
                color: "#fff",
                fontSize: "20px",
                fontWeight: "600",
                borderBottom: "1px solid #3d4458",
              }}
            >
              Latest Registered Users
            </div>

            <div style={{ padding: "16px" }}>
              <AppTable
                columns={latestUsersColumns}
                data={latestUsers}
                emptyMessage="No users found"
              />
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-6">
          <div
            style={{
              background: "linear-gradient(180deg, #232838 0%, #1d2230 100%)",
              borderRadius: "18px",
              overflow: "hidden",
              boxShadow: "0 10px 24px rgba(0,0,0,0.22)",
            }}
          >
            <div
              style={{
                padding: "16px 18px",
                color: "#fff",
                fontSize: "20px",
                fontWeight: "600",
                borderBottom: "1px solid #3d4458",
              }}
            >
              Recent Report
            </div>

            <div style={{ padding: "16px" }}>
              <AppTable
                columns={recentReportsColumns}
                data={recentReports}
                emptyMessage="No reports found"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboardmain;