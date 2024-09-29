import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  //Deprecation Warning: The legacy JS API is deprecated and will be removed in Dart Sass 2.0.0.
  //https://stackoverflow.com/questions/68147471/how-to-set-sassoptions-in-vite/78997875#78997875
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
      },
    },
  },
});
