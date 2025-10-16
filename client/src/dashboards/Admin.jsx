import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import {
  getJobs,
  createJob,
  getApplications,
  updateJobStatus,
  updateApplicationStatus,
  getApplicationsForJob, 
} from "../api";

export default function AdminDashboard() {
  const { token, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedJobApplications, setSelectedJobApplications] = useState([]);
  const [newJob, setNewJob] = useState({
    title: "",
    description: "",
    type: "technical",
    requirements: "",
    status: "active",
    location: "Remote",
    applicationDeadline: "",
  });
  const [statusUpdate, setStatusUpdate] = useState({
    status: "",
    comment: "",
  });

  function handleLogout() {
    localStorage.clear();
    navigate("/signin");
  }

  useEffect(() => {
    if (token) fetchJobs();
    if (token) fetchApplications();
  }, [token]);

  async function fetchJobs() {
    const data = await getJobs(token);
    if (!data.error) setJobs(data);
  }

  async function fetchApplications() {
    const data = await getApplications(token);
    if (!data.error) setApplications(data);
  }

  async function handleCreateJob(e) {
    e.preventDefault();

    const jobData = {
      ...newJob,
      requirements: newJob.requirements.split(",").map((r) => r.trim()),
      createdBy: user?._id || user?.username || "admin",
    };

    const data = await createJob(token, jobData);
    if (!data.error) {
      fetchJobs();
      setNewJob({
        title: "",
        description: "",
        type: "technical",
        requirements: "",
        status: "active",
        location: "Remote",
        applicationDeadline: "",
      });
    } else alert(data.error);
  }

  async function handleUpdateApplication(appId) {
    if (!statusUpdate.status) return alert("Select status first");
    const data = await updateApplicationStatus(token, appId, statusUpdate);
    if (!data.error) fetchApplications();
    else alert(data.error);
  }

  async function handleViewApplications(job) {
    const apps = await getApplicationsForJob(token, job._id);
    setSelectedJob(job);
    setSelectedJobApplications(apps);
  }
  async function handleCloseJob(jobId) {
  const res = await updateJobStatus(token, jobId, { status: "closed" });
  if (!res.error) fetchJobs();
  else alert(res.error);
}

  console.log("selectedJob", selectedJob);
  console.log("applications", applications);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-black to-blue-950 p-6">
      <div className="max-w-4xl mx-auto bg-black/90 rounded-lg shadow-lg p-6 border border-blue-950">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-white text-center">
            Admin Dashboard
          </h2>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800"
          >
            Logout
          </button>
        </div>
        <p className="text-slate-300 mb-6 text-center">
          Welcome,{" "}
          <span className="font-semibold">{user?.username || "Admin"}</span>
        </p>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-white mb-3">
            Create Job Posting
          </h3>
          <form
            onSubmit={handleCreateJob}
            className="grid gap-4 md:grid-cols-2"
          >
            <div>
              <label
                className="block text-slate-200 mb-1"
                htmlFor="title"
              >
                Title
              </label>
              <input
                id="title"
                type="text"
                value={newJob.title}
                onChange={(e) =>
                  setNewJob({ ...newJob, title: e.target.value })
                }
                required
                className="w-full p-2 rounded bg-slate-900 text-white border border-blue-950"
              />
            </div>
            <div>
              <label
                className="block text-slate-200 mb-1"
                htmlFor="description"
              >
                Description
              </label>
              <input
                id="description"
                type="text"
                value={newJob.description}
                onChange={(e) =>
                  setNewJob({ ...newJob, description: e.target.value })
                }
                required
                className="w-full p-2 rounded bg-slate-900 text-white border border-blue-950"
              />
            </div>
            <div>
              <label className="block text-slate-200 mb-1" htmlFor="type">
                Type
              </label>
              <select
                id="type"
                value={newJob.type}
                onChange={(e) => setNewJob({ ...newJob, type: e.target.value })}
                className="w-full p-2 rounded bg-slate-900 text-white border border-blue-950"
              >
                <option value="technical">Technical</option>
                <option value="non-technical">Non-Technical</option>
              </select>
            </div>
            <div>
              <label
                className="block text-slate-200 mb-1"
                htmlFor="requirements"
              >
                Requirements (comma separated)
              </label>
              <input
                id="requirements"
                type="text"
                value={newJob.requirements}
                onChange={(e) =>
                  setNewJob({ ...newJob, requirements: e.target.value })
                }
                className="w-full p-2 rounded bg-slate-900 text-white border border-blue-950"
              />
            </div>
            <div>
              <label className="block text-slate-200 mb-1" htmlFor="status">
                Status
              </label>
              <select
                id="status"
                value={newJob.status}
                onChange={(e) => setNewJob({ ...newJob, status: e.target.value })}
                className="w-full p-2 rounded bg-slate-900 text-white border border-blue-950"
              >
                <option value="active">Active</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-200 mb-1" htmlFor="location">
                Location
              </label>
              <input
                id="location"
                type="text"
                value={newJob.location}
                onChange={(e) =>
                  setNewJob({ ...newJob, location: e.target.value })
                }
                className="w-full p-2 rounded bg-slate-900 text-white border border-blue-950"
              />
            </div>
            <div>
              <label
                className="block text-slate-200 mb-1"
                htmlFor="applicationDeadline"
              >
                Application Deadline
              </label>
              <input
                id="applicationDeadline"
                type="date"
                value={newJob.applicationDeadline}
                onChange={(e) =>
                  setNewJob({ ...newJob, applicationDeadline: e.target.value })
                }
                required
                className="w-full p-2 rounded bg-slate-900 text-white border border-blue-950"
              />
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full py-2 bg-blue-950 text-white rounded hover:bg-blue-900 font-semibold"
              >
                Create Job
              </button>
            </div>
          </form>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-white mb-3">Jobs List</h3>
          <ul className="space-y-2">
            {jobs.map((job) => (
              <li
                key={job._id}
                className="bg-slate-900 p-3 rounded border border-blue-950 flex flex-col md:flex-row md:items-center md:justify-between"
              >
                <span>
                  <span className="font-semibold text-white">{job.title}</span> (
                  {job.type}) -{" "}
                  <span className="text-slate-300">
                    Status: {job.status} - Location: {job.location} - Deadline:{" "}
                    {job.applicationDeadline?.split("T")[0]}
                  </span>
                </span>
                <button
                  className="mt-2 md:mt-0 px-3 py-1 bg-blue-950 text-white rounded hover:bg-blue-900"
                  onClick={() => handleViewApplications(job)}
                >
                  View Applications
                </button>
                <button
  className="ml-2 px-3 py-1 bg-red-700 text-white rounded hover:bg-red-800"
  onClick={() => handleCloseJob(job._id)}
  disabled={job.status === "closed"}
>
  Close Job
</button>
              </li>
            ))}
          </ul>
        </div>

        {selectedJob && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-3">
              Applications for: {selectedJob.title}
            </h3>
            {selectedJobApplications.length === 0 ? (
              <div className="text-slate-300">No applications for this job.</div>
            ) : (
              <ul className="space-y-2">
                {selectedJobApplications.map((app) => (
                  <li key={app._id} className="bg-slate-900 p-3 rounded border border-blue-950">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-white">
                        {selectedJob.title} — {app.applicant?.username || app.applicant || "Unknown Applicant"}
                      </span>
                      <span className="text-slate-300">Status: {app.status}</span>
                    </div>
                    <div className="text-slate-400 text-xs">
                      Applied: {new Date(app.appliedAt || Date.now()).toLocaleString()}
                    </div>
                    {app.resume && (
                      <a
                        href={`http://localhost:4000/${app.resume}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 underline mr-2"
                      >
                        View Resume
                      </a>
                    )}
                    {app.coverLetter && (
                      <p className="text-slate-300 text-sm mt-1">
                        <strong>Cover Letter:</strong> {app.coverLetter}
                      </p>
                    )}
                    {app.logs?.length > 0 && (
                      <div className="mt-2 text-slate-300">
                        <span>Logs:</span>
                        <ul className="ml-4 text-xs text-slate-400">
                          {app.logs.map((log, idx) => (
                            <li key={idx}>
                              {log.timestamp} - {log.updatedBy}: {log.status}{" "}
                              {log.comment && `(${log.comment})`}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {/* Only show status/comment/update for non-technical roles */}
                    {selectedJob.type === "non-technical" && (
                      <div className="flex gap-2 mt-2">
                        <select
                          value={statusUpdate.status}
                          onChange={(e) =>
                            setStatusUpdate({ ...statusUpdate, status: e.target.value })
                          }
                          className="p-1 rounded bg-slate-800 text-white border border-blue-950"
                        >
                          <option value="">--Select Status--</option>
                          <option value="reviewed">Reviewed</option>
                          <option value="interview">Interview</option>
                          <option value="rejected">Rejected</option>
                          <option value="offer">Offer</option>
                        </select>
                        <input
                          type="text"
                          placeholder="Comment"
                          value={statusUpdate.comment}
                          onChange={(e) =>
                            setStatusUpdate({ ...statusUpdate, comment: e.target.value })
                          }
                          className="p-1 rounded bg-slate-800 text-white border border-blue-950"
                        />
                        <button
                          className="px-3 py-1 bg-green-700 text-white rounded hover:bg-green-800"
                          onClick={() => handleUpdateApplication(app._id)}
                        >
                          Update
                        </button>
                      </div>
                    )}
                    {/* For technical roles, show disabled fields*/}
                    {selectedJob.type === "technical" && (
                      <div className="flex gap-2 mt-2 opacity-50 pointer-events-none">
                        <select disabled className="p-1 rounded bg-slate-800 text-white border border-blue-950">
                          <option value="">--Select Status--</option>
                          <option value="reviewed">Reviewed</option>
                          <option value="interview">Interview</option>
                          <option value="rejected">Rejected</option>
                          <option value="hired">Hired</option>
                        </select>
                        <input
                          type="text"
                          placeholder="Comment"
                          disabled
                          className="p-1 rounded bg-slate-800 text-white border border-blue-950"
                        />
                        <button
                          className="px-3 py-1 bg-green-700 text-white rounded hover:bg-green-800"
                          disabled
                        >
                          Update
                        </button>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}