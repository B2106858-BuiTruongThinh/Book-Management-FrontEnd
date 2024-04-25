<template>
  <nav class="navbar navbar-expand">
    <div class="navbar-brand-container">
      <a href="/books" class="navbar-brand">
        QUẢN LÝ SÁCH
      </a>
      <div class="mr-auto navbar-nav">
        <li class="nav-item" style="width: 200px">
          <router-link :to="{ name: 'book-client' }" class="nav-link">
            <h5><b>Sách</b></h5>
            <i class="fa-solid fa-book"></i>
          </router-link>
          </li>
          <li  class="nav-item" style="width: 200px">
          <router-link :to="{ name: 'borrow-client' }" class="nav-link">
            <h5><b>Đơn Mượn Sách</b></h5>
            <i class="fa-solid fa-book-reader"></i>
          </router-link>
        </li>
      </div>
    </div>
    <div class="login-logout-register-container col-3">
      <div v-if="isLoggedIn">
        <button class="btn btn-danger button-logout" @click="logout" style="width: 100px">
          Đăng Xuất
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
import Authorization from "@/services/client/authorization.service";
export default {
  data() {
    return {
      isLoggedIn: false, 
    };
  },
  created() {
    this.checkLoggedIn(); 
  },
  computed: {},
  methods: {
    checkLoggedIn() {
      const token = this.getTokenFromCookie(); 
      if (token) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    },
    getTokenFromCookie() {
      const name = "tokenUser="; 
      const decodedCookie = decodeURIComponent(document.cookie);
      const cookieArray = decodedCookie.split(";");
      for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i].trim();
        if (cookie.indexOf(name) === 0) {
          return cookie.substring(name.length, cookie.length);
        }
      }
      return null;
    },
    login() {
      this.$router.push({ name: "login-client" });
    },
    logout() {
      try {
        const respone = Authorization.logOut();
        this.$router.push({ name: "login-client" });
      } catch (error) {
        console.log(error);
      }
    },
    register() {
      this.$router.push({ name: "register-client" });
    },
  },
};
</script>

<style scoped>

.navbar-expand{
  border: solid 3px;
  border-radius: 8px;
  background-color: #e2ecec;
}
.navbar-brand-container {
  display: flex;
  align-items: center;
  
}

.logout-container {
  margin-left: auto;
  margin-right: 20px;
}

.navbar-brand {
  margin-right: 20px;
  margin-left: 5px;
  color: #615d60;
}

.nav-link {
  display: flex;
  align-items: center;
  color: black;
}

.fa-book,
.fa-book-reader,
.fa-user {
  margin-left: 8px;

}

.navbar-nav {
  display: flex;
  flex-grow: 1;
}

.nav-item {
  text-align: center;
  justify-content: center;
  flex-grow: 1;
}


.nav-item {
  text-align: center;
  justify-content: center;
}

.btn-danger {
  margin-left: 400px;
}
</style>