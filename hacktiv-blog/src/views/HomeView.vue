<script>
import PostCard from "@/components/PostCard.vue";
import { usePostStore } from "../stores/counter";
import { mapActions, mapState, mapWritableState } from "pinia";

export default {
  data() {
    return {
      search: "",
      categoryId: "",
    };
  },
  components: {
    PostCard,
  },
  methods: {
    ...mapActions(usePostStore, [
      "fetchPosts",
      "changeSearch",
      "changeCategory",
      "allCategories",
    ]),
    async searchClick() {
      try {
        await this.changeSearch(this.search);
      } catch (err) {}
    },
  },
  computed: {
    ...mapState(usePostStore, ["posts", "categories"]),
    ...mapWritableState(usePostStore, ["state"]),
  },
  watch: {
    categoryId: {
      handler(val) {
        this.changeCategory(val);
      },
      immediate: true,
    },
  },
  async created() {
    try {
      this.fetchPosts();
      this.allCategories();
      const token = localStorage.getItem("access_token");
      if (token) {
        this.state = "home";
      } else {
        this.isLogin = false;
      }
    } catch (err) {
      const error = err.response.statusText;
      swal("Error", error, "error");
    }
  },
};
</script>

<template>
  <div id="home">
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <h3 id="titlehome">Hi readers! Welcome to Hacktiv Blog</h3>
    <hr />
    <br />

    <div id="radiobutton">
      <h3 id="postbycategory">Post by Category</h3>
      <input v-model="categoryId" :value="''" type="radio" name="rb" id="rb8" />
      <label for="rb8">All Categories</label>
      <span v-for="category in categories" :key="category.id">
        <input
          v-model="categoryId"
          :value="category.id"
          type="radio"
          name="rb"
          :id="category.id"
        />
        <label :for="category.id">{{ category.name }}</label>
      </span>
    </div>
    <br />
    <div class="input-group">
      <input
        type="search"
        v-model="search"
        class="form-control rounded"
        placeholder="Search by title..."
        aria-label="Search by title..."
        aria-describedby="search-addon"
      />
      <button
        type="submit"
        class="btn btn-outline-primary"
        @click.prevent="searchClick"
      >
        🔍
      </button>
    </div>
    <br />

    <PostCard />
  </div>
</template>

<style>
#titlehome {
  text-align: center;
  font-weight: 600;
  font-size: 40px;
  color: #99addd;
}
#home {
  overflow-y: hidden;
}

.input-group {
  display: flex;
  width: 70%;
  padding-left: 30%;
}

#radiobutton {
  text-align: center;
  /* color: #ddaff1; */
  color: #8ab7b3;
}

#postbycategory {
  font-weight: 600;
  color: #8ab7b3;
  font-size: 20px;
}

.center-on-page {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
input[type="checkbox"],
input[type="radio"] {
  position: absolute;
  opacity: 0;
  z-index: -1;
}
label {
  position: relative;
  display: inline-block;
  margin-right: 10px;
  font-size: 14px;
  margin-bottom: 10px;
  padding-left: 30px;
  padding-right: 10px;
  line-height: 36px;
  cursor: pointer;
}
label::before {
  content: " ";
  position: absolute;
  top: 6px;
  left: 0;
  display: block;
  width: 24px;
  height: 24px;
  border: 2px solid #99addd;
  border-radius: 4px;
  z-index: -1;
}
input[type="radio"] + label::before {
  border-radius: 4px;
}
/* Checked */
input[type="checkbox"]:checked + label,
input[type="radio"]:checked + label {
  padding-left: 10px;
  color: rgb(244, 244, 244);
}
input[type="checkbox"]:checked + label::before,
input[type="radio"]:checked + label::before {
  top: 0;
  width: 100%;
  height: 100%;
  background: #989ef2;
}
/* Transition */
label,
label::before {
  -webkit-transition: 0.25s all ease;
  transition: 0.25s all ease;
}
</style>
