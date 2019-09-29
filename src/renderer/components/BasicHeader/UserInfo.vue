<template>
    <div>
        <template v-if="hasUserInfo"></template>
        <span @click="showLogin" class="header-user" v-else>
            <a-avatar :size="30" class="avatar" icon="user"/>
            <span>未登录</span>
        </span>
    </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      loadding: false,
      visible: false,
      showPoint: false,
      signPoint: ""
    };
  },
  computed: {
    ...mapState("User", ["userInfo"]),
    ...mapGetters("User", ["hasUserInfo"]),
    userId() {
      return this.userInfo.userId;
    }
  },
  methods: {
    showLogin() {
      this.$store.commit("User/SET_SHOW_LOGIN", true);
    }
  }
};
</script>

<style lang="less">
.user-box {
  margin: -12px -16px;
  padding: 12px 16px;
  background: #fafafa;
  .user-avatar {
    width: 38px;
    height: 38px;
    border-radius: 50%;
  }
  .username {
    color: #333;
  }
  .list2 {
    margin: 10px 0;
    .list2-item {
      text-align: center;
      display: block;
      color: #333;
      &:not(:last-child) {
        border-right: 1px solid #ddd;
      }
    }
  }
  .sign-point {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    line-height: 27px;
    text-align: center;
    color: @primary-color;
    opacity: 0;
  }
  .sign-btn {
    height: 27px;
    padding: 0 8px;
  }
}
</style>


