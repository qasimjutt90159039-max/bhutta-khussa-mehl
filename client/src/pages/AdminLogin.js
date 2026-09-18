import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(email, password);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-5 py-24">
      <h1 className="text-2xl text-ivory mb-2">Admin Login</h1>
      <p className="text-stone text-sm mb-8">Manage products and orders for Bhutta Khussa Mehal</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && <p className="text-maroon text-sm">{error}</p>}
        <div>
          <label className="text-sm text-ivory block mb-1">Email</label>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-charcoal border border-brass/20 text-ivory px-4 py-3 text-sm focus:border-brass outline-none"
          />
        </div>
        <div>
          <label className="text-sm text-ivory block mb-1">Password</label>
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-charcoal border border-brass/20 text-ivory px-4 py-3 text-sm focus:border-brass outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-brass text-ink py-3 text-sm mt-2 hover:bg-ivory transition-colors disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Log In"}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
