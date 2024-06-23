// Importation des données de recettes, de la fonction de création d'article et du module Dropdown
import { recipes } from "../data/recipes.js";
import { createArticle } from "./article.js";
import { Dropdown } from "./dropdown.js";

// Initialisation des instances des menus déroulants pour les ingrédients, les appareils et les ustensiles
const dropdownIngredients = new Dropdown("#dropdown-ingredients");
const dropdownAppareills = new Dropdown("#dropdown-appareils");
const dropdownUstensils = new Dropdown("#dropdown-ustensils");

// Sélection des éléments du DOM pour la mise à jour dynamique
const updateNbRecettes = document.querySelector(".nb-recettes");
const containerArticles = document.querySelector(".cards");
const errorMessage = document.querySelector(".error-message");

let allIngredients;

/**
 * @brief Fonction pour afficher les recettes filtrées
 * @param {*} filteredRecipes
 */
export const showRecipes = (filteredRecipes) => {
  errorMessage.textContent = "";
  updateNbRecettes.textContent = filteredRecipes.length;
  containerArticles.innerHTML = "";

  for (let i = 0; i < filteredRecipes.length; i++) {
    createArticle(filteredRecipes[i]);
  }

  // Message erreur
  if (filteredRecipes.length === 0) {
    const inputSearchBar = document.querySelector(".search-bar");
    const inputValue = inputSearchBar.value.toLowerCase();
    const filterNull = document.createElement("span");
    filterNull.textContent = `Aucune recette ne contient '${inputValue}'.
        Essayer avec des termes similaires comme "tarte aux pommes", "poisson", etc.`;
    errorMessage.appendChild(filterNull);
    return;
  }
};

/**
 * @brief Fonction pour mettre à jour les filtres en fonction des recettes filtrées
 * @param {*} filteredRecipes
 */
const updateFilters = (filteredRecipes) => {
  const allIngredients = [];

  for (let i = 0; i < filteredRecipes.length; i++) {
    const recipe = filteredRecipes[i];
    for (let j = 0; j < recipe.ingredients.length; j++) {
      const ingredient = recipe.ingredients[j];
      const normalizedIngredient = ingredient.ingredient.trim().toLowerCase();
      if (allIngredients.indexOf(normalizedIngredient) === -1) {
        allIngredients.push(normalizedIngredient);
      }
    }
  }

  dropdownIngredients.list = allIngredients;
  dropdownIngredients.updateDOM();

  const allRecipients = [];

  for (let i = 0; i < filteredRecipes.length; i++) {
    const recipe = filteredRecipes[i];
    for (let j = 0; j < recipe.ustensils.length; j++) {
      const ustensil = recipe.ustensils[j];
      const normalizedUstensil = ustensil.trim().toLowerCase();
      if (allRecipients.indexOf(normalizedUstensil) === -1) {
        allRecipients.push(normalizedUstensil);
      }
    }
  }

  dropdownUstensils.list = allRecipients;
  dropdownUstensils.updateDOM();

  const allAppliances = [];
  for (let i = 0; i < filteredRecipes.length; i++) {
    const recipe = filteredRecipes[i];
    const normalizedAppliance = recipe.appliance.trim().toLowerCase();
    if (allAppliances.indexOf(normalizedAppliance) === -1) {
      allAppliances.push(normalizedAppliance);
    }
  }

  dropdownAppareills.list = allAppliances;
  dropdownAppareills.updateDOM();
};

/**
 * @brief Fonction pour fermer tous les menus déroulants sauf celui passé en paramètre
 * @param {*} dropDown
 */
function closeAllDropDown(dropDown) {
  if (dropDown !== dropdownAppareills) {
    dropdownAppareills.close();
  }
  if (dropDown !== dropdownIngredients) {
    dropdownIngredients.close();
  }
  if (dropDown !== dropdownUstensils) {
    dropdownUstensils.close();
  }
}

/**
 * @brief Fonction principale pour l'initialisation des écouteurs d'événements et la gestion des filtres
 */
