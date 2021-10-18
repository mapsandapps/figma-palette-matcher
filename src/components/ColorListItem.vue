<template>
<div class="color-list-item">
  <svg
    class="color-swatches"
    width="74"
    height="74"
    viewBox="0 0 74 74">
    <rect
      width="48"
      height="48"
      rx="8"
      :stroke="textColor"
      stroke-width="1"
      :fill="color.originalColor.hex"
    />
    <rect
      width="48"
      height="48"
      x="24"
      y="24"
      rx="8"
      v-if="color.closestColorStyle"
      :stroke="textColor"
      stroke-width="1"
      :fill="color.closestColorStyle.hex"
    />
    <g
      v-if="color.closestColorStyle"
      width="29"
      height="26"
      transform="translate(38, 10)"
      viewBox="0 0 29 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path d="M24 25C24 11.7452 13.2548 1 0 1" :stroke="textColor" stroke-width="2"/>
      <line x1="19.7071" y1="20.2929" x2="24.7071" y2="25.2929" :stroke="textColor" stroke-width="2"/>
      <line x1="23.2929" y1="25.2929" x2="28.2929" y2="20.2929" :stroke="textColor" stroke-width="2"/>
    </g>
  </svg>
  <div
    v-if="color.closestColorStyle"
    class="color-list-item-name"
    :style="'color: ' + textColor">
    {{ color.closestColorStyle.name }}
  </div>

  <div v-if="color.distance === 0">
    Exact match!
  </div>
  <div v-if="!color.closestColorStyle">
    No match
  </div>
</div>
</template>

<script lang="ts">
import { LightDarkEnum } from '../types';
import { getLightVsDark } from "../utils"

export default {
  name: 'ColorList',
  components: {
  },
  computed: {
    textColor: function() {
      // if bg is dark, text is white
      // if bg is light, text is black
      return getLightVsDark(this.color.closestColorStyle?.hex || this.color.originalColor.hex) === LightDarkEnum.Light ? 'black' : 'white'
    }
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
.color-list-item {
  position: relative;
  background-color: #bdc3c7;
  border: 8px solid white;
  display: inline-block;
  padding: 16px;
  vertical-align: top;
}

.color-list-item-name {
  position: absolute;
  width: 48px;
  height: 48px;
  top: 52px;
  left: 40px;
  text-align: center;
}
</style>
