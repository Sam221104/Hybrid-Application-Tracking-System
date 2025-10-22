const API_BASE = import.meta.env.VITE_API_BASE;


async function parseResponse(res) {
  const text = await res.text();
  try { return { status: res.status, data: JSON.parse(text) }; }
  catch { return { status: res.status, data: text }; }
}

export async function registerApplicant({ username, password }) {
  try {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const { status, data } = await parseResponse(res);
    if (status >= 400) return { error: data?.error || data || `Request failed (${status})`, status };
    return { ...data, status };
  } catch (err) {
    return { error: err.message || "Network error" };
  }
}

export async function loginApplicant({ username, password }) {
  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const { status, data } = await parseResponse(res);
    if (status >= 400) return { error: data?.error || data || `Request failed (${status})`, status };
    return { ...data, status };
  } catch (err) {
    return { error: err.message || "Network error" };
  }
}

export async function getJobs(token) {
  try {
    const res = await fetch(`${API_BASE}/jobs`, {
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    const { status, data } = await parseResponse(res);
    if (status >= 400) return { error: data?.error || data || `Request failed (${status})`, status };
    return data;
  } catch (err) {
    return { error: err.message || "Network error" };
  }
}

export async function getJobsForApplicants(token) {
  try {
    const res = await fetch("http://localhost:4000/api/applications", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (res.status >= 400) return { error: data?.error || "Failed to fetch jobs" };
    return data;
  } catch (err) {
    return { error: err.message || "Network error" };
  }
}
export async function applyToJob(token, { jobId, coverLetter = "", resumeFile = null }) {
  try {
    const formData = new FormData();
    formData.append("jobId", jobId);
    formData.append("coverLetter", coverLetter);
    if (resumeFile) formData.append("resume", resumeFile);

    const res = await fetch(`${API_BASE}/applications`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`, 
      },
      body: formData,
    });

    const data = await res.json();
    if (res.status >= 400) return { error: data?.error || `Apply failed (${res.status})` };
    return data;
  } catch (err) {
    return { error: err.message || "Network error" };
  }
}


export async function getMyApplications(token) {
  try {
    const res = await fetch(`${API_BASE}/applications/applicant`, {
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    });
    const { status, data } = await parseResponse(res);
    if (status >= 400) return { error: data?.error || data || `Request failed (${status})`, status };
    return data;
  } catch (err) {
    return { error: err.message || "Network error" };
  }
}

export async function createJob(token, job) {
  try {
    const res = await fetch(`${API_BASE}/jobs/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(job),
    });
    const { status, data } = await parseResponse(res);
    if (status >= 400) return { error: data?.error || data || `Request failed (${status})`, status };
    return data;
  } catch (err) {
    return { error: err.message || "Network error" };
  }
}

export async function getApplications(token) {
  try {
    const res = await fetch(`${API_BASE}/applications`, {
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    const { status, data } = await parseResponse(res);
    if (status >= 400) return { error: data?.error || data || `Request failed (${status})`, status };
    return data;
  } catch (err) {
    return { error: err.message || "Network error" };
  }
}

export async function updateApplicationStatus(token, applicationId, statusUpdate) {
  try {
    const res = await fetch(`${API_BASE}/applications/${applicationId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(statusUpdate),
    });
    const { status, data } = await parseResponse(res);
    if (status >= 400) return { error: data?.error || data || `Request failed (${status})`, status };
    return data;
  } catch (err) {
    return { error: err.message || "Network error" };
  }
}

export async function getApplicationsForJob(token, jobId) {
  const res = await fetch(`http://localhost:4000/api/applications/job/${jobId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return await res.json();
}

export async function updateJobStatus(token, jobId, statusUpdate) {
  try {
    const res = await fetch(`${API_BASE}/jobs/${jobId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(statusUpdate),
    });
    const { status, data } = await parseResponse(res);
    if (status >= 400) return { error: data?.error || data || `Request failed (${status})`, status };
    return data;
  } catch (err) {
    return { error: err.message || "Network error" };
  }
}


export async function getBotLogs(token) {
  const res = await fetch(`${API_BASE}/bot/logs`, {
    headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) }
  });
  return await res.json();
}

export async function runBotMimic(token) {
  const res = await fetch(`${API_BASE}/bot/run`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) }
  });
  return await res.json();
}
