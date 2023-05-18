import { createStore } from "vuex";
import axios from "axios";
const store = createStore({
  state() {
    return {
      counter: 2,
      users: [{ id: 6, name: "ahmad" }],
    };
  },
  getters: {},
  mutations: {
    increment(state) {
      state.counter++;
    },
    decrement(state) {
      if (state.counter > 0) {
        state.counter--;
      }
    },
    fetchUsers(state, data) {
      state.users = data;
    },
    SaveUser(state, payload) {
      state.users[0] = payload;
    },
  },
  actions: {
    async getUsers({ commit }) {
      let result = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      let data = result.data;
      console.log(data);
      commit("fetchUsers", data);
    },
  },
  modules: {},
});
export default store;
