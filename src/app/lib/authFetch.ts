// lib/authFetch.ts

export async function authFetch(url: string, options: RequestInit = {}) {
  // Ensure cookies are included with every request
  options.credentials = "include";

  // Perform the initial fetch.
  let res = await fetch(url, options);

  // If the response is 401 Unauthorized, try to refresh the token
  if (res.status === 401) {
    const refreshRes = await fetch("/api/auth/refresh", {
      method: "POST",
      credentials: "include",
    });

    if (refreshRes.ok) {
      // Retry the original request (the new token will be sent automatically)
      res = await fetch(url, options);
    } else {
      // If refresh fails, you may want to perform additional actions (e.g., redirect to login).
      throw new Error("Unable to refresh token; please log in again.");
    }
  }

  return res;
}
