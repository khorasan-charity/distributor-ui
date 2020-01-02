import Vue from 'vue'
import axios from 'axios'

const token = localStorage.getItem('access_token')

axios.defaults.baseURL = 'http://dist.idocker.ir/api';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

Vue.prototype.$axios = axios
