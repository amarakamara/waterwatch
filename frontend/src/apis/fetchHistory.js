const apiBase =
  import.meta.env.VITE_ENV === "development"
    ? import.meta.env.VITE_DEV_API_BASE
    : import.meta.env.VITE_PROD_API_BASE;

const fetchHistory = async (token, dispatch, addHistory) => {
  try {
    const response = await fetch(`${apiBase}/history/`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Error fetching history data");
    }
    const data = await response.json();
    dispatch(addHistory(data.histories));
  } catch (error) {
    console.error(error);
  }
};

export default fetchHistory;
