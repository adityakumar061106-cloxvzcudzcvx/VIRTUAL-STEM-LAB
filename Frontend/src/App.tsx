import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Experiments from "./pages/Experiments";
import Progress from "./pages/Progress";
import OhmsLaw from "./pages/OhmsLaw";
import Courses from "./pages/Courses";

function App() {
  return (
    <Routes>
      {/* Dashboard */}
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Experiments */}
      <Route path="/experiments" element={<Experiments />} />
      <Route
        path="/experiments/ohms-law"
        element={<OhmsLaw />}
      />

      {/* Courses */}
      <Route path="/courses" element={<Courses />} />

      {/* Progress */}
      <Route path="/progress" element={<Progress />} />

      {/* Future Pages */}
      <Route
        path="/my-lab"
        element={<Navigate to="/courses" replace />}
      />

      <Route
        path="/assignments"
        element={<Navigate to="/courses" replace />}
      />

      <Route
        path="/settings"
        element={<Navigate to="/" replace />}
      />

      {/* Unknown Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;