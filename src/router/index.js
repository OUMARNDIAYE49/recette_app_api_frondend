import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import ListeRecettesView from '@/views/ListeRecettesView.vue';
import AjouterRecetteView from '@/views/AjouterRecetteView.vue';
import ModifierRecetteView from '@/views/ModifierRecetteView.vue';
import VoirRecetteView from '@/views/VoirRecetteView.vue';
import CategoryList from '@/views/CategoryList.vue';
import VoirCategorie from '@/views/VoirCategorie.vue';
import AjouterCategorie from '@/views/AjouterCategorie.vue';
import ModifierCategorie from '@/views/ModifierCategorie.vue';

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/recettes', name: 'ListeRecettes', component: ListeRecettesView },
  { path: '/ajouter', name: 'AjouterRecette', component: AjouterRecetteView },
  { path: '/modifier/:recetteId', name: 'ModifierRecette', component: ModifierRecetteView, props: true },
  { path: '/recettes/:id', name: 'VoirRecette', component: VoirRecetteView },
  { path: '/categories', name: 'CategoryList', component: CategoryList },
  { path: '/categories/ajouter', name: 'AjouterCategorie', component: AjouterCategorie },
  { path: '/categories/:id', name: 'VoirCategorie', component: VoirCategorie, props: true },
  { path: '/categories/:categorieId/edit', name: 'ModifierCategorie', component: ModifierCategorie, props: true }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
