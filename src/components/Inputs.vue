<template>
<div>
  <div v-if="selectedColors.length === 0">
    <div>
      Input a color:&nbsp;
      <input
        type="text"
        :value="inputtedColor"
        placeholder="Hex or RGB" />
    </div>
    OR
      Select some nodes
    <hr />
  </div>
  <div>
    Threshhold:&nbsp;
    <input
      type="number"
      :value="threshhold"
      @input="updateThreshhold"
      placeholder="Default: 25" />
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
  name: 'Inputs',
  components: {
    ColorListItem
  },
  props: {
  },
  data() {
    return {
      inputtedColor: '#f07300'
    }
  },
  computed: {
    ...mapState(['colorStyles', 'selectedColors', 'threshhold']),
    inputtedColorSwatches: function() {
      if (!this.inputtedColor || this.colorStyles.length === 0) return

      // TODO: handle invalid inputs
      const originalColor = {
        id: '',
        hex: chroma(this.inputtedColor).hex(),
        chroma: chroma(this.inputtedColor),
        figma: hexToFigma(this.inputtedColor)
      }

      return getClosestColor(originalColor, this.colorStyles, this.threshhold)
    },
    showInputtedColorSwatches: function() {
      return (this.inputtedColorSwatches && this.selectedColors.length === 0)
    }
  },
  methods: {
    updateThreshhold(e) {
      this.$store.commit('setThreshhold', e.target.value || 25)
    }
  },
  mounted() {
  }
};
</script>

<style lang="scss" scoped>
</style>
