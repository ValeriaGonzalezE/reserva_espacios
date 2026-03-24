import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

import HomePage from "@/views/HomePage.vue";

import CreateReservation from "@/views/CreateReservation.vue";

import ProfilePage from "@/views/ProfilePage.vue";

// Usuarios
import LoginPage from '../views/usuarios/LoginPage.vue';
import RegistroPage from '../views/usuarios/RegistroPage.vue';
import ForgotPasswordPage from '../views/usuarios/ForgotPasswordPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },

  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/register',
    name: 'Registro',
    component: RegistroPage
  },
  {
    path: '/forgot',
    name: 'ForgotPassword',
    component: ForgotPasswordPage
  },
  { 
    path: "/home", 
    component: HomePage 
  },
  { 
    path: "/create", 
    component: CreateReservation 
  },
  { 
    path: "/profile", 
    component: ProfilePage 
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});


//  PROTECCIÓN DE RUTAS (por ahora no hay privadas, pero lo dejamos listo)
router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register', '/forgot'];
  const authRequired = !publicPages.includes(to.path);

  const token = localStorage.getItem("token");

  if (authRequired && !token) {
    return next('/login');
  }

  next();
});

export default router;
