<template>
    <div>{{showLogin}}</div>
</template>

<script>
export default {
  data() {
    return {
      loading: false
    };
  },
  computed: {
    showLogin: {
      get() {
        return this.$store.state.User.showLogin;
      },
      set(value) {
        this.$store.commit("User/SET_SHOW_LOGIN", value);
      }
    }
  },
  watch: {
    showLogin(newVal) {
      if (newVal) {
        this.loading = false;
      }
    }
  }
};
</script>
<style>
.ant-modal-wrap.login {
  z-index: 100000;
}
.login .ant-modal-content {
  min-height: 400px;
  background: #f8f8f8 url("./../../assets/images/loginBg.jpg") top
    center/contain no-repeat !important;
}

#login {
  margin-top: 180px;
}

#login .login-form-button {
  width: 100%;
}
</style>

