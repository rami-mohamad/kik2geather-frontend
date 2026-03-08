import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../auth/authContext";
import AlertContext from "../alert/alertContext";

// Optional: use your old background image
import CardBg from "../assets/Section 2.png"; // adjust path

function SignIn() {
  const navigate = useNavigate();

  const { login, error, isAuthenticated, clearError, loading } =
    useContext(AuthContext);
  const { addAlert } = useContext(AlertContext);

  const [user, setUser] = useState({ email: "", password: "" });
  const { email, password } = user;

  useEffect(() => {
    if (error) {
      addAlert(error, "error");
      clearError();
    }
    // if (isAuthenticated) navigate("/dashboard");
  }, [error, isAuthenticated, addAlert, clearError, navigate]);

  const onChange = (e) =>
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      addAlert("Please fill all fields.", "warning");
      return;
    }
    const ok = await login({ email, password });
    if (ok) navigate("/dashboard");
  };

  return (
    <div className="w-full">
      <div
        className="
          relative overflow-hidden rounded-3xl
          border border-white/10 bg-white/5 shadow-xl backdrop-blur
        "
      >
        {/* Background image layer (like your old design) */}
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: `url(${CardBg})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50" />

        {/* Content */}
        <div className="relative p-6 sm:p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-white">Sign in</h2>
            <p className="mt-1 text-sm text-white/70">
              Welcome back — log in to continue.
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-medium text-white/70">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                placeholder="name@example.com"
                className="
                  w-full rounded-2xl border border-white/10
                  bg-black/30 px-4 py-3 text-white
                  placeholder:text-white/40 outline-none
                  focus:border-[#fabf2f]/60 focus:ring-2 focus:ring-[#fabf2f]/20
                "
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-white/70">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                placeholder="••••••••"
                className="
                  w-full rounded-2xl border border-white/10
                  bg-black/30 px-4 py-3 text-white
                  placeholder:text-white/40 outline-none
                  focus:border-[#fabf2f]/60 focus:ring-2 focus:ring-[#fabf2f]/20
                "
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="
                group inline-flex w-full items-center justify-center
                rounded-2xl px-4 py-3 font-semibold
                bg-[linear-gradient(to_bottom,#ffe79e_13%,#897129_38%,#504630_98%)]
                text-[#0c0c0c]
                transition-all duration-200
                hover:bg-white hover:shadow-inner
                disabled:cursor-not-allowed disabled:opacity-50
              "
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>

            <div className="flex items-center justify-between pt-1">
              <span className="text-xs text-white/60">
                Forgot your password?
              </span>
              <Link
                to="/reset"
                className="text-sm font-semibold text-[#fabf2f] hover:text-white"
              >
                Reset
              </Link>
            </div>
          </form>

          {/* Optional footer line */}
          <p className="mt-6 text-xs text-white/50">
            By continuing you agree to our Terms & Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
