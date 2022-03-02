<template>
    <div class="alert" :class="{success: success, danger: !success}">
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: ['success'],
}
</script>

<style scoped>
.alert {
  position: relative;
  padding: 0.75rem 0.75rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  width: 550px;
  margin: 1rem auto -25px;
}
.danger {
  color: #842029;
  background-color: #f8d7da;
  border-color: #f5c2c7;
}

.success {
  color: #0f5132;
  background-color: #d1e7dd;
  border-color: #badbcc;
}
</style>