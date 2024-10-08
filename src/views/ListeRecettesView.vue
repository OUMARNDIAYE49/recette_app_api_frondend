<template>
  <div class="container my-5">
    <h2 class="my-4 text-center">{{ $t('recipeList.title') }}</h2>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div class="d-flex align-items-center">
        <input
          type="text"
          class="form-control me-3 search-input"
          :placeholder="$t('recipeList.searchPlaceholder')"
          v-model="searchTerm"
        />
      </div>
      <button class="btn btn-primary" @click="goToAddRecipePage">
        <i class="fas fa-plus"></i> {{ $t('recipeList.addRecipe') }}
      </button>
    </div>

    <div v-if="filteredRecettes.length === 0" class="text-center">
      <p>{{ $t('recipeList.noRecipesFound') }}</p>
    </div>

    <table v-else class="table table-hover table-bordered shadow-sm">
      <thead class="table-dark">
        <tr>
          <th>{{ $t('recipeList.id') }}</th>
          <th>{{ $t('recipeList.recipeTitle') }}</th>
          <th>{{ $t('recipeList.ingredients') }}</th>
          <th>{{ $t('recipeList.type') }}</th>
          <th>{{ $t('recipeList.category') }}</th>
          <th>{{ $t('recipeList.actions') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(recette, index) in filteredRecettes"
          :key="recette.id"
          class="recipe-row"
        >
          <td>{{ index + 1 }}</td>
          <td class="recipe-title">{{ recette.titre }}</td>
          <td>{{ recette.ingredients }}</td>
          <td>{{ recette.type }}</td>
          <td>{{ getCategorieName(recette.categorie_id) }}</td> 
          <td>
            <router-link
              :to="{ name: 'VoirRecette', params: { id: recette.id } }"
              class="btn btn-info btn-sm me-3"
            >{{ $t('recipeList.viewDetails') }}</router-link>
            <router-link
              :to="{ name: 'ModifierRecette', params: { recetteId: recette.id } }"
              class="btn btn-warning btn-sm me-3"
            >{{ $t('recipeList.edit') }}</router-link>
            <button
              @click="supprimer(recette.id)"
              class="btn btn-danger btn-sm"
            >{{ $t('recipeList.delete') }}</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRecettesStore } from '@/stores/useRecettesStore';
import { useCategoriesStore } from '@/stores/useCategoriesStore';
import { useRouter } from 'vue-router';

const store = useRecettesStore();
const categoriesStore = useCategoriesStore();
const router = useRouter();
const searchTerm = ref('');

onMounted(async () => {
  await store.loadDataFromApi();
  await categoriesStore.loadDataFromApi();
});

const goToAddRecipePage = () => {
  router.push({ name: 'AjouterRecette' });
};

const supprimer = async (id) => {
  if (confirm("Êtes-vous sûr de vouloir supprimer cette recette ?")) {
    try {
      await store.supprimerRecette(id);
      alert('La recette a été supprimée avec succès.');
    } catch (error) {
      console.error('Erreur lors de la suppression de la recette :', error);
      alert('Erreur lors de la suppression de la recette. Veuillez réessayer.');
    }
  }
};

const filteredRecettes = computed(() => {
  return store.recettes.filter(recette =>
    recette.titre.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});

const getCategorieName = (id) => {
  const category = categoriesStore.categories.find(cat => cat.id === id);
  return category ? category.nom : 'Inconnue'; 
};
</script>

<style scoped>
.container {
  max-width: 1100px;
  margin: auto;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
h2 {
  font-size: 1.75rem;
  font-weight: 600;
  color: #343a40;
}

.search-input {
  width: 300px;
}

.table {
  margin-top: 20px;
  background-color: #ffffff;
  border-radius: 6px;
}

.table-hover tbody tr:hover {
  background-color: #f1f1f1;
}
.recipe-row {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.recipe-row:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.recipe-title {
  font-weight: 600;
  color: #495057;
}

.btn-sm {
  font-size: 0.875rem;
}

.btn-info,
.btn-warning,
.btn-danger {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
