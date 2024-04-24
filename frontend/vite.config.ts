import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  // server: {
  //   proxy: {
  //     "/api": {
  //       target: "http://localhost:4000",
  //       secure: false,
  //     },
  //   },
  // },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
