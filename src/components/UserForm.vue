<script>
  import { validateEmail } from './../helpers/validateEmail';

  export default {
    name: 'UserForm',
    props: {
      newUser: Object,
    },
    data() {
      return {
        emailError: null,
      };
    },
    methods: {
      addUser() {
        this.emailError = validateEmail(this.newUser.email);

        if (!this.emailError) {
          this.$emit('addUser')
        }
      }
    }
  }
</script>

<template>
  <div class="UserForm">
    <form @submit.prevent="addUser" class="UserForm__form">
      <label class="UserForm__label" for="email">
        Email:
      </label>

      <input
        class="UserForm__input"
        type="text"
        id="email"
        v-model="newUser.email"
        required
      >

      <div
        class="UserForm__error"
        :class="{ 'UserForm__error-visible': emailError }"
      >
        <span
          v-if="emailError"
          class="UserForm__error-text"
        >
          {{ emailError }}
        </span>
      </div>

      <label class="UserForm__label" for="firstName">
        First Name:
      </label>

      <input
        class="UserForm__input"
        type="text"
        id="firstName"
        v-model="newUser.firstName"
        required
      >

      <label class="UserForm__label" for="lastName">
        Last Name:
      </label>

      <input
        class="UserForm__input"
        type="text"
        id="lastName"
        v-model="newUser.lastName"
        required
      >

      <button class="Button" type="submit">Add User</button>
    </form>
  </div>
</template>

<style>
</style>