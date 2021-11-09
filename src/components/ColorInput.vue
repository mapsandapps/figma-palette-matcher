<template>
<div>
  <div v-if="selectedColors.length === 0">
    <EmptyState />
    <div class="input">
      Input a color:&nbsp;
      <input
        class="input__field"
        type="text"
        v-model="inputtedColor"
        placeholder="Hex or RGB"
        :class="{ error: Boolean(error) }" />
    </div>
    <hr />
  </div>
  <!-- TODO: split out swatches & use that -->
  <!-- TODO: shouldn't have index -->
  <!-- <ColorListItem
    v-if="shouldShowInputtedColorSwatches"
    :color="inputtedColorSwatches" /> -->
</div>
</template>

<script lang="ts">
import chroma from 'chroma-js'
import { mapState } from 'vuex'
import { ColorListItem as ColorListItemType } from '../types';
import { getClosestColor, hexToFigma } from '../utils';
import ColorListItem from './ColorListItem.vue';
import EmptyState from './EmptyState.vue';

export default {
  name: 'ColorInput',
  components: {
    ColorListItem,
    EmptyState
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
    inputtedColorSwatches(): ColorListItemType {
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
    shouldShowInputtedColorSwatches(): boolean {
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
