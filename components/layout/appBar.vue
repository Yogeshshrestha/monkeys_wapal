<template>
  <div>
    <v-app-bar color="transparent" flat fixed>
      <div
        class="container px-3 px-sm-5 px-md-15 d-flex justify-space-between align-center"
      >
        <div
          v-if="this.$route.name == 'index'"
          class="logo"
          @click="$router.push('/')"
        >
          <img src="~/assets/images/logo-white.svg" alt="wapal" />
        </div>
        <div v-else class="logo" @click="$router.push('/')">
          <img src="~/assets/images/logo-black.svg" alt="wapal" />
        </div>
        <div>
          <connect-wallet />
          <!-- <v-btn class="wallet-btn" text>connect Wallet</v-btn> -->
        </div>
      </div>
    </v-app-bar>
  </div>
</template>

<script>
export default {};
</script>

<style lang="css">
.wallet-btn {
  border-radius: 100px;
  background-color: #fff;
  color: #000 !important;
  text-transform: capitalize !important;
}

.container {
  max-width: 1440px !important;
  width: 100%;
  margin: 0 auto;
}

.logo {
  cursor: pointer;
}
</style>
