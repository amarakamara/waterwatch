const apiBase =
  import.meta.env.VITE_ENV === "development"
    ? import.meta.env.VITE_DEV_API_BASE
    : import.meta.env.VITE_PROD_API_BASE;

const deleteNotification = async (token, dispatch, removeNotification, id) => {
  try {
    const response = await fetch(`${apiBase}/notification/delete/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error deleting notification");
    }
    dispatch(removeNotification(id));
  } catch (error) {
    console.error("Error deleting notification:", error);
  }
};

export default deleteNotification;
