import React, { useContext, useState } from "react";
import AlertContext from "../alert/alertContext";
import AuthContext from "../auth/authContext";

// optional old background image
import CardBg from "../assets/Subtract.png"; // adjust path if needed

function SignUp() {
  const { register, loading } = useContext(AuthContext);
  const { addAlert } = useContext(AlertContext);

  const [user, setUser] = useState({
    name: "",
    nickName: "",
    email: "",
    password: "",
    agreed: false,
  });

  const { name, nickName, email, password, agreed } = user;

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      addAlert("Please fill the required fields.", "danger");
      return;
    }
    if (!agreed) {
      addAlert("Please accept the K2G Terms.", "danger");
      return;
    }

    const ok = await register({ name, nickName, email, password });
    if (ok) addAlert("Account created. You can sign in now.", "success");
    setUser({
      name: "",
      nickName: "",
      email: "",
      password: "",
      agreed: false,
    });
  };

  return (
    <div className="w-full">
      <div
        className="
          relative overflow-hidden rounded-3xl
          border border-white/10 bg-white/5 shadow-xl backdrop-blur
        "
      >
        {/* Background image layer */}
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: `url(${CardBg})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/15 to-black/45" />

        {/* Content */}
        <div className="relative p-6 sm:p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-white">Sign up</h2>
            <p className="mt-1 text-sm text-white/70">
              Create your account and start booking.
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            {/* Name */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-white/70">Name</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={onChange}
                placeholder="Your name"
                className="
                  w-full rounded-2xl border border-white/10
                  bg-black/30 px-4 py-3 text-white
                  placeholder:text-white/40 outline-none
                  focus:border-[#fabf2f]/60 focus:ring-2 focus:ring-[#fabf2f]/20
                "
              />
            </div>

            {/* Nickname */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-white/70">
                Nick name
              </label>
              <input
                type="text"
                name="nickName"
                value={nickName}
                onChange={onChange}
                placeholder="Nick name (optional)"
                className="
                  w-full rounded-2xl border border-white/10
                  bg-black/30 px-4 py-3 text-white
                  placeholder:text-white/40 outline-none
                  focus:border-[#fabf2f]/60 focus:ring-2 focus:ring-[#fabf2f]/20
                "
              />
            </div>

            {/* Email */}
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

            {/* Password */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-white/70">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                placeholder="Create a password"
                className="
                  w-full rounded-2xl border border-white/10
                  bg-black/30 px-4 py-3 text-white
                  placeholder:text-white/40 outline-none
                  focus:border-[#fabf2f]/60 focus:ring-2 focus:ring-[#fabf2f]/20
                "
              />
            </div>

            {/* Terms */}
            <div className="flex items-center gap-3 pt-1">
              <input
                type="checkbox"
                name="agreed"
                checked={agreed}
                onChange={onChange}
                className="h-4 w-4 accent-[#fabf2f]"
                required
              />
              <label className="text-sm text-white/70">
                I agree to the K2G Terms
              </label>
            </div>

            {/* Submit */}
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
              {loading ? "Creating..." : "Sign up"}
            </button>
          </form>

          <p className="mt-6 text-xs text-white/50">
            Your data is used only to manage your bookings.
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
