<template>
<div>
  <div class="logo-mark">
    <svg width="64" height="64" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="16" height="16" fill="white"/>
      <rect x="1.85" y="1.85" width="8.3" height="8.3" rx="1.37507" fill="#E74C3C" stroke="black" stroke-width="0.3"/>
      <rect x="5.85" y="5.85" width="8.3" height="8.3" rx="1.37507" fill="#F07300" stroke="black" stroke-width="0.3"/>
      <path d="M11.4943 7.35964C11.4943 5.32989 9.84882 3.68445 7.81906 3.68445" stroke="black" stroke-width="0.306266"/>
      <line x1="10.8369" y1="6.89172" x2="11.6025" y2="7.65738" stroke="black" stroke-width="0.306266"/>
      <line x1="11.386" y1="7.65747" x2="12.1516" y2="6.8918" stroke="black" stroke-width="0.306266"/>
    </svg>
    Palette Matcher
  </div>

  <p>This plugin allows you to convert a color to the nearest color in your color styles.</p>

  <p>You need to define one or more <a href="https://help.figma.com/hc/en-us/articles/360038746534-Create-color-text-effect-and-layout-grid-styles#Colors_paints" target="_blank">color styles</a> for this plugin to work. Please create some and then run it again.</p>

  <button @click="closePlugin" class="button button--secondary">Cancel</button>
</div>
</template>

<script lang="ts">
import { mapActions } from 'vuex'

export default {
  name: 'NoColorStylesWarning',
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
    ...mapActions(['closePlugin']),
  },
  mounted() {
  }
};
</script>

<style lang="scss" scoped>
.logo-mark {
  color: #f07300;
  line-height: 64px;
}
</style>
