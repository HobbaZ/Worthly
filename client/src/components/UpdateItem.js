export default async function UpdateItem(
  itemId,
  formInput,
  setInfoMessage,
  setFormInput,
  updateItem
) {
  //Send data to update endpoint
  try {
    await updateItem({
      variables: {
        _id: itemId,
        itemName: formInput.itemName,
        purchaseDate: formInput.purchaseDate,
        purchasePrice: parseFloat(formInput.purchasePrice),
      },
    });

    setInfoMessage("Item updated!");

    setFormInput({
      itemName: "",
      purchaseDate: "",
      purchasePrice: 0,
    });

    window.location.replace("/saved");
  } catch (err) {
    setInfoMessage("Error updating item!");
    console.error("Error updating item: ", err);
  }
}
