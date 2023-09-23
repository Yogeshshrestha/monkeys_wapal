<template>
  <div>
    <v-card color="transparent" class="minted-card" flat>
      <div
        class="outer-card px-5 pt-6"
        color="#B1864F"
        style="background: #b1864f"
      >
        <div class="inner-card mb-6">
          <v-img
            class="py-3 px-3"
            :src="require('~/assets/images/minted-img.png')"
            style="position: relative"
          >
            <v-btn
              class="btn-position text-capitalize"
              style="
                border-radius: 100px;
                color: #000;
                background: rgba(0, 0, 0, 0.15);
              "
            >
              Tweet
              <span class="ml-1">
                <img
                  src="~/assets/images/twitter-black.svg"
                  alt="twitter logo"
                  style="vertical-align: middle; height: 24px; width: 24px"
                />
              </span>
            </v-btn>
          </v-img>
        </div>
        <div class="pb-6">
          <p class="p">
            Unlocking the gates to my personal haven in the jungle Join me on
            this adventure as I reveal the magic within. #AptosMonkeys
            #Sanctuaries #JourneyBegins
          </p>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {};
</script>

<style lang="css">
.minted-card {
  max-width: 424px;
  max-height: 424px;
  width: 100%;
  height: auto;
  border-radius: 10px;
  border: 1px solid #fecb66;
  background: #b1864f;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}
.btn-position {
  position: absolute;
  right: 12px;
  font-family: "Inter", "sans-serif" !important;
  font-size: 12px !important;
  font-style: normal !important;
  font-weight: 600 !important;
  line-height: 150% !important;
}
</style>
