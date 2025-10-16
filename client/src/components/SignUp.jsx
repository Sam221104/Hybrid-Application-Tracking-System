import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerApplicant } from "../api";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const data = await registerApplicant({ username, password });
    if (data.id) {
      navigate("/signin");
    } else {
      setError(data.error || "Signup failed");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-black to-blue-950">
      <form
        onSubmit={handleSubmit}
        className="bg-black/90 p-8 rounded-lg shadow-lg border border-blue-950 w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Applicant Sign Up</h2>
        {error && <div className="mb-4 text-red-400 text-sm text-center">{error}</div>}
        <div className="mb-4">
          <label className="block text-slate-200 mb-2" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            type="text"
            className="w-full px-4 py-2 rounded bg-slate-900 text-white border border-blue-950 focus:outline-none focus:border-blue-400"
            value={username}
            onChange={e => setUsername(e.target.value)}
            autoComplete="username"
          />
        </div>
        <div className="mb-6">
          <label className="block text-slate-200 mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full px-4 py-2 rounded bg-slate-900 text-white border border-blue-950 focus:outline-none focus:border-blue-400"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete="new-password"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-950 text-white rounded hover:bg-blue-900 transition-colors font-semibold"
        >
          Sign Up
        </button>
        <div className="mt-4 text-center">
          <span className="text-slate-300">Already have an account?</span>
          <button
            type="button"
            className="ml-2 text-blue-400 underline bg-transparent border-none cursor-pointer"
            onClick={() => navigate("/signin")}
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}