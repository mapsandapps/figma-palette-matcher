<template>
<div>
  Color styles: <br>
  <div
      v-for="(color, index) of colorStyles"
      :key="index"
      class="color-swatch"
      :style="'background:' + color.hex"
      :title="color.name"
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
    ...mapState(['colorStyles'])
  },
  methods: {
    handleMessage() {
      onmessage = (event: any) => {
        if (event.data.pluginMessage.name === 'colorsFromLocalStyles') {
          this.setColorStyles(event.data.pluginMessage.data)
        }
      }
    },
    ...mapMutations(['setColorStyles'])
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
