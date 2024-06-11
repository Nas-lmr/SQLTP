import { useState, useEffect } from "react";

// Fonction pour récupérer la valeur du localStorage
function getStorageValue(key, defaultValue) {
  // Récupère la valeur du localStorage associée à la clé, ou à une chaîne vide si elle n'existe pas
  let saved = localStorage.getItem(key) || "";

  // Vérifie si la valeur est un objet JSON en examinant le début de la chaîne
  if (saved.startsWith("{") || saved.startsWith("[")) saved = JSON.parse(saved);

  // Retourne la valeur du localStorage ou la valeur par défaut fournie
  return saved || defaultValue;
}

// Hook personnalisé useLocalStorage
const useLocalStorage = (key, defaultValue) => {
  // Utilise le hook useState pour créer un état local avec la valeur initiale récupérée du localStorage
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  // Utilise le hook useEffect pour effectuer des actions quand la valeur de l'état change
  useEffect(() => {
    // Convertit la valeur en chaîne JSON si elle est un objet, sinon la laisser telle quelle
    const storedVal = typeof value === "object" ? JSON.stringify(value) : value;

    // Met à jour la valeur dans le localStorage associée à la clé
    localStorage.setItem(key, storedVal);
  }, [value, key]); // Exécute le useEffect quand la valeur de l'état ou de la clé change

  // Retourne un tableau contenant la valeur actuelle et la fonction pour mettre à jour cette valeur
  return [value, setValue];
};

// Exporte le hook personnalisé useLocalStorage pour l'utiliser ailleurs dans l'application
export default useLocalStorage;
