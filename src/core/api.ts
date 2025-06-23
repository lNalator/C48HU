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

  static async get(url: string) {
    const fullUrl = this.baseUrl + url;
    const response = await fetch(fullUrl, {
      method: "GET",
      headers: this.getHeaders(),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  static async post(
    url: string,
    body: Record<string, any>,
    options?: { headers?: Record<string, string> }
  ) {
    const fullUrl = this.baseUrl + url;
    if (!body || typeof body !== "object") {
      throw new Error("Body must be a valid object");
    }
    const response = await fetch(fullUrl, {
      method: "POST",
      headers: this.getHeaders(options?.headers),
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  static async put(url: string, body: Record<string, any>) {
    const fullUrl = this.baseUrl + url;
    if (!body || typeof body !== "object") {
      throw new Error("Body must be a valid object");
    }
    const response = await fetch(fullUrl, {
      method: "PUT",
      headers: this.getHeaders(),
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  static async delete(url: string) {
    const fullUrl = this.baseUrl + url;

    const response = await fetch(fullUrl, {
      method: "DELETE",
      headers: this.getHeaders(),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }
}
