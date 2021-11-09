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
    :disabled="!willColorsBeReplaced"
    class="button button--primary">
    Replace colors
  </button>
</div>
</template>

<script lang="ts">
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
import { DEFAULT_THRESHOLD } from '../constants'

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
    ...mapGetters(['willColorsBeReplaced']),
    ...mapState(['threshold'])
  },
  methods: {
    ...mapActions(['replaceColors']),
    ...mapMutations(['setThreshold']),
    updateThreshold(e) {
      this.setThreshold(e.target.value || DEFAULT_THRESHOLD)
    }
  },
  mounted() {
  }
}
</script>

<style lang="scss" scoped>
</style>
