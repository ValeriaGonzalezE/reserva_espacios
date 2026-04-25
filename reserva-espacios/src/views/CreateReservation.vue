<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores/UserStore";
import api from "@/services/api";

import BackButton from "@/components/ui/BackButton.vue";
import BaseInput from "@/components/ui/BaseInput.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import TimeBlocks from "@/components/reservations/TimeBlocks.vue";

const userStore = useUserStore();
const route = useRoute();

const espacioSeleccionado = ref(route.query.espacio || "");
const fecha = ref("");
const horaInicio = ref("");
const horaFin = ref("");
const nombreEspacio = ref("");
const horariosOcupados = ref([]);

onMounted(async () => {
  const res = await api.get("/espacios");
  const e = res.data.find(x => x.id == espacioSeleccionado.value);
  nombreEspacio.value = e?.nombre;
});

const cargarHorariosOcupados = async () => {
  const res = await api.get("/reservas/por-espacio", {
    params: { espacio_id: espacioSeleccionado.value, fecha: fecha.value }
  });
  horariosOcupados.value = res.data;
};

const reservar = async () => {
  const res = await api.post("/reservas", {
    usuario_id: userStore.user.id,
    espacio_id: espacioSeleccionado.value,
    fecha: fecha.value,
    hora_inicio: horaInicio.value,
    hora_fin: horaFin.value
  });

  if (!res.data.success) return alert(res.data.message);
  alert("Reserva creada");
};
</script>

<template>
  <ion-page>
    <ion-content>
      <div class="container">

        <BackButton />

        <h2>Crear Reserva</h2>

        <h3 v-if="nombreEspacio">Espacio: {{ nombreEspacio }}</h3>

        <BaseInput label="Fecha" type="date" v-model="fecha" @change="cargarHorariosOcupados" />

        <TimeBlocks :horarios="horariosOcupados" />

        <BaseInput label="Hora inicio" type="time" v-model="horaInicio" />
        <BaseInput label="Hora fin" type="time" v-model="horaFin" />

        <BaseButton @click="reservar">Reservar</BaseButton>

      </div>
    </ion-content>
  </ion-page>
</template>
