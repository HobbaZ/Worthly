export default async function UpdateUser(
  formInput,
  setInfoMessage,
  onClose,
  updateUser
) {
  try {
    await updateUser({
      variables: { ...formInput },
    });

    setInfoMessage("Details updated!");
    onClose();
    window.location.replace("/profile");
  } catch (err) {
    setInfoMessage("Error updating details!");
    console.error("Error updating details:", err);
  }
}
