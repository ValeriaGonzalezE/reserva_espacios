<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import api from "@/services/api";

import BackButton from "@/components/ui/BackButton.vue";
import Calendar from "@/components/reservations/CalendarStrip.vue";

const route = useRoute();
const reservas = ref([]);

onMounted(async () => {
  const res = await api.get(`/reservas-espacio/${route.params.id}`);
  reservas.value = res.data;
});
</script>

<template>
  <ion-page>
    <ion-content>

      <div class="container">

        <BackButton />
        <h2>Reservas del espacio</h2>

        <Calendar :eventos="reservas" />

      </div>

    </ion-content>
  </ion-page>
</template>