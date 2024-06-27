const apiBase =
  import.meta.env.VITE_ENV === "development"
    ? import.meta.env.VITE_DEV_API_BASE
    : import.meta.env.VITE_PROD_API_BASE;

const fetchNotification = async (token, dispatch, addNotification) => {
  try {
    const response = await fetch(`${apiBase}/notification/`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Error fetching notification data");
    }
    const data = await response.json();
    dispatch(addNotification(data.notifications));
  } catch (error) {
    console.error(error);
  }
};

export default fetchNotification;
