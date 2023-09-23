<template>
  <div style="position: relative">
    <div class="video-holder">
      <div class="landing-content">
        <h2 class="h2 custom-h2">
          Cross the threshold into a realm where the echoes of time converge
          with veiled mysteries.
        </h2>
        <div class="mt-16 d-flex justify-center">
          <ReusableWoodBtn
            v-if="wallet && wallet.address"
            @click="$router.push('/mint')"
            ButtonText="ENTER THE REALM"
          />
          <ReusableWoodBtn
            v-else
            @click="enterMint"
            ButtonText="ENTER THE REALM"
          />
          <connect-wallet-modal
            :connectDialog="connectWalletDialog"
            @close="connectWalletDialog = false"
          />
        </div>
      </div>
      <div class="transparent-gradient"></div>
      <video
        poster="@/assets/images/video-poster.svg"
        muted
        autoplay
        id="bgVideo"
        :class="videoHeight"
      >
        <source
          :src="require('~/assets/videos/Sacntuay-mint.mp4')"
          type="video/mp4"
        />
        Your browser does not support HTML5 video.
      </video>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      connectWalletDialog: false,
      disconnectWalletDialog: false,
    };
  },
  computed: {
    videoHeight() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "widthVideo";
        case "sm":
          return "widthVideo2";
        case "md":
          return "widthVideo3";
        case "lg":
          return "widthVideo3";
        case "xl":
          return "widthVideo3";
      }
    },
    wallet() {
      return this.$store.state.wallet.wallet;
    },
    getWalletAddress() {
      if (this.wallet) {
        return (
          this.wallet.address.substring(0, 9) +
          "..." +
          this.wallet.address.substring(
            this.wallet.address.length - 2,
            this.wallet.address.length
          )
        );
      }
    },
  },
  methods: {
    getHeight() {
      switch (this.$vuetify.breakpoint.name) {
        case "md":
        case "lg":
          return window.innerHeight - 60;
      }
    },
    enterMint() {
      this.connectWalletDialog = true;
    },
  },
};
</script>
<style>
.video-holder {
  margin-bottom: -6px;
  position: relative;
}
#bgVideo {
  position: static;
  /* width: 100%; */
}

.widthVideo {
  width: 300%;
  transform: translate(-8%, -0);
}

.widthVideo2 {
  width: 140%;
  transform: translate(-12%, -0);
}

.widthVideo3 {
  width: 100%;
}

.landing-content {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}

.custom-h2 {
  color: #683418;
  text-align: center;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.transparent-gradient {
  display: none;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  height: 353px;
  width: 100%;
  flex-shrink: 0;
  border-radius: 0px 0px 8px 8px;
  background: linear-gradient(180deg, rgba(16, 17, 19, 0) 0%, #000 100%);
}
</style>
