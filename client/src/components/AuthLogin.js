import Auth from "../utils/auth";

export default function AuthLogin(setInfoMessage) {
  if (!Auth.loggedIn()) {
    setInfoMessage("Need to be logged in to do this");
    window.location.replace("/login");
    return;
  }
}
