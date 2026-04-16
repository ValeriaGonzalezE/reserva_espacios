<template>
  <ion-page>
    <ion-content>
      <div class="container">

        <div class="back-btn" @click="$router.back()"><</div>

            <h2>Crear Reserva</h2>

            <!-- ESPACIO -->
            <h3 v-if="nombreEspacio">Espacio: {{ nombreEspacio }}</h3>

            <!-- FECHA -->
            <div class="input-group">
              <label>Fecha:</label>
              <input type="date" v-model="fecha" @change="cargarHorariosOcupados" />
            </div>

            <!-- HORARIOS OCUPADOS -->
            <div v-if="horariosOcupados.length > 0" class="ocupados">
              <h4>Horarios ocupados:</h4>

              <div class="bloques">
                <span v-for="h in horariosOcupados" :key="h.hora_inicio" class="bloque">
                  {{ h.hora_inicio }} - {{ h.hora_fin }}
                </span>
                
              </div>
              <br><br>
            </div>

            <!-- HORAS -->
            <div class="horas">

              <div class="input-group">
                <label>Hora inicio:</label>
                <input type="time" v-model="horaInicio" />
              </div>

              <div class="input-group">
                <label>Hora fin:</label>
                <input type="time" v-model="horaFin" />
              </div>

            </div>



            <button @click="reservar">Reservar</button>

        </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonPage, IonContent } from '@ionic/vue'
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores/UserStore";
import api from "@/services/api";

const userStore = useUserStore();
const route = useRoute();

const espacioSeleccionado = ref(route.query.espacio || "");

const fecha = ref("");
const horaInicio = ref("");
const horaFin = ref("");

const nombreEspacio = ref("");

const horariosOcupados = ref([]);

// Cargar nombre del espacio
onMounted(async () => {
  if (espacioSeleccionado.value) {
    const res = await api.get("/espacios");
    const e = res.data.find(x => x.id == espacioSeleccionado.value);
    nombreEspacio.value = e?.nombre;
  }
});

// Traer horarios ocupados
const cargarHorariosOcupados = async () => {
  if (!fecha.value) return;

  const res = await api.get("/reservas-por-espacio", {
    params: {
      espacio_id: espacioSeleccionado.value,
      fecha: fecha.value
    }
  });

  horariosOcupados.value = res.data;
};

// VALIDAR DISPONIBILIDAD REAL
const validarDisponibilidad = async () => {

  const res = await api.get("/espacios", {
    params: {
      fecha: fecha.value,
      hora_inicio: horaInicio.value,
      hora_fin: horaFin.value
    }
  });

  const espacio = res.data.find(e => e.id == espacioSeleccionado.value);

  if (!espacio || espacio.disponibilidad === "Ocupado") {
    alert("Ese horario ya está ocupado");
    return false;
  }

  return true;
};

// RESERVAR
const reservar = async () => {

  if (!fecha.value || !horaInicio.value || !horaFin.value) {
    alert("Completa todos los campos");
    return;
  }

  // Validación de horas lógica
  if (horaInicio.value >= horaFin.value) {
    alert("La hora fin debe ser mayor que la de inicio");
    return;
  }

  // Validar disponibilidad
  const disponible = await validarDisponibilidad();

  if (!disponible) return;

  const res = await api.post("/reservas", {
    usuario_id: userStore.user.id,
    espacio_id: espacioSeleccionado.value,
    fecha: fecha.value,
    hora_inicio: horaInicio.value,
    hora_fin: horaFin.value
  });

  if (!res.data.success) {
    alert(res.data.message);
    return;
  }

  alert("Reserva creada");

  // limpiar
  horaInicio.value = "";
  horaFin.value = "";
};
</script>

<style>
.container {
  padding: 20px;
  background: #0f0f0f;
  color: white;
  min-height: 100vh;
}

.back-btn {
  font-size: 25px;
  cursor: pointer;
  margin-bottom: 15px;
}

.input-group {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}

input {
  padding: 8px;
  border-radius: 5px;
  border: none;
}

.horas {
  display: flex;
  gap: 10px;
}

button {
  margin-top: 20px;
  padding: 10px;
  background: #ff2e63;
  border: none;
  color: white;
  border-radius: 8px;
}

/* HORARIOS OCUPADOS */
.ocupados {
  margin-top: 15px;
}

.bloques {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.bloque {
  background: #ff4d4d;
  padding: 6px 10px;
  border-radius: 5px;
  font-size: 12px;
}
</style>
