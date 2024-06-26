const apiBase =
  import.meta.env.VITE_ENV === "development"
    ? import.meta.env.VITE_DEV_API_BASE
    : import.meta.env.VITE_PROD_API_BASE;

const fetchUsageData = async (token, dispatch, addUsage) => {
  try {
    const response = await fetch(`${apiBase}/usage/`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Error fetching water usage data");
    }
    const data = await response.json();
    console.log("Fetched data:", data);
    dispatch(addUsage(data));
  } catch (error) {
    console.error(error);
  }
};

export default fetchUsageData;
