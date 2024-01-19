<script>
  export default {
    name: 'Modal',
    props: {
      isOpen: Boolean,
      title: String,
    },
    methods: {
      closeModal() {
        this.$emit('close');
      },
    },
  };
</script>

<template>
  <div class="Modal" :class="{ 'Modal-open': isOpen }">
    <div class="Modal__content">
      <span class="Modal__close-btn" @click="closeModal">&times;</span>
      <h2 class="Modal__title">{{ title }}</h2>
      <div class="Modal__body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style>
</style>