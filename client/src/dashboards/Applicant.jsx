import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import { getJobsForApplicants, getMyApplications, applyToJob } from "../api";

export default function ApplicantDashboard() {
  const { token, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [loadingApps, setLoadingApps] = useState(true);
  const [error, setError] = useState("");
  const [applyingFor, setApplyingFor] = useState(null);
  const [formData, setFormData] = useState({ coverLetter: "", resume: null });

  function handleLogout() {
    localStorage.clear();
    navigate("/signin");
  }

  useEffect(() => {
    if (!token) return;
    setLoadingJobs(true);
    setError("");
    getJobsForApplicants(token)
      .then((res) => {
        if (res?.error) setError(res.error);
        else setJobs(Array.isArray(res) ? res : []);
        setLoadingJobs(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to fetch jobs");
        setLoadingJobs(false);
      });
  }, [token]);

  useEffect(() => {
    if (!token) return;
    setLoadingApps(true);
    getMyApplications(token)
      .then((res) => {
        if (res?.error) setError(res.error);
        else setApplications(Array.isArray(res) ? res : []);
        setLoadingApps(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to fetch applications");
        setLoadingApps(false);
      });
  }, [token]);

  async function handleSubmitApplication(e) {
    e.preventDefault();
    if (!token) {
      setError("You must be signed in to apply.");
      return;
    }
    setError("");

    try {
      const res = await applyToJob(token, {
        jobId: applyingFor,
        coverLetter: formData.coverLetter,
        resumeFile: formData.resume,
      });

      if (res?.error) {
        setError(res.error);
        return;
      }

      const apps = await getMyApplications(token);
      if (!apps.error) setApplications(Array.isArray(apps) ? apps : []);

      setApplyingFor(null);
      setFormData({ coverLetter: "", resume: null });
      alert("Application submitted.");
    } catch (err) {
      setError(err.message || "Failed to apply.");
    }
  }

  const appliedJobIds = new Set(applications.map((app) => app.job?._id));
  const jobsWithApplied = jobs.map((job) => ({
    ...job,
    applied: appliedJobIds.has(job._id),
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-black to-blue-950 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Available Jobs</h1>
          <span className="text-xl font-semibold text-slate-200 bg-black/60 px-6 py-2 rounded-lg shadow">
            {user?.username ? `Welcome, ${user.username}` : "Welcome"}
          </span>
        
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800"
          >
            Logout
          </button>
        </div>
        
        {loadingJobs && <div className="text-slate-300">Loading jobs...</div>}
        {error && <div className="mb-4 text-red-400">{error}</div>}
        {!loadingJobs && jobsWithApplied.length === 0 && (
          <div className="text-slate-300">No jobs available.</div>
        )}

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          {jobsWithApplied.map((job) => (
            <article key={job._id} className="bg-black/80 border border-blue-950 p-4 rounded-lg">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white">{job.title}</h3>
                  <p className="text-sm text-slate-300 mt-1">{job.location || "Remote"}</p>
                </div>
                <span className="px-2 py-1 text-xs rounded bg-indigo-700 text-white">
                  {job.type === "technical" ? "Technical" : "Non-Technical"}
                </span>
              </div>
              <p className="mt-3 text-slate-300 text-sm">{job.description}</p>

              {job.applied ? (
                <button className="mt-4 px-4 py-2 bg-gray-600 text-white rounded opacity-60" disabled>
                  Applied
                </button>
              ) : (
                <button
                  onClick={() => {
                    setApplyingFor(job._id);
                    setFormData({ coverLetter: "", resume: null });
                  }}
                  className="mt-4 px-4 py-2 bg-blue-950 text-white rounded hover:bg-blue-900"
                >
                  Apply
                </button>
              )}

              {applyingFor === job._id && (
                <form onSubmit={handleSubmitApplication} className="mt-2 flex flex-col gap-2">
                  <textarea
                    placeholder="Cover Letter"
                    value={formData.coverLetter}
                    onChange={(e) =>
                      setFormData({ ...formData, coverLetter: e.target.value })
                    }
                    className="p-2 rounded bg-black/70 text-white"
                  />
                  <input
                    type="file"
                    onChange={(e) =>
                      setFormData({ ...formData, resume: e.target.files[0] })
                    }
                    className="text-white"
                  />
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-950 text-white rounded hover:bg-blue-900"
                    >
                      Submit Application
                    </button>
                    <button
                      type="button"
                      onClick={() => setApplyingFor(null)}
                      className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </article>
          ))}
        </div>

        <section className="mt-8">
          <h2 className="text-xl font-semibold text-white mb-3">My Applications</h2>
          {loadingApps ? (
            <div className="text-slate-300">Loading applications...</div>
          ) : applications.length === 0 ? (
            <div className="text-slate-300">You have not applied to any jobs yet.</div>
          ) : (
            <div className="space-y-3">
              {applications.map((app) => (
                <div key={app._id} className="bg-black/80 border border-blue-950 p-3 rounded">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-white font-medium">{app.job?.title || "Job"}</div>
                      <div className="text-slate-300 text-sm">{app.job?.location || ""}</div>
                      <div className="text-slate-400 text-xs mt-1">
                        Applied: {new Date(app.appliedAt || Date.now()).toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          app.status === "shortlisted"
                            ? "bg-green-700"
                            : app.status === "rejected"
                            ? "bg-red-700"
                            : "bg-yellow-700"
                        } text-white`}
                      >
                        {app.status || "submitted"}
                      </span>
                    </div>
                  </div>
                  {app.comments?.length > 0 && (
                    <div className="text-slate-300 text-sm mt-2">
                      {app.comments.map((c, idx) => (
                        <p key={idx}>{c}</p>
                      ))}
                    </div>
                  )}
                  {app.resume && (
                    <div className="mt-1">
                      <a
                        href={`http://localhost:4000/${app.resume}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 text-sm underline"
                      >
                        View Resume
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
