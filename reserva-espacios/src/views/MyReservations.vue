<template>
  <ion-page>
    <ion-content>
      <div class="container">

        <!-- VOLVER -->
        <div class="back-btn" @click="$router.back()"><</div>

        <h2>Mis Reservas</h2>

        <!-- MES -->
        <h3 class="mes">{{ mesActual }}</h3>

        <!-- CALENDARIO -->
        <div class="calendar-wrapper">

          <button class="nav-btn left" @click="moverDias(-1)">‹</button>

          <transition-group name="slide" tag="div" class="dias">
            <div 
              v-for="dia in dias" 
              :key="dia.fecha"
              class="dia"
              :class="{
                activo: dia.fecha === fechaSeleccionada,
                hoy: dia.fecha === hoyISO
              }"
              @click="seleccionarDia(dia.fecha)"
            >
              <span class="nombre">{{ dia.nombre }}</span>
              <br>
              <span class="numero">{{ dia.numero }}</span>

              <div v-if="dia.tieneEventos" class="dot"></div>
            </div>
          </transition-group>

          <button class="nav-btn right" @click="moverDias(1)">›</button>

        </div>

        <!-- DETALLE -->
        <div class="detalle">
          <br>
          <h3>Reservas del día</h3>

          <div v-if="reservasDelDia.length > 0">

            <div v-for="r in reservasDelDia" :key="r.id" class="card">

              <img v-if="r.imagen" :src="r.imagen" class="img" />

              <h4>{{ r.nombre }}</h4>

              <p>📅 Fecha: {{ formatearFecha(r.fecha) }}</p>
              <p>📝 Descripcion: {{ r.descripcion || "-" }}</p>
              <p>📍 Ubicación: {{ r.ubicacion }}</p>

              <p>⏰ Hora: {{ r.hora_inicio }} - {{ r.hora_fin }}</p>

              <p>👥 Capacidad: {{ r.capacidad || "No definida" }}</p>

              <p v-if="r.requiere_pago === 'si'">
                💰 Precio: ${{ r.precio }}
              </p>
              <p v-else>
                🆓 Gratis
              </p>

            </div>

          </div>

          <div v-else class="no-results">
            No hay reservas
          </div>

        </div>

      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import api from "@/services/api";
import { useUserStore } from "@/stores/UserStore";
import { IonPage, IonContent } from '@ionic/vue'

const userStore = useUserStore();

const reservas = ref([]);
const reservasDelDia = ref([]);
const dias = ref([]);

const fechaSeleccionada = ref("");

const hoy = new Date();
const hoyISO = hoy.toISOString().split("T")[0];

let baseDate = new Date();
const cantidadDias = ref(7);

// RESPONSIVE
const calcularDiasVisibles = () => {
  const width = window.innerWidth;

  if (width < 500) cantidadDias.value = 5;
  else if (width < 900) cantidadDias.value = 7;
  else cantidadDias.value = 11;
};

// MES DINÁMICO
const mesActual = computed(() => {
  if (dias.value.length === 0) return "";

  const medio = dias.value[Math.floor(dias.value.length / 2)];
  const fecha = new Date(medio.fecha);

  return fecha.toLocaleDateString("es-CO", {
    month: "long",
    year: "numeric"
  });
});

// FORMATEAR
const formatearFecha = (fecha) => {
  return new Date(fecha).toLocaleDateString("es-CO", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
};

// GENERAR DÍAS
const generarDias = () => {
  const lista = [];
  const mitad = Math.floor(cantidadDias.value / 2);

  for (let i = -mitad; i <= mitad; i++) {
    const fecha = new Date(baseDate);
    fecha.setDate(baseDate.getDate() + i);

    const fechaISO = fecha.toISOString().split("T")[0];

    lista.push({
      fecha: fechaISO,
      nombre: fecha.toLocaleDateString("es-CO", { weekday: "short" }),
      numero: fecha.getDate(),
      tieneEventos: false
    });
  }

  dias.value = lista;
  marcarEventos();
};

// MARCAR EVENTOS
const marcarEventos = () => {
  dias.value.forEach(dia => {
    dia.tieneEventos = reservas.value.some(r =>
      r.fecha.split("T")[0] === dia.fecha
    );
  });
};

// MOVER
const moverDias = (direccion) => {
  baseDate.setDate(baseDate.getDate() + direccion * cantidadDias.value);
  generarDias();
};

// SELECCIONAR
const seleccionarDia = (fecha) => {
  fechaSeleccionada.value = fecha;

  reservasDelDia.value = reservas.value.filter(r =>
    r.fecha.split("T")[0] === fecha
  );
};

// INIT
onMounted(async () => {
  calcularDiasVisibles();

  window.addEventListener("resize", () => {
    calcularDiasVisibles();
    generarDias();
  });

  const res = await api.get(`/mis-reservas/${userStore.user.id}`);
  reservas.value = res.data;

  baseDate = new Date();
  generarDias();

  seleccionarDia(hoyISO);
});
</script>

<style>
.container {
  padding: 15px;
  background: #0f0f0f;
  color: white;
  min-height: 100vh;
}

.back-btn {
  font-size: 25px;
  cursor: pointer;
}

/* MES */
.mes {
  text-align: center;
  color: #ff2e63;
  margin-top: 10px;
}

/* CALENDARIO */
.calendar-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* DÍAS */
.dias {
  display: flex;
  gap: 10px;
}

/* DÍA */
.dia {
  width: 65px;
  padding: 10px;
  border-radius: 20%;
  text-align: center;
  cursor: pointer;
  background: #1e1e1e;
  transition: 0.3s;
}

.dia:hover {
  transform: scale(1.1);
}

.dia.hoy {
  border: 2px solid #ff2e63;
}

.dia.activo {
  background: #ff2e63;
}

/* TEXTO */
.nombre {
  font-size: 11px;
}

.numero {
  font-size: 18px;
  font-weight: bold;
}

/* PUNTO */
.dot {
  width: 6px;
  height: 6px;
  background: #00ff9d;
  border-radius: 50%;
  margin: 4px auto 0;
}

/* FLECHAS */
.nav-btn {
  width: 20px;
  background: #ff2e63;
  border: none;
  color: white;
  font-size: 22px;
  padding: 8px 12px;
  border-radius: 20%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 15px;
}


.left {
  left: -10px;
}

.right {
  right: -10px;
}

/* ANIMACIÓN */
.slide-enter-active, .slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from {
  opacity: 0;
  transform: translateX(50px);
}
.slide-leave-to {
  opacity: 0;
  transform: translateX(-50px);
}

/* DETALLE */
.detalle {
  margin-top: 20px;
}

.card {
  background: #1e1e1e;
  padding: 15px;
  margin-bottom: 10px;
  border-left: 5px solid #ff2e63;
  border-radius: 8px;
}

.img {
  width: 100%;
  border-radius: 10px;
  margin-bottom: 10px;
}

.no-results {
  text-align: center;
  color: #aaa;
}

/* RESPONSIVE */
@media (max-width: 620px) {
  .dia {
    width: 55px;
  }
}

@media (max-width: 550px) {
  .nav-btn {
    position: absolute;
    bottom: -10px;
    margin: 0;
    font-size: 20px;
    padding: 6px 12px;
  }
}

@media (min-width: 1020px) {
  .dia {
    width: 75px;
  }
}
</style>
