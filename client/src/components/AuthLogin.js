import Auth from "../utils/auth";

export default function AuthLogin(setInfoMessage) {
  const token = Auth.loggedIn() ? Auth.getToken() : null;

  if (!token) {
    setInfoMessage("Need to be logged in to do this");
    window.location.replace("/login");
    return false;
  }
}
