<template>
<div>
  <div>
    Threshhold:&nbsp;
    <input
      type="number"
      :value="threshhold"
      @input="updateThreshhold"
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
    ...mapState(['threshhold'])
  },
  methods: {
    ...mapActions(['closePlugin', 'replaceColors']),
    updateThreshhold(e) {
      this.$store.commit('setThreshhold', e.target.value || 25)
    }
  },
  mounted() {
  }
};
</script>

<style lang="scss" scoped>
</style>
