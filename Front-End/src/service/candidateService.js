import { apiClient } from './service';
 
const getCandidates = (params = '') => {
  return apiClient.get(`/candidates?limit=100${params}`);
};
 
const getCandidateById = (id) => {
  return apiClient.get(`/candidates/${id}`);
};
 
const createCandidate = (data) => {
  return apiClient.post('/candidates', data);
};
 
const updateCandidate = (id, data) => {
  return apiClient.put(`/candidates/${id}`, data);
};
 
export { getCandidates, getCandidateById, createCandidate, updateCandidate };