<template>
    <div>
        <a-button type="primary">hello world</a-button>
        <a-locale-provider :locale="locale">
            <!-- <keep-alive
            :exclude="keepAliveExcludeList"
            v-if="isOnliline || noLimitRoutes.includes($route.name)"
        >
            <router-view v-if="!refresh"></router-view>
            </keep-alive>-->
        </a-locale-provider>
    </div>
</template>
<script>
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";
export default {
  data() {
    return {
      locale: zhCN
    };
  }
};
</script>

<style lang="less" scoped>
</style>
