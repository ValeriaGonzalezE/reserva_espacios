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
            <option value="">Todo tipo de espacio</option>
            <option v-for="t in tipos" :key="t.id" :value="t.nombre">
              {{ t.nombre }}
            </option>
          </select>

          <select v-model="pago">
            <option value="">Todo tipo de pago</option>
            <option value="si">De pago 💰</option>
            <option value="no">Gratis 🆓</option>
          </select>

          <div class="actions">
            <button @click="obtenerEspacios">Filtrar</button>
            <button class="clear" @click="limpiarFiltros">Limpiar</button>
          </div>

        </div>

        <!-- FILTROS ACTIVOS -->
        <div v-if="fecha || tipo || pago" class="filtros-activos">
          <span v-if="fecha">📅 {{ fecha }}</span>
          <span v-if="tipo">🏢 {{ tipo }}</span>
          <span v-if="pago">
            {{ pago === 'si' ? '💰 De pago' : '🆓 Gratis' }}
          </span>
        </div>

        <!-- LISTA -->
        <div class="content">

          <SpaceCard v-for="salon in salones" :key="salon.id" :espacio="salon" @verReservas="verDetalle" />

          <!-- SIN RESULTADOS -->
          <div v-if="salones.length === 0" class="no-results">
            No hay espacios disponibles con esos filtros
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

import SpaceCard from "@/components/espacios/SpaceCard.vue";

// ===== ROUTER =====
const ionRouter = useIonRouter();
const userStore = useUserStore();

// ===== FILTROS =====
const tipos = ref([]);
const tipo = ref("");
const pago = ref("");
const fecha = ref(new Date().toISOString().split("T")[0]);

// ===== LISTA =====
const salones = ref([]);

// ===== OBTENER ESPACIOS (FILTRO + GENERAL) =====
const obtenerEspacios = async () => {
  try {

    console.log("TIPO ENVIADO:", tipo.value);

    const res = await api.get("/espacios", {
      params: {
        fecha: fecha.value || undefined,
        tipo: tipo.value || null,
        pago: pago.value || null
      }
    });

    salones.value = res.data;

  } catch (err) {
    console.error("Error cargando espacios", err);
  }
};

// ===== CARGAR TIPOS =====
const cargarTipos = async () => {
  try {
    const res = await api.get("/espacios/tipos");

    console.log("TIPOS DESDE BACK:", res.data);

    tipos.value = res.data;

  } catch (err) {
    console.error("Error cargando tipos", err);
  }
};

// ===== LIMPIAR FILTROS =====
const limpiarFiltros = () => {
  fecha.value = null;
  tipo.value = "";
  pago.value = "";

  obtenerEspacios();
};

// ===== CICLO DE VIDA =====
onMounted(async () => {
  await cargarTipos();
  await obtenerEspacios();
});

onActivated(() => {
  obtenerEspacios();
});

// ===== MENU =====
const showMenu = ref(false);

const toggleMenu = () => showMenu.value = !showMenu.value;

const cerrarMenu = () => showMenu.value = false;

// ===== NAVEGACIÓN =====
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

const verDetalle = (id) => {
  ionRouter.push(`/space/${id}`);
};

const logout = () => {
  userStore.logout();
  ionRouter.push("/login");
};
</script>

<style scoped>
.layout {
  background: #0f0f0f;
  color: white;
  min-height: 100vh;
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
  background: #1e1e1e;
  padding: 10px;
}

.menu p {
  padding: 10px;
  border-bottom: 1px solid #333;
  cursor: pointer;
}

/* FILTROS */
.filters {
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.filters input,
.filters select {
  padding: 10px;
  border-radius: 8px;
  border: none;
  background: #1e1e1e;
  color: white;
}

.actions {
  display: flex;
  gap: 10px;
}

button {
  padding: 10px;
  border: none;
  border-radius: 8px;
  background: #ff2e63;
  color: white;
  cursor: pointer;
}

button.clear {
  background: #444;
}

/* FILTROS ACTIVOS */
.filtros-activos {
  display: flex;
  gap: 10px;
  padding: 0 15px;
  font-size: 12px;
  color: #ff2e63;
}

/* CONTENT */
.content {
  padding: 20px;
}

/* NO RESULTS */
.no-results {
  text-align: center;
  margin-top: 20px;
  color: #888;
}

/* MENU BTN */
.btn-menu {
  border-radius: 50%;
  width: 35px;
}
</style>