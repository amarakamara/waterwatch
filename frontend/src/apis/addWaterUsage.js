const apiBase =
  import.meta.env.VITE_ENV === "development"
    ? import.meta.env.VITE_DEV_API_BASE
    : import.meta.env.VITE_PROD_API_BASE;

const addWaterUsage = async (token, literUsed, timestamp) => {
  try {
    const response = await fetch(`${apiBase}/usage/add`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        literUsed: literUsed,
        timestamp: timestamp,
      }),
    });
    if (!response.ok) {
      throw new Error("Error adding water usage data");
    }
    const success = true;
    return success;
  } catch (error) {
    console.error(error);
  }
};

export default addWaterUsage;
