import { defineStore } from "pinia";
import axios from "axios";
import swal from 'sweetalert';

export const usePostStore = defineStore({
  id: "post",
  state: () => ({
    baseUrl: "http://localhost:3000",
    FEBaseUrl: "https://new-hacktiv-blog.web.app",
    posts: [],
    page: 1,
    totalPages: 1,
    totalItems: 1,
    search: "",
    isLogin: false,
    category: "",
    categories: [],
    state: "home",
    detailPostData: [],
    qrcode: ""
  }),
  actions: {
    async loginAction(payload) {
      try {
        const { data } = await axios.post(
          `${this.baseUrl}/customers/login`,
          {
            email: payload.email,
            password: payload.password,
          }
        );
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("email", data.data.email);
        localStorage.setItem("role", data.data.role);
        localStorage.setItem("username", data.data.username);
        this.allCategories();
        this.isLogin = true;
      } catch (err) {
        const error = err.response.data.error.message;
        swal("Error!", error, "error");
      }
    },
    async handleSignIn(googleUser) {
      try {
        const response = await axios.post(
          `${this.baseUrl}/customers/login/authGoogle`,
          {
            idToken: googleUser.getAuthResponse().id_token,
          }
        );
        const token = response.data.token;
        const username = response.data.data.username;
        const email = response.data.data.email;
        const role = response.data.data.role;
        localStorage.setItem("access_token", token);
        localStorage.setItem("username", username);
        localStorage.setItem("email", email);
        localStorage.setItem("role", role);
        this.allCategories();
        this.isLogin = true;
      } catch (err) {
        const error = err.response.statusText;
        swal("Error", error, "error");
      }
    },
    async registerAction(payload) {
      try {
        const { data } = await axios.post(
          `${this.baseUrl}/customers/register`,
          {
            email: payload.email,
            password: payload.password,
            username: payload.username,
          }
        );
        swal("Success", `Success registrating user with email ${data.data.email}`, "success");
      } catch (err) {
        const error = err.response.data.error.message.join("\n");
        swal("Error!", error, "error");
      }
    },
    async fetchPosts() {
      try {
        const { data } = await axios.get(
          `${this.baseUrl}/customers/posts?page=${this.page}&search=${this.search}&category=${this.category}`
        );
        await this.allCategories();
        this.posts = data.data.postData;
        this.totalPages = data.data.totalPages;
      } catch (err) {
        const error = err.response.statusText;
        swal("Error", error, "error");
      }
    },
    async postDetail(postId) {
      try {
        const { data } = await axios.get(
          `${this.baseUrl}/customers/posts/${postId}`
        );
        const response = await axios.get(
          `https://api.happi.dev/v1/qrcode?data=${this.FEBaseUrl}/posts/${postId}&width=&dots=000000&bg=FFFFFF&apikey=6b6967X4r5sW41dl4xM28sciqaCNrNNyK0kEB83swhDBi2mkZq9bCpwW`, {
            headers: {
              "x-server-time": 1650104747,
              "x-ratelimit-remaining": 299,
              "x-credits-free": 3998,
              "x-ratelimit-reset": 1650104808,
              "x-ratelimit-limit": 300,
              "x-credits-premium": 0
            }
          }
        )
        this.detailPostData = data.data;
        this.qrcode = response.data.qrcode
      } catch (err) {
        const error = err.response.statusText;
        swal("Error", error, "error");
      }
    },
    async favoritePosts() {
      try {
        const { data } = await axios.get(
          `${this.baseUrl}/customers/favorites?page=${this.page}`,
          {
            headers: {
              access_token: localStorage.getItem("access_token"),
            },
          }
        );

        let post = data.data.postData;
        let dataToFetch = post.map((el) => {
          let dataPost = {
            id: el.id,
            postId: el.postId,
            title: el.Post.title,
            imgUrl: el.Post.imgUrl,
            content: el.Post.content,
            createdAt: el.createdAt,
            User: {
              username: el.Post.User.username,
            },
            Category: {
              name: el.Post.Category.name,
            },
          };
          return dataPost;
        });
        this.posts = dataToFetch;
        this.state = "favorites";
        this.totalPages = data.data.totalPages;
      } catch (err) {
        if (err.response.status === 401) {
          this.isLogin = false;
          await this.logout();
          await this.fetchPosts();
          const error = err.response.data.message;
          swal("Error", error, "error");
        } else {
          const error = err.response.statusText;
          swal("Error", error, "error");
        }
      }
    },
    async addFavorite(postId) {
      try {
        let token = localStorage.getItem("access_token");
        await axios.post(
          `${this.baseUrl}/customers/posts/${postId}`,
          {},
          {
            headers: {
              access_token: token,
            },
          }
        );
        swal("Success", `Success adding post id ${postId} to your Favorites`, "success");
      } catch (err) {
        if (err.response.status === 401) {
          await this.logout();
          const error = err.response.data.message;
          swal("Error", error, "error");
        } if (err.response.status === 403) {
          const error = err.response.data.error.message;
          swal("Error", error, "error");
        } else {
          const error = err.response.statusText;
          swal("Error", error, "error");
        }
      }
    },
    async allCategories() {
      try {
        const { data } = await axios.get(
          `${this.baseUrl}/posts/categories`
        );
        this.categories = data.data;
      } catch (err) {
        const error = err.response.statusText;
        swal("Error", error, "error");
      }
    },
    async changePage(newPage) {
      try {
        this.page = newPage;
        if (this.state === "home") {
          await this.fetchPosts();
        } else if (this.state === "favorites") {
          await this.favoritePosts();
        }
      } catch (err) {
        const error = err.response.statusText;
        swal("Error", error, "error");
      }
    },
    async changeSearch(keyword) {
      try {
        this.search = keyword;
        await this.fetchPosts();
      } catch (err) {
        const error = err.response.statusText;
        swal("Error", error, "error");
      }
    },
    async changeCategory(id) {
      try {
        this.category = id;
        await this.fetchPosts();
      } catch (err) {
        const error = err.response.statusText;
        swal("Error", error, "error");
      }
    },
    async logout() {
      try {
        localStorage.removeItem("access_token");
        localStorage.removeItem("email");
        localStorage.removeItem("role");
        localStorage.removeItem("username");
        this.isLogin = false;
        await this.fetchPosts();
      } catch (err) {
        const error = err.response.statusText;
        swal("Error", error, "error");
      }
    },
  },
});