function main() {
  // Écouteurs d'événements pour ouvrir les menus déroulants au clic
  dropdownIngredients.buttonElement.addEventListener("click", () => {
    closeAllDropDown(dropdownIngredients);
    dropdownIngredients.open();
  });
  dropdownAppareills.buttonElement.addEventListener("click", () => {
    closeAllDropDown(dropdownAppareills);
    dropdownAppareills.open();
  });
  dropdownUstensils.buttonElement.addEventListener("click", () => {
    closeAllDropDown(dropdownUstensils);
    dropdownUstensils.open();
  });

  // Affichage initial des recettes et mise à jour des filtres
  showRecipes(recipes);
  updateFilters(recipes);

  // Fonction de filtrage pour les événements de changement dans les menus déroulants
  const filterFunction = () => {
    const ingredientFilters = dropdownIngredients.filters;
    const ingredientFiltered = [];

    for (let i = 0; i < recipes.length; i++) {
      const recipe = recipes[i];
      let includeRecipe = true;

      for (let j = 0; j < ingredientFilters.length; j++) {
        const filter = ingredientFilters[j];
        let ingredientMatch = false;

        for (let k = 0; k < recipe.ingredients.length; k++) {
          const ingredient = recipe.ingredients[k].ingredient
            .trim()
            .toLowerCase();
          if (filter === ingredient) {
            ingredientMatch = true;
            break;
          }
        }

        if (!ingredientMatch) {
          includeRecipe = false;
          break;
        }
      }

      if (includeRecipe) {
        ingredientFiltered.push(recipe);
      }
    }

    const appareilFilters = dropdownAppareills.filters;
    const appareilFiltered = [];

    for (let i = 0; i < ingredientFiltered.length; i++) {
      const recipe = ingredientFiltered[i];
      let includeRecipe = true;

      for (let j = 0; j < appareilFilters.length; j++) {
        const filter = appareilFilters[j];
        if (filter !== recipe.appliance.trim().toLowerCase()) {
          includeRecipe = false;
          break;
        }
      }

      if (includeRecipe) {
        appareilFiltered.push(recipe);
      }
    }

    const ustensilFilters = dropdownUstensils.filters;
    const ustensilFiltered = [];

    for (let i = 0; i < appareilFiltered.length; i++) {
      const recipe = appareilFiltered[i];
      let includeRecipe = true;

      for (let j = 0; j < ustensilFilters.length; j++) {
        const filter = ustensilFilters[j];
        let ustensilMatch = false;

        for (let k = 0; k < recipe.ustensils.length; k++) {
          const ustensil = recipe.ustensils[k].trim().toLowerCase();
          if (filter === ustensil) {
            ustensilMatch = true;
            break;
          }
        }

        if (!ustensilMatch) {
          includeRecipe = false;
          break;
        }
      }

      if (includeRecipe) {
        ustensilFiltered.push(recipe);
      }
    }

    return ustensilFiltered;
  };

  dropdownIngredients.onChange = () => {
    const newTabFilter = filterFunction();
    showRecipes(newTabFilter);
    updateFilters(newTabFilter);
  };

  dropdownAppareills.onChange = () => {
    const newTabFilter = filterFunction();
    showRecipes(newTabFilter);
    updateFilters(newTabFilter);
  };

  dropdownUstensils.onChange = () => {
    const newTabFilter = filterFunction();
    showRecipes(newTabFilter);
    updateFilters(newTabFilter);
  };

  /**
   * @brief Fonction pour la barre de recherche
   */
  const searchBar = () => {
    const inputSearchBar = document.querySelector(".search-bar");
    const iconeClose = document.querySelector(".icone-close");

    inputSearchBar.addEventListener("input", (event) => {
      event.preventDefault();

      iconeClose.classList.remove("hidden");
      if (inputSearchBar.value === "") {
        iconeClose.classList.add("hidden");
      }
      iconeClose.addEventListener("click", () => {
        inputSearchBar.value = "";
        iconeClose.classList.add("hidden");
        showRecipes(recipes);
        updateFilters(recipes);
      });

      const inputValue = inputSearchBar.value.toLowerCase();

      if (inputValue.length < 3) {
        showRecipes(recipes);
        updateFilters(recipes);
        return;
      }

      const recettesCorrespondantes = [];

      for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];
        const nameMatch = recipe.name.toLowerCase().includes(inputValue);
        const descriptionMatch = recipe.description
          .toLowerCase()
          .includes(inputValue);
        let ingredientMatch = false;

        for (let j = 0; j < recipe.ingredients.length; j++) {
          const ingredient = recipe.ingredients[j].ingredient.toLowerCase();
          if (ingredient.includes(inputValue)) {
            ingredientMatch = true;
            break;
          }
        }

        if (nameMatch || descriptionMatch || ingredientMatch) {
          recettesCorrespondantes.push(recipe);
        }
      }

      showRecipes(recettesCorrespondantes);
      updateFilters(recettesCorrespondantes);
    });
  };

  searchBar();
}

main();
