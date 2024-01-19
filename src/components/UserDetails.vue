<script>
  import Loader from './Loader.vue';
  import { usersApi } from './../api/users';

  export default {
    name: 'UserDetails',
    components: {
      Loader,
    },
    props: {
      userId: Number,
    },
    data() {
      return {
        user: null,
        isLoading: true,
        isEditingPhoneNumber: false,
        isEditingAddress: false,
        editedPhoneNumber: '',
        editedAddress: '',
      };
    },
    watch: {
      userId: 'fetchUserDetails',
    },
    mounted() {
      this.fetchUserDetails();
    },
    methods: {
      fetchUserDetails() {
        this.isLoading = true;

        if (this.userId) {
          usersApi.getUserDetails(this.userId)
            .then(({ data }) => {
              this.user = data.data;
              this.initializeEditingFields();
            })
            .catch(error => {
              console.error('Error fetching user details:', error);
            })
            .finally(() => {
              this.isLoading = false;
            });
        }
      },
      startEditing() {
        this.isEditingPhoneNumber = true;
        this.editedPhoneNumber = this.user.phone || '';
        this.isEditingAddress = true;
        this.editedAddress = this.user.address || '';
      },
      saveChanges() {
        this.$emit('updateUser', {
          ...this.user,
          phone: this.editedPhoneNumber,
          address: this.editedAddress,
        });
        this.isEditingPhoneNumber = false;
        this.isEditingAddress = false;
      },
      cancelEditing() {
        this.isEditingPhoneNumber = false;
        this.isEditingAddress = false;
      },
      initializeEditingFields() {
        this.editedPhoneNumber = this.user.phone || '';
        this.editedAddress = this.user.address || '';
      },
    },
  };
</script>

<template>
  <div class="UserDetails" v-if="user || isLoading">
    <div v-if="!isLoading" class="UserDetails__content">
      <img
        class="UserDetails__avatar"
        :src="user.avatar"
        alt="User Avatar"
      >
  
      <div class="UserDetails__user-info">
        <h3 class="UserDetails__user-name">
          {{ user.first_name }} {{ user.last_name }}
        </h3>
  
        <p class="">{{ user.email }}</p>
  
        <div class="UserDetails__phone-info">
          <h4>Phone Number:</h4>
          <p v-if="!isEditingPhoneNumber">{{ user.phone || 'Not provided' }}</p>
          <input v-if="isEditingPhoneNumber" v-model="editedPhoneNumber" class="" />
        </div>
  
        <div>
          <h4>Address:</h4>
          <p v-if="!isEditingAddress">{{ user.address || 'Not provided' }}</p>
          <input v-if="isEditingAddress" v-model="editedAddress" class="" />
        </div>
  
        <div class="">
          <button v-if="!isEditing" @click="startEditing" class="Button">Edit Details</button>
          <button v-if="isEditing" @click="saveChanges" class="Button">Save Changes</button>
          <button v-if="isEditing" @click="cancelEditing" class="Button">Cancel</button>
        </div>
      </div>
    </div>

    <Loader v-if="isLoading" />
  </div>
</template>

<style lang="scss">


.UserDetails {
  margin-top: 20px;

  width: 100%;
  height: 100%;

  &__content {
    display: flex;
    align-items: center;
    justify-content: center;
  }


  &__avatar {
    display: block;
    width: 200px;
    height: 200px;

    margin-right: 20px;

    border-radius: 50%;
    object-fit: cover;
  }

  &__user-info {
    flex-grow: 1;
    align-self: flex-start;
  }

  &__user-name {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  &__phone-info {

  }
}

</style>

