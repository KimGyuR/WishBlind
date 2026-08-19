const BASE_URL = 'https://wishblind-backend-production.up.railway.app';

let accessToken = null;
let refreshToken = null;

export const setTokens = (access, refresh) => {
  accessToken = access;
  refreshToken = refresh;
};

export const getAccessToken = () => accessToken;

export const clearTokens = () => {
  accessToken = null;
  refreshToken = null;
};

const fetchWithAuth = async (endpoint, options = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('API Error:', {
        status: response.status,
        endpoint: endpoint,
        message: data.message,
        data: data,
      });
      throw new Error(data.message || `HTTP ${response.status}: ${data.error || 'Unknown error'}`);
    }

    return data;
  } catch (err) {
    console.error('Fetch error:', err);
    throw err;
  }
};

// ===== Auth =====
export const authLogin = (email, password) =>
  fetchWithAuth('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

export const authSignup = (email, password, nickname, phone, terms) => {
  const body = { email, password, nickname };

  // phone이 있고 비어있지 않으면 추가
  if (phone && phone.trim()) {
    body.phone = phone;
  }

  // terms가 배열이고 내용이 있으면 추가, 아니면 빈 배열
  body.terms = Array.isArray(terms) ? terms : [];

  console.log('authSignup request body:', body);

  return fetchWithAuth('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify(body),
  });
};

export const authLogout = () =>
  fetchWithAuth('/api/auth/logout', {
    method: 'POST',
    body: JSON.stringify({ refreshToken }),
  });

export const authReissue = (refreshTok) =>
  fetchWithAuth('/api/auth/reissue', {
    method: 'POST',
    body: JSON.stringify({ refreshToken: refreshTok }),
  });

// ===== Gift Sessions =====
export const createGiftSession = (userId, data) =>
  fetchWithAuth(`/api/gift-sessions?userId=${userId}`, {
    method: 'POST',
    body: JSON.stringify(data),
  });

export const getGiftSessions = (userId) =>
  fetchWithAuth(`/api/gift-sessions?userId=${userId}`);

export const getGiftSession = (userId, sessionId) =>
  fetchWithAuth(`/api/gift-sessions/${sessionId}?userId=${userId}`);

export const createInvite = (userId, sessionId) =>
  fetchWithAuth(`/api/gift-sessions/${sessionId}/invite?userId=${userId}`, {
    method: 'POST',
  });

export const finalizeGiftSession = (userId, sessionId, recommendationId) =>
  fetchWithAuth(`/api/gift-sessions/${sessionId}/finalize?userId=${userId}`, {
    method: 'POST',
    body: JSON.stringify({ recommendationId }),
  });

// ===== Recommendations =====
export const generateRecommendations = (userId, giftSessionId) =>
  fetchWithAuth(`/api/gift-sessions/${giftSessionId}/recommendations?userId=${userId}`, {
    method: 'POST',
  });

export const getRecommendations = (userId, giftSessionId) =>
  fetchWithAuth(`/api/gift-sessions/${giftSessionId}/recommendations?userId=${userId}`);

export const getRecommendationDetail = (userId, recommendationId) =>
  fetchWithAuth(`/api/recommendations/${recommendationId}?userId=${userId}`);

// ===== Invite (Recipient) =====
export const getInviteInfo = (token) =>
  fetch(`${BASE_URL}/api/invite/${token}`).then(r => r.json());

export const verifyInviteCode = (code) =>
  fetch(`${BASE_URL}/api/invite/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code }),
  }).then(r => r.json());

export const getTasteForm = (token) =>
  fetch(`${BASE_URL}/api/invite/${token}/taste-form`).then(r => r.json());

export const submitPreferences = (token, preferences) =>
  fetch(`${BASE_URL}/api/invite/${token}/preferences`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(preferences),
  }).then(r => r.json());

// ===== Delivery =====
export const setDelivery = (userId, sessionId, deliveryData) =>
  fetchWithAuth(`/api/gift-sessions/${sessionId}/delivery?userId=${userId}`, {
    method: 'POST',
    body: JSON.stringify(deliveryData),
  });

export const getDelivery = (userId, sessionId) =>
  fetchWithAuth(`/api/gift-sessions/${sessionId}/delivery?userId=${userId}`);

export const completeDelivery = (userId, sessionId) =>
  fetchWithAuth(`/api/gift-sessions/${sessionId}/complete?userId=${userId}`, {
    method: 'POST',
  });

export const revealGift = (token) =>
  fetch(`${BASE_URL}/api/invite/${token}/reveal`).then(r => r.json());

// ===== Payment =====
export const preparePayment = (sessionId) =>
  fetchWithAuth(`/api/gift-sessions/${sessionId}/payment/ready`, {
    method: 'POST',
  });

export const confirmPayment = (sessionId, paymentData) =>
  fetchWithAuth(`/api/gift-sessions/${sessionId}/payment/confirm`, {
    method: 'POST',
    body: JSON.stringify(paymentData),
  });

export const cancelPayment = (sessionId) =>
  fetchWithAuth(`/api/gift-sessions/${sessionId}/payment/cancel`, {
    method: 'POST',
  });

export const getPaymentStatus = (sessionId) =>
  fetchWithAuth(`/api/gift-sessions/${sessionId}/payment`);

// ===== User =====
export const getUser = (userId) =>
  fetchWithAuth(`/api/users/${userId}`);

export const updateUser = (userId, data) =>
  fetchWithAuth(`/api/users/${userId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

export const getMe = (userId) =>
  fetchWithAuth(`/api/me?userId=${userId}`);

export const deleteAccount = (userId) =>
  fetchWithAuth(`/api/me?userId=${userId}`, {
    method: 'DELETE',
  });

// ===== Notifications =====
export const getNotifications = (userId) =>
  fetchWithAuth(`/api/notifications?userId=${userId}`);

export const getUnreadCount = (userId) =>
  fetchWithAuth(`/api/notifications/unread-count?userId=${userId}`);

export const markNotificationAsRead = (userId, notificationId) =>
  fetchWithAuth(`/api/notifications/${notificationId}/read?userId=${userId}`, {
    method: 'PATCH',
  });

export const markAllNotificationsAsRead = (userId) =>
  fetchWithAuth(`/api/notifications/read-all?userId=${userId}`, {
    method: 'PATCH',
  });

// ===== Products =====
export const getProducts = (category) => {
  const url = category
    ? `/api/products?category=${encodeURIComponent(category)}`
    : '/api/products';
  return fetch(`${BASE_URL}${url}`).then(r => r.json());
};

export const getProduct = (productId) =>
  fetch(`${BASE_URL}/api/products/${productId}`).then(r => r.json());

// ===== Store Fitting (Employee) =====
export const createFitting = (data) =>
  fetchWithAuth('/api/fittings', {
    method: 'POST',
    body: JSON.stringify(data),
  });

export const getStaffFittings = (date) =>
  fetchWithAuth(`/api/staff/fittings?date=${date}`);

export const getFittingDetail = (fittingId) =>
  fetchWithAuth(`/api/staff/fittings/${fittingId}`);

export const startFitting = (fittingId) =>
  fetchWithAuth(`/api/staff/fittings/${fittingId}/start`, {
    method: 'POST',
  });

export const submitFittingResult = (fittingId, resultData) =>
  fetchWithAuth(`/api/staff/fittings/${fittingId}/result`, {
    method: 'POST',
    body: JSON.stringify(resultData),
  });
