<template>
  <div>
    <button-primary
      :text="getWalletAddress"
      :secondary="true"
      @click="disconnectWalletDialog = true"
      v-if="wallet && wallet.address"
    >
      <template #prepend-icon>
        <i
          class="bx bxs-user !tw-text-primary-1 tw-text-xl tw-pr-[0.62rem] tw-text-primary"
        ></i>
      </template>
    </button-primary>
    <button-primary
      text="Connect Wallet"
      @click="connectWalletDialog = true"
      v-else
    />
    <connect-wallet-modal
      :connectDialog="connectWalletDialog"
      @close="connectWalletDialog = false"
    />
    <connect-wallet-disconnect-modal
      :disconnectDialog="disconnectWalletDialog"
      @close="disconnectWalletDialog = false"
    />
  </div>
</template>

<script>
export default {
  computed: {
    wallet() {
      return this.$store.state.wallet.wallet;
    },
    getWalletAddress() {
      const wallet = this.wallet;
      if (wallet && wallet.address) {
        return (
          wallet.address.substring(0, 9) +
          "..." +
          wallet.address.substring(wallet.address.length - 2)
        );
      }
      return "Not Connected";
    },
  },
  data() {
    return {
      connectWalletDialog: false,
      disconnectWalletDialog: false,
    };
  },
};
</script>
