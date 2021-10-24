<template>
<div>
  <div>
    Threshold:&nbsp;
    <input
      type="number"
      :value="threshold"
      @input="updateThreshold"
      placeholder="Default: 25" />
  </div>
  <button @click="replaceColors">Replace colors</button>
  <button @click="closePlugin">Cancel</button>
</div>
</template>

<script lang="ts">
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Form',
  components: {
  },
  props: {
  },
  data() {
    return {}
  },
  computed: {
    ...mapState(['threshold'])
  },
  methods: {
    ...mapActions(['closePlugin', 'replaceColors']),
    updateThreshold(e) {
      this.$store.commit('setThreshold', e.target.value || 25)
    }
  },
  mounted() {
  }
};
</script>

<style lang="scss" scoped>
</style>
