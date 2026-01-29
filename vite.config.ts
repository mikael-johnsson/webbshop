import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        pdp: resolve(__dirname, "pdp.html"),
        checkout: resolve(__dirname, "checkout.html"),
        cartPage: resolve(__dirname, "cartpage.html"),
        newDrops: resolve(__dirname, "newdrops.html"),
      },
    },
  },
});
