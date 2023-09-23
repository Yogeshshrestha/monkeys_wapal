<template>
  <div>
    <v-btn large text class="btn-text" @click="$emit('click')">{{
      ButtonText
    }}</v-btn>
  </div>
</template>

<script>
export default {
  props: {
    ButtonText: {
      type: String,
    },
  },
};
</script>

<style lang="css">
.btn-mint {
  background: linear-gradient(90deg, #c8ac27 0%, rgba(129, 141, 29, 0.75) 100%);
}
.btn-text {
  font-family: "Grootten", "sans-serif" !important;
  font-size: 15px !important;
  font-style: normal !important;
  font-weight: 400 !important;
  line-height: 150% !important;
  color: #ffefd0 !important;
  background-image: url("~/assets/images/btn-bg.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25)) !important;
}
</style>
