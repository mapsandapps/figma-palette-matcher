<template>
<div>
  Color styles: <br />
  <div
      v-for="(color, index) of colorStyles"
      :key="index"
      class="color-swatch"
      :style="'background:' + color.hex"
  /><br />
  Color styles: <br />
  <div
      v-for="(selection, index) of selectedColors"
      :key="'color-swatch' + index"
      class="color-swatch"
      :style="'background:' + selection.hex"
  />
</div>
</template>

<script lang="ts">
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'ColorList',
  components: {
  },
  props: {
  },
  // data() {
  // },
  computed: {
    ...mapState(['colorStyles', 'selectedColors'])
  },
  methods: {
    handleMessage() {
      // TODO: should this be in the store? or in App.vue?
      onmessage = (event: any) => {
        if (event.data.pluginMessage.name === 'colorsFromLocalStyles') {
          this.setColorStyles(event.data.pluginMessage.data)
        }
        if (event.data.pluginMessage.name === 'colorsFromSelections') {
          this.setSelectedColors(event.data.pluginMessage.data)
        }
      }
    },
    ...mapMutations(['setColorStyles', 'setSelectedColors'])
  },
  mounted() {
    this.handleMessage()
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
