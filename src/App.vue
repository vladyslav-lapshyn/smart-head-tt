<script>
  import UserItem from './components/UserItem.vue';
  import UserDetails from './components/UserDetails.vue';
  import { usersApi } from './api/users';
  import Modal from './components/Modal.vue';
  import UserForm from './components/UserForm.vue';
  import UserList from './components/UserList.vue';
  import Filter from './components/Filter.vue';
  import Loader from './components/Loader.vue';

  export default {
    components: {
    UserItem,
    UserDetails,
    Modal,
    UserForm,
    UserList,
    Filter,
    Loader
},
    data() {
      return {
        users: [],
        currentPage: 1,
        totalPages: 1,
        itemsPerPageOptions: [1, 3, 6, 12],
        itemsPerPage: 6,
        showCreateUserModal: false,
        newUser: { email: '', firstName: '', lastName: ''},
        showUserDetailsModal: false,
        selectedUser: null,
        maxDisplayPages: 5,
        userIsLoading: false,
      }
    },
    mounted() {
      this.fetchUsers(this.currentPage, this.itemsPerPage)
    },
    computed: {
      displayPages() {
        const startPage = Math.max(1, this.currentPage - Math.floor(this.maxDisplayPages / 2));
        const endPage = Math.min(this.totalPages, startPage + this.maxDisplayPages - 1);

        const pages = [];
        for (let i = startPage; i <= endPage; i++) {
          pages.push(i);
        };

        if (startPage > 1) {
          pages.unshift('...');
          pages.unshift(1);
        };

        if (endPage < this.totalPages) {
          pages.push('...');
          pages.push(this.totalPages);
        };

        return pages;
      },
    },
    methods: {
      fetchUsers(page, itemsPerPage) {
        this.userIsLoading = true;
        usersApi.getUsers(page, itemsPerPage)
        .then(({ data }) => {
          this.users = data.data;
          this.totalPages = data.total_pages;
        })
        .catch(error => {
          console.error('Error fetching users:', error);
        })
        .finally(() => {
          this.userIsLoading = false;
        });
      },
      changePage(page) {
        if (typeof page === 'number') {
          this.currentPage = page;
          this.fetchUsers(page, this.itemsPerPage);
        }
      },
      changeItemsPerPage(itemsPerPage) {
        this.currentPage = 1;
        this.itemsPerPage = itemsPerPage;
        this.fetchUsers(this.currentPage, this.itemsPerPage);
      },
      addUser() {
        usersApi.createUser(this.newUser.email, this.newUser.firstName, this.newUser.lastName)
          .then(() => {
            this.fetchUsers(this.currentPage, this.itemsPerPage);
            this.closeCreateUserModal();
            this.newUser = { email: '', firstName: '', lastName: ''};
          })
      },
      openCreateUserModal() {
        this.showCreateUserModal = true;
      },
      closeCreateUserModal() {
        this.showCreateUserModal = false;
      },
      deleteUser(userId) {
        usersApi.deleteUser(userId)
          .then(() => {
            console.log(userId)
            this.fetchUsers(this.currentPage, this.itemsPerPage)
          })
          .catch(err => console.error('Error deleting user:', err));
      },
      showUserDetails(user) {
        this.selectedUser = user;
        this.showUserDetailsModal = true;
      },
      closeUserDetailsModal() {
        this.selectedUser = null;
        this.showUserDetailsModal = false;
      },
    },
  };
</script>

<template>
  <div class="App">
    <h1 class="App__title">Users List</h1>

    <div class="App__controls">
      <Filter
        :itemsPerPageOptions="itemsPerPageOptions"
        :itemsPerPage="itemsPerPage"
        @change-items-per-page="changeItemsPerPage"
      />

      <button
        class="Button"
        @click="openCreateUserModal"
      >
        Add User
      </button>
    </div>

    <div class="App__paginations">
      <button
        v-for="page in displayPages"
        :key="page"
        @click="changePage(page)"
        :disabled="currentPage === page"
        class="Button App__btn"
        :class="{ 'Button-active': currentPage === page }"
      >
        {{ page }}
      </button>
    </div>

    <UserList>
      <UserItem
        v-for="user of users"
        :key="user.id"
        :user="user"
        @delete-user="deleteUser"
        @show-details="showUserDetails"
      />
    </UserList>
    
    <Modal
      :is-open="showCreateUserModal"
      title="Add New User"
      @close="closeCreateUserModal"
    >
      <UserForm
        :newUser="newUser"
        @addUser="addUser"
      />
    </Modal>

    <Modal
      :is-open="showUserDetailsModal"
      title="User Details"
      @close="closeUserDetailsModal"
    >
      <UserDetails
        :userId="selectedUser ? selectedUser.id : null"
      />
    </Modal>

    <Loader
      class="App__loader"
      v-if="userIsLoading"
    />
  </div>
</template>

<style>
</style>
