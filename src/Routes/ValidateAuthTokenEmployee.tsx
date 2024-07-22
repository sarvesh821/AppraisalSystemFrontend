import axios from "axios";

const validateAuthToken = async (): Promise<boolean> => {
  const authToken = localStorage.getItem("authToken");
  if (!authToken) {
    return false;
  }

  try {
    const response = await axios.get("http://127.0.0.1:8000/api/validate-token-employee/", {
      headers: {
        Authorization: `Token ${authToken}`,
      },
    });
    return response.status === 200;
  } catch (error) {
    console.error("Token validation failed:", error);
    return false;
  }
};

export default validateAuthToken;
