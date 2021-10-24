<template>
  <div>
    <Inputs />
    <ColorList />
    <Form />
  </div>
</template>
<script lang="ts">
import { mapMutations } from 'vuex'

import ColorList from './components/ColorList.vue'
import Form from './components/Form.vue'
import Inputs from './components/Inputs.vue'

export default {
  components: {
    ColorList,
    Form,
    Inputs
  },
  methods: {
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
