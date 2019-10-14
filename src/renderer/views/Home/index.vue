<template>
  <home-layout>
    <div class="floors" v-if="isRenderFinish">
      <banner :banners="banners" />
      <transition-group name="flip-list">
        <a-card :bordered="false" style="background: transparent;margin-bottom: 20px;" :style="{opacity:isRenderFinish?1:0}" v-for="item in navs" :title="item.name" :key="item.key">
          <router-link :to="`/${item.key}`" slot="extra" v-if="!item.hideMore">
            更多
            <a-icon type="right" />
          </router-link>
          <component :is="item.key" :list="data[item.key]" v-if="isRenderFinish" />
        </a-card>
      </transition-group>
    </div>
  </home-layout>
</template>

<script>
import { getBanner } from '@/api/banner'
import { getPrivateContent } from '@/api/privatecontent'
import { getNewSong } from '@/api/song'
import { getRecommendPlaylist } from '@/api/playlist'
import { getPersonalizedMV } from '@/api/mv'
import { getDjHot } from '@/api/dj'

import HomeLayout from '@/layouts/HomeLayout'
import banner from './components/Banner'
import privateContent from './components/privateContent'
import newSong from './components/newSong'
import playlist from './components/playlist'
import mv from './components/mv'
import dj from './components/dj'
export default {
  data() {
    return {
      banners: [],
      isRenderFinish: true,
      data: {
        privateContent: [],
        newSong: [],
        playlist: [],
        mv: [],
        dj: []
      },
      navs: [
        {
          name: '独家放送',
          key: 'privateContent',
          hideMore: true
        },
        {
          name: '最新音乐',
          key: 'newSong'
        },
        {
          name: '推荐歌单',
          key: 'playlist'
        },
        {
          name: '推荐MV',
          key: 'mv'
        },
        {
          name: '主播电台',
          key: 'dj'
        }
      ]
    }
  },
  components: {
    HomeLayout,
    banner,
    privateContent,
    newSong,
    playlist,
    mv,
    dj
  },
  created() {
    this._getData()
  },
  methods: {
    async _getData() {
      this.isRenderFinish = false
      Promise.all([
        getBanner(),
        getPrivateContent(),
        getNewSong(),
        getRecommendPlaylist(),
        getPersonalizedMV(),
        getDjHot()
      ]).then(
        ([
          { banners },
          { result: privateContent },
          { result: newSong },
          { result: playlist },
          { result: mv },
          { djRadios: dj }
        ]) => {
          this.isRenderFinish = true
          banners.forEach(banner => {
            banner.src = banner.imageUrl
          })
          this.banners = banners
          this.data = {
            privateContent,
            newSong,
            playlist,
            mv,
            dj
          }
        }
      )
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


