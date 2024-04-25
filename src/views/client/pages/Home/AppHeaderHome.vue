<template>
    <nav class="navbar navbar-expand">
        <div class="navbar-brand-container">
            <a href="/" class="navbar-brand">
                QUẢN LÝ SÁCH
            </a>
            <div class="mr-auto navbar-nav">
                <li class="nav-item" style="width: 200px">
                    <router-link :to="{ name: 'seen-books' }" class="nav-link">
                        <h5><b>Sách</b></h5>
                        <i class="fa-solid fa-book"></i>
                    </router-link>
                </li>
            </div>
        </div>
        <div class="login-logout-register-container col-3">
            <button v-if="$route.path === '/seen-books'" class="btn btn-danger button-logout" style="width: 150px;">
                <router-link to="/auth/login" style="color: white;">Đăng Nhập</router-link>
            </button>
        </div>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            isLoggedIn: false,
        };
    },
};
</script>

<style scoped>
.navbar-expand {
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
    margin-left: 450px;
}

</style>