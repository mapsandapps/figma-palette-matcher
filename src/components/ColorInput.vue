<template>
<div>
  <EmptyState />
  <div class="input">
    Input a color:&nbsp;
    <input
      class="input__field picker"
      type="color"
      v-model="colorForHexInput" />
    or
    <input
      class="input__field"
      type="text"
      v-model="inputtedColor"
      placeholder="Hex or RGB"
      :class="{ error: Boolean(error) }" />
  </div>
  <div v-if="error" class="error">{{ error }}</div>
  <table v-if="colorInfo">
    <thead>
      <tr>
        <th>Original Color</th>
        <th>Target Color</th>
        <th>Distance</th>
      </tr>
    </thead>
    <tbody>
      <ColorListItem
        :color="colorInfo"
        :index="0"
        key="color-list-item-0"
        :isReplaceable="false" />
    </tbody>
  </table>
</div>
</template>

<script lang="ts">
import chroma from 'chroma-js'
import { mapState } from 'vuex'
import { ColorListItem as ColorListItemType, SelectedColor } from '../types';
import { getClosestColor, getColorInfo, hexToFigma } from '../utils';
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
    colorForHexInput(): string {
      return this.colorInfo?.originalColor.hex || this.inputtedColor
    },
    colorInfo(): ColorListItemType {
      if (!this.inputtedColor || this.colorStyles.length === 0) return

      try {
        chroma(this.inputtedColor)
        this.error = null
      } catch (err) {
        this.error = err
        console.log(err)
        return
      }

      // TODO: test inputting 0xff3399 and other things that should work via chroma

      // TODO: set this using a method; this code is probably mostly repeated elsewhere
      const originalColor: SelectedColor = getColorInfo(this.inputtedColor, '')

      return getClosestColor(originalColor, this.colorStyles, null)
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
#palette-matcher .input {
  .input__field.picker {
    width: 44px;
    height: 23px;
    padding: 1px 2px;
  }
}

.error {
  color: var(--red);
  font-size: 11px;
}
</style>
