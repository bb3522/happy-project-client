<script>
import { usePostStore } from "../stores/counter";
import { mapActions, mapState } from "pinia";

export default {
  methods: {
    ...mapActions(usePostStore, ["postDetail", "logout"]),
  },
  computed: {
    ...mapState(usePostStore, ["detailPostData", "qrcode"]),
  },
  async created() {
    try {
      await this.postDetail(this.$route.params.postId);
    } catch (err) {
      if (err.response.status === 401) {
        await this.logout();
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
  <body>
    <div class="card">
      <br />
      <div class="card__content">
        <time
          style="color: grey; margin-bottom: 0"
          datetime="2021-03-30"
          class="card__date"
          >{{
            new Date(detailPostData.createdAt).toLocaleString("en-GB", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          }}
        </time>
        <span style="color: purple" class="card__title"
          ><h1
            
          >
            {{ detailPostData.title }}
          </h1></span
        ><br>
        <img
          style="width: 450px; height: 350px; margin: 0px"
          :src="detailPostData.imgUrl"
          class="card__image"
          alt="brown couch"
        />
        <br /><br />
        <h5>{{ detailPostData.content }}</h5>
        <br>
        <p >Author: {{ detailPostData.User.username }}</p>
        <p >Category: {{ detailPostData.Category.name }}</p>
        <br>
        <h5 class="qrcodelabel">🔗Share this post:</h5>
        <img style="width: 150px" :src="qrcode" />
        <br />
        <br />
      </div>
    </div>
  </body>
</template>

<style scoped>

h1 {
  color: rgb(62, 121, 121);
  font-weight: 600;
  margin-top: 0px;        
}
h5 {
  color: black;
  width: 160%;
  word-spacing: 4px;
  line-height: 30px;
}
body {
  display: flex;
  justify-content: center;
  align-items: center;
  /* width: 90vw;
  height: 190vh; */
  padding: 0;
  padding-top: 130px;
  padding-bottom: 120px;
  margin-top: 0px;
}

* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

@media (min-width: 576px) {
  :root {
    --font-size-title: 40px;
  }
}
.card {
  margin: 100px;
  background-color: rgb(238, 246, 250);
  border-radius: 10%;
  border-radius: var(--border-radius-primary);
  box-shadow: 24px 24px 80px rgba(0, 0, 0, 0.1);
  padding: 20px 20px 28px 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}
@media (min-width: 576px) {
  .card {
    flex-direction: column;
    align-items: left;
    margin: 10px;
    padding: 0px;
    width: 1000px;
  }
}

.card__image {
  margin: 40px;
  width: 700px;
  height: 200px;
  border-radius: var(--border-radius-primary);
  -o-object-fit: cover;
  object-fit: cover;
  margin-bottom: 18px;
}
@media (min-width: 576px) {
  .card__image {
    width: 45%;
    max-height: none;
    min-height: 400px;
    margin-bottom: 0;
  }
}

@media (min-width: 576px) {
  .card__content {
    width: 55%;
    padding-left: 40px;
  }
}

.card__date {
  display: block;
  font-family: var(--font-family-secondary);
  font-size: var(--font-size-caption);
  line-height: var(--line-height-caption);
  text-transform: uppercase;
  color: var(--color-text);
  margin-bottom: 6px;
}
@media (min-width: 576px) {
  .card__date {
    margin-bottom: 8px;
  }
}

.card__title {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-title);
  line-height: var(--line-height-title);
  color: grey;
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;
  background-image: linear-gradient(
    90deg,
    var(--color-highlight-primary),
    var(--color-highlight-secondary)
  );
  background-size: 100% 42%;
  background-repeat: no-repeat;
  background-position: 0 85%;
  padding: 0 4px;
  margin-left: -4px;
}

p {
  color: rgb(113, 84, 165);
  width: 160%;
  font-size: small;
}

.qrcodelabel {
  color: darkslategrey;
  font-style: italic;
}
</style>
