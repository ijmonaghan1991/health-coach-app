import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [error, setError] = useState("");

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const update = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const submit = async (event) => {
    event.preventDefault();

    try {
      setError("");

      await login(form);

      navigate("/dashboard");
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Login failed"
      );
    }
  };

  return (
    <main className="formPage">
      <form
        className="formCard"
        onSubmit={submit}
      >
        <p className="eyebrow">WELCOME BACK</p>

        <h1>Sign in</h1>

        {error && (
          <p className="error">{error}</p>
        )}

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
            required
          />
        </label>

        <button className="button">
          Sign in
        </button>
      </form>
    </main>
  );
}