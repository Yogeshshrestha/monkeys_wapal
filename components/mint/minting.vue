<template>
  <div class="minting-bg">
    <v-img
      class="loading-bg d-flex align-center justify-center"
      :src="require('~/assets/images/minting-bg.svg')"
    >
      <div class="carousel-container">
        <article :class="{ paused: isPaused }">
          <ul>
            <li class="mx-4" v-for="index in 4" :key="index">
              <img src="~/assets/images/mint-loading.png" />
            </li>
          </ul>
          <ul>
            <li class="mx-4" v-for="index in 4" :key="index">
              <img src="~/assets/images/mint-loading.png" />
            </li>
          </ul>
        </article>
      </div>
    </v-img>
    <div class="d-flex justify-center mt-16">
      <ReusableWoodBtn @click="togglePaused" ButtonText="IGNITE YOUR PATH" />
    </div>
  </div>
</template>

<script>
import { fetchWalletList } from "@/services/walletList";
import walletList from "@/datas/data";

export default {
  data() {
    return {
      isPaused: true,
      walletInList: false,
      minting: false,
      mintingSuccess: false,
    };
  },
  computed: {
    wallet() {
      return this.$store.state.wallet.wallet;
    },
  },

  mounted() {
    console.log(walletList, "waaa");
  },
  methods: {
    async togglePaused() {
      const walletList = await fetchWalletList();

      this.walletInList = walletList.some(
        (wallet) => wallet.address === this.wallet.address
      );

      console.log("Is fake wallet in list?", this.walletInList);
      this.minting = true;

      try {
        const res = await this.$store.dispatch("wallet/mintSanctuary");

        if (res.success) {
          this.mintingSuccess = true;
          this.$toast.showMessage({
            message: "Minted Successfully",
          });
        }
      } catch (error) {
        console.error("Minting Error:", error);
      }

      const article = document.querySelector("article");
      if (article) {
        article.classList.toggle("paused");
        this.isPaused = !this.isPaused;
      }
    },

    async initiateCollection() {
      const initiateCollectionRes = await this.$store.dispatch(
        "wallet/initiateCollection",
        {
          collection: "CollectionName",
          description: "CollectionDescription",
          baseUri: "YourBaseUri",
          price: 100,
          royaltyNumerator: 1,
          royaltyDenominator: 100,
        }
      );
    },
    async addRankings() {
      const addRankingsRes = await this.$store.dispatch("wallet/addRankings", {
        moduleOwner: "YourModuleOwner",
        rankings: ["Address1", "Address2"],
      });
    },
  },
};
</script>

<style lang="css">
.carousel-container {
  width: 80%;
  margin: 0 auto;
  overflow: hidden;
}

img {
  display: block;
  width: 100%;
}

article {
  display: flex;
  justify-content: space-around;
  width: 200%;
  animation: bannermove 2s linear infinite;
}

article.paused {
  -webkit-animation-play-state: paused;
  animation-play-state: paused;
}

ul {
  display: flex;
  gap: 0;
  list-style-type: none;
  padding: 0 !important;
  margin: 0;
}

@keyframes bannermove {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
</style>
