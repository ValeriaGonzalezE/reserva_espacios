<template>
  <ion-page>
    <ion-content>
      <div class="layout">

        <!-- HEADER -->
        <div class="header">
          <button @click="toggleMenu" class="btn-menu">☰</button>
          <h2>Espacios Disponibles</h2>
        </div>

        <!-- MENU -->
        <div class="menu" v-if="showMenu">
          <p @click="goHome">🏠 Inicio</p>
          <p @click="goCreateSpace">➕ Crear espacio</p>
          <p @click="goMyReservations">📖 Mis reservas</p>
          <p @click="goMySpaces">🏢 Mis espacios</p>
          <p @click="goProfile">👤 Perfil</p>
          <p @click="logout">🚪 Cerrar sesión</p>
        </div>

        <!-- FILTROS -->
        <div class="filters">
          <input type="date" v-model="fecha" />

          <select v-model="tipo">
            <option value="">Todos</option>
            <option v-for="t in tipos" :key="t.id" :value="t.nombre">
              {{ t.nombre }}
            </option>
          </select>

          <select v-model="pago">
            <option value="">Todos</option>
            <option value="si">De pago</option>
            <option value="no">Gratis</option>
          </select>

          <button @click="filtrar">Filtrar</button>
        </div>

        <!-- LISTA -->
        <div class="content">

          <div 
            class="card" 
            v-for="salon in salones" 
            :key="salon.id" 
            @click="verDetalle(salon)"
          >
            <h3>{{ salon.nombre }}</h3>
            <p>📍Ubicación: {{ salon.ubicacion }}</p>
            <p>Tipo de lugar: {{ salon.tipo }}</p>
            <p :class="salon.disponibilidad === 'Disponible' ? 'ok' : 'bad'"> {{ salon.disponibilidad }} </p>

          </div>

          <!-- SIN RESULTADOS -->
          <div v-if="salones.length === 0" class="no-results">
            Sin resultados
          </div>

        </div>

      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonPage, IonContent, useIonRouter } from '@ionic/vue'
import { ref, onMounted, onActivated } from "vue";
import { useUserStore } from "@/stores/UserStore";
import api from "@/services/api";

const ionRouter = useIonRouter();
const userStore = useUserStore();

// ===== FILTROS =====
const tipos = ref([]);
const tipo = ref("");
const pago = ref("");
const fecha = ref(new Date().toISOString().split("T")[0]);

// ===== LISTA =====
const salones = ref([]);

// Cargar todos
const cargarEspacios = async () => {
  const res = await api.get("/espacios");
  salones.value = res.data;
};

// Filtrar
const filtrar = async () => {
  const res = await api.get(`/espacios?tipo=${tipo.value}&pago=${pago.value}`);
  salones.value = res.data;
};

// Cargar al entrar
onMounted(async () => {
  await cargarEspacios();

  const res = await api.get("/tipos");
  tipos.value = res.data;
});

onActivated(() => {
  cargarEspacios();
});

// ===== MENU =====
const showMenu = ref(false);

const toggleMenu = () => showMenu.value = !showMenu.value;

const cerrarMenu = () => showMenu.value = false;

// ===== NAVEGACIÓN (AQUÍ ESTÁ LA CLAVE) =====
const goHome = () => {
  cerrarMenu();
  ionRouter.push("/home");
};

const goCreateSpace = () => {
  cerrarMenu();
  ionRouter.push("/create-space");
};

const goMyReservations = () => {
  cerrarMenu();
  ionRouter.push("/my-reservations");
};

const goMySpaces = () => {
  cerrarMenu();
  ionRouter.push("/my-spaces");
};

const goProfile = () => {
  cerrarMenu();
  ionRouter.push("/profile");
};

const verDetalle = (salon) => {
  ionRouter.push(`/space/${salon.id}`);
};

const logout = () => {
  userStore.logout();
  ionRouter.push("/login");
};
</script>

<style>
.layout {
  background: #0f0f0f;
  color: white;
  min-height: 100vh;
}

.estado{
  color:rgb(0, 255, 38);
}

.btn-menu {
  border-radius: 50%;
  width: 35px;
}

/* HEADER */
.header {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #c70039;
  padding: 15px;
}

/* FILTROS */
.filters {
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* CONTENT */
.content {
  padding: 20px;
}

</style>

