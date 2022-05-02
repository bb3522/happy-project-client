<script>
import { RouterLink, RouterView } from "vue-router";
import { mapActions, mapWritableState } from "pinia";
import { usePostStore } from "./stores/counter";

export default {
  components: {
    RouterLink,
    RouterView,
  },
  computed: {
    ...mapWritableState(usePostStore, [
      "isLogin",
      "page",
      "search",
      "category",
      "state",
    ]),
  },
  methods: {
    ...mapActions(usePostStore, [
      "fetchPosts",
      "allCategories",
      "logout",
      "favoritePosts",
    ]),
    async toHome() {
      try {
        this.page = 1;
        this.category = "";
        this.search = "";
        await this.fetchPosts();
      } catch (err) {
        const error = err.response.statusText;
        swal("Error", error, "error");
      }
    },
    async toFavorite() {
      try {
        this.page = 1;
      } catch (err) {
        const error = err.response.statusText;
        swal("Error", error, "error");
      }
    },
    async searchClick() {
      try {
        await this.changeSearch(this.search);
      } catch (err) {
        const error = err.response.statusText;
        swal("Error", error, "error");
      }
    },
    async logoutClick() {
      try {
        this.isLogin = false;
        await this.logout();
        this.$router.push("/login");
      } catch (err) {
        const error = err.response.statusText;
        swal("Error", error, "error");
      }
    },
    async favClick() {
      try {
        await this.favoritePosts();
      } catch (err) {
        if (err.response.status === 401) {
          await this.logoutClick()
          this.$router.push("/login");
          const error = err.response.data.message;
          swal("Error", error, "error");
        } else {
          const error = err.response.statusText;
          swal("Error", error, "error");
        }
      }
    },
  },
  async created() {
    try {
      const token = localStorage.getItem("access_token");
      if (token) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    } catch (err) {
      if (err.response.status === 401) {
          this.isLogin = false;
          await this.logout();
          this.$router.push("/login");
          const error = err.response.data.message;
          swal("Error", error, "error");
        } else {
          const error = err.response.statusText;
          swal("Error", error, "error");
        }
    }
  },
};
</script>

<template>
  <div id="app">
    <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="#"><h2>📝 Hacktiv Blog</h2></a>
        </div>
        <ul class="nav navbar-nav">
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <li>
            <a style="color: grey" href="#"
              ><span class="glyphicon glyphicon-home"></span>
              <RouterLink to="/" style="color: grey" @click.prevent="toHome">
                Home
              </RouterLink></a
            >
          </li>
          <li v-if="isLogin === true">
            <a v-on:click="favClick" style="color: grey" href="#"
              ><span class="glyphicon glyphicon-star"></span>
              <RouterLink
                to="/favorites"
                style="color: grey"
                @click="toFavorite"
              >
                Favorites
              </RouterLink></a
            >
          </li>
          <li v-if="isLogin === false">
            <a style="color: grey" href=""
              ><span class="glyphicon glyphicon-user"></span
              ><RouterLink to="/register" style="color: grey">
                Sign Up
              </RouterLink></a
            >
          </li>
          <li v-if="isLogin === false">
            <a style="color: grey" href=""
              ><span class="glyphicon glyphicon-log-in"></span
              ><RouterLink to="/login" style="color: grey">
                Login
              </RouterLink></a
            >
          </li>
          <li v-if="isLogin === true">
            <a v-on:click="logoutClick" style="color: grey" href="#"
              ><span class="glyphicon glyphicon-log-out"></span> Logout</a
            >
          </li>
        </ul>
      </div>
    </nav>
    <RouterView />
  </div>
</template>

<style>
@import "@/assets/base.css";
</style>
