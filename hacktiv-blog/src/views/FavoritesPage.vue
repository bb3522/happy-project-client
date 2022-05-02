<script>
import PostCard from "@/components/PostCard.vue";
import { usePostStore } from "../stores/counter";
import { mapActions, mapState, mapWritableState } from "pinia";

export default {
  data() {
    return {};
  },
  components: {
    PostCard,
  },
  methods: {
    ...mapActions(usePostStore, ["favoritePosts"]),
  },
  computed: {
    ...mapState(usePostStore, ["posts", "isLogin"]),
    ...mapWritableState(usePostStore, ["state", "page"]),
  },
  async created() {
    try {
      const token = localStorage.getItem("access_token");
      if (token) {
        await this.favoritePosts();
        this.state = "favorites";
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
  <div id="home2">
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <h3 id="titlefav">Your Favorite Posts</h3>
    <hr>
    <PostCard />
  </div>
</template>

<style scoped>
#titlefav {
  text-align: center;
  font-size: 40px;
  color: #99addd;
}
#home2 {
  overflow-y: hidden;
}

.input-group {
  display: flex;
  width: 70%;
  padding-left: 30%;
}

#radiobutton {
  text-align: center;
  color: #ddaff1;
}

h3 {
  background: rgb(255, 255, 251);
  font-weight: 600;
  color: #989ef2;
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
  /* background-color: whitesmoke; */
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
  color: rgb(247, 234, 250);
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
