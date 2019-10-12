<template>
  <slider ref="slider" :autoPlay="true" :data-w="width" :height="width*0.7*0.372" :list="banners" @sliderClick="onSliderClick" />
</template>

<script>
import Slider from '@/components/Slider'
export default {
  name: 'banner',
  props: {
    banners: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    Slider
  },
  data() {
    return {
      width: 1000
    }
  },
  mounted() {
    console.log(this.banners)
  },
  methods: {
    onSliderClick(i, item) {
      if (item.url) {
        this.$electron.remote.shell.openExternal(item.url)
      }
    }
  }
}
</script>


