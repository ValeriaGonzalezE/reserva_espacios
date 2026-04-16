<template>
  <ion-page>
    <ion-content>
      <div class="container">

        <!-- VOLVER -->
        <div class="back-btn" @click="$router.back()"><</div>

        <h2>Crear Espacio</h2>

        <!-- FORM -->
        <div class="form">

          <label>Nombre del espacio</label>
          <input v-model="nombre" placeholder="Ej: Sala de juntas" />

          <label>Tipo de espacio</label>
          <select v-model="tipo_id">
            <option disabled value="">Selecciona un tipo</option>
            <option v-for="t in tipos" :key="t.id" :value="t.id">
              {{ t.nombre }}
            </option>
          </select>

          <label>Capacidad</label>
          <input type="number" v-model="capacidad" placeholder="Ej: 20 personas" />

          <label>Ubicación (Google Maps)</label>
          <input v-model="ubicacion" placeholder="Pega el link de ubicación" />

          <label>Descripción</label>
          <textarea v-model="descripcion" placeholder="Describe el espacio..."></textarea>

          <label>¿Requiere pago?</label>
          <select v-model="requiere_pago">
            <option disabled value="">Selecciona una opcion</option>
            <option value="no">Gratis</option>
            <option value="si">De pago</option>
          </select>

          <div v-if="requiere_pago === 'si'">
            <label>Precio</label>
            <input type="number" v-model="precio" placeholder="$" />
          </div>

          <button class="btn" @click="crear">Crear espacio</button>

        </div>

      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "@/services/api";
import { useUserStore } from "@/stores/UserStore";
import { IonPage, IonContent } from '@ionic/vue'

const userStore = useUserStore();

// FORM
const nombre = ref("");
const tipo_id = ref("");
const capacidad = ref("");
const ubicacion = ref("");
const descripcion = ref("");
const requiere_pago = ref("");
const precio = ref(0);

// TIPOS DINÁMICOS
const tipos = ref([]);

onMounted(async () => {
  const res = await api.get("/tipos");
  tipos.value = res.data;
});

// CREAR
const crear = async () => {

  if (!nombre.value || !tipo_id.value || !capacidad.value || !ubicacion.value || !requiere_pago.value) {
    alert("Completa todos los campos obligatorios");
    return;
  }

  await api.post("/espacios", {
    nombre: nombre.value,
    tipo_id: tipo_id.value,
    capacidad: capacidad.value,
    ubicacion: ubicacion.value,
    descripcion: descripcion.value,
    precio: requiere_pago.value === "si" ? precio.value : 0,
    requiere_pago: requiere_pago.value,
    usuario_id: userStore.user.id
  });

  alert("Espacio creado correctamente");

  // LIMPIAR FORM
  nombre.value = "";
  tipo_id.value = "";
  capacidad.value = "";
  ubicacion.value = "";
  descripcion.value = "";
  precio.value = 0;
  requiere_pago.value = "no";
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
  margin-bottom: 10px;
}

/* FORM */
.form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* LABEL */
label {
  font-size: 14px;
  color: #ccc;
}

/* INPUTS */
input, textarea, select {
  padding: 10px;
  border-radius: 8px;
  border: none;
  background: #1e1e1e;
  color: white;
  outline: none;
}

/* TEXTAREA */
textarea {
  min-height: 80px;
  resize: none;
}

/* BOTÓN */
.btn {
  margin-top: 15px;
  padding: 12px;
  background: #ff2e63;
  border: none;
  color: white;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;
}

.btn:hover {
  transform: scale(1.03);
  box-shadow: 0 0 10px #ff2e63;
}
</style>
