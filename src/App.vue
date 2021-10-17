<template>
  <div>
    Threshhold: <input type="number" value="25" />
    <ColorList />
    <button>Replace colors</button>
    <button>Cancel</button>
  </div>
</template>
<script lang="ts">
import { mapMutations } from 'vuex'

import ColorList from './components/ColorList.vue'
import { onLaunch } from './utils'

export default {
  components: {
    ColorList
  },
  data() {
    return {
      colors: []
    }
  },
  computed: {},
  methods: {
    start() {
      this.colors = onLaunch()
    },
    ...mapMutations(['setColors']),
  },
  mounted() {
    this.start()
    this.generateShades()
    this.generateColorHarmonies()
  },
  watch: {},
  mixins: [],
}
</script>
