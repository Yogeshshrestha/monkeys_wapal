<template>
  <v-dialog
    class="dialog py-0"
    max-width="300"
    v-model="showDialog"
    overlay-color="#5D5F65"
  >
    <v-card
      width="300"
      class="mx-auto py-0"
      style="background: #141517; border-radius: 8px"
    >
      <v-card-title>
        <span class="connect-wallet-font" style="">Disconnect wallet</span>
        <v-spacer></v-spacer>
        <v-icon @click="closeDialog">mdi mdi-close</v-icon>
      </v-card-title>
      <v-card-text>
        <div class="d-flex align-center mb-3 justify-center">
          <img class="wallet-img mr-3" :src="currentWallet.icon" alt="wallet" />
          <div class="font-bold">Wallet Currently Connected</div>
        </div>
        <div class="d-flex justify-center">
          <button-primary
            @click="disconnectWallet()"
            text="Disconnect Wallet"
          />
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: { disconnectDialog: { type: Boolean } },
  methods: {
    async disconnectWallet() {
      try {
        const res = await this.$store.dispatch("wallet/disconnectWallet");

        this.$toast.showMessage({ message: "Wallet Disconnected" });
        this.closeDialog();
      } catch (error) {
        this.$toast.showMessage({ message: error, error: true });
      }
    },
    closeDialog() {
      this.$emit("close");
    },
  },
  computed: {
    currentWallet() {
      if (this.walletStore) {
        const wallets = this.$store.getters["wallet/getWalletsDetail"];
        const wallet = wallets.find(
          (wallet) => wallet.name === this.walletStore.wallet
        );
        if (!wallet) {
          return wallets[0];
        }
        return wallet;
      }
      return { icon: "" };
    },
    walletStore() {
      return this.$store.state.wallet.wallet;
    },
    showDialog: {
      get() {
        return this.disconnectDialog;
      },
      set(value) {
        this.$emit("close");
      },
    },
  },
};
</script>
<style lang="css" scoped>
.wallet-img {
  max-width: 32px;
  max-height: 32px;
}
</style>
