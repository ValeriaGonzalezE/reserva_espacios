<template>
  <ion-page>
    <div class="layout">

      <!-- HEADER -->
      <div class="header">
        <button @click="toggleMenu">☰</button>
        <h2>Salones</h2>
      </div>

      <!-- MENU -->
      <div class="menu" v-if="showMenu">
        <p @click="goHome">🏠 Inicio</p>
        <p @click="goCreate">➕ Crear reserva</p>
        <p @click="goProfile">👤 Perfil</p>
        <p @click="logout">🚪 Cerrar sesión</p>
      </div>

      <!-- LISTA -->
      <div class="content">
        <div class="card" v-for="salon in salones" :key="salon.id">
          <h3>{{ salon.nombre }}</h3>
          <p>{{ salon.estado }}</p>
        </div>
      </div>

    </div>
  </ion-page>
</template>

<script setup>
import { IonPage } from '@ionic/vue'
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/UserStore";

const router = useRouter();
const userStore = useUserStore();

const showMenu = ref(false);

const salones = ref([
  { id: 1, nombre: "Sala A", estado: "Disponible" },
  { id: 2, nombre: "Sala B", estado: "Ocupado" },
  { id: 3, nombre: "Auditorio", estado: "Disponible" }
]);

const toggleMenu = () => showMenu.value = !showMenu.value;

const goHome = () => {
  showMenu.value = false;
  router.push("/home");
};

const goCreate = () => {
  router.push("/create");
};

const goProfile = () => {
  router.push("/profile");
};

const logout = () => {
  userStore.logout();
  router.push("/login");
};
</script>

<style>
.layout {
  background: #0f0f0f;
  color: white;
  height: 100vh;
}

/* HEADER */
.header {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #c70039;
  padding: 15px;
}

/* MENU */
.menu {
  position: absolute;
  top: 60px;
  left: 10px;
  background: #1a1a1a;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 0 10px #c70039;
}

.menu p {
  margin: 10px 0;
  cursor: pointer;
}

/* CONTENT */
.content {
  padding: 20px;
}

/* CARDS */
.card {
  background: #1e1e1e;
  padding: 15px;
  margin-bottom: 10px;
  border-left: 5px solid #c70039;
}
</style>
