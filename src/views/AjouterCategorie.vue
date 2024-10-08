<template>
  <div class="container my-5">
    <h2 class="my-4 text-center">{{ $t('categorie.ajouterTitre') }}</h2>

    <form @submit.prevent="ajouterCategorie">
      <div class="mb-3">
        <label for="nom" class="form-label">{{ $t('categorie.nomCategorie') }}</label>
        <input
          type="text"
          id="nom"
          class="form-control"
          v-model="nomCategorie"
          required
        />
      </div>

      <div class="d-flex justify-content-between">
        <button type="submit" class="btn btn-primary">{{ $t('categorie.ajouter') }}</button>
        <button type="button" class="btn btn-secondary" @click="goToCategoryList">
          {{ $t('categorie.retourListe') }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useCategoriesStore } from '@/stores/useCategoriesStore';

const store = useCategoriesStore();
const router = useRouter();
const nomCategorie = ref('');


onMounted(() => {
  store.loadDataFromApi();
});
const ajouterCategorie = async () => {
  const newCategory = { nom: nomCategorie.value }; 
  try {
    await store.addCategorie(newCategory);
    nomCategorie.value = ''; 
    await store.loadDataFromApi(); 
    router.push({ name: 'CategoryList' }); 
  } catch (error) {
    alert($t('categorie.erreurAjout')); 
    console.error('Erreur lors de l\'ajout de la catégorie :', error);
  }
};

const goToCategoryList = () => {
  router.push({ name: 'CategoryList' });
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
  
  .form-control {
    margin-top: 10px;
  }
  
  .btn-danger {
    background-color: #dc3545;
    border: none;
  }
  
  .btn-primary {
    background-color: #007bff;
    border: none;
  }
  
  .mb-3 {
    margin-bottom: 1rem;
  }
  
  .d-flex {
    display: flex;
    justify-content: space-between;
  }
  </style>
  