export default async function DeleteItem(itemId, setInfoMessage, deleteItem) {
  try {
    await deleteItem({
      variables: { _id: itemId },
    });

    setInfoMessage("Item deleted!");
    window.location.reload();
  } catch (err) {
    console.error("Error deleting item:", err);
  }
}
