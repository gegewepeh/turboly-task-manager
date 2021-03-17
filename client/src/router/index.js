import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    beforeEnter: (to, from, next) => {
      if (to.name === 'Login' && !localStorage.access_token) {
        next()
      } else {
        router.push('/')
      }
    },
  },
  {
    path: '/register',
    name: 'Register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Register.vue'),
    beforeEnter: (to, from, next) => {
      if (to.name === 'Register' && !localStorage.access_token) {
        next()
      } else {
        router.push('/tasks')
      }
    },
  },
  {
    path: '/',
    name: 'Tasks',
    component: () => import('../views/Tasks.vue'),
    beforeEnter: (to, from, next) => {
      if (to.name === 'Tasks' && localStorage.access_token) {
        next()
      } else {
        router.push('/login')
      }
    },
    children: [
      {
        path: '/tasks/',
        component: () => import('../components/TaskCard.vue')
      }
    ]
  },
  {
    path: '/addTask',
    name: 'AddTask',
    component: () => import('../views/AddTask.vue'),
    beforeEnter: (to, from, next) => {
      if (to.name === 'AddTask' && localStorage.access_token) {
        next()
      } else {
        router.push('/login')
      }
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

// router.beforeEach((to, from, next) => {
//   console.log(to.name)
//   if ((to.name === 'Register' || to.name === 'Login') && localStorage.access_token) {
//     next({ name: 'Tasks' })
//   } else {
//     next()
//   }
// })

export default router;
