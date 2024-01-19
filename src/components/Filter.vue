<script>
  export default {
    name: 'Filter',
    props: {
      itemsPerPageOptions: Array,
      itemsPerPage: Number,
    },
    methods: {
      changeItemsPerPage(event) {
        this.$emit('change-items-per-page', event.target.value);
      },
    },
  };
</script>

<template>
  <div class="Filter">
    <label class="Filter__label" for="itemsPerPage">Items per page:</label>
    <select
      id="itemsPerPage"
      :value="itemsPerPage"
      @change="changeItemsPerPage"
      class="Filter__select"
    >
      <option
        v-for="option in itemsPerPageOptions"
        :key="option"
        :value="option"
        class="Filter__option"
      >
        {{ option }}
      </option>
    </select>
  </div>
</template>

<style lang="scss">

</style>
