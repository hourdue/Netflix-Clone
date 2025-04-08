export const isAuthenticated = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/profile", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if(data.user){
      return true
    }
    else{
      return false
    }
  } catch (error) {
    console.error("Auth check failed:", error);
    return false;
  }
};

export const logout = async () => {
  try {
    await fetch("http://localhost:3000/auth/logout", {
      method: "POST",
      credentials: "include",
    });
  } catch (error) {
    console.error("Logout failed:", error);
  }

  window.location.href = "/login";
};
