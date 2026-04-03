import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callsFetchRequest } from "../../features/Calls/CallsAction";
import AppPagination from "../../components/pagination/AppPagination";
import AppTable from "../../components/tables/AppTable";

const CallsListPage = () => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { loading = false, calls = [], error = "" } = useSelector(
    (state) => state.calls || {}
  
  );
console.log(calls)
  useEffect(() => {
    dispatch(callsFetchRequest());
  }, [dispatch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [calls]);

  const formatDate = (value) => {
    if (!value) return "N/A";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "N/A";
    return date.toLocaleString();
  };

  const formatDuration = (seconds) => {
    if (seconds === null || seconds === undefined) return "N/A";

    const sec = Number(seconds);
    if (Number.isNaN(sec)) return "N/A";

    const hrs = Math.floor(sec / 3600);
    const mins = Math.floor((sec % 3600) / 60);
    const secs = sec % 60;

    if (hrs > 0) return `${hrs}h ${mins}m ${secs}s`;
    if (mins > 0) return `${mins}m ${secs}s`;
    return `${secs}s`;
  };

  const getCaller = (item) => {
    return (
      item?.caller_name ||
      item?.caller_id ||
      item?.from_user ||
      item?.Id ||
      "N/A"
    );
  };

  const getReceiver = (item) => {
    return (
      item?.receiver_name ||
      item?.receiver_id ||
      item?.receiver ||
      item?.to_user ||
      item?.receiverId ||
      "N/A"
    );
  };

  const paginatedCalls = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return calls.slice(startIndex, endIndex);
  }, [calls, currentPage]);

  const columns = [
    {
      key: "serial",
      label: "#",
      render: (_, index) => (currentPage - 1) * itemsPerPage + index + 1,
    },
    {
      key: "call_id",
      label: "Call ID",
      render: (row) => row?.id || row?.call_id || "N/A",
    },
    {
      key: "caller_id",
      label: "Caller ID",
      render: (row) => getCaller(row),
    },
    {
      key: "receiver_id",
      label: "Receiver ID",
      render: (row) => getReceiver(row),
    },
    {
      key: "type",
      label: "Type",
      render: (row) => row?.type || "N/A",
    },
    {
      key: "duration",
      label: "Duration",
      render: (row) =>
        formatDuration(
          row?.duration_seconds ?? row?.duration ?? row?.call_duration
        ),
    },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <span
          style={{
            padding: "5px 10px",
            borderRadius: "8px",
            background:
              row?.status === "ENDED"
                ? "#198754"
                : row?.status === "MISSED"
                ? "#dc3545"
                : "#5f4bff",
            color: "#fff",
            fontSize: "12px",
            textTransform: "capitalize",
            fontWeight: "500",
          }}
        >
          {row?.status || "N/A"}
        </span>
      ),
    },
    {
      key: "started_at",
      label: "Started At",
      render: (row) => formatDate(row?.started_at || row?.created_at),
    },
    {
      key: "ended_at",
      label: "Ended At",
      render: (row) => formatDate(row?.ended_at || row?.updated_at),
    },
  ];

  return (
    <div
      className="container-fluid"
      style={{
        padding: "20px",
        background: "#111",
        minHeight: "100vh",
        color: "#fff",
      }}
    >
      <div
        style={{
          background: "#232838",
          borderRadius: "14px",
          overflow: "hidden",
          boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
        }}
      >
        <div
          style={{
            padding: "16px 18px",
            color: "#fff",
            fontSize: "22px",
            fontWeight: "600",
            borderBottom: "1px solid #3d4458",
          }}
        >
          Calls History
        </div>

        <div style={{ padding: "16px" }}>
          {loading && <p style={{ color: "#fff" }}>Loading calls...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}

          {!loading && !error && (
            <>
              <AppTable columns={columns} data={paginatedCalls} />

              {calls.length > itemsPerPage && (
                <AppPagination
                  totalItems={calls.length}
                  itemsPerPage={itemsPerPage}
                  currentPage={currentPage}
                  onPageChange={setCurrentPage}
                  maxVisiblePages={5}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CallsListPage;