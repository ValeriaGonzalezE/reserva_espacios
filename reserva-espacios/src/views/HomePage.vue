<template>
  <ion-page>
    <ion-content>
      <div class="layout">

        <!-- HEADER -->
        <div class="header">
          <button @click="toggleMenu" class="btn-menu">☰</button>
          <h2>Espacios</h2>
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
          <input type="date" v-model="fecha" @change="cargarEspacios" />

          <div class="card" v-for="salon in salones" :key="salon.id">
            <h3>{{ salon.nombre }}</h3>

            <p>📍 {{ salon.ubicacion }}</p>
            <p>🏷 {{ salon.tipo }}</p>

            <p :class="salon.estado === 'Disponible' ? 'ok' : 'bad'">
              {{ salon.estado }}
            </p>
          </div>
        </div>


      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonPage } from '@ionic/vue'
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/UserStore";

import api from "@/services/api";

const router = useRouter();
const userStore = useUserStore();

const salones = ref([]);
const fecha = ref(new Date().toISOString().split("T")[0]);

const cargarEspacios = async () => {
  const res = await api.get(`/espacios-disponibilidad?fecha=${fecha.value}`);
  salones.value = res.data;
};

onMounted(() => {
  cargarEspacios();
});

const showMenu = ref(false);

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
  min-height: 100vh;
}

.btn-menu {
  border-radius: 50%;
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
  overflow-y: auto;
}

/* CARDS */
.card {
  background: #1e1e1e;
  padding: 15px;
  margin-bottom: 10px;
  border-left: 5px solid #c70039;
}

.ok {
  color: #00ff9d;
}

.bad {
  color: #ff4d4d;
}
</style>
