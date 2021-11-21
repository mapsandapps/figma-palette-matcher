<template>
<div>
  <div>
    <label class="label" for="threshold-input">Threshold:&nbsp;</label>
    <input
      type="range"
      id="threshold-input"
      name="slider"
      min="0"
      max="100"
      step="1"
      :value="threshold"
      @input="updateThreshold">
    <input
      id="threshold-input-number"
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
label {
  color: var(--black);
}

#palette-matcher #threshold-input-number.input__field {
  width: 48px;
}
</style>
