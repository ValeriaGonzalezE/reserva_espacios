<script setup>
const props = defineProps({
  espacio: Object,
  tipos: Array
});

const emit = defineEmits(["guardar"]);
</script>

<template>
  <div class="form">

    <label>Nombre</label>
    <input v-model="espacio.nombre" />

    <label>Tipo</label>
    <select v-model="espacio.tipo_id">
      <option disabled value="">Selecciona</option>
      <option v-for="t in tipos" :key="t.id" :value="t.id">
        {{ t.nombre }}
      </option>
    </select>

    <label>Capacidad</label>
    <input type="number" v-model="espacio.capacidad" />

    <label>Ubicación</label>
    <input v-model="espacio.ubicacion" />

    <label>Descripción</label>
    <textarea v-model="espacio.descripcion"></textarea>

    <label>¿Pago?</label>
    <select v-model="espacio.requiere_pago">
      <option value="no">Gratis</option>
      <option value="si">De pago</option>
    </select>

    <div v-if="espacio.requiere_pago === 'si'">
      <label>Precio</label>
      <input type="number" v-model="espacio.precio" />
    </div>

    <button @click="emit('guardar')">Guardar</button>

  </div>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

input, textarea, select {
  padding: 10px;
  border-radius: 8px;
  border: none;
  background: #1e1e1e;
  color: white;
}

button {
  margin-top: 15px;
  padding: 12px;
  background: #ff2e63;
  border: none;
  border-radius: 10px;
  color: white;
}
</style>