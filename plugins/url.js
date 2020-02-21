import Vue from 'vue'
import axios from 'axios'

Vue.prototype.$url = axios.create({
  baseURL: 'http://localhost:805/api/'
})