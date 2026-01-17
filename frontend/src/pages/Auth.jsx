import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, signupUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Auth() {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (mode === "login") {
        const data = await loginUser(email, password);
        login(data.access_token);
        navigate("/app");
      } else {
        await signupUser(email, password);
        setMode("login");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-center mb-4">
              {mode === "login" ? "Welcome back 👋" : "Create account ✨"}
            </h2>

            {error && (
              <p className="text-red-500 text-sm text-center mb-3">{error}</p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full border px-4 py-3 rounded-xl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <input
                type="password"
                placeholder="Password"
                className="w-full border px-4 py-3 rounded-xl"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-xl"
              >
                {mode === "login" ? "Login" : "Sign up"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm">
              {mode === "login"
                ? "Don’t have an account?"
                : "Already have an account?"}
              <button
                onClick={() =>
                  setMode(mode === "login" ? "signup" : "login")
                }
                className="ml-2 font-semibold underline"
              >
                {mode === "login" ? "Sign up" : "Login"}
              </button>
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
