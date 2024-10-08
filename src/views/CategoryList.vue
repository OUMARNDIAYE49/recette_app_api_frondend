<template>
  <div class="container my-5">
    <h2 class="my-4 text-center">{{ $t("categoryList.title") }}</h2>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div class="d-flex align-items-center">
        <input
          type="text"
          class="form-control me-3 search-input"
          :placeholder="$t('categoryList.searchCategory')"
          v-model="searchTerm"
        />
      </div>
      <button class="btn btn-primary" @click="goToAddCategoryPage">
  <i class="fas fa-plus"></i> {{ $t("categorie.ajouterTitre") }}
</button>

    </div>

    <div v-if="filteredCategories.length === 0" class="text-center">
      <p>{{ $t("categoryList.error") }}</p>
    </div>

    <table v-else class="table table-hover table-bordered shadow-sm">
      <thead class="table-dark">
        <tr>
          <th>#</th>
          <th>{{ $t("categorie.nomCategorie") }}</th>
          <th>{{ $t("categoryList.actions") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(categorie, index) in filteredCategories"
          :key="categorie.id"
          class="categorie-row"
        >
          <td>{{ index + 1 }}</td>
          <td class="category-title">{{ categorie.nom }}</td>
          <td>
            <router-link
              :to="{ name: 'VoirCategorie', params: { id: categorie.id } }"
              class="btn btn-info btn-sm me-3"
            >{{ $t("categoryList.viewDetails") }}</router-link>
            
            <router-link
              :to="{ name: 'ModifierCategorie', params: { categorieId: categorie.id } }"
              class="btn btn-warning btn-sm me-3"
            >{{ $t("categoryList.edit") }}</router-link>
            <button
              @click="deleteCategorie(categorie.id)"
              class="btn btn-danger btn-sm"
            >{{ $t("categoryList.delete") }}</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<script setup>
import { ref, onMounted, computed } from 'vue';
import { useCategoriesStore } from '@/stores/useCategoriesStore';
import { useRouter } from 'vue-router';

const store = useCategoriesStore();
const router = useRouter();
const searchTerm = ref('');
onMounted(() => {
  store.loadDataFromApi();
});

const goToAddCategoryPage = () => {
  router.push({ name: 'AjouterCategorie' });
};

const deleteCategorie = async (id) => {
  if (confirm("Êtes-vous sûr de vouloir supprimer cette catégorie ?")) {
    try {
      await store.deleteCategorie(id);
      alert('La catégorie a été supprimée avec succès.');
    } catch (error) {
      console.error('Erreur lors de la suppression de la catégorie :', error);
      
     
      if (error) {
        alert('Cette catégorie est rattachée à une ou plusieurs recettes et ne peut pas être supprimée.');
      }
    }
  }
};

const filteredCategories = computed(() => {
  if (!searchTerm.value) return store.categories; 
  return store.categories.filter(categorie => 
    categorie.nom.toLowerCase().includes(searchTerm.value.toLowerCase()) 
  );
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

.search-input {
  width: 300px;
}

.table {
  margin-top: 20px;
  background-color: #ffffff;
  border-radius: 6px;
  width: 700px;
}

.table-hover tbody tr:hover {
  background-color: #f1f1f1;
}
.category-row {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.category-row:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.category-title {
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
