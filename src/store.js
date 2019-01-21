import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userStatus: {},
    usersData: []
  },
  getters: {
    getUserStatus: state => {
      return state.userStatus;
    },
    getUsersData: state => {
      return state.usersData;
    }
  },
  mutations: {
    setUserStatus(state, data) {
      state.userStatus = data;
    },
    setUsersData(state, data) {
      state.usersData = data;
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
    listingUsers(context) {
      return new Promise((resolve, reject) => {
        axios.get("http://localhost:2000/user/all")
          .then(res => {
            context.commit("setUsersData", res.data);
            resolve(res.data);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    addUser(context, data) {
      return new Promise((resolve, reject) => {
        axios.get("http://localhost:2000/user/add?name=" + data.name + "&username=" + data.username + "&password=" + data.password)
          .then(res => {
            resolve(res.data);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    deleteUser(context, data) {
      return new Promise((resolve, reject) => {
        axios.get("http://localhost:2000/user/del?id=" + data)
          .then(res => {
            resolve(res.data);
          })
          .catch(err => {
            reject(err);
          });
      })
    }
  }
})
