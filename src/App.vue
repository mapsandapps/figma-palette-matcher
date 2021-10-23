<template>
  <div>
    <Inputs />
    <ColorList />
    <button @click="replaceColors">Replace colors</button>
    <button @click="closePlugin">Cancel</button>
  </div>
</template>
<script lang="ts">
import { mapActions, mapMutations } from 'vuex'

import ColorList from './components/ColorList.vue'
import Inputs from './components/Inputs.vue'

export default {
  components: {
    ColorList,
    Inputs
  },
  methods: {
    ...mapActions(['closePlugin', 'replaceColors']),
    ...mapMutations(['setColorStyles', 'setSelectedColors']),
    handleMessage() {
      onmessage = (event: any) => {
        if (event.data.pluginMessage.name === 'colorsFromLocalStyles') {
          this.setColorStyles(event.data.pluginMessage.data)
        }
        if (event.data.pluginMessage.name === 'colorsFromSelections') {
          this.setSelectedColors(event.data.pluginMessage.data)
        }
      }
    }
  },
  mounted() {
    this.handleMessage()
  },
  watch: {},
  mixins: [],
}
</script>
