import Vue from 'vue'
import Vuex from 'vuex'

import distributors from './distributors-store'
import donors from './donors-store'
import scheduleTypes from './scheduleTypes-store'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      distributors,
      donors,
      scheduleTypes
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
