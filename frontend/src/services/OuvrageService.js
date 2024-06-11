export const fetchOuvrages = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/ouvrage`,
        {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );
  
      if (!response.ok) {
        const errorText = await response.text();
        return {
          success: false,
          error: errorText || "Erreur lors de la récupération des ouvrages",
        };
      }
  
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const errorText = await response.text();
        return {
          success: false,
          error: errorText || "Réponse du serveur non valide",
        };
      }
  
      const ouvrages = await response.json();
      return { success: true, ouvrages };
    } catch (err) {
      console.error("Fetch ouvrages service error:", err);
      return { success: false, error: err.message };
    }
  };
  