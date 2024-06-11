export const fetchUsersService = async () => {
  try {
    const token = localStorage.getItem("authToken");

    if (!token) {
      return { success: false, error: "No authentication token found" };
    }

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/adherent`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const responseData = await response.json();
    console.log(responseData, "DANS USERSERVICE");

    if (response.status === 200) {
      return { success: true, data: responseData };
    } else {
      const error =
        responseData.message ||
        "Une erreur est survenue lors de la récupération des utilisateurs.";
      return { success: false, error };
    }
  } catch (err) {
    console.error("Network error:", err);
    return {
      success: false,
      error: "Erreur de connexion au serveur. Veuillez réessayer plus tard.",
    };
  }
};
