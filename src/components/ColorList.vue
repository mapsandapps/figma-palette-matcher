<template>
<div>
  Preview replacements: <br />
  <ColorListItem
    v-for="(color, index) of colors"
    :color="color"
    :key="'color-swatch' + index"
  />
</div>
</template>

<script lang="ts">
import { mapGetters, mapMutations, mapState } from 'vuex'
import ColorListItem from './ColorListItem.vue';
export default {
  name: 'ColorList',
  components: {
    ColorListItem
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
</style>
