import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] =
    useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    setError("");

    const adminEmail =
      process.env.REACT_APP_ADMIN_EMAIL ||
      "admin@gmail.com";

    const adminPassword =
      process.env.REACT_APP_ADMIN_PASSWORD ||
      "Admin@123";

    if (!email.trim() || !password.trim()) {
      setError("Email and Password are required");
      return;
    }

    setLoading(true);

    if (
      email.trim().toLowerCase() ===
        adminEmail.trim().toLowerCase() &&
      password === adminPassword
    ) {
      localStorage.setItem(
        "isAuthenticated",
        "true"
      );

      navigate("/dashboard", {
        replace: true,
      });
    } else {
      setLoading(false);
      setError("Invalid Email or Password");
    }
  };

  return (
    <>
      <style>
        {`
          * {
            box-sizing: border-box;
          }

          .login-page {
            position: relative;
            width: 100%;
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
            overflow: hidden;
            font-family: Arial, Helvetica, sans-serif;

            background: linear-gradient(
              -45deg,
              #ffb6d9,
              #ffd1e8,
              #b9e8ff,
              #c7f0ff,
              #f6c2e3
            );

            background-size: 400% 400%;
            animation: gradientAnimation 12s ease infinite;
          }

          @keyframes gradientAnimation {
            0% {
              background-position: 0% 50%;
            }

            50% {
              background-position: 100% 50%;
            }

            100% {
              background-position: 0% 50%;
            }
          }

          .login-shape {
            position: absolute;
            border-radius: 50%;
            filter: blur(4px);
            opacity: 0.55;
            pointer-events: none;
          }

          .shape-one {
            width: 320px;
            height: 320px;
            top: -100px;
            left: -80px;
            background: linear-gradient(
              135deg,
              #ff5fac,
              #ffb6d9
            );
            animation: floatOne 8s ease-in-out infinite;
          }

          .shape-two {
            width: 380px;
            height: 380px;
            right: -130px;
            bottom: -140px;
            background: linear-gradient(
              135deg,
              #52c7ff,
              #c3eeff
            );
            animation: floatTwo 10s ease-in-out infinite;
          }

          .shape-three {
            width: 160px;
            height: 160px;
            top: 18%;
            right: 12%;
            background: rgba(255, 255, 255, 0.45);
            animation: floatThree 7s ease-in-out infinite;
          }

          .shape-four {
            width: 120px;
            height: 120px;
            left: 14%;
            bottom: 14%;
            background: linear-gradient(
              135deg,
              rgba(255, 100, 180, 0.5),
              rgba(98, 207, 255, 0.5)
            );
            animation: floatFour 9s ease-in-out infinite;
          }

          @keyframes floatOne {
            0%,
            100% {
              transform: translate(0, 0) rotate(0deg);
            }

            50% {
              transform: translate(40px, 35px)
                rotate(12deg);
            }
          }

          @keyframes floatTwo {
            0%,
            100% {
              transform: translate(0, 0) scale(1);
            }

            50% {
              transform: translate(-40px, -30px)
                scale(1.08);
            }
          }

          @keyframes floatThree {
            0%,
            100% {
              transform: translateY(0);
            }

            50% {
              transform: translateY(-35px);
            }
          }

          @keyframes floatFour {
            0%,
            100% {
              transform: translateY(0)
                translateX(0);
            }

            50% {
              transform: translateY(-25px)
                translateX(20px);
            }
          }

          .login-card {
            position: relative;
            z-index: 10;
            width: 100%;
            max-width: 430px;
            padding: 38px 35px;
            border-radius: 24px;
            height:550px;

            background: rgba(255, 255, 255, 0.72);
            border: 1px solid rgba(255, 255, 255, 0.8);

            box-shadow:
              0 25px 60px rgba(61, 86, 120, 0.2),
              inset 0 1px 1px rgba(255, 255, 255, 0.9);

            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);

            animation: cardEntry 0.8s ease forwards;
          }

          @keyframes cardEntry {
            from {
              opacity: 0;
              transform: translateY(40px) scale(0.95);
            }

            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          .login-logo {
            width: 72px;
            height: 72px;
            margin: 0 auto 18px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 22px;

            background: linear-gradient(
              135deg,
              #ff5ca8,
              #62cfff
            );

            color: #ffffff;
            font-size: 30px;
            font-weight: 700;

            box-shadow:
              0 12px 25px rgba(255, 92, 168, 0.25),
              0 8px 20px rgba(98, 207, 255, 0.25);

            animation: logoPulse 3s ease-in-out infinite;
          }

          @keyframes logoPulse {
            0%,
            100% {
              transform: scale(1);
            }

            50% {
              transform: scale(1.06);
            }
          }

          .login-title {
            margin: 0;
            color: #24324a;
            font-size: 29px;
            font-weight: 700;
            text-align: center;
          }

          .login-subtitle {
            margin: 9px 0 28px;
            color: #68768b;
            font-size: 14px;
            line-height: 1.6;
            text-align: center;
          }

          .input-group-wrapper {
            margin-bottom: 18px;
          }

          .input-label {
            display: block;
            margin-bottom: 8px;
            color: #3e4b61;
            font-size: 14px;
            font-weight: 600;
          }

          .input-container {
            position: relative;
          }

          .login-input {
            width: 100%;
            height: 52px;
            padding: 0 48px 0 16px;
            border: 1px solid rgba(130, 150, 180, 0.28);
            border-radius: 14px;
            outline: none;

            background: rgba(255, 255, 255, 0.78);
            color: #26344b;
            font-size: 15px;

            transition:
              border-color 0.3s ease,
              box-shadow 0.3s ease,
              transform 0.3s ease,
              background 0.3s ease;
          }

          .login-input::placeholder {
            color: #a1abba;
          }

          .login-input:focus {
            border-color: #67c9f8;
            background: #ffffff;
            box-shadow:
              0 0 0 4px rgba(95, 199, 249, 0.14),
              0 8px 18px rgba(90, 150, 190, 0.08);
            transform: translateY(-1px);
          }

          .input-icon {
            position: absolute;
            top: 50%;
            right: 16px;
            transform: translateY(-50%);
            color: #8995a8;
            font-size: 19px;
            pointer-events: none;
          }

          .password-toggle {
            position: absolute;
            top: 50%;
            right: 12px;
            transform: translateY(-50%);
            border: none;
            background: transparent;
            color: #728096;
            cursor: pointer;
            font-size: 13px;
            font-weight: 600;
            padding: 7px;
            transition: color 0.25s ease;
          }

          .password-toggle:hover {
            color: #ff5ca8;
          }

          .login-error {
            margin: 4px 0 16px;
            padding: 11px 14px;
            border: 1px solid rgba(220, 53, 69, 0.18);
            border-radius: 11px;
            background: rgba(255, 230, 235, 0.82);
            color: #c8324b;
            font-size: 13px;
            font-weight: 500;
            text-align: center;
            animation: errorShake 0.4s ease;
          }

          @keyframes errorShake {
            0%,
            100% {
              transform: translateX(0);
            }

            25% {
              transform: translateX(-6px);
            }

            75% {
              transform: translateX(6px);
            }
          }

          .login-button {
            position: relative;
            width: 100%;
            height: 53px;
            margin-top: 5px;
            border: none;
            border-radius: 14px;
            overflow: hidden;

            background: linear-gradient(
              100deg,
              #ff5ca8,
              #e77cce,
              #62cfff
            );

            background-size: 200% auto;
            color: #ffffff;
            cursor: pointer;
            font-size: 16px;
            font-weight: 700;
            letter-spacing: 0.3px;

            box-shadow:
              0 12px 25px rgba(255, 92, 168, 0.22),
              0 8px 20px rgba(98, 207, 255, 0.2);

            transition:
              transform 0.25s ease,
              box-shadow 0.25s ease,
              background-position 0.5s ease;
          }

          .login-button::before {
            position: absolute;
            top: 0;
            left: -100%;
            width: 70%;
            height: 100%;
            content: "";
            background: linear-gradient(
              90deg,
              transparent,
              rgba(255, 255, 255, 0.4),
              transparent
            );
            transform: skewX(-20deg);
            transition: left 0.7s ease;
          }

          .login-button:hover:not(:disabled) {
            transform: translateY(-2px);
            background-position: right center;
            box-shadow:
              0 16px 30px rgba(255, 92, 168, 0.28),
              0 10px 24px rgba(98, 207, 255, 0.24);
          }

          .login-button:hover:not(:disabled)::before {
            left: 140%;
          }

          .login-button:active:not(:disabled) {
            transform: translateY(0);
          }

          .login-button:disabled {
            cursor: not-allowed;
            opacity: 0.75;
          }

          .button-content {
            position: relative;
            z-index: 2;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 9px;
          }

          .button-spinner {
            width: 18px;
            height: 18px;
            border: 2px solid rgba(255, 255, 255, 0.45);
            border-top-color: #ffffff;
            border-radius: 50%;
            animation: spin 0.75s linear infinite;
          }

          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }

          .login-footer {
            margin: 22px 0 0;
            color: #7b8798;
            font-size: 12px;
            text-align: center;
          }

          @media (max-width: 576px) {
            .login-page {
              padding: 16px;
            }

            .login-card {
              padding: 30px 22px;
              border-radius: 20px;
            }

            .login-logo {
              width: 64px;
              height: 64px;
              border-radius: 19px;
              font-size: 27px;
            }

            .login-title {
              font-size: 25px;
            }

            .shape-one {
              width: 220px;
              height: 220px;
            }

            .shape-two {
              width: 260px;
              height: 260px;
            }
          }
        `}
      </style>

      <div className="login-page">
        <div className="login-shape shape-one" />
        <div className="login-shape shape-two" />
        <div className="login-shape shape-three" />
        <div className="login-shape shape-four" />

        <div className="login-card">
          <div className="login-logo">
            LF
          </div>

          <h1 className="login-title">
            Admin Login
          </h1>

          <p className="login-subtitle">
            Welcome back. Enter your credentials
            to access the admin dashboard.
          </p>

          <form onSubmit={handleLogin}>
            <div className="input-group-wrapper">
              <label
                htmlFor="admin-email"
                className="input-label"
              >
                Email Address
              </label>

              <div className="input-container">
                <input
                  id="admin-email"
                  type="email"
                  placeholder="Enter your email"
                  className="login-input"
                  value={email}
                  autoComplete="email"
                  disabled={loading}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                />

                <span className="input-icon">
                  ✉
                </span>
              </div>
            </div>

            <div className="input-group-wrapper">
              <label
                htmlFor="admin-password"
                className="input-label"
              >
                Password
              </label>

              <div className="input-container">
                <input
                  id="admin-password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your password"
                  className="login-input"
                  value={password}
                  autoComplete="current-password"
                  disabled={loading}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                />

                <button
                  type="button"
                  className="password-toggle"
                  disabled={loading}
                  onClick={() =>
                    setShowPassword(
                      (previousValue) =>
                        !previousValue
                    )
                  }
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {error && (
              <div
                className="login-error"
                role="alert"
              >
                {error}
              </div>
            )}

            <button
              className="login-button"
              type="submit"
              disabled={loading}
            >
              <span className="button-content">
                {loading && (
                  <span className="button-spinner" />
                )}

                {loading
                  ? "Signing In..."
                  : "Login to Dashboard"}
              </span>
            </button>
          </form>

          <p className="login-footer">
            Secure Admin Dashboard
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;