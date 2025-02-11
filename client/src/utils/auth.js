import decode from "jwt-decode";

class AuthService {
  getProfile() {
    try {
      return decode(this.getToken());
    } catch (err) {
      console.error("Invalid token:", err);
      return null;
    }
  }

  loggedIn() {
    const token = this.getToken();
    return token && !this.isTokenExpired(token);
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      return decoded.exp < Date.now() / 1000; // Token is expired if expiration is in the past
    } catch (err) {
      console.error("Error decoding token:", err);
      return true; // Assume expired if decoding fails
    }
  }

  getToken() {
    return localStorage.getItem("id_token") || null;
  }

  login(idToken) {
    localStorage.setItem("id_token", idToken);
    window.location.assign("/");
  }

  logout() {
    localStorage.removeItem("id_token");
    window.location.assign("/login");
  }
}

export default new AuthService();
