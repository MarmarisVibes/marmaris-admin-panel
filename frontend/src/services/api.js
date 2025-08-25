import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

export const api = axios.create({ baseURL: API_BASE });

// Business
export const getBusinesses = () => api.get('/businesses').then(res => res.data);
export const getBusiness = (id) => api.get(`/businesses/${id}`).then(res => res.data);
export const createBusiness = (data) => api.post('/businesses', data).then(res => res.data);
export const updateBusiness = (id, data) => api.put(`/businesses/${id}`, data).then(res => res.data);
export const deleteBusiness = (id) => api.delete(`/businesses/${id}`);

// Categories
export const getBusinessCategories = () => api.get('/categories').then(res => res.data);
export const getActivityCategories = () => api.get('/activity-categories').then(res => res.data);

// Signups
export const getSignups = () => api.get('/signups').then(res => res.data);
export const getSignup = (id) => api.get(`/signups/${id}`).then(res => res.data);
export const updateSignup = (id, data) => api.put(`/signups/${id}`, data).then(res => res.data);

// Media Uploads
export const getMediaUploads = () => api.get('/media-uploads').then(res => res.data);
export const updateMediaUpload = (id, data) => api.put(`/media-uploads/${id}`, data).then(res => res.data);

// Review Reports
export const getReviewReports = () => api.get('/review-reports').then(res => res.data);
export const updateReviewReport = (id, data) => api.put(`/review-reports/${id}`, data).then(res => res.data);

// Settings
export const getSettings = () => api.get('/settings').then(res => res.data);
export const updateSettings = (data) => api.put('/settings', data).then(res => res.data);