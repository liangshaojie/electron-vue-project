let recommendRoutes = [{
  path: '/home',
  component: () =>
        import(/* webpackChunkName: "home" */ '@/views/Home/index.vue'),
  name: 'home',
  meta: {
    title: '发现音乐',
    icon: 'music'
  }
} ]

export {
  recommendRoutes
}
