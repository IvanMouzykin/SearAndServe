import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import handlebars from 'vite-plugin-handlebars'
import { products, recipes } from './src/data.js';
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    tailwindcss(),
    handlebars({
      context: {
        products: products,
        recipes: recipes
      },
      partialDirectory: './partials',
      helpers: {
        pickRandom: (arr, count) => {
          if (!Array.isArray(arr)) return [];
          const shuffled = [...arr].sort(() => 0.5 - Math.random());
          return shuffled.slice(0, count);
        }
      },
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        shop: resolve(__dirname, 'pages/shop.html'),
        product: resolve(__dirname, 'pages/product.html'),
        cuts: resolve(__dirname, 'pages/cuts.html'),
        page: resolve(__dirname, 'pages/page.html'),
        prepare: resolve(__dirname, 'pages/prepare.html'),
        privacyPolicy: resolve(__dirname, 'pages/privacy-policy.html'),
        recipe: resolve(__dirname, 'pages/recipe.html'),
        recipes: resolve(__dirname, 'pages/recipes.html'),
        cart: resolve(__dirname, 'pages/cart.html'),
      },
    },
  },
})