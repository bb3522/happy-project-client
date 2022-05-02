<template>
  <body>
    <nav data-pagination>
      <ul style="background-color: smokewhite">
        <li style="color: gray; padding-right: 10px; font-size: 18px">Page</li>
        <li>
          <a
            href=""
            v-for="n in totalPages"
            :key="n"
            @click.prevent="pageClick(n)"
            :value="n"
            >{{ n }}</a
          >
        </li>
      </ul>
    </nav>
    <div class="card-container">
      <div class="card" v-for="post in posts" :key="post.id">
        <div class="card__header">
          <img
            :src="post.imgUrl"
            alt="card__image"
            class="card__image"
            width="600"
          />
        </div>
        <div class="card__body">
          <h5 class="categoryName">Category: {{ post.Category.name }}</h5>

          <h4>{{ post.title }}</h4>
          <p>
            {{ `${post.content.slice(0, 50)}...` }}
            <RouterLink
              :to="{
                name: 'post',
                params: { postId: state === 'home' ? post.id : post.postId },
              }"
              >see more</RouterLink
            >
          </p>
        </div>
        <div class="card__footer">
          <div class="user">
            <div class="user__info">
              <h5>{{ post.User.username }}</h5>
              <small>{{
                new Date(post.createdAt).toLocaleString("en-GB", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              }}</small>
            </div>
          </div>
        </div>
        <div v-if="state === 'home'" class="card__footer">
          <span v-if="isLogin === true" class="tag tag-blue card__body"
            ><h5 style="color: aliceblue">
              <a
                v-if="isLogin === true"
                style="color: antiquewhite"
                @click.prevent="addPostToFav(post.id)"
                >⭐ add Favorites</a
              >
            </h5></span
          >
        </div>
      </div>
    </div>
  </body>
</template>

<script>
import { RouterLink } from "vue-router";
import { usePostStore } from "../stores/counter";
import { mapActions, mapState } from "pinia";

export default {
  components: {
    RouterLink,
  },
  methods: {
    ...mapActions(usePostStore, [
      "fetchPosts",
      "changePage",
      "postDetail",
      "addFavorite",
    ]),
    async pageClick(n) {
      try {
        await this.changePage(n);
      } catch (err) {
        const error = err.response.statusText;
        swal("Error", error, "error");
      }
    },
    addPostToFav(postId) {
      return this.addFavorite(postId);
    },
  },
  computed: {
    ...mapState(usePostStore, [
      "posts",
      "totalPages",
      "page",
      "state",
      "isLogin",
    ]),
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap");

h4 {
  color: rgb(51, 142, 132);
  margin-top: 16px;
}

p {
  color: rgb(88, 87, 87);
}

h5 {
  color: #2d5acb;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

body {
  /* font-family: "Quicksand", sans-serif; */
  display: grid;
  flex-direction: row;

  place-items: center;
  /* height: 100vh; */
  margin-top: 0;
  /* background: #7f7fd5;
  background: linear-gradient(to right, #91eae4, #86a8e7, #7f7fd5); */
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 1200px;
  margin-block: 2rem;
  gap: 10rem;
}
.categoryName {
  color: #695c71;
  font-style: italic;
}

img {
  max-width: 100%;
  display: block;
  object-fit: cover;
  height: 250px;
}

.card {
  display: flex;
  flex-direction: column;
  width: clamp(30rem, calc(20rem + 2vw), 22rem);
  overflow: hidden;
  box-shadow: 0 0.1rem 1rem rgba(0, 0, 0, 0.1);
  border-radius: 0.3em;
  background: #ece6eb;
  /* background: linear-gradient(to right, #FFFFFF, #ECE9E6); */
  background-color: rgb(245, 236, 245);
}

.card__body {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  word-spacing: normal;
}

.tag {
  align-self: flex-start;
  padding: 0.25em 0.75em;
  border-radius: 0.5em;
  font-size: 0.75rem;
}

li {
  font-size: 18px;
}

.tag + .tag {
  margin-left: 0.5em;
}

.tag-blue {
  background: #b682e7;
  background: linear-gradient(to bottom, #e75db6, #bf88df);
  color: #444040;
}

.tag-brown {
  background: #d1913c;
  background: linear-gradient(to bottom, #ffd194, #d1913c);
  color: #fafafa;
}

.tag-red {
  background: #cb2d3e;
  background: linear-gradient(to bottom, #ef473a, #cb2d3e);
  color: #fafafa;
}

.card__body h4 {
  font-size: 1.7rem;
  text-transform: capitalize;
}

.card__footer {
  display: flex;
  padding: 1.5rem;
  margin-top: auto;
}

.user {
  display: flex;
  gap: 0.5rem;
}

.user__image {
  border-radius: 50%;
}

.user__info > small {
  color: #666;
}

[data-pagination],
[data-pagination] *,
[data-pagination] *:before,
[data-pagination] *:after {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-kerning: auto;
}
[data-pagination] {
  font-size: 8pt;
  line-height: 1;
  font-weight: 400;
  /* font-family: 'Open Sans', 'Source Sans Pro', Roboto, 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', 'Myriad Pro', 'Segoe UI', Myriad, Helvetica, 'Lucida Grande', 'DejaVu Sans Condensed', 'Liberation Sans', 'Nimbus Sans L', Tahoma, Geneva, Arial, sans-serif; */
  -webkit-text-size-adjust: 100%;
  margin: 1em auto;
  text-align: center;
  transition: font-size 0.2s ease-in-out;
}
[data-pagination] ul {
  list-style-type: none;
  display: inline;
  font-size: 100%;
  margin: 0;
  padding: 0.5em;
}
[data-pagination] ul li {
  display: inline-block;
  font-size: 100%;
  width: auto;
  border-radius: 3px;
}
[data-pagination] > a {
  font-size: 140%;
}
[data-pagination] a {
  color: #777;
  font-size: 100%;
  padding: 0.5em;
}
[data-pagination] a:focus,
[data-pagination] a:hover {
  color: rgb(178, 89, 219);
}
[data-pagination] li.current {
  background: rgba(0, 0, 0, 0.1);
}
/* Disabled & Hidden Styles */
[data-pagination] .disabled,
[data-pagination] [hidden],
[data-pagination] [disabled] {
  opacity: 0.5;
  pointer-events: none;
}
@media (min-width: 350px) {
  [data-pagination] {
    font-size: 10pt;
  }
}
@media (min-width: 500px) {
  [data-pagination] {
    font-size: 12pt;
  }
}
@media (min-width: 700px) {
  [data-pagination] {
    font-size: 14pt;
  }
}
@media (min-width: 900px) {
  [data-pagination] {
    font-size: 16pt;
  }
}
</style>
