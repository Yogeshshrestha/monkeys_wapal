<template>
  <div class="mint-bg">
    <div class="cards-holder">
      <!-- <MintMinted class="mint-position" /> -->
      <MintMinting class="minti ng-position" />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="css">
.mint-bg {
  width: 100%;
  /* width: 1440px; */
  height: 900px;
  background-image: url("~/assets/images/mint-bg.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.cards-holder {
  height: 120dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

/* .minting-position { */
/* position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); */
/* } */
</style>
