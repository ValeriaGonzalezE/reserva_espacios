<template>
  <div>

    <!-- MES -->
    <h3 class="mes">{{ mesActual }}</h3>

    <!-- CALENDARIO -->
    <div class="calendar-wrapper">

      <button class="nav-btn" @click="moverDias(-1)">‹</button>

      <transition-group name="slide" tag="div" class="dias">
        <div
          v-for="dia in dias"
          :key="dia.fecha"
          class="dia"
          :class="{
            activo: dia.fecha === modelValue,
            hoy: dia.fecha === hoyISO
          }"
          @click="$emit('update:modelValue', dia.fecha)"
        >
          <span class="nombre">{{ dia.nombre }}</span>
          <span class="numero">{{ dia.numero }}</span>

          <div v-if="dia.tieneEventos" class="dot"></div>
        </div>
      </transition-group>

      <button class="nav-btn" @click="moverDias(1)">›</button>

    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";

const props = defineProps({
  eventos: Array,
  modelValue: String
});

const emit = defineEmits(["update:modelValue"]);

const dias = ref([]);
const cantidadDias = ref(7);

const hoy = new Date();
const hoyISO = hoy.toISOString().split("T")[0];

let baseDate = new Date();

// RESPONSIVE
const calcularDiasVisibles = () => {
  const width = window.innerWidth;
  if (width < 500) cantidadDias.value = 5;
  else if (width < 900) cantidadDias.value = 7;
  else cantidadDias.value = 11;
};

// MES
const mesActual = computed(() => {
  if (dias.value.length === 0) return "";

  const medio = dias.value[Math.floor(dias.value.length / 2)];
  const fecha = new Date(medio.fecha);

  return fecha.toLocaleDateString("es-CO", {
    month: "long",
    year: "numeric"
  });
});

// GENERAR
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

// EVENTOS
const marcarEventos = () => {
  dias.value.forEach(dia => {
    dia.tieneEventos = props.eventos?.some(r =>
      r.fecha.split("T")[0] === dia.fecha
    );
  });
};

// MOVER
const moverDias = (direccion) => {
  baseDate.setDate(baseDate.getDate() + direccion * cantidadDias.value);
  generarDias();
};

watch(() => props.eventos, marcarEventos);

onMounted(() => {
  calcularDiasVisibles();
  generarDias();

  window.addEventListener("resize", () => {
    calcularDiasVisibles();
    generarDias();
  });
});
</script>

<style scoped>
.mes {
  text-align: center;
  color: #ff2e63;
  margin: 10px 0;
  text-transform: capitalize;
}

.calendar-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.dias {
  display: flex;
  gap: 10px;
}

.dia {
  width: 65px;
  padding: 10px;
  border-radius: 15px;
  text-align: center;
  cursor: pointer;
  background: #1e1e1e;
}

.dia.activo {
  background: #ff2e63;
}

.dia.hoy {
  border: 2px solid #ff2e63;
}

.nombre {
  font-size: 11px;
}

.numero {
  font-size: 18px;
  font-weight: bold;
}

.dot {
  width: 6px;
  height: 6px;
  background: #00ff9d;
  border-radius: 50%;
  margin: 4px auto 0;
}

.nav-btn {
  background: #ff2e63;
  border: none;
  color: white;
  font-size: 20px;
  padding: 6px 10px;
  border-radius: 10px;
  cursor: pointer;
}
</style>