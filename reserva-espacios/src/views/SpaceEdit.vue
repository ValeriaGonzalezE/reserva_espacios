<template>
  <ion-page>
    <ion-content>

      <div class="container">

        <div class="back-btn" @click="$router.back()"><</div>

        <h2>Editar Espacio</h2>

        <div v-if="espacio" class="form">

          <label>Nombre</label>
          <input v-model="espacio.nombre" />

          <label>Capacidad</label>
          <input type="number" v-model="espacio.capacidad" />

          <label>Ubicación</label>
          <input v-model="espacio.ubicacion" />

          <label>Descripción</label>
          <textarea v-model="espacio.descripcion"></textarea>

          <label>Estado</label>
          <select v-model="espacio.estado">
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>

          <label>¿Pago?</label>
          <select v-model="espacio.requiere_pago">
            <option value="no">Gratis</option>
            <option value="si">De pago</option>
          </select>

          <div v-if="espacio.requiere_pago === 'si'">
            <label>Precio</label>
            <input type="number" v-model="espacio.precio" />
          </div>

          <button class="btn" @click="actualizar">Guardar cambios</button>

          <button class="btn delete" @click="eliminar">
            Eliminar espacio
          </button>

        </div>

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

// CARGAR ESPACIO
onMounted(async () => {
  const res = await api.get(`/espacio/${route.params.id}`);
  espacio.value = res.data;
});

// ACTUALIZAR
const actualizar = async () => {
  await api.put(`/espacio/${route.params.id}`, espacio.value);
  alert("Actualizado correctamente");
};

// ELIMINAR
const eliminar = async () => {
  if (!confirm("¿Seguro que quieres eliminar este espacio?")) return;

  await api.delete(`/espacio/${route.params.id}`);
  alert("Eliminado");

  router.push("/my-spaces");
};
</script>

<style>
.container {
  padding: 20px;
  background: #0f0f0f;
  color: white;
  min-height: 100vh;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

input, textarea, select {
  padding: 10px;
  border-radius: 8px;
  border: none;
  background: #1e1e1e;
  color: white;
}

.btn {
  margin-top: 10px;
  padding: 12px;
  background: #ff2e63;
  border: none;
  border-radius: 10px;
  color: white;
  cursor: pointer;
}

.delete {
  background: #ff4d4d;
}
</style>
