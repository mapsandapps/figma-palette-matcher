<template>
  <div id="palette-matcher">
    <NoColorStylesWarning v-if="colorStyles.length === 0" />
    <div v-else>
      <ColorInput />
      <ColorList />
      <Form />
    </div>
  </div>
</template>
<script lang="ts">
import { mapMutations, mapState } from 'vuex'

import ColorInput from './components/ColorInput.vue'
import ColorList from './components/ColorList.vue'
import Form from './components/Form.vue'
import NoColorStylesWarning from './components/NoColorStylesWarning.vue'

export default {
  components: {
    ColorInput,
    ColorList,
    Form,
    NoColorStylesWarning
  },
  computed: {
    ...mapState(['colorStyles']),
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
