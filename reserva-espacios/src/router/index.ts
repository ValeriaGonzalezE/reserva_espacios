import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';


//modulos del menu
import HomePage from "@/views/HomePage.vue";
import CreateReservation from "@/views/CreateReservation.vue";
import ProfilePage from "@/views/ProfilePage.vue";
import CreateSpace from "@/views/CreateSpace.vue";
import MyReservations from "@/views/MyReservations.vue";
import MySpaces from "@/views/MySpaces.vue";
import SpaceDetail from "@/views/SpaceDetail.vue";
import SpaceReservations from "@/views/SpaceReservations.vue";
import EditProfile from "@/views/EditProfile.vue";
import SpaceEdit from '@/views/SpaceEdit.vue';

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
  //vistas menu
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
  },
  {
    path: "/create-space",
    component: CreateSpace
  },
  {
    path: "/my-reservations",
    component: MyReservations
  },
  {
    path: "/my-spaces",
    component: MySpaces
  },
  { 
    path: "/space/:id", 
    component: SpaceDetail 
  },
  {
  path: "/space-edit/:id",
  component: SpaceEdit
  },
  {
  path: "/space-reservations/:id",
  component: SpaceReservations
  },
  {
  path: "/edit-profile",
  component: EditProfile
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
