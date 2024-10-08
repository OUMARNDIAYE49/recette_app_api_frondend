<template>
  <div class="container">
    <h2>{{ isEditMode ? $t('recettes.form.modifierTitre') : $t('recettes.ajouterTitre') }}</h2>
    <form @submit.prevent="handleSubmit">
      <div class="mb-3">
        <label for="titre" class="form-label">{{ $t('recettes.form.titreRecette') }}</label>
        <input
          type="text"
          id="titre"
          v-model="recette.titre"
          class="form-control"
          required
        />
      </div>
      <div class="mb-3">
        <label for="ingredients" class="form-label">{{ $t('recettes.form.ingredients') }}</label>
        <textarea
          id="ingredients"
          v-model="recette.ingredients"
          class="form-control"
          rows="3"
          required
        ></textarea>
      </div>
      <div class="mb-3 d-flex justify-content-between align-items-end">
        <div class="w-50 me-3">
          <label for="type" class="form-label">{{ $t('recettes.form.typeRecette') }}</label>
          <select id="type" v-model="recette.type" class="form-select" required>
            <option value="Entrée">{{ $t('recettes.form.entrée') }}</option>
            <option value="Plat">{{ $t('recettes.form.plat') }}</option>
            <option value="Dessert">{{ $t('recettes.form.dessert') }}</option>
          </select>
        </div>
        <div class="w-50">
          <label for="categorie" class="form-label">{{ $t('recettes.form.categorie') }}</label>
          <select id="categorie" v-model="recette.categorie_id" class="form-select" required>
            <option value="" disabled selected>Sélectionner une catégorie</option>
            <option v-for="categorie in categories" :key="categorie.id" :value="categorie.id">
              {{ categorie.nom }}
            </option>
          </select>
        </div>
      </div>
      <div class="d-flex justify-content-between mt-5">
        <button type="submit" class="btn btn-primary ">
          {{ isEditMode ? $t('recettes.form.submitEdit') : $t('recettes.form.submitAdd') }}
        </button>
        <button type="button" class="btn btn-secondary " @click="handleCancel">
          {{ $t('recettes.form.annuler') }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRecettesStore } from "@/stores/useRecettesStore"; 
import { useCategoriesStore } from "@/stores/useCategoriesStore"; 
import { useRouter, useRoute } from "vue-router";

const store = useRecettesStore();
const categoriesStore = useCategoriesStore(); 
const router = useRouter();
const route = useRoute();

const isEditMode = ref(false);
const recette = ref({
  titre: "",
  ingredients: "",
  type: "",
  categorie_id: null
});

onMounted(async () => {

  await categoriesStore.loadDataFromApi();

  const recetteId = route.params.id; 
  if (recetteId) {
    isEditMode.value = true;
    const recetteData = store.getRecetteById(recetteId);
    if (recetteData) {
      recette.value = { ...recetteData };
    }
  }
});

const categories = categoriesStore.categories;

const handleSubmit = async () => {
  try {
    if (isEditMode.value) {
      await store.modifierRecette(route.params.id, recette.value); 
    } else {
      await store.addRecette(recette.value); 
    }
    router.push({ name: 'ListeRecettes' }); 
  } catch (error) {
    console.error(error);
  }
};

const handleCancel = () => {
  router.push({ name: 'ListeRecettes' });
};
</script>

<style scoped>
.container {
  max-width: 1000px;
  margin-top: 20px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

form {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 6px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 1.75rem;
  font-weight: 600;
  color: #343a40;
  text-align: center;
  margin-bottom: 20px;
}

.form-label {
  font-weight: 600;
  color: #495057;
}

.form-control,
.form-select {
  margin-top: 10px;
}

.d-flex {
  display: flex;
  justify-content: space-between;
}

.me-3 {
  margin-right: 1rem !important;
}

.btn-sm {
  width: 45%;
}

.btn-danger {
  background-color: #dc3545;
  border: none;
}

.btn-primary {
  background-color: #007bff;
  border: none;
}

.mt-4 {
  margin-top: 1.5rem;
}
</style>
