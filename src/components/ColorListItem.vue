<template>
<tr>
  <td>
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <pattern id="checkerboard-pattern" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
        <rect width="3" height="3" x="3" y="0" fill="#fff" />
        <rect width="3" height="3" x="0" y="3" fill="#fff" />
      </pattern>
      <path d="M0 1C0 0.447715 0.447715 0 1 0H8V16H1C0.447715 16 0 15.5523 0 15V1Z" :fill="color.originalColor.hex" />
      <path d="M8 0H15C15.5523 0 16 0.447715 16 1V15C16 15.5523 15.5523 16 15 16H8V0Z" fill="url(#checkerboard-pattern)" />
      <path d="M8 0H15C15.5523 0 16 0.447715 16 1V15C16 15.5523 15.5523 16 15 16H8V0Z" :fill="color.originalColor.hex" :fill-opacity="color.originalColor.opacity" />
      <!-- TODO: if it had a color style already, it should either show that here or just not be included in the table -->
    </svg>
    {{ color.originalColor.hex }}
  </td>
  <td>
    {{ Math.round(color.originalColor.opacity * 100) }}%
  </td>
  <td v-if="color.closestColorStyle">
    <svg width="16" height="16" viewBox="0 0 16 16">
      <path d="M2.34314575,2.34 C-0.781048583,5.46419433 -0.781048583,10.5295142 2.34314575,13.6537085 C5.46734008,16.7779028 10.5326599,16.7779028 13.6568542,13.6537085 L2.34314575,2.34 Z" :fill="color.closestColorStyle.hex"></path>
      <path d="M13.6568542,13.6568542 C16.7810486,10.5326599 16.7810486,5.46734008 13.6568542,2.34314575 C10.5326599,-0.781048583 5.46734008,-0.781048583 2.34314575,2.34314575 L13.6568542,13.6568542 L13.6568542,13.6568542 Z" fill="url(#checkerboard-pattern)" />
      <path d="M13.6568542,13.6568542 C16.7810486,10.5326599 16.7810486,5.46734008 13.6568542,2.34314575 C10.5326599,-0.781048583 5.46734008,-0.781048583 2.34314575,2.34314575 L13.6568542,13.6568542 L13.6568542,13.6568542 Z" :fill="color.closestColorStyle.hex" :fill-opacity="color.closestColorStyle.opacity" />
    </svg>
    {{ color.closestColorStyle.name }}
  </td>
  <td v-else class="no-match">
    No match
  </td>
  <td>
    <span v-if="color.distance === 0" class="exact-match">
      Exact match!
    </span>
    <span
      v-else
      :class="{
        'no-match': !color.closestColorStyle,
        'not-exact-match': true
      }">
      Distance: {{ Math.ceil(color.distance) }}
    </span>
  </td>
  <td v-if="isReplaceable">
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
    },
    isReplaceable: {
      type: Boolean,
      required: false,
      default: true
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
  &:nth-of-type(1) {
    border-right-width: 0px;
  }
  &:nth-of-type(2) {
    border-left-width: 0px;
  }
}

svg {
  vertical-align: middle;
}

.no-match {
  color: var(--red)!important;
}

.not-exact-match {
  color: #7f8c8d;
}
</style>
