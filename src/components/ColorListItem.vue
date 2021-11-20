<template>
<tr>
  <td>
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <pattern id="checkerboard-pattern" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
        <rect width="3" height="3" x="3" y="0" fill="#e1e1e1" />
        <rect width="3" height="3" x="0" y="3" fill="#e1e1e1" />
      </pattern>
      <path d="M0 1C0 0.447715 0.447715 0 1 0H8V16H1C0.447715 16 0 15.5523 0 15V1Z" :fill="color.originalColor.hex" />
      <path d="M8 0H15C15.5523 0 16 0.447715 16 1V15C16 15.5523 15.5523 16 15 16H8V0Z" fill="url(#checkerboard-pattern)" />
      <path d="M8 0H15C15.5523 0 16 0.447715 16 1V15C16 15.5523 15.5523 16 15 16H8V0Z" :fill="color.originalColor.hex" :fill-opacity="color.originalColor.opacity" />
      <!-- TODO: if it had a color style already, it should either show that here or just not be included in the table -->
    </svg>
    {{ color.originalColor.hex }}
    {{ Math.round(color.originalColor.opacity * 100) }}%
  </td>
  <td v-if="color.closestColorStyle">
    <svg width="16" height="16" viewBox="0 0 16 16">
      <circle r="8" cx="8" cy="8" :fill="color.closestColorStyle.hex" />
    </svg>
    {{ color.closestColorStyle.name }}
  </td>
  <td v-else>
    No match
  </td>
  <td>
    <span v-if="color.distance === 0" class="exact-match">
      Exact match!
    </span>
    <span v-else>
      Distance: {{ Math.ceil(color.distance) }}
    </span>
  </td>
  <td>
    <span v-if="color.closestColorStyle" class="replace-input">
      <input
        type="checkbox"
        :id="selectionId"
        v-model="isChecked" />
      <label :for="selectionId">Replace</label>
    </span>
  </td>
</tr>
</template>

<script lang="ts">
import { includes } from 'lodash'
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'ColorListItem',
  components: {
  },
  computed: {
    ...mapState(['selectedColors', 'selectionsToReplace']),
    isChecked: {
      get () {
        return includes(this.selectionsToReplace, this.selectionId)
      },
      set (value) {
        if (value) {
          this.addReplacement(this.selectionId)
        } else {
          this.removeReplacement(this.selectionId)
        }
      }
    },
    selectionId(): string {
      return this.selectedColors[this.index].id
    }
  },
  data() {
    return {}
  },
  props: {
    color: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: false
    }
  },
  methods: {
    ...mapMutations(['addReplacement', 'removeReplacement'])
  },
  mounted() {
  }
};
</script>

<style lang="scss" scoped>
td {
  line-height: 16px;
  padding: 8px;
}

svg {
  vertical-align: middle;
}
</style>
