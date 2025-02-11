export default async function UpdateUser(
  formInput,
  setInfoMessage,
  onClose,
  updateUser
) {
  try {
    const { data } = await updateUser({ variables: { ...formInput } });

    if (data) {
      setInfoMessage("Details updated!");
      onClose();
      window.location.replace("/profile");
    } else {
      throw new Error("No response from server.");
    }
  } catch (err) {
    console.error("Error updating details:", err);
    setInfoMessage("Error updating user details!", err.message);
  }
}
