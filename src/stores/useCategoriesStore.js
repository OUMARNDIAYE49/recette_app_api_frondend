import { defineStore } from "pinia";
import axios from "axios";

export const useCategoriesStore = defineStore("categories", {
  state: () => ({
    categories: [],
  }),

  actions: {
    async loadDataFromApi() {
      try {
        const resp = await axios.get("http://localhost:4000/api/categories");
        this.categories = resp.data;
      } catch (error) {
        console.error("Erreur lors du chargement des catégories :", error);
        this.categories = [];
      }
    },

    async addCategorie(category) {
      try {
        const resp = await axios.post("http://localhost:4000/api/categories", {
          nom: category.nom,
        });
        this.categories.push(resp.data);
        console.log("Catégorie ajoutée avec succès :", resp.data);
      } catch (error) {
        console.error("Erreur lors de l'ajout de la catégorie :", error);
      }
    },

    async updateCategorie(id, updatedCategory) {
      try {
        await axios.put(
          `http://localhost:4000/api/categories/${id}`,
          updatedCategory
        );

        const index = this.categories.findIndex(
          (category) => category.id === id
        );
        if (index !== -1) {
          this.categories[index] = {
            ...this.categories[index],
            ...updatedCategory,
          };
        }

        console.log("Catégorie mise à jour avec succès");
      } catch (error) {
        console.error("Erreur lors de la mise à jour de la catégorie :", error);
      }
    },

    async deleteCategorie(id) {
      try {
        await axios.delete(`http://localhost:4000/api/categories/${id}`);
        this.categories = this.categories.filter(
          (category) => category.id !== id
        );
      } catch (error) {
        console.error("Erreur lors de la suppression de la catégorie :", error);
        throw error;
      }
    },

    getCategorieById(id) {
      return this.categories.find((category) => category.id === id);
    },
  },
});
