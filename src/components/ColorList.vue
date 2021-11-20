<template>
<table>
  <thead>
    <tr>
      <th>Original Color</th>
      <th>Target Color</th>
      <th>Distance</th>
      <th>Replace?</th>
    </tr>
  </thead>
  <tbody>
    <ColorListItem
      v-for="(color, index) of colors"
      :color="color"
      :index="index"
      :key="'color-list-item-' + index" />
  </tbody>
</table>
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
table {
  font-size: 11px;
}

th {
  color: #7f8c8d;
  font-weight: normal;
  padding: 8px;
  text-align: start;
  text-transform: uppercase;
}

tbody tr:nth-child(odd) {
  background-color: #ecf0f1;
}
</style>
