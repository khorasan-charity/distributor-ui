<template>
  <div class="q-pa-md">
    <q-input
      @keyup.enter="search"
      v-model="donorToSearch"
      filled
      label="جستجو"
    >
      <template v-slot:append>
        <q-icon class="cursor-pointer" />
        <q-icon name="search" />
      </template>
    </q-input>

    <donors-table class="q-mt-sm" ref="myTable" />

    <add-donor ref="addDialog" @successAdd="$refs.myTable.reloadTable()" />


    <q-btn
      @click="$refs.addDialog.show()"
      round
      icon="add"
      class="fixed-bottom-right q-mr-md q-mb-md"
      color="primary" />

  </div>
</template>

<script>
  import DonorsTable from "../components/DonorsTable.vue"
  import AddDonor from "../components/AddDonor.vue"
  export default {
    components: {
      DonorsTable,
      AddDonor
    },
    data() {
      return {
        donorToSearch: ''
      }
    },
    methods: {
      search() {
        console.log('search for donor: ', this.donorToSearch)
      }
    }
  }
</script>

<style scoped>

</style>
