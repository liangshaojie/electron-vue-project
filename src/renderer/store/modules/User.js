import Message from 'ant-design-vue/es/message'
// import { login_refresh, logout } from './../../api/login'

let state = {
    showLogin: false,
    userInfo: {},
    userDetail: '',
    userPlaylists: [], // 用户收藏的歌单
    likedsongIds: [] // 喜欢的歌曲id列表
}

let getters = {
    hasUserInfo: state => Object.keys(state.userInfo).length > 0,
    userId: state => ((Object.keys(state.userInfo).length > 0) && state.userInfo.profile.userId) || '',
    userPlaylists: state => state.userPlaylists,
    subscribedList: state => {
        return state.userPlaylists.filter(item => {
            return item.subscribed
                // return item.creator.userId !== state.userInfo.userId
        })
    },
    createdList: state => {
        return state.userPlaylists.filter(item => {
            return !item.subscribed
                // return item.creator.userId === state.userInfo.userId
        })
    },
    likedPlaylistIds: state => state.userPlaylists.map(item => item.id),
    likedsongIds: state => state.likedsongIds
}

let mutations = {
    SET_SHOW_LOGIN(state, val) {
        state.showLogin = val
    },
}

let actions = {}


export default { namespaced: true, state, getters, mutations, actions }