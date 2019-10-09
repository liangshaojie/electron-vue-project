import request from '../utils/request.js'

export function login_cellphone(params) {
    return request.get('/login/cellphone', {
        params
    })
}

// 用户详情
export function user_detail(uid) {
    return request.get('/user/detail', {
        params: {
            uid,
            _: new Date().getTime()
        }
    })
}

// type: 签到类型 , 默认 0, 其中 0 为安卓端签到 ,1 为 web/PC 签到
export function daily_signin(type) {
    return request.get('/daily_signin', {
        params: {
            type
        }
    }) 
}