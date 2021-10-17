<template>
  <div>
    Threshhold:&nbsp;
    <input
      type="number"
      :value="threshhold"
      @input="updateThreshhold"
      placeholder="Default: 25" />
    <ColorList />
    <button>Replace colors</button>
    <button>Cancel</button>
  </div>
</template>
<script lang="ts">
import { mapState } from 'vuex'

import ColorList from './components/ColorList.vue'

export default {
  components: {
    ColorList
  },
  computed: {
    ...mapState(['threshhold'])
  },
  methods: {
    updateThreshhold (e) {
      this.$store.commit('setThreshhold', e.target.value)
    }
  },
  mounted() {},
  watch: {},
  mixins: [],
}
</script>
