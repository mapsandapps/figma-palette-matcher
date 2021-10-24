<template>
<div>
  <button @click="replaceColors">Replace colors</button>
  <button @click="closePlugin">Cancel</button>
</div>
</template>

<script lang="ts">
import { mapActions, mapMutations } from 'vuex'

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
  },
  methods: {
    ...mapActions(['closePlugin', 'replaceColors']),
  },
  mounted() {
  }
};
</script>

<style lang="scss" scoped>
</style>
