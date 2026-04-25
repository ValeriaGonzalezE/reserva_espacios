<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import api from "@/services/api";

import BackButton from "@/components/ui/BackButton.vue";
import SpaceForm from "@/components/espacios/SpaceForm.vue";

const route = useRoute();
const router = useRouter();

const espacio = ref({});
const tipos = ref([]);

onMounted(async () => {
  const res = await api.get(`/espacio/${route.params.id}`);
  espacio.value = res.data;

  const t = await api.get("/tipos");
  tipos.value = t.data;
});

const guardar = async () => {
  await api.put(`/espacio/${route.params.id}`, espacio.value);
  alert("Actualizado");
};

const eliminar = async () => {
  if (!confirm("¿Eliminar?")) return;

  await api.delete(`/espacio/${route.params.id}`);
  router.push("/my-spaces");
};
</script>

<template>
  <ion-page>
    <ion-content>

      <div class="container">

        <BackButton />
        <h2>Editar Espacio</h2>

        <SpaceForm
          :espacio="espacio"
          :tipos="tipos"
          @guardar="guardar"
        />

        <button @click="eliminar">Eliminar</button>

      </div>

    </ion-content>
  </ion-page>
</template>