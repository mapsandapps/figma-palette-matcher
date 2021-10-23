<template>
<div>
  Threshhold:&nbsp;
  <input
    type="number"
    :value="threshhold"
    @input="updateThreshhold"
    placeholder="Default: 25" />
</div>
</template>

<script lang="ts">
import { mapState } from 'vuex'

export default {
  name: 'Inputs',
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
    updateThreshhold(e) {
      this.$store.commit('setThreshhold', e.target.value)
    }
  },
  mounted() {
  }
};
</script>

<style lang="scss" scoped>
</style>
