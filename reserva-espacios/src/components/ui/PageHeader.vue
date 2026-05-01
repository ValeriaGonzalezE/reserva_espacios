<script setup>
const props = defineProps({
  titulo: String
});
</script>

<template>
  <div class="header">
    <h2>{{ titulo }}</h2>
  </div>
</template>

<style scoped>
.header {
  width: 100%;
  padding: 15px;
  background: linear-gradient(90deg, #c70039, #ff2e63);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}

.header h2 {
  margin: 0;
  text-align: center;
  width: 100%;
}
</style>