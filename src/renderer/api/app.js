import axios from 'axios'

export function checkUpdate() {
    return axios.get('https://api.github.com/repos/liangshaojie/electron-vue-project/releases/latest')
}