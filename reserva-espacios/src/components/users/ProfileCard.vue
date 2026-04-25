<template>
  <div class="profile-card">

    <img :src="user?.foto || defaultImg" class="avatar" />

    <h2>{{ user?.nombre }} {{ user?.apellido }}</h2>
    <p class="rol">{{ user?.rol }}</p>

    <div class="info">
      <p>📧 {{ user?.email }}</p>
      <p>📱 {{ user?.telefono || "Sin teléfono" }}</p>
    </div>

  </div>
</template>

<script setup>
const props = defineProps({
  user: Object
});

const defaultImg = "https://cdn-icons-png.flaticon.com/128/13464/13464146.png";
</script>