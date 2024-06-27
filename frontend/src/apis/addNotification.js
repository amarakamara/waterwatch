const apiBase =
  import.meta.env.VITE_ENV === "development"
    ? import.meta.env.VITE_DEV_API_BASE
    : import.meta.env.VITE_PROD_API_BASE;

const addNotification = async (token, notification) => {
  try {
    const response = await fetch(`${apiBase}/notification/add`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        subject: notification.subject,
        message: notification.message,
        timestamp: notification.timestamp,
      }),
    });
    if (!response.ok) {
      throw new Error("Error adding water usage data");
    }
  } catch (error) {
    console.error(error);
  }
};

export default addNotification;
