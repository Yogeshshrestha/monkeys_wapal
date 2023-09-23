<template>
  <div>
    <LandingMain />
  </div>
</template>

<script>
import { fetchWalletList } from "@/services/walletList";
export default {
  mounted() {
    fetchWalletList();
  },
};
</script>
