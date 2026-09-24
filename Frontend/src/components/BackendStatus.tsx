import { useEffect, useState } from "react";
import { checkBackendHealth } from "../api";

function BackendStatus() {
  const [status, setStatus] = useState("Checking...");
  const [error, setError] = useState("");

  useEffect(() => {
    checkBackendHealth()
      .then((data) => {
        setStatus(data.status);
      })
      .catch(() => {
        setError("Backend connection failed");
      });
  }, []);

  return (
    <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900 p-5">
      <p className="text-sm text-slate-400">
        Backend Status
      </p>

      {error ? (
        <p className="mt-2 text-red-400">
          🔴 {error}
        </p>
      ) : (
        <p className="mt-2 text-emerald-400">
          🟢 {status}
        </p>
      )}
    </div>
  );
}

export default BackendStatus;