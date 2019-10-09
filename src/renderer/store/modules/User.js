import Message from 'ant-design-vue/es/message'
// import { login_refresh, logout } from './../../api/login'

let state = {
    showLogin: false,
    userInfo: { "userId": 1597427741, "account": { "id": 1597427741, "userName": "1_15618536609", "type": 1, "status": 0, "whitelistAuthority": 0, "createTime": 1536842014160, "salt": "[B@75048844", "tokenVersion": 1, "ban": 0, "baoyueVersion": 0, "donateVersion": 0, "vipType": 0, "viptypeVersion": 0, "anonimousUser": false }, "level": 1, "listenSongs": 21, "userPoint": { "userId": 1597427741, "balance": 5, "updateTime": 1569832500940, "version": 10, "status": 0, "blockBalance": 0 }, "mobileSign": false, "pcSign": false, "profile": { "djStatus": 0, "accountStatus": 0, "province": 310000, "vipType": 0, "followed": false, "nickname": "15618536609", "mutual": false, "remarkName": null, "authStatus": 0, "detailDescription": "", "experts": {}, "expertTags": null, "city": 310101, "defaultAvatar": true, "backgroundImgId": 109951162868128400, "backgroundUrl": "http://p1.music.126.net/2zSNIqTcpHL2jIvU6hG0EA==/109951162868128395.jpg", "gender": 0, "avatarImgId": 109951163250239070, "birthday": -2209017600000, "userType": 0, "avatarUrl": "http://p1.music.126.net/RLeBJe4D1ZzUtltxfoKDMg==/109951163250239066.jpg", "description": "", "userId": 1597427741, "avatarImgIdStr": "109951163250239066", "backgroundImgIdStr": "109951162868128395", "signature": "", "authority": 0, "followeds": 0, "follows": 3, "blacklist": false, "eventCount": 0, "allSubscribedCount": 0, "playlistBeSubscribedCount": 0, "avatarImgId_str": "109951163250239066", "followTime": null, "followMe": false, "artistIdentity": [], "cCount": 0, "sDJPCount": 0, "playlistCount": 2, "sCount": 0, "newFollows": 3 }, "peopleCanSeeMyPlayRecord": true, "bindings": [{ "expiresIn": 2147483647, "refreshTime": 1536842034, "bindingTime": 1536842034622, "tokenJsonStr": null, "expired": false, "url": "", "userId": 1597427741, "id": 6676857668, "type": 1 }, { "expiresIn": 2147483647, "refreshTime": 0, "bindingTime": 0, "tokenJsonStr": null, "expired": false, "url": "", "userId": 1597427741, "id": 6676827709, "type": 0 }], "adValid": true, "code": 200, "createTime": 1536842037687, "createDays": 382 },
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
    SET_USER_INFO(state, payload) {
        state.userInfo = payload
    },
}

let actions = {}


export default { namespaced: true, state, getters, mutations, actions }