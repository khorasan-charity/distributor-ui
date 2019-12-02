<template>
  <div>
    <q-input
      class="q-mb-sm"
      @keyup.enter="searchDistributor"
      v-model="distributorToSearch"
      filled
      label="جستجو"
    >
      <template v-slot:prepend>
        <q-icon class="cursor-pointer" />
        <q-icon name="search" />
      </template>
      <template  v-slot:append>
        <q-icon class="curser-pointer" />
        <q-icon @click="distributorToSearch = ''" v-if="distributorToSearch !== ''" name="close" />
      </template>
    </q-input>

    <q-table
      :loading="loading"
      @request="onRequest"
      :pagination.sync="pagination"
      :rows-per-page-options="[7]"
      title="موزعین"
      :data="data"
      :columns="columns"
      row-key="name"
    >

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="id" :props="props">
            {{ props.row.__index + 1 }}
          </q-td>
          <q-td key="firstName" :props="props">
            {{ props.row.firstName }}
          </q-td>
          <q-td key="lastName" :props="props">
            {{ props.row.lastName }}
          </q-td>
          <q-td key="nationalId" :props="props">
            {{ props.row.nationalId }}
          </q-td>
          <q-td key="mobileNumber" :props="props">
            {{ props.row.mobileNumber}}
          </q-td>
          <q-td key="description" :props="props">
            {{ props.row.description }}
          </q-td>
          <q-td key="operations" :props="props">
            <q-btn dense flat round color="primary" icon="add" />
            <q-btn
              @click="sendToEdit(props.row.id, props.row.firstName, props.row.lastName, props.row.mobileNumber, props.row.password, props.row.nationalId, props.row.avatarUrl, props.row.description)"
              dense
              flat
              round
              color="blue"
              icon="edit" />
            <q-btn dense flat round color="brown-6" icon="camera" />
            <q-btn
              @click="deleteDistributor(props.row.id)"
              dense
              flat
              round
              color="red"
              icon="delete" />
            <q-btn
              @click="sendToEditPassword(props.row.id)"
              push
              color="purple"
              label="تغییر رمز" />
          </q-td>
        </q-tr>
      </template>

    </q-table>
    <edit-distributor
      :isPasswordEditing="isPasswordEditing"
      ref="editDistributorDialog"
      @successEdit="reloadTable"/>
  </div>

</template>

<script>
  import EditDistributor from "./EditDistributor.vue";
  export default {
    components: {
      EditDistributor
    },
    data() {
      return {
        distributorToSearch: '',
        isPasswordEditing: false,
        loading: false,
        pagination: {
          rowsPerPage: 7,
          page: 1,
          rowsNumber: 0
        },
        columns: [
          {
            name: 'id',
            required: true,
            label: 'ردیف',
            align: 'left',
            field: row => row.__index + 1,
            format: val => `${val}`,
            sortable: true
          },
          {
            name: 'firstName',
            required: true,
            label: 'نام',
            align: 'left',
            field: row => row.firstName,
            format: val => `${val}`,
            sortable: true
          },
          {
            name: 'lastName',
            align: 'left',
            label: 'نام خانوادگی',
            field: row => row.lastName,
            sortable: true
          },
          {
            name: 'nationalId',
            label: 'کد ملی',
            align: 'left',
            field: row => row.nationalId,
            sortable: true
          },
          {
            name: 'mobileNumber',
            label: 'شماره همراه',
            align: 'left',
            field: row => row.mobileNumber
          },
          {
            name: 'description',
            label: 'توضیحات',
            align: 'left',
            field: row => row.description
          },
          {
            name: 'operations',
            label: 'عملیات',
            align: 'center'
          }
        ],
        data: []
      }
    },
    mounted() {
      this.reloadTable()
    },
    watch: {
      distributorToSearch() {
        if (this.distributorToSearch === '') {
          this.reloadTable()
        }
      }
    },
    methods: {
      reloadTable() {
        this.onRequest({
          pagination: this.pagination
        })
      },
      onRequest(props) {
        this.loading = true
        const {page, rowsPerPage} = props.pagination
        this.pagination.page = page
        this.pagination.rowsPerPage = rowsPerPage
        this.$axios.get(`/Distributor?page=${this.pagination.page}&take=${this.pagination.rowsPerPage}`)
            .then(res => {
              this.data = res.data.result.items
              this.pagination.rowsNumber = res.data.result.totalCount
              this.loading = false
        }).catch(() => {
          const msg = 'ارتباط با سرور قطع است'
          const color = 'negative'
          const icon = 'error'
          this.showNotification(msg, color, icon)
        });
      },
      showNotification(msg, color, icon) {
        this.$q.notify({
          message: msg,
          color: color,
          icon: icon,
          textColor: 'white',
          timeout: 1000
        })
      },
      deleteDistributor(id) {
        this.$axios.delete(`Distributor/${id}`)
            .then(() => {
              this.showNotification('موزع با موفقیت حذف شد', 'primary', 'thumb_up');
              this.onRequest({
                pagination: this.pagination
              });
            })
            .catch(() => {
              this.showNotification('ارتباط با سرور قطع است', 'negative', 'error')
            });
      },
      sendToEdit(id, firstName, lastName, mobileNumber, password, nationalId, avatarUrl, description) {
        this.isPasswordEditing = false
        const information = {
          id,
          firstName,
          lastName,
          mobileNumber,
          password,
          nationalId,
          avatarUrl,
          description
        }
        this.$refs.editDistributorDialog.show(information)
      },
      sendToEditPassword(id) {
        // TODO: complete edit password functionality
        this.isPasswordEditing = true
        this.$refs.editDistributorDialog.show(id)
      },
      searchDistributor() {
        if (this.distributorToSearch !== '') {
          this.loading = true
          this.$axios.get(`Distributor/search?Q=${this.distributorToSearch}&page=${this.pagination.page}`)
              .then(res => {
                this.data = res.data.result.items
                this.pagination.rowsNumber = res.data.result.totalCount
                this.loading = false
              })
              .catch(err => {
                console.log(err.message)
              })
        }
      }
    }
  }
</script>

<style scoped>

</style>
