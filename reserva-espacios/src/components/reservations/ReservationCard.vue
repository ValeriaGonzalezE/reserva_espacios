<script setup>
defineProps(["reserva"]);
defineEmits(["editar", "cancelar"]);
</script>

<template>
  <div class="card">

    <img v-if="reserva.imagen" :src="reserva.imagen" class="img" />

    <h4>{{ reserva.nombre }}</h4>

    <p>📅 {{ new Date(reserva.fecha).toLocaleDateString("es-CO") }}</p>
    <p>📝 {{ reserva.descripcion || "-" }}</p>
    <p>📍 {{ reserva.ubicacion }}</p>
    <p>⏰ {{ reserva.hora_inicio }} - {{ reserva.hora_fin }}</p>
    <p>👥 {{ reserva.capacidad || "No definida" }}</p>

    <p v-if="reserva.requiere_pago === 'si'">
      💰 ${{ reserva.precio }}
    </p>
    <p v-else>🆓 Gratis</p>

    <div class="acciones">
      <button @click="$emit('editar', reserva)">✏️</button>
      <button @click="$emit('cancelar', reserva.id)">❌</button>
    </div>

  </div>
</template>

<style scoped>
.card {
  background: #1e1e1e;
  padding: 15px;
  margin-bottom: 10px;
  border-left: 5px solid #ff2e63;
  border-radius: 8px;
}

.img {
  width: 100%;
  border-radius: 10px;
}

.acciones {
  margin-top: 10px;
  display: flex;
  gap: 10px;
}
</style>