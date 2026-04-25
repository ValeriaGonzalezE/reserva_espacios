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
import ReprogramReservation from "@/views/ReprogramReservation.vue";

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
    component: LoginPage,
    meta: { public: true }
  },
  {
    path: '/register',
    component: RegistroPage,
    meta: { public: true }
  },
  {
    path: '/forgot',
    component: ForgotPasswordPage,
    meta: { public: true }
  },
  //vistas menu
  {
    path: "/home",
    name: "Home",
    component: HomePage
  },
  {
    path: "/create",
    name: "CreateReservation",
    component: CreateReservation
  },
  {
    path: "/profile",
    name: "ProfilePage",
    component: ProfilePage
  },
  {
    path: "/create-space",
    name: "CreateSpace",
    component: CreateSpace
  },
  {
    path: "/my-reservations",
    name: "MyReservations",
    component: MyReservations
  },
  {
    path: "/my-spaces",
    name: "MySpaces",
    component: MySpaces
  },
  {
    path: "/space/:id",
    name: "SpaceDetail",
    component: SpaceDetail
  },
  {
    path: "/space-edit/:id",
    name: "SpaceEdit",
    component: SpaceEdit
  },
  {
    path: "/space-reservations/:id",
    name: "SpaceReservations",
    component: SpaceReservations
  },
  {
    path: "/edit-profile",
    name: "EditProfile",
    component: EditProfile
  },
  {
    path: "/edit-reservation/:id",
      name: "ReprogramReservation",
    component: ReprogramReservation
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});


//  PROTECCIÓN DE RUTAS 
router.beforeEach((to, from, next) => {
  const isPublic = to.meta.public;
  const token = localStorage.getItem("token");

  if (!isPublic && !token) {
    return next('/login');
  }

  next();
});

export default router;