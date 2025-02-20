export const getAuthToken = () => {
    return localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
};

export const isAuthenticated = () => {
    return !!getAuthToken();
};

export const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');
    localStorage.removeItem('user');

    window.location.href = '/login';
};