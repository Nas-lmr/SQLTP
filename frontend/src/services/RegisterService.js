export const registerService = async ({
  firstname,
  lastname,
  email,
  password,
}) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks

  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstname, lastname, email, password }),
      }
    );

    const responseData = await response.json();
    if (response.status === 200) {
      return { success: true };
    } else {
      const error =
        responseData.message ||
        "Une erreur est survenue lors de l'inscription.";
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
