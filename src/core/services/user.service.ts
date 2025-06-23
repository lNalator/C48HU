import Api from "../api";

class UserService {
  async getUserSuggestions(authorId: string): Promise<any> {
    try {
      const response = await Api.get(`/ideas/?author=${authorId}`);
      return response;
    } catch (error) {
      console.warn("Error fetching suggestions by author:", error);
      return null;
    }
  }
}

export default new UserService();
