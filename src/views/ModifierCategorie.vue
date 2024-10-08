<template>
  <div class="container my-5">
    <h2 class="my-4 text-center">{{ $t("categorie.modifierTitre") }}</h2>
    <div v-if="categorie">
      <form @submit.prevent="updateCategorie">
        <div class="mb-3">
          <label for="nom" class="form-label">{{ $t("categorie.nomCategorie") }}</label>
          <input
            type="text"
            id="nom"
            class="form-control"
            v-model="categorie.nom"
            required
          />
        </div>
        <div class="d-flex justify-content-start">
          <button type="submit" class="btn btn-primary">
            {{ $t("categorie.enregistrerModifications") }}
          </button>
          <router-link 
            :to="{ name: 'CategoryList' }" 
            class="btn btn-secondary ms-3"
          >
            {{ $t("categorie.annuler") }}
          </router-link>
        </div>
      </form>
    </div>
    <div v-else>
      <p class="text-danger">{{ $t("categorie.nonTrouvee") }}</p>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { useCategoriesStore } from '@/stores/useCategoriesStore';
import { useRoute, useRouter } from 'vue-router';

const store = useCategoriesStore();
const route = useRoute();
const router = useRouter();
const categorie = ref(null);

onMounted(() => {
  const id = Number(route.params.categorieId);
  categorie.value = { ...store.getCategorieById(id) };
});

const updateCategorie = async () => {
  if (!categorie.value || !categorie.value.id) {
    alert('Catégorie non valide pour la mise à jour.');
    return;
  }

  console.log('Catégorie avant mise à jour:', categorie.value);

  try {
    await store.updateCategorie(categorie.value.id, categorie.value); 
    alert('Catégorie mise à jour avec succès.');
    router.push({ name: 'CategoryList' });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la catégorie :', error);
    alert('Erreur lors de la mise à jour de la catégorie. Veuillez réessayer.');
  }
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
.text-danger {
  color: #dc3545; 
}
</style>
