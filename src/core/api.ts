export default class Api {
  private static readonly baseUrl = "http://localhost:8000/api";

  static async get(url: string) {
    const fullUrl = this.baseUrl + url;
    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  static async post(url: string, body: Record<string, any>) {
    const fullUrl = this.baseUrl + url;
    if (!body || typeof body !== "object") {
      throw new Error("Body must be a valid object");
    }
    const response = await fetch(fullUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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
      headers: {
        "Content-Type": "application/json",
      },
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
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }
}
