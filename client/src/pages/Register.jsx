import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    goals: "",
  });

  const update = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const submit = async (event) => {
  event.preventDefault();
  setError("");

  try {
    console.log("Submitting registration request");

    await register(form);

    console.log("Registration successful");
    navigate("/dashboard");
  } catch (err) {
    console.error("Registration failed:", err);
    console.error("Server response:", err.response?.data);
    console.error("HTTP status:", err.response?.status);

    const message =
      err.response?.data?.message ||
      err.response?.data?.error ||
      err.message ||
      "Registration failed";

    setError(message);
  }
};

  return (
    <main className="formPage">
      <form
        className="formCard"
        onSubmit={submit}
      >
        <p className="eyebrow">
          START YOUR JOURNEY
        </p>

        <h1>Create your account</h1>

        {error && (
          <p className="error">{error}</p>
        )}

        <label>
          Name
          <input
            name="name"
            value={form.name}
            onChange={update}
            required
          />
        </label>

        <label>
          Email
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={update}
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={update}
            minLength="8"
            required
          />
        </label>

        <label>
          What would you like to improve?
          <textarea
            name="goals"
            value={form.goals}
            onChange={update}
            rows="4"
          />
        </label>

        <button className="button">
          Create account
        </button>
      </form>
    </main>
  );
}