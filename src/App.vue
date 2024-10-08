<template>
  <div class="container">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <!-- <a class="navbar-brand" href="#">{{ $t('navbar.brand') }}</a> -->
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <RouterLink
                class="nav-link"
                :class="{ active: isActive('home') }"
                to="/"
                @click="setActive('home')"
              >
                {{ $t('navbar.home') }}
              </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink
                class="nav-link"
                :class="{ active: isActive('recettes') }"
                to="/recettes"
                @click="setActive('recettes')"
              >
                {{ $t('navbar.recipesList') }}
              </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink
                class="nav-link"
                :class="{ active: isActive('categories') }"
                to="/categories"
                @click="setActive('categories')"
              >
                {{ $t('navbar.categoriesList') }}
              </RouterLink>
            </li>
          </ul>

          <select v-model="locale" @change="changerLangue" class="form-select w-auto">
            <option value="fr">Français</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>
    </nav>
    <div class="mt-4">
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();
const changerLangue = (event) => {
  locale.value = event.target.value;
};

const activeRoute = ref('home'); 

const setActive = (route) => {
  activeRoute.value = route;
};

const isActive = (route) => {
  return activeRoute.value === route;
};
</script>

<style scoped>
.navbar-nav .nav-link.active {
  color: blue;
  font-weight: bold;
}
.navbar-nav .nav-link {
  margin-right: 15px;
  color: black; 
}
</style>
