import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Upload from "./pages/Upload";
import Dashboard from "./pages/Dashboard";
import Player from "./pages/Player";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/Register";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/upload"
          element={<ProtectedRoute><Upload /></ProtectedRoute>}
        />
        <Route
          path="/dashboard"
          element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
        />
        <Route
          path="/player/:id"
          element={<ProtectedRoute><Player /></ProtectedRoute>}
        />
      </Routes>
    </BrowserRouter>
  );
}
