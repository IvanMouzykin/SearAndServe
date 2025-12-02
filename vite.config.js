import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import handlebars from 'vite-plugin-handlebars'
import { products, recipes } from './src/data.js';

export default defineConfig({
  plugins: [
    tailwindcss(),
    handlebars({
      context: {
        products: products,
        recipes: recipes 
      },
      partialDirectory: './partials',
    }),
  ],
})