<template>
<div>
  Selected fills: <br />
  <div
      v-for="(color, index) of colors"
      :key="'color-swatch' + index"
      class="color-swatch"
      :style="'background:' + color.originalColor.hex"
  />
</div>
</template>

<script lang="ts">
import { mapGetters, mapMutations, mapState } from 'vuex'
export default {
  name: 'ColorList',
  components: {
  },
  props: {
  },
  // data() {
  // },
  computed: {
    ...mapGetters(['colors']),
    ...mapState(['colorStyles'])
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
