<template>
  <v-btn class="wallet-btn" text @click="$emit('click')">
    {{ text }}
  </v-btn>
</template>
<script>
export default {
  props: {
    text: { type: String },
  },
};
</script>

<style>
.wallet-btn {
  border-radius: 100px;
  background-color: #fff;
  color: #000 !important;
  text-transform: capitalize !important;
}
</style>
