<template>
  <div class="container my-5">
    <h2 class="my-4 text-center">{{ $t('categorie.detailsTitre') }}</h2>
    <div v-if="categorie">
      <p><strong>{{ $t('categorie.nom') }}</strong> {{ categorie.nom }}</p> 
    </div>
    <div v-else>
      <p class="text-danger">{{ $t('categorie.nonTrouvee') }}</p>
    </div>
    <div class="mt-4">
      <router-link 
        :to="{ name: 'CategoryList' }" 
        class="btn btn-secondary"
      >
        {{ $t('categorie.retourListe') }}
      </router-link>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { useCategoriesStore } from '@/stores/useCategoriesStore';
import { useRoute } from 'vue-router';

const store = useCategoriesStore();
const route = useRoute();
const categorie = ref(null);

onMounted(async () => {
  await store.loadDataFromApi(); 
  const id = Number(route.params.id); 
  categorie.value = store.getCategorieById(id);
});
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
  .text-danger {
    color: #dc3545; 
  }
  .btn-secondary {
    background-color: #6c757d;
    border: none; 
    color: #ffffff; 
    padding: 10px 15px; 
    border-radius: 5px; 
    text-decoration: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  .btn-secondary:hover {
    background-color: #5a6268;
  }
  </style>
  