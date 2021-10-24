<template>
<div>
  <div v-if="selectedColors.length === 0">
    <div>
      Input a color:&nbsp;
      <input
        type="text"
        v-model="inputtedColor"
        placeholder="Hex or RGB"
        :class="{ error: Boolean(error) }" />
    </div>
    OR
      Select some nodes
    <hr />
  </div>
  <ColorListItem
    v-if="showInputtedColorSwatches"
    :color="inputtedColorSwatches" />
</div>
</template>

<script lang="ts">
import chroma from 'chroma-js'
import { mapState } from 'vuex'
import { getClosestColor, hexToFigma } from '../utils';
import ColorListItem from './ColorListItem.vue';

export default {
  name: 'ColorInput',
  components: {
    ColorListItem
  },
  props: {
  },
  data() {
    return {
      error: null,
      inputtedColor: '#f07300'
    }
  },
  computed: {
    ...mapState(['colorStyles', 'selectedColors', 'threshold']),
    inputtedColorSwatches: function() {
      if (!this.inputtedColor || this.colorStyles.length === 0) return

      try {
        chroma(this.inputtedColor)
        this.error = null
      } catch (err) {
        this.error = err
        return
      }

      // TODO: handle invalid inputs
      const originalColor = {
        id: '',
        hex: chroma(this.inputtedColor).hex(),
        chroma: chroma(this.inputtedColor),
        figma: hexToFigma(this.inputtedColor)
      }

      return getClosestColor(originalColor, this.colorStyles, this.threshold)
    },
    showInputtedColorSwatches: function() {
      return (this.inputtedColorSwatches && this.selectedColors.length === 0 && !this.error)
    }
  },
  methods: {
  },
  mounted() {
  }
};
</script>

<style lang="scss" scoped>
</style>
