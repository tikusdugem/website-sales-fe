import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userStatus: {}
  },
  getters: {
    getUserStatus: state => {
      return state.userStatus;
    }
  },
  mutations: {
    setUserStatus(state, data) {
      state.userStatus = data;
    }
  },
  actions: {
    submitLogin(context, data) {
      return new Promise((resolve, reject) => {
        axios.post("http://localhost:2000/login?username=" + data.username + "&password=" + data.password)
          .then((res) => {
            context.commit("setUserStatus", res.data);
            localStorage.setItem("Status", JSON.stringify(res.data));
            resolve(res.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    listingUsers(context, data) {
      return new Promise((resolve, reject) => {
        axios.get("http://localhost:2000/user/all")
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    }
  }
})
