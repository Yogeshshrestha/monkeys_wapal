<template>
  <v-app dark style="position: relative; overflow: hidden">
    <client-only>
      <LayoutAppBar />
      <v-main>
        <Nuxt />
      </v-main>
    </client-only>
  </v-app>
</template>
<script>
export default {
  mounted() {
    if (process.client) {
      try {
        const wallet = JSON.parse(localStorage.getItem("wallet"));
        if (wallet) {
          this.$store.dispatch("wallet/connectWallet", wallet.name);
        }
      } catch {}
    }
  },
};
</script>
<style>
@import url("~/assets/style/main.css");
</style>
