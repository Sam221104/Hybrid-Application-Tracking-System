import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContext";
import { getBotLogs, runBotMimic } from "../api";
import { useNavigate } from "react-router-dom";

export default function BotDashboard() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [runningBot, setRunningBot] = useState(false);
  const [expandedApps, setExpandedApps] = useState({});

  async function fetchLogs() {
    if (!token) return;
    setLoading(true);
    const data = await getBotLogs(token);
    console.log("Fetched logs:", data);

    if (data && data.length > 0) {
      const mappedLogs = data.map((log) => ({
        ...log,
        application: log.application || {},
        applicationId: log.application?._id,
        applicationJobTitle: log.application?.job?.title || "Unknown Job",
        applicationApplicantName: log.application?.applicant?.username || "Unknown Applicant",
      }));
      console.log("Mapped logs:", mappedLogs);
      setLogs(mappedLogs);
    } else {
      setLogs([]);
    }
    setLoading(false);
  }

  async function handleRunBot() {
    if (!token) return;
    setRunningBot(true);
    await runBotMimic(token);
    await fetchLogs();
    setRunningBot(false);
  }

  function handleLogout() {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/signin";
    navigate("/signin");
  }

  useEffect(() => {
    if (!token) navigate("/signin");
    fetchLogs();
  }, [token]);

const groupedLogs = logs.reduce((acc, log) => {
  const jobTitle = log.application?.job?.title || log.jobTitle || log.applicationJobTitle || "Unknown Job";
  const applicantName = log.application?.applicant?.username || log.applicant || log.applicationApplicantName || "Unknown Applicant";

  const groupKey = jobTitle + "||" + applicantName;

  if (!acc[groupKey]) {
    acc[groupKey] = {
      jobTitle,
      applicantName,
      logs: [],
    };
  }
  acc[groupKey].logs.push(log);
  return acc;
}, {});


  const toggleExpand = (appId) => {
    setExpandedApps((prev) => ({ ...prev, [appId]: !prev[appId] }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-black to-blue-950 p-6">
      <div className="max-w-5xl mx-auto bg-black/90 rounded-lg shadow-lg p-6 border border-blue-950">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-white">Bot Dashboard</h2>
          <div className="flex gap-2">
            <button
              onClick={handleRunBot}
              disabled={runningBot}
              className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800"
            >
              {runningBot ? "Running Bot..." : "Run Bot Mimic"}
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800"
            >
              Logout
            </button>
          </div>
        </div>

        {loading ? (
          <p className="text-white">Loading logs...</p>
        ) : Object.keys(groupedLogs).length === 0 ? (
          <p className="text-slate-300">No logs available yet.</p>
        ) : (
          <div>
            {Object.entries(groupedLogs).map(([groupKey, appData]) => {
  const latestLog = appData.logs.reduce((a, b) =>
    new Date(a.timestamp) > new Date(b.timestamp) ? a : b
  );

  const isExpanded = expandedApps[groupKey] || false;

  return (
    <div key={groupKey} className="bg-slate-900 p-4 mb-4 rounded-lg border border-blue-950">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => toggleExpand(groupKey)}
      >
        <h3 className="text-xl text-white">
          {appData.jobTitle} - {appData.applicantName} (
          <span className="text-green-400">{latestLog.status}</span>)
        </h3>
        <span className="text-blue-400">{isExpanded ? "▲" : "▼"}</span>
      </div>

      {isExpanded && (
        <div className="mt-2 overflow-x-auto">
          <table className="min-w-full border border-blue-950 text-left">
            <thead>
              <tr className="bg-slate-800 text-white">
                <th className="px-4 py-2 border-b border-blue-950">Status</th>
                <th className="px-4 py-2 border-b border-blue-950">Comment</th>
                <th className="px-4 py-2 border-b border-blue-950">Updated By</th>
                <th className="px-4 py-2 border-b border-blue-950">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {appData.logs
                .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)) 
                .map((log) => (
                  <tr key={log._id} className="bg-slate-800 text-slate-200">
                    <td className="px-4 py-2 border-b border-blue-950">{log.status}</td>
                    <td className="px-4 py-2 border-b border-blue-950">{log.comment || "-"}</td>
<td className="px-4 py-2 border-b border-blue-950">
  {(() => {
    let name =
      typeof log.updatedBy === "object"
        ? log.updatedBy?.username || "Unknown"
        : log.updatedBy || "Unknown";
    return name === "bot1" ? "Mimic Bot" : name;
  })()}
</td>
                    <td className="px-4 py-2 border-b border-blue-950">{new Date(log.timestamp).toLocaleString()}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
})}
          </div>
        )}
      </div>
    </div>
  );
}
