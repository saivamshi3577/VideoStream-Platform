import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate , Link } from "react-router-dom";
import "../styles/auth.css";

export default function Register() {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "viewer"
  });

  const submit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      navigate("/dashboard");
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <form className="auth-box" onSubmit={submit}>
      <h2>Register</h2>

      <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />

      <select onChange={e => setForm({ ...form, role: e.target.value })}>
        <option value="viewer">Viewer</option>
        <option value="editor">Editor</option>
      </select>

      <button type="submit">Register</button>
      <Link to="/" className="link-btn">
                  Login here
                </Link>
    </form>
  );
}
