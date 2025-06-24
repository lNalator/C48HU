import { User } from "../../types";
import Api from "../api";


export function initializeAuth(): User | null {
  const token = localStorage.getItem("token");
  const userData = localStorage.getItem("user");

  if (token && userData) {
    Api.setToken(token);
    try {
      const parsedUser = JSON.parse(userData) as User;
      return parsedUser;
    } catch (error) {
      console.error("Failed to parse stored user:", error);
      return null;
    }
  }

  return null;
}
