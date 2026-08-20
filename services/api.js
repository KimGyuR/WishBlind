const BASE_URL = 'https://wishblind-backend-production-2111.up.railway.app';

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

// 서버는 로그인/회원가입 응답에 userId를 내려주지 않으므로
// accessToken(JWT)의 sub 클레임에서 직접 추출한다.
const BASE64_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

const base64UrlDecode = (input) => {
  const b64 = input.replace(/-/g, '+').replace(/_/g, '/');
  let output = '';
  let buffer = 0;
  let bits = 0;
  for (const char of b64) {
    if (char === '=') break;
    const idx = BASE64_CHARS.indexOf(char);
    if (idx === -1) continue;
    buffer = (buffer << 6) | idx;
    bits += 6;
    if (bits >= 8) {
      bits -= 8;
      output += String.fromCharCode((buffer >> bits) & 0xff);
    }
  }
  return output;
};

export const decodeUserIdFromToken = (token) => {
  try {
    const payload = token.split('.')[1];
    const json = JSON.parse(decodeURIComponent(escape(base64UrlDecode(payload))));
    return json.sub != null ? Number(json.sub) : null;
  } catch (err) {
    console.error('토큰 파싱 실패:', err);
    return null;
  }
};

// 서버 응답은 {success, data, error:{code,message}} 형태로 내려온다.
// 화면 코드는 {code:'SUCCESS', data} 형태를 기대하므로 여기서 맞춰준다.
const normalizeResponse = (endpoint, status, raw) => {
  if (!raw || raw.success === false) {
    const message = raw?.error?.message || `HTTP ${status}`;
    console.error('API Error:', { status, endpoint, code: raw?.error?.code, message });
    throw new Error(message);
  }
  return { code: 'SUCCESS', data: raw.data };
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
    return normalizeResponse(endpoint, response.status, data);
  } catch (err) {
    console.error('Fetch error:', err);
    throw err;
  }
};

const fetchPublic = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: { 'Content-Type': 'application/json', ...options.headers },
    });

    const data = await response.json();
    return normalizeResponse(endpoint, response.status, data);
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
  fetchPublic(`/api/invite/${token}`);

export const verifyInviteCode = (code) =>
  fetchPublic('/api/invite/verify', {
    method: 'POST',
    body: JSON.stringify({ code }),
  });

export const getTasteForm = (token) =>
  fetchPublic(`/api/invite/${token}/taste-form`);

export const submitPreferences = (token, preferences) =>
  fetchPublic(`/api/invite/${token}/preferences`, {
    method: 'POST',
    body: JSON.stringify(preferences),
  });

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
  fetchPublic(`/api/invite/${token}/reveal`);

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
  return fetchPublic(url);
};

export const getProduct = (productId) =>
  fetchPublic(`/api/products/${productId}`);

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
