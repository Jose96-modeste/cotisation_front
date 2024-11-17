// nuxt.config.ts
export default defineNuxtConfig({
  devtools: { enabled: true },  // Active les outils de développement si nécessaire

  modules: [
    '@nuxtjs/tailwindcss',   // Ajoute le module Tailwind CSS
  ],

  css: [
    '@/assets/css/main.css',  // fichier CSS global pour Tailwind
  ],

});
