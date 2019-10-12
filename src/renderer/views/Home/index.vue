<template>
  <home-layout>
    <div class="floors" v-if="isRenderFinish">
      <banner :banners="banners" />
    </div>
  </home-layout>
</template>

<script>
import { getBanner } from '@/api/banner'
import HomeLayout from '@/layouts/HomeLayout'
import banner from './components/Banner'
export default {
  data() {
    return {
      banners: [],
      isRenderFinish: true
    }
  },
  components: {
    HomeLayout,
    banner
  },
  created() {
    this._getData()
  },
  methods: {
    async _getData() {
      this.isRenderFinish = false
      Promise.all([getBanner()]).then(([{ banners }]) => {
        this.isRenderFinish = true
        banners.forEach(banner => {
          banner.src = banner.imageUrl
        })
        this.banners = banners
      })
    }
  }
}
</script>

<style>
.flip-list-move {
  transition: transform 0.3s;
}
</style>
<style lang="less" scoped>
.floors {
  padding-top: 20px;
  a {
    font-size: 13px;
    color: #888;
  }
  /deep/ .ant-card-head {
    padding: 0;
    min-height: 32px;
    font-size: 18px;
    font-family: 'Chinese Quote', -apple-system, BlinkMacSystemFont, 'Segoe UI',
      'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue',
      Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
      'Segoe UI Symbol';
    /deep/ .ant-card-head-title {
      padding: 0;
    }
    /deep/ .ant-card-extra {
      padding: 0;
    }
  }
  /deep/ .ant-card-body {
    padding: 10px 0;
  }
}

.wy-footer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100px;
  margin: auto;
  border-top: 1px solid #eee;
}

.drag-item {
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 20px;
  border-bottom: 1px solid #f3f3f3;
  font-size: 18px;
  cursor: move;
}
.reset {
  text-align: center;
  display: block;
  margin: 15px 0;
  text-decoration: underline;
  color: #999;
}
</style>


