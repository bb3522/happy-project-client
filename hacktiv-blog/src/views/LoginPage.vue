<template>
  <div class="loginPage" style="color: rgb(91, 91, 89)">
    <form action="/" class="loginForm">
      <div class="container login" id="container-login">
        <h1 id="loginTitle">Login</h1>
        <hr />
        <label> <b>Email</b> </label><br />
        <input
          type="text"
          placeholder="Enter Email"
          name="email"
          v-model="email"
          id="login-email"
        /><br />

        <label for="psw"> <b>Password</b> </label><br />
        <input
          type="password"
          placeholder="Enter Password"
          name="password"
          v-model="password"
          id="login-password"
        /><br />
        <div id="buttonlogin">
          <button
            type="button"
            class="btn btn-info"
            @click.prevent="loginClick"
          >
            Login
          </button>
        </div>
      </div>

      <div class="container signin" id="container-extension">
        <p>Or sign in with Google</p>
        <a @click.prevent="signInGoogle" class="google btn"
          ><i class="fa fa-google fa-fw"> </i> Google+
        </a>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from "pinia";
import { usePostStore } from "@/stores/counter";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    ...mapActions(usePostStore, ["loginAction", "handleSignIn"]),
    async loginClick() {
      try {
        const payload = {
          email: this.email,
          password: this.password,
        };
        await this.loginAction(payload);
        this.$router.push("/");
      } catch (err) {
        const error = err.response.statusText;
        swal("Error", error, "error");
      }
    },
    async signInGoogle() {
      try {
        const googleUser = await this.$gAuth.signIn();
        await this.handleSignIn(googleUser);
        this.$router.push("/");
      } catch (err) {
        const error = err.response.data.error.message;
        swal("Error!", error, "error");
      }
    },
  },
};
</script>

<style scoped>
#buttonlogin {
  display: flex;
  text-align: center;
  justify-content: center;
}

label {
  padding: 0px;
}
.google {
  background-color: #dd4b39;
  color: white;
}

#container-login {
  width: 420px;
}

#container-extension {
  width: 420px;
}

.btn {
  width: 40%;
  padding: 12px;
  border: none;
  border-radius: 4px;
  margin: 5px 0;
  opacity: 0.85;
  display: inline-block;
  font-size: 15px;
  line-height: 20px;
  text-decoration: none; /* remove underline from anchors */
}

.btn:hover {
  opacity: 1;
}
</style>
