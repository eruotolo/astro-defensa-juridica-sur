// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
    outDir: "dist",
    site: "https://defensajuridicasur.cl/",

    // Optimizaciones para imágenes locales
    image: {
        service: {
            entrypoint: "astro/assets/services/sharp", // Para mejor performance con imágenes
        },
    },

    build: {
        assets: "assets",
        inlineStylesheets: "auto", // CSS crítico inline
        format: "file", // Genera archivo HTML estático
    },

    // Compresión HTML
    compressHTML: true,

    vite: {
        plugins: [tailwindcss()],

        // Optimizaciones adicionales para el build
        build: {
            cssCodeSplit: false, // Un solo archivo CSS
            rollupOptions: {
                output: {
                    assetFileNames: "assets/[name].[hash][extname]",
                },
            },
        },

        // Pre-optimiza React para mejor performance
        optimizeDeps: {
            include: ["react", "react-dom"],
        },
    },

    integrations: [react()],

    // Prefetch para recursos
    prefetch: {
        prefetchAll: true,
        defaultStrategy: "viewport",
    },
});
