import Vue from 'vue'
import axios from 'axios'

axios.defaults.baseURL = 'http://dist.idocker.ir/api';

Vue.prototype.$axios = axios
