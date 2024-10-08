<template>
  <div class="container mt-5">
    <div v-if="recette" class="card mb-5 shadow-lg">
      <img
        v-if="recette.image"
        :src="recette.image"
        alt="Image de la recette"
        class="card-img-top"
      />
      <div class="card-header text-center bg-primary text-white">
        <h1 class="card-title mb-0">{{ recette.titre }}</h1>
      </div>
      <div class="card-body">
        <div class="d-flex justify-content-between mb-3">
          <p><strong>{{ $t('recettes.type') }}: </strong> {{ recette.type }}</p>
          <p><strong>{{ $t('recettes.category') }}: </strong> {{ getCategorieName(recette.categorie_id) }}</p>
        </div>
        <hr />
        <h5 class="mb-1"><strong>{{ $t('recettes.ingredients') }}</strong></h5>
        <ul class="list-group list-group-flush mb-4">
          <li
            v-for="(ingredient, index) in recette.ingredients.split(',')"
            :key="index"
            class="list-group-item"
          >
            {{ ingredient }}
          </li>
        </ul>
        <div class="text-end">
          <router-link to="/recettes" class="btn btn-secondary">
            <i class="fas fa-arrow-left"></i> {{ $t('recettes.retourListe') }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRecettesStore } from '@/stores/useRecettesStore';
import { useCategoriesStore } from '@/stores/useCategoriesStore';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const recettesStore = useRecettesStore();
    const categoriesStore = useCategoriesStore();
    const route = useRoute();
    const recetteId = parseInt(route.params.id);

    const recette = computed(() => recettesStore.getRecetteById(recetteId));

    onMounted(async () => {
      if (!recette.value) {
        await recettesStore.loadDataFromApi();
      }
    });

    const getCategorieName = (id) => {
      const category = categoriesStore.categories.find((cat) => cat.id === id);
      return category ? category.nom : 'Inconnue';
    };

    return { recette, getCategorieName };
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
}

.card {
  border-radius: 15px;
  overflow: hidden;
}

.card-img-top {
  height: 250px;
  object-fit: cover;
}

.card-header {
  padding: 20px;
}

.card-body {
  padding: 30px;
}

.list-group-item {
  font-size: 1.1rem;
  background-color: #f8f9fa;
}

.btn {
  font-size: 1rem;
  padding: 10px 20px;
}
</style>
