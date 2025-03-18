export const isAuthenticated = async () => {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/auth/user/", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data.isAuthenticated === true;
  } catch (error) {
    console.error("Auth check failed:", error);
    return false;
  }
};

export const logout = async () => {
  try {
    await fetch("http://127.0.0.1:8000/api/auth/logout/", {
      method: "POST",
      credentials: "include",
    });
  } catch (error) {
    console.error("Logout failed:", error);
  }

  window.location.href = "/login";
};
