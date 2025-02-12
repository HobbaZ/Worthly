export default async function UpdateItem(
  itemId,
  formInput,
  setInfoMessage,
  setFormInput,
  updateItem
) {
  try {
    const { data } = await updateItem({
      variables: {
        _id: itemId,
        itemName: formInput.itemName,
        purchaseDate: formInput.purchaseDate,
        purchasePrice: parseFloat(formInput.purchasePrice),
      },
    });

    if (data) {
      setInfoMessage("Item details updated!");
      setFormInput({
        itemName: "",
        purchaseDate: "",
        purchasePrice: 0,
      });
      window.location.replace("/saved");
    } else {
      throw new Error("No response from server.");
    }
  } catch (err) {
    console.error("Error updating details:", err);
    setInfoMessage("Error updating item details!", err.message);
  }
}
