<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import api from "@/services/api";

import BackButton from "@/components/ui/BackButton.vue";

const route = useRoute();
const router = useRouter();

const espacio = ref(null);

onMounted(async () => {
  const res = await api.get("/espacios");
  espacio.value = res.data.find(e => e.id == route.params.id);
});

const reservar = () => {
  router.push(`/create?espacio=${espacio.value.id}`);
};

const mapaUrl = computed(() => {
  if (!espacio.value?.ubicacion) return "";

  const ubicacion = espacio.value.ubicacion;

  //  link de Google Maps
  if (ubicacion.includes("maps.google")) {
    return ubicacion.includes("output=embed")
      ? ubicacion
      : ubicacion + "&output=embed";
  }

  //  Si es texto normal
  return `https://www.google.com/maps?q=${encodeURIComponent(ubicacion)}&output=embed`;
});
</script>

<template>
  <ion-page>
    <ion-content>

      <div class="container">

        <BackButton />

        <h2>{{ espacio?.nombre }}</h2>

        <p>📍 {{ espacio?.ubicacion }}</p>
        <p>🏷 {{ espacio?.tipo }}</p>
        <p>👥 {{ espacio?.capacidad }}</p>
        <p>💰 {{ espacio?.requiere_pago === 'si' ? '$' + espacio.precio : 'Gratis' }}</p>

        <button @click="reservar">Reservar</button>

        <iframe v-if="mapaUrl" :src="mapaUrl" width="30%" height="300" style="border:0; margin-top: 10px;"
          allowfullscreen="" loading="lazy">
        </iframe>


      </div>

    </ion-content>
  </ion-page>
</template>