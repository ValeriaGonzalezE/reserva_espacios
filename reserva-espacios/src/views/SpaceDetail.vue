<template>
  <ion-page>
    <ion-content>
      <div class="container">

        <div class="back-btn" @click="$router.back()"><</div>

            <h2>{{ espacio?.nombre }}</h2>

            <div class="card">
              <p>📍 {{ espacio?.ubicacion }}</p>
              <p>🏷 {{ espacio?.tipo }}</p>
              <p>👥 Capacidad: {{ espacio?.capacidad }}</p>
              <p>💰 {{ espacio?.requiere_pago === 'si' ? '$' + espacio.precio : 'Gratis' }}</p>
              <p>📝 {{ espacio?.descripcion }}</p>
            </div>

            <button @click="irReservar">Reservar espacio</button>

        </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import api from "@/services/api";
import { IonPage, IonContent } from '@ionic/vue'


const route = useRoute();
const router = useRouter();

const espacio = ref(null);

onMounted(async () => {
  const id = route.params.id;
  const res = await api.get("/espacios");
  espacio.value = res.data.find(e => e.id == id);
});

const irReservar = () => {
  router.push(`/create?espacio=${espacio.value.id}`);
};
</script>
