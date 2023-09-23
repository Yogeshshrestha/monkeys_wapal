import colors from "vuetify/es5/util/colors";

const NETWORK = process.env.NETWORK;

export default {
  server: {
    port: process.env.PORT,
    host: "0.0.0.0",
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "monkeys wapal",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/assets/style/main.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ["@/plugins/toast.js"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    "@nuxt/typescript-build",
    "@nuxtjs/vuetify",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      postcssOptions: {
        plugins: { 
          autoprefixer: {},
        },
      },
    },
    transpile: [
      "@aptos-labs/wallet-adapter-core/dist/index.mjs",
      "aptos/dist/index.mjs",
      "@martianwallet/aptos-wallet-adapter/dist/index.mjs",
      "@pontem/wallet-adapter-plugin/dist/index.mjs",
      "axios",
    ],
  },
  vuetify: {
    theme: {
      dark: true,
      themes: {
        dark: {
          body: "#101113",
          primary: "#9D80FF",
          secondary: "#909296",
          background: "#25262B",
          white: "#FFFFFF",
          black: "#000000",
          grey: "#616161",
          red: "#FF5449",
          pink: "#FF5449",
          icon: "#5D5F65",
          info: "#2196F3",
          warning: "#FFC107",
          error: "#FF5252",
          success: "#4CAF50",
          textBack: "#EEEEEE",
          badge: "#E9083F",
          live: "#8CD867",
          lightGrey: "#383A3F",
        },
      },
      treeShake: true,
      defaultAssets: {
        font: {
          family: "Inter",
        },
      },
    },
  },
  env: {
    NETWORK: NETWORK,
  },
};
