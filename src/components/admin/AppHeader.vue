<template>
  <nav class="navbar navbar-expand ">
    <div class="navbar-brand-container">
      <a href="/admin/books" class="navbar-brand">
        QUẢN LÝ SÁCH
      </a>
      <div class="mr-auto navbar-nav">
        <li class="nav-item" style="width: 200px">
          <router-link :to="{ name: 'book' }" class="nav-link">
            <h6><b>Quản lý sách</b></h6>
            <i class="fa-solid fa-book"></i>
          </router-link>
        </li>
        <li class="nav-item" style="width: 200px">
          <router-link :to="{ name: 'borrow' }" class="nav-link">
            <h6><b>Quản lý mượn </b></h6>
            <i class="fa-solid fa-book-reader"></i>
          </router-link>
        </li>
        <li class="nav-item" style="width: 200px">
          <router-link :to="{ name: 'reader' }" class="nav-link">
            <h6><b>Quản lý đọc giả</b></h6>
            <i class="fa-solid fa-user"></i>
          </router-link>
        </li>
      </div>
    </div>
    <div class="logout-container">
      <button class="btn btn-danger button-logout" @click="logout">
        Đăng Xuất
      </button>
    </div>
  </nav>
</template>

<script>
import Authorization from "@/services/admin/authorization.service.js";
export default {
  computed: {},
  methods: {
    async logout() {
      try {
        const respone = await Authorization.logOut();
        this.$router.push({ name: "login" });
      } catch (error) {
        console.log(error);
      }
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
  margin-left: 15px;
}
</style>