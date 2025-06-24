import { jwtDecode } from "jwt-decode";
import { Tokens, User } from "../../types";
import Api from "../api";

class AuthService {
  private readonly ACCESS_KEY = "token";
  private readonly REFRESH_KEY = "refreshToken";
  private readonly USER_KEY = "user";

  async login(email: string, password: string): Promise<User> {
    const data = await Api.post("/auth/login/", { email, password });
    this.setTokens(data.tokens);
    localStorage.setItem(this.USER_KEY, JSON.stringify(data.user));

    return data.user;
  }

  async logout(): Promise<void> {
    try {
      await Api.post("/auth/logout/", {}).then(() => {
        this.clearSession();
      });
    } catch (err) {
      console.warn("Logout error:", err);
    }
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_KEY);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_KEY);
  }

  isTokenExpired(token: string): boolean {
    try {
      const decoded: any = jwtDecode(token);
      const now = Date.now() / 1000; // timestamp en secondes
      return decoded.exp < now;
    } catch (e) {
      console.error("Token decoding error:", e);
      return true;
    }
  }

  async refreshTokenIfNeeded(): Promise<void> {
    const access = this.getAccessToken();
    const refresh = this.getRefreshToken();

    if (!access || !refresh) return;

    if (this.isTokenExpired(access)) {
      const data = await Api.post("/auth/refresh/", { refresh });
      this.setTokens(data.tokens);
    }
  }

  setTokens(tokens: Tokens) {
    localStorage.setItem(this.ACCESS_KEY, tokens.access);
    localStorage.setItem(this.REFRESH_KEY, tokens.refresh);
    Api.setToken(tokens.access);
  }

  clearSession() {
    localStorage.removeItem(this.ACCESS_KEY);
    localStorage.removeItem(this.REFRESH_KEY);
    localStorage.removeItem(this.USER_KEY);
    Api.setToken(null);
  }

  getCurrentUser(): User | null {
    const user = localStorage.getItem(this.USER_KEY);
    return user ? JSON.parse(user) : null;
  }
}

export default new AuthService();
