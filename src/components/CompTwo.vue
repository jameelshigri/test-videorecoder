<template>
  <v-container>
    <v-snackbar
      color="amber"
      class="text-grey-lighten-1"
      right
      v-model="snackbar"
      :timeout="timeout"
    >
      {{ text }}
    </v-snackbar>
    <v-row> </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      snackbar: false,
      text: "Video Not found",
      timeout: 2000,

      formData: {
        id: 1,
        name: "",
      },
      vedioData: {},
    };
  },
  methods: {
    // GetVideo() {
    //   this.vedioData = localStorage.getItem("video");
    //   console.log(this.vedioData);
    //   this.snackbar = true;
    // },
    // AddCart() {
    //   this.$store.commit("increment");
    // },
    // RemoveCart() {
    //   this.$store.commit("decrement");
    // },
    // GetUsers() {
    //   this.$store.dispatch("getUsers");
    // },
    // AddUser() {
    //   const data = this.formData;
    //   this.$store.commit("SaveUser", data);
    // },
  },
};
</script>
<style scoped></style>
