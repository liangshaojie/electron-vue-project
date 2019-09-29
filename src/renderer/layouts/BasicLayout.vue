<template>
  <a-locale-provider :locale="locale">
    <a-layout class="basic-layout">
      <a-layout-header class="basic-layout-header">
        <basic-header/>
      </a-layout-header>
      <a-layout>
        <a-layout-sider class="basic-layout-sider" :width="siderWidth">
          <div ref="handle" class="split-handle"></div>
          <basic-sider/>
        </a-layout-sider>
        <a-layout-content class="basic-layout-content">
          <keep-alive
            :exclude="keepAliveExcludeList"
            v-if="isOnliline || noLimitRoutes.includes($route.name)"
          >
            <router-view v-if="!refresh"></router-view>
          </keep-alive>
          <offline v-else/>
        </a-layout-content>
      </a-layout>
      <login/>
    </a-layout>
  </a-locale-provider>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";
import BasicHeader from "@/components/BasicHeader";
import BasicSider from "@/components/BasicSider";
import Login from "@/components/Login";
import Offline from "@/components/Offline/index";
const SIDER_WIDTH_DEFAULT = 200;
const SIDER_WIDTH_MAX = 400;
export default {
  data() {
    return {
      locale: zhCN,
      refresh: false,
      keepAliveExcludeList: ["video", "mv", "events"],
      siderWidth: SIDER_WIDTH_DEFAULT
    };
  },
  components: { BasicHeader, BasicSider, Offline, Login },
  computed: {
    ...mapGetters("App", ["isOnliline"]),
    ...mapState("App", ["noLimitRoutes"])
  }
};
</script>

<style lang="less" scoped>
.basic-layout {
  height: 100vh;
  .basic-layout-header,
  .basic-layout-footer {
    height: 50px;
    line-height: 50px;
    padding: 0;
    z-index: 22;
    position: relative;
  }
  .basic-layout-footer {
    border-top: 1px solid #ddd;
    /* cursor: url('/static/images/gunlun.png'),default; */
  }
  .basic-layout-header {
    background: @primary-color;
    color: #eee;
    -webkit-app-region: drag;
  }
  .basic-layout-sider {
    position: relative;
    background: none;
    box-shadow: none;
    overflow-x: hidden;
    overflow-y: hidden;
    .split-handle {
      position: absolute;
      right: 0;
      top: 0;
      height: 100%;
      width: 5px;
      border-right: 1px solid #ddd;
      cursor: col-resize;
    }
  }
  .basic-layout-content {
    background: #f5f5f7;
  }
}
</style>
