<template>
  <div class="loginPage" style="color: rgb(91, 91, 89)">
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <form action="/" class="loginForm">
      <div class="container login" id="container-register">
        <h1 id="loginTitle">Register</h1>
        <hr />
        <label> <b>Username</b> </label><br />
        <input
          type="text"
          placeholder="Enter Email"
          name="email"
          v-model="usernameReg"
        /><br />
        <label> <b>Email</b> </label><br />
        <input
          type="text"
          placeholder="Enter Email"
          name="email"
          v-model="emailReg"
        /><br />

        <label for="psw"> <b>Password</b> </label><br />
        <input
          type="password"
          placeholder="Enter Password"
          name="password"
          v-model="passwordReg"
        /><br />
        <div id="buttonreg">
          <button
            type="button"
            class="btn btn-info"
            @click.prevent="registerClick"
          >
            Register
          </button>
        </div>
      </div>

      <div class="container signin" id="extension-reg">
        <p style="text-align: center">
          By creating an account you agree to our
          <a>Terms & Privacy</a>.
        </p>
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
      usernameReg: "",
      emailReg: "",
      passwordReg: "",
    };
  },
  methods: {
    ...mapActions(usePostStore, ["registerAction"]),
    async registerClick() {
      try {
        const payload = {
          email: this.emailReg,
          password: this.passwordReg,
          username: this.usernameReg,
        };
        await this.registerAction(payload);
        this.$router.push("/login");
        this.usernameReg = "";
        this.emailReg = "";
        this.passwordReg = "";
      } catch (err) {
        const error = err.response.statusText;
        swal("Error", error, "error");
      }
    },
  },
};
</script>

<style scoped>
#buttonreg {
  display: flex;
  text-align: center;
  justify-content: center;
}

label {
  padding: 0px;
}
.loginForm {
  margin-bottom: 50px;
}

#container-register {
  width: 420px;
}

#extension-reg {
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
