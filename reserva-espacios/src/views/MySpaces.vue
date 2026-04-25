<script setup>
import { ref, onMounted } from "vue";
import api from "@/services/api";
import { useUserStore } from "@/stores/UserStore";
import { useRouter } from "vue-router";

import BackButton from "@/components/ui/BackButton.vue";
import SpaceCard from "@/components/espacios/SpaceCard.vue";

const router = useRouter();
const userStore = useUserStore();

const espacios = ref([]);



onMounted(async () => {
  const res = await api.get(`/mis-espacios/${userStore.user.id}`);
  espacios.value = res.data;
});
</script>

<template>
  <ion-page>
    <ion-content>

      <div class="container">

        <BackButton />
        <h2>Mis Espacios</h2>

        <SpaceCard
          v-for="e in espacios"
          :key="e.id"
          :espacio="e"
          @verReservas="id => router.push(`/space-reservations/${id}`)"
          @editar="id => router.push(`/space-edit/${id}`)"
        />

      </div>

    </ion-content>
  </ion-page>
</template>