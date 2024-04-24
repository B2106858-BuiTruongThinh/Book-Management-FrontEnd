<!-- LoginForm.vue -->
<template>
  <div class="login_page">
    <div class="container">
      <div class="login">Đăng nhập</div>
      <form @submit.prevent="login" class="form">
        <div class="form-item">
          <label for="email" class="label">Email:</label><br />
          <input v-model="formData.email" type="text" id="email" class="input" />
        </div>
        <div class="form-item">
          <label for="password" class="label">Password</label><br />
          <input v-model="formData.password" type="password" id="password" class="input" />
        </div>
        <button type="submit" class="btn btn-primary">Đăng nhập</button>
      </form>
    </div>
  </div>
</template>

<script>
import AuthorizationServiceAdmin from "../../../../services/admin/authorization.service";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
export default {
  data() {
    return {
      formData: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async login() {
      try {
        console.log(this.formData)
        const response = await AuthorizationServiceAdmin.submitLogin(
          this.formData
        );
        switch (response.data) {
          case "wrong info":
            toast.error(
              "Login failed. Please check your login information and try again.",
              {
                autoClose: 800,
              }
            );
            break;
          case "success":
            toast.success("Login successful", {
              autoClose: 800,
            });
            setTimeout(() => {
              this.$router.push({ name: "book" });
            }, 1500);
            break;
          default:
            break;
        }
      } catch (error) {
        console.log(error);
        toast.error("Username or password is incorrect", {
          autoClose: 800,
        });
      }
    },

  },
};
</script>

<style scoped>
.login_page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-size: cover;
}

.container {
  width: 80%;
  max-width: 500px;
  height: 350px;
  text-align: center;
  padding: 20px;
  margin-top: 10px;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.login {
  font-size: 30px;
  margin-bottom: 20px;
}

.form {
  margin-top: 20px;
}

.form-item {
  margin: 10px 0;
  text-align: left;
}

.label {
  font-weight: bold;
}

.input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: transparent;
}

.register {
  text-align: center;
  margin-top: 10px;
}

.register a {
  text-decoration: none;
  color: #007bff;
}

.register a:hover {
  text-decoration: underline;
}
</style>
