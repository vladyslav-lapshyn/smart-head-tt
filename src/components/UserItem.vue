<script>
  export default {
    name: 'UserItem',
    props: {
      user: Object,
    },
    methods: {
      deleteUser() {
        this.$emit('delete-user', this.user.id);
      },
      showDetails() {
        this.$emit('show-details', this.user);
      },
    },
  };
</script>

<template>
  <div class="UserItem">
    <div 
      class="UserItem__content" 
      @click="showDetails"
    >
      <img
        class="UserItem__img"
        :src="user.avatar"
        alt="User Avatar"
      >

      <h3 class="UserItem__name">
        {{ user.first_name }} {{ user.last_name }}
      </h3>

      <p class="UserItem__email">
        {{ user.email }}
      </p>
    </div>

    <button
      class="Button UserItem__btn"
      @click="deleteUser"
    >
      delete
    </button>
  </div>
</template>

<style>
</style>