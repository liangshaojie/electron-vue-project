<template>
  <li :class="itemCls">
    <router-link :to="toPath" class="info" :style="styleObj">
      <img class="avatar" v-lazy="`${item.picUrl || item.imgurl16v9 || item.cover || item.coverUrl}?param=${imgParam}`" />
      <div class="top" v-if="item.playCount || item.playTime">
        <a-icon type="customer-service" />
        {{item.playCount | toWan}}
        <!-- {{item.playCount | toWan || item.playTime | toWan}} -->
      </div>
      <div class="bottom" v-if="item.creator">
        <a-icon type="user" />
        <span>{{item.creator.nickname || item.creator[0].userName}}</span>
      </div>
      <a-icon type="play-circle" class="play-icon" />
      <slot name="copywriter"></slot>
    </router-link>
    <router-link tag="div" :to="toPath" class="intro">
      <div class="name">{{item.name || item.title}}</div>
      <slot name="description"></slot>
    </router-link>
  </li>
</template>

<script>
export default {
  props: {
    layout: { type: String, default: '' },
    ratio: { type: Number, default: 1 }, // 图片高宽比
    item: { type: Object, default: null },
    itemType: {
      type: String,
      default: 'playlist',
      validator(value) {
        return ['playlist', 'video', 'mv'].includes(value)
      }
    },
    imgParam: { type: String, default: '200y200' }
  },
  computed: {
    itemCls() {
      return this.layout == 'horizon' ? 'item horizon' : 'item'
    },
    styleObj() {
      let style = {}
      style.paddingTop = (this.ratio / 1) * 100 + '%'
      return style
    },
    toPath() {
      return this.itemType == 'video'
        ? `/video/${this.item.videoId}`
        : this.itemType == 'mv'
          ? `/mv/${this.item.id}`
          : `/playlist/${this.item.id}`
    }
  }
}
</script>

<style lang="less" scoped>
.item {
  display: flex;
  flex-direction: column;
  _margin-bottom: 20px;
  overflow: hidden;
  &.horizon {
    flex-direction: row;
    .info {
      flex: 1;
    }
    .intro {
      flex: 2;
      .name {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }
  .info {
    position: relative;
    padding-top: 100%;
    width: 100%;
    margin: 0;
    color: #fff;
    font-size: 13px;
    &:hover {
      .play-icon {
        display: block;
      }
    }
    .avatar {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      display: block;
      width: 100%;
      height: 100%;
    }
    .top,
    .bottom {
      position: absolute;
      left: 0;
      width: 100%;
      padding: 0 10px;
    }
    .top {
      top: 0;
      line-height: 22px;
      background: linear-gradient(to left, rgba(0, 0, 0, 0.25), transparent);
      text-align: right;
    }
    .bottom {
      bottom: 0;
      padding-right: 30px;
      line-height: 30px;
      background: linear-gradient(to top, rgba(0, 0, 0, 0.5), transparent);
    }
    .play-icon {
      display: none;
      position: absolute;
      right: 5px;
      bottom: 5px;
      font-size: 30px;
      color: rgba(255, 255, 255, 0.5);
    }
    .bottom {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
  .intro {
    overflow: hidden;
    .name {
      padding: 4px;
      font-size: 13px;
    }
  }
}
</style>
