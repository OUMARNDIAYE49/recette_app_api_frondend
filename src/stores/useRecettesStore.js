import { defineStore } from 'pinia';
import axios from "axios";
import { ref } from 'vue';

export const useRecettesStore = defineStore('recettes', {
  state: () => ({
    recettes: [],
    nextId: 5 
  }),

  actions: {
 
    async loadDataFromApi() {
      try {
        const resp = await axios.get("http://localhost:4000/api/recipes");
        this.recettes = resp.data;
      } catch (error) {
        this.recettes = [];
      }
   
    },

    async addRecette(recette) {
      try {
        const resp = await axios.post("http://localhost:4000/api/recipes", recette);
        this.recettes.push(resp.data);                
        await this.loadDataFromApi();  
      } catch (error) {
        console.error("Error adding recipe:", error);              
      }
    },
    
    async updateRecipe(id, updatedRecipe) {
      try {
        await axios.put(`http://localhost:4000/api/recipe/${id}`, updatedRecipe);
        
        
        const index = this.recettes.findIndex(recette => recette.id === id);
        if (index !== -1) {
          this.recettes[index] = { ...this.recettes[index], ...updatedRecipe }; 
        }
        
        console.log("Recette mise à jour avec succès");
      } catch (error) {
        console.error("Error updating recipe:", error);
      }
    },
    
    
    async supprimerRecette(id) {
      try {
        await axios.delete(`http://localhost:4000/api/recipe/${id}`);
        this.recettes = this.recettes.filter((recette) => recette.id !== id); 
      } catch (error) {
        console.error('Erreur lors de la suppression de la recette :', error);
        throw error;
      }
    },
    
    getRecetteById(id) {
      return this.recettes.find(recette => recette.id === id);
    }
  }
});
