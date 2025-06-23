import authService from "./services/auth.service";

export default class Api {
  private static readonly baseUrl = "http://localhost:8000/api";
  private static token: string | null = null;

  static setToken(token: string | null) {
    this.token = token;
  }

  private static getHeaders(
    extraHeaders?: Record<string, string>
  ): Record<string, string> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...extraHeaders,
    };

    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }

    return headers;
  }

  private static async refreshAccessToken(): Promise<boolean> {
    const refreshToken = authService.getRefreshToken();
    console.log("Refreshing access token with refresh token:", refreshToken);
    if (!refreshToken) return false;

    const response = await fetch(`${this.baseUrl}/auth/token/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (!response.ok) return false;

    const data = await response.json();
    this.setToken(data.access);
    localStorage.setItem("token", data.access); // Optionnel si tu veux garder la synchro
    return true;
  }

  private static async request(
    method: string,
    url: string,
    body?: Record<string, any>,
    extraHeaders?: Record<string, string>
  ) {
    const fullUrl = this.baseUrl + url;
    const options: RequestInit = {
      method,
      headers: this.getHeaders(extraHeaders),
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    let response = await fetch(fullUrl, options);

    // Bypass refresh logic for login/register
    const isAuthRoute =
      url.includes("/auth/login") || url.includes("/auth/register");

    if (response.status === 401 && !isAuthRoute) {
      const refreshed = await this.refreshAccessToken();
      if (refreshed) {
        options.headers = this.getHeaders(extraHeaders); // refresh headers
        response = await fetch(fullUrl, options);
      }
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  static get(url: string) {
    return this.request("GET", url);
  }

  static post(
    url: string,
    body: Record<string, any>,
    options?: { headers?: Record<string, string> }
  ) {
    return this.request("POST", url, body, options?.headers);
  }

  static put(url: string, body: Record<string, any>) {
    return this.request("PUT", url, body);
  }

  static delete(url: string) {
    return this.request("DELETE", url);
  }
}
