<template>
  <div class="page-center">
    <div class="wrapper">
      
      <div class="info-text">
        <slot name="left" />
      </div>

      <div class="form-box">
        <slot />
      </div>

    </div>
  </div>
</template>

<style scoped>
.page-center {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #0f0f0f;
}

.wrapper {
  display: flex;
  width: 800px;
  background: #1e1e1e;
  border-radius: 10px;
  overflow: hidden;
}

.info-text {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 30px;
  background: #ff2e63;
}

.form-box {
  flex: 1;
  padding: 30px;
}
</style>