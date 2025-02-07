import Auth from "../utils/auth.js";

export default async function DeleteUser(userId, setInfoMessage, deleteUser) {
  try {
    await deleteUser({
      variables: { _id: userId },
    });

    setInfoMessage("Account deleted!");
    Auth.logout();
    window.location.replace("/signup");
  } catch (err) {
    setInfoMessage("Error deleting account!");
    console.error("Error deleting account:", err);
  }
}
