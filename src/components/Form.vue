<template>
<div>
  <!-- TODO: make this an actual label -->
  <div class="input">
    <span class="label">Threshold:&nbsp;</span>
    <input
      class="input__field"
      type="number"
      :value="threshold"
      @input="updateThreshold"
      placeholder="Default: 25" />
  </div>
  <button
    @click="replaceColors"
    :disabled="!hasSelectionsToReplace"
    class="button button--primary">
    Replace colors
  </button>
  <button
    @click="closePlugin"
    class="button button--secondary">
    Cancel
  </button>
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
    ...mapState(['selectionsToReplace', 'threshold']),
    hasSelectionsToReplace(): boolean {
      console.log(this.selectionsToReplace.length > 0)
      return this.selectionsToReplace.length > 0
    }
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
