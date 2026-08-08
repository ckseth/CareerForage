import api from './api';

export const fetchJobs = async (params = {}) => {
  const response = await api.get('/jobs', { params });
  return response.data;
};

export const fetchJobById = async (id) => {
  const response = await api.get(`/jobs/${id}`);
  return response.data;
};

export const fetchMyJobs = async () => {
  const response = await api.get('/jobs/my-jobs');
  return response.data;
};

export const createJobPosting = async (jobData) => {
  const response = await api.post('/jobs', jobData);
  return response.data;
};

export const deleteJobPosting = async (id) => {
  const response = await api.delete(`/jobs/${id}`);
  return response.data;
};

export const fetchMyResumes = async () => {
  const response = await api.get('/resumes/my');
  return response.data;
};

export const saveResume = async (resumeData) => {
  const response = await api.post('/resumes', resumeData);
  return response.data;
};

export const analyzeResumeData = async (resumeData) => {
  const response = await api.post('/resumes/analyze', resumeData);
  return response.data;
};

export const submitApplication = async (applicationData) => {
  const response = await api.post('/applications', applicationData);
  return response.data;
};

export const fetchMyApplications = async () => {
  const response = await api.get('/applications/my');
  return response.data;
};

export const updateApplicationStatus = async (appId, status) => {
  const response = await api.put(`/applications/${appId}/status`, { status });
  return response.data;
};

// Saved Jobs APIs
export const toggleSaveJob = async (jobId) => {
  const response = await api.post('/saved-jobs/toggle', { jobId });
  return response.data;
};

export const fetchSavedJobs = async () => {
  const response = await api.get('/saved-jobs');
  return response.data;
};

export const removeSavedJob = async (jobId) => {
  const response = await api.delete(`/saved-jobs/${jobId}`);
  return response.data;
};

export const fetchAdminStats = async () => {
  const response = await api.get('/admin/stats');
  return response.data;
};
