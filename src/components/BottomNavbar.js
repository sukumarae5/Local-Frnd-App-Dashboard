import React from "react";
import { useNavigate } from "react-router-dom";

export default function BottomNavbar({
  activeMenu,
  setActiveMenu,
  sidebarWidth = 150,
}) {
  const navigate = useNavigate();

  const menuItems = [
    { key: "dashboard", icon: "bi-speedometer2", label: "Dashboard", path: "/" },
    { key: "userlistpage", icon: "bi-people", label: "User List", path: "/userlistpage" },
    { key: "photolistpage", icon: "bi-image", label: "Photo List", path: "/photolistpage" },
    { key: "moderation", icon: "bi-gear", label: "Moderation", path: "/" },
    { key: "review", icon: "bi-person-check", label: "Profile Review", path: "/" },
    { key: "monetization", icon: "bi-cash-stack", label: "Monetization", path: "/" },
    { key: "analytics", icon: "bi-bar-chart-line", label: "Analytics", path: "/" },
  ];

  return (
    <>
      <style>{`
        /* ---------------- MOBILE FIRST (ONLY MOBILE CHANGED) ---------------- */
        .bn-title {
          position: fixed;
          top: 62px;
          left: 0;
          right: 0;
          text-align: center;
          font-weight: 600;
          font-size: 1rem;
          color: #f4eeeeff;
          z-index: 1051;
          padding: 0 10px;
        }

        .bn-wrap {
          position: fixed;
          top: 98px;
          left: 50px;
          right: 0;
          padding: 0 2px;
          z-index: 1050;
        }

        .bn-bar {
          width: 100%;
          background: #2f3543;
          border-radius: 14px;
         
          box-shadow: 0 8px 20px rgba(0,0,0,0.35);
        }

        /* ✅ MOBILE FIX: icons centered (no desktop/tab changes) */
        .bn-scroll {
          display: flex;
          justify-content: center;   /* ✅ center */
          align-items: center;
          gap: 5px;
          overflow-x: auto;
          overflow-y: hidden;
          white-space: nowrap;
          -webkit-overflow-scrolling: touch;
          scrollbar-gutter: stable;
          
        }

        .bn-scroll::-webkit-scrollbar { height: 5px; }
        .bn-scroll::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.35);
          border-radius: 10px;
        }

        .bn-item {
          border-radius: 12px;
          padding: 10px 12px !important; /* ✅ touch */
          font-size: 13px;
          line-height: 1;
          display: flex;
          align-items: center;
          justify-content: center; /* ✅ icon center */
          min-width: 44px;
          flex: 0 0 auto;
        }

        .bn-icon {
          font-size: 18px; /* ✅ bigger icon mobile */
        }

        /* ---------------- TABLET (UNCHANGED) ---------------- */
        @media (min-width: 768px) {
          .bn-title { top: 78px; font-size: 1.1rem; }
          .bn-wrap { top: 118px; padding: 0 10px; }
          .bn-bar  { width: 80%; margin: 0 auto; padding: 8px; border-radius: 16px; }
          .bn-item { padding: 8px 14px !important; font-size: 14px; border-radius: 12px; }
          .bn-icon { font-size: 16px; }
        }

        /* ---------------- DESKTOP (UNCHANGED) ---------------- */
        @media (min-width: 992px) {
          .bn-title {
            top: 80px;
            left: calc(var(--sidebar) + 150px);
            right: auto;
            width: 74%;
          }
          .bn-wrap {
            top: 120px;
            left: calc(var(--sidebar) + 150px);
            right: auto;
            width: 74%;
            padding: 0;
          }
          .bn-bar { width: 100%; }
        }
      `}</style>

      <div className="bn-title" style={{ "--sidebar": `${sidebarWidth}px` }}>
        Welcome Admin Panel
      </div>

      <div className="bn-wrap" style={{ "--sidebar": `${sidebarWidth}px` }}>
        <div className="bn-bar">
          <div className="bn-scroll">
            {menuItems.map((item) => {
              const isActive = activeMenu === item.key;

              return (
                <div
                  key={item.key}
                  className="d-flex align-items-center gap-2 bn-item"
                  onClick={() => {
                    setActiveMenu(item.key);
                    navigate(item.path);
                  }}
                  style={{
                    cursor: "pointer",
                    fontWeight: isActive ? 700 : 600,
                    color: isActive ? "#fff" : "#f1f5f9",
                    background: isActive
                      ? "linear-gradient(135deg, #7F00FF, #BF28E1)"
                      : "transparent",
                    transition: "all 0.25s ease",
                    userSelect: "none",
                  }}
                >
                  <i className={`bi ${item.icon} bn-icon`} />
                  <span className="d-none d-lg-inline">{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
