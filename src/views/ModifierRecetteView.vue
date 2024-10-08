<template>
  <div class="container mt-5 p-4 bg-light rounded shadow">
    <h1 class="text-center mb-4">{{ $t('recettes.modifierTitre') }}</h1>
    <form @submit.prevent="mettreAJourRecette">
      <div class="row mb-3">
        <div class="col-md-6">
          <label for="titre" class="form-label">{{ $t('recettes.titleColumn') }}</label>
          <input
            type="text"
            id="titre"
            class="form-control"
            v-model="recette.titre"
            required
          />
        </div>
        <div class="col-md-6">
          <label for="type" class="form-label">{{ $t('recettes.type') }}</label>
          <select
            id="type"
            class="form-select"
            v-model="recette.type"
            required
          >
            <option value="Entrée">{{ $t('recettes.entrée') }}</option>
            <option value="Plat">{{ $t('recettes.plat') }}</option>
            <option value="Dessert">{{ $t('recettes.dessert') }}</option>
          </select>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-md-12">
          <label for="categorie" class="form-label">{{ $t('recettes.form.categorie') }}</label>
          <select
            id="categorie"
            class="form-select"
            v-model="recette.categorie_id"
            required
          >
            <option value="" disabled selected>Sélectionner une catégorie</option>
            <option v-for="categorie in categories" :key="categorie.id" :value="categorie.id">
              {{ categorie.nom }}
            </option>
          </select>
        </div>
      </div>
      <div class="mb-3">
        <label for="ingredients" class="form-label">{{ $t('recettes.ingredients') }}</label>
        <textarea
          id="ingredients"
          class="form-control"
          v-model="recette.ingredients"
          rows="4"
          required
        ></textarea>
      </div>
      <div class="d-flex justify-content-between align-items-center">
        <button type="submit" class="btn btn-primary" :disabled="!recette.titre || !recette.ingredients">{{ $t('recettes.save') }}</button>
        <router-link to="/recettes" class="btn btn-secondary ms-5">{{ $t('recettes.cancel') }}</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { reactive, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useRecettesStore } from '@/stores/useRecettesStore';
import { useCategoriesStore } from '@/stores/useCategoriesStore';

export default {
  setup() {
    const recettesStore = useRecettesStore();
    const categoriesStore = useCategoriesStore();
    const route = useRoute();
    const router = useRouter();
    const recetteId = parseInt(route.params.recetteId);

    const recette = reactive({
      titre: '',
      type: '',
      categorie_id: null,
      ingredients: ''
    });

    onMounted(async () => {
      await categoriesStore.loadDataFromApi();

      const savedRecette = localStorage.getItem(`recette_${recetteId}`);
      if (savedRecette) {
        Object.assign(recette, JSON.parse(savedRecette));
      } else {
        const recetteExistante = recettesStore.getRecetteById(recetteId);
        if (recetteExistante) {
          Object.assign(recette, recetteExistante);
        }
      }

      const selectedCategory = localStorage.getItem(`selected_category_${recetteId}`);
      if (selectedCategory) {
        recette.categorie_id = selectedCategory;
      }
    });

    const mettreAJourRecette = async () => {
      if (!recette.titre || !recette.ingredients) {
        alert('Veuillez remplir tous les champs obligatoires.');
        return;
      }

      try {
        await recettesStore.updateRecipe(recetteId, { ...recette });
        console.log('Recette mise à jour avec succès');

        localStorage.setItem(`recette_${recetteId}`, JSON.stringify(recette));
        localStorage.setItem(`selected_category_${recetteId}`, recette.categorie_id);

        router.push({ name: 'ListeRecettes' });
      } catch (error) {
        console.error('Erreur lors de la mise à jour de la recette:', error);
        alert('Erreur lors de la mise à jour de la recette, veuillez réessayer.');
      }
    };

    const categories = categoriesStore.categories;

    return {
      recette,
      categories,
      mettreAJourRecette
    };
  }
};
</script>

<style scoped>
.container {
  max-width: 1000px;
  margin: 0 auto; 
  padding: 20px;
}
form {
  margin-top: 20px;
}
</style>
