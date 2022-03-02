<template>
    <div class="alert success fade" v-if="showAlert">
        <slot></slot>
        <button type="button" class="close" @click="closeAlert">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showAlert: true
        }
    },
    methods: {
        closeAlert() {
            this.showAlert = false;
        }
    }
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
  margin-bottom: 1px;
}

.fade {
  transition: opacity 0.15s linear;
}

button.close {
  background-color: transparent;
  border: 0;
  cursor: pointer;
}

.close {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
  padding: 0.65rem 15px;
  color: inherit;
  float: right;
  font-size: 1.75rem;
  font-weight: 700;
  line-height: 1;
  color: #000;
  text-shadow: 0 1px 0 #fff;
  opacity: .5;
}

.success {
  color: #0f5132;
  background-color: #d1e7dd;
  border-color: #badbcc;
}
</style>