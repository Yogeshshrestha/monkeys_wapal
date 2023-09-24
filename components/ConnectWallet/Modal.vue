<template>
  <v-dialog
    class="dialog"
    max-width="500"
    v-model="showDialog"
    scrollable
    @click:outside="closeDialog"
  >
    <v-card
      class="mx-0 mx-md-auto"
      style="background: #141517; border-radius: 8px"
    >
      <p v-if="message">{{ message }}</p>
      <p v-if="message">Choose a wallet to connect</p>
      <v-card-title>
        <v-icon size="17" class="mr-2">mdi-wallet</v-icon>
        <span class="connect-wallet-font" style="">Connect wallet</span>
        <v-spacer></v-spacer>
        <v-btn icon size="16" @click="closeDialog">
          <v-icon size="16">mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text style="margin: 0; padding: 0">
        <v-list dense v-if="wallets.length > 0">
          <v-list-item
            @click="connectWallet(wallet)"
            v-for="(wallet, i) in wallets"
            :key="i"
            :disabled="wallet.readyState == 'NotDetected'"
            :class="{ 'disabled-item': wallet.readyState === 'NotDetected' }"
          >
            <v-list-item-avatar class="rounded" size="32">
              <v-img :src="wallet.icon" height="32" width="32"></v-img>
            </v-list-item-avatar>
            <v-list-item-content class="connect-wallet-content">
              <v-list-item-title
                >{{ wallet.name
                }}<v-chip
                  small
                  color="#8CD867"
                  light
                  class="ml-3"
                  v-if="wallet.name == 'Petra'"
                  >Preferred</v-chip
                ></v-list-item-title
              >
            </v-list-item-content>
            <v-list-item-action>
              <v-btn plain elevation="0">
                <v-icon size="14" color="grey">mdi-arrow-right</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-subtitle class="connect-wallet-footer">
        By connecting your wallet and using Wapal, you agree to our Terms of
        Service and Privacy Policy.
      </v-card-subtitle>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    message: { type: String, default: "" },
    connectDialog: { type: Boolean },
  },
  data() {
    return {
      wallets: [],
    };
  },
  computed: {
    walletStore() {
      return this.$store.state.walletStore.wallet;
    },
    showDialog: {
      get() {
        return this.connectDialog;
      },
      set(value) {
        this.$emit("close");
      },
    },
  },
  methods: {
    async connectWallet(wallet) {
      try {
        if (wallet.readyState === "NotDetected") {
          this.$toast.showMessage({
            message: `${wallet.name} Wallet Not Installed`,
          });
          return;
        }

        const resWallet = await this.$store.dispatch(
          "wallet/connectWallet",
          wallet.name
        );

        console.log(resWallet, "reswall");

        if (resWallet.address) {
          this.$toast.showMessage({
            message: `Wallet Connected Successfully`,
          });

          this.closeDialog();
        }
      } catch (error) {
        console.log(error);
        let errorMessage = error;
        if (
          errorMessage === "{}" ||
          errorMessage === "" ||
          errorMessage === "[object Object]"
        ) {
          errorMessage = "Connection Refused";
        }
        this.$toast.showMessage({ message: errorMessage, error: true });
      }
    },
    closeDialog() {
      this.$emit("close");
    },
  },
  async mounted() {
    this.wallets = await this.$store.getters["wallet/getWalletsDetail"];
  },
};
</script>

<style lang="css">
.disabled-item {
  opacity: 0.3;
}

.wallet-link {
  text-decoration: none;
}

.connect-wallet-font {
  font-family: "Inter-Regular", sans-serif;
  font-weight: 600;
  font-size: 14px;
  letter-spacing: 0.01em;
  text-transform: uppercase;
}

.connect-wallet-content {
  font-family: "Inter-Regular", sans-serif;
  font-weight: 400;
  font-size: 16px;
  color: #ffffff;
}

.connect-wallet-footer {
  font-family: "Inter-Regular", sans-serif;
  font-weight: 400;
  font-size: 12px;
  letter-spacing: 0.01em;
  color: #ffffff !important;
}
</style>
