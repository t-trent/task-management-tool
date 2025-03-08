// lib/authFetch.ts

/**
 * A custom fetch wrapper that automatically handles refreshing the access token.
 */
export async function authFetch(url: string, options: RequestInit = {}) {
    // Retrieve the current access token from localStorage.
    let accessToken = localStorage.getItem("accessToken");
    // Add the Authorization header to the request.
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    };
  
    // Perform the initial fetch.
    let res = await fetch(url, options);
  
    // If the response is 401 Unauthorized, try to refresh the token.
    if (res.status === 401) {
      const refreshRes = await fetch("/api/auth/refresh", {
        method: "POST",
      });
  
      if (refreshRes.ok) {
        // Extract the new access token.
        const { accessToken: newAccessToken } = await refreshRes.json();
        // Update the access token in localStorage.
        localStorage.setItem("accessToken", newAccessToken);
  
        // Update the Authorization header with the new token.
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${newAccessToken}`,
        };
  
        // Retry the original request with the new token.
        res = await fetch(url, options);
      } else {
        // If refresh fails, clear stored tokens and optionally redirect to login.
        localStorage.removeItem("accessToken");
        throw new Error("Unable to refresh token; please log in again.");
      }
    }
  
    return res;
  }
  