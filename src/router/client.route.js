
const requireClientAuth = (to, from, next) => {
  try {
    const token = document.cookie.split('; ').find(row => row.startsWith('tokenUser')).split('=')[1];
    if (token) {
      next();
    } else {
      next('/auth/login');
    }
  } catch (error) {
    next('/auth/login');
  }
};


const clientRoutes = [
  {
    path: "/books",
    name: "book-client",
    component: () => import("@/views/client/pages/books/ClientBook.vue"),
    beforeEnter: requireClientAuth
  },

  {
    path: "/reader/register",
    name: "register-client",
    component: () => import("@/views/client/pages/register/ClientRegister.vue"),
  },

  {
    path: "/auth/login",
    name: "login-client",
    component: () => import("@/views/client/pages/login/ClientLogin.vue"),
  },

  {
    path: "/borrow/:id",
    name: "borrow-book",
    component: () => import("@/views/client/pages/books/BorrowBookPage.vue"),
    beforeEnter: requireClientAuth,
  },

  {
    path: "/borrowstore",
    name: "borrow-client",
    component: () => import("@/views/client/pages/books/BookStore.vue"),
    beforeEnter: requireClientAuth,
  },

  {
    path: "/",
    name: "home",
    component: () => import("@/views/client/pages/Home/Home.vue"),
  },

  {
    path: "/seen-books",
    name: "seen-books",
    component: () => import("@/views/client/pages/Home/SeenBookList.vue"),
  },
];

export default clientRoutes;

