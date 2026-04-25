<script setup>
import { ref, onMounted } from "vue";
import api from "@/services/api";
import { useUserStore } from "@/stores/UserStore";

import BackButton from "@/components/ui/BackButton.vue";
import SpaceForm from "@/components/espacios/SpaceForm.vue";

const userStore = useUserStore();

const espacio = ref({
  nombre: "",
  tipo_id: "",
  capacidad: "",
  ubicacion: "",
  descripcion: "",
  requiere_pago: "no",
  precio: 0
});

const tipos = ref([]);

onMounted(async () => {
  const res = await api.get("/tipos");
  console.log("TIPOS:", res.data);
  tipos.value = res.data;
});

const crear = async () => {
  await api.post("/espacios", {
    ...espacio.value,
    usuario_id: userStore.user.id
  });

  alert("Espacio creado");
};
</script>

<template>
  <ion-page>
    <ion-content>

      <div class="container">

        <BackButton />
        <h2>Crear Espacio</h2>

        <SpaceForm 
          :espacio="espacio"
          :tipos="tipos"
          @guardar="crear"
        />

      </div>

    </ion-content>
  </ion-page>
</template>