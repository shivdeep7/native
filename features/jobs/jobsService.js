import axios from "axios";

// Apply for a job
const applyForAJob = async (jobId) => {
  const response = await axios.post("/jobs/apply", {
    jobId,
  });

  if (response.data) {
    return response.data.data;
  }
};

// Get the list of all the jobs
const jobsList = async () => {
  const response = await axios.get("jobs");

  if (response.data) {
    return response.data.data;
  }
};

// Get a single job post
const singleJob = async (id) => {
  const response = await axios.get(`jobs/${id}`);

  if (response.data) {
    return response.data.data;
  }
};

export default { jobsList, singleJob, applyForAJob };
