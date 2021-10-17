<template>
<div>
  <div
    class="color-swatch"
    :style="'background:' + color.originalColor.hex"
  />
  <div
    class="color-swatch"
    :style="'background:' + color.closestColorStyle.hex"
  />
  <span v-if="color.distance === 0">
    Exact match!
  </span>
</div>
</template>

<script lang="ts">
export default {
  name: 'ColorList',
  components: {
  },
  props: {
    color: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.color-swatch {
  width: 48px;
  height: 48px;
  display: inline-block;
}
</style>
