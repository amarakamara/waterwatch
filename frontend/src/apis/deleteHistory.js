const apiBase =
  import.meta.env.VITE_ENV === "development"
    ? import.meta.env.VITE_DEV_API_BASE
    : import.meta.env.VITE_PROD_API_BASE;

const deleteHistory = async (token, dispatch, removeHistory, id) => {
  console.log("id", id);
  try {
    const response = await fetch(`${apiBase}/history/delete/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error deleting water usage history");
    }
    dispatch(removeHistory(id));
  } catch (error) {
    console.error("Error deleting water usage history:", error);
  }
};

export default deleteHistory;
