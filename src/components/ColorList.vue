<template>
<div>
  Preview replacements: <br />
  <ColorListItem
    v-for="(color, index) of colors"
    :color="color"
    :key="'color-swatch' + index"
  />
</div>
</template>

<script lang="ts">
import { mapGetters, mapState } from 'vuex'
import ColorListItem from './ColorListItem.vue';
export default {
  name: 'ColorList',
  components: {
    ColorListItem
  },
  props: {},
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['colors']),
    ...mapState(['colorStyles'])
  },
  methods: {},
  mounted() {}
};
</script>

<style lang="scss" scoped>
</style>
