<template>
  <div>
    <q-input
      class="q-mb-sm"
      @keyup.enter="searchDonor"
      v-model="donorToSearch"
      filled
      label="جستجو"
    >
      <template v-slot:prepend>
        <q-icon class="cursor-pointer" />
        <q-icon name="search" />
      </template>
      <template v-slot:append>
        <q-icon class="curser-pointer" />
        <q-icon @click="donorToSearch = ''" v-if="donorToSearch !== ''" name="close" />
      </template>
    </q-input>

    <q-table
      :loading="loading"
      @request="onRequest"
      :pagination.sync="pagination"
      :rows-per-page-options="[7]"
      title="خیرین"
      :data="data"
      :columns="columns"
      row-key="name"
    >

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="id" :props="props">
            {{ props.row.__index + 1 }}
          </q-td>
          <q-td key="fullName" :props="props">
            {{ props.row.fullName }}
          </q-td>
          <q-td key="address" :props="props">
            {{ props.row.address }}
          </q-td>
          <q-td key="phoneNumber" :props="props">
            {{ props.row.phoneNumber}}
          </q-td>
          <q-td key="mobileNumber" :props="props">
            {{ props.row.mobileNumber}}
          </q-td>
          <q-td key="geoLocation" :props="props">
            {{ props.row.geoLocation }}
          </q-td>
          <q-td key="description" :props="props">
            {{ props.row.description }}
          </q-td>
          <q-td key="operations" :props="props">
            <div v-if="isDonorSelecting">
              <q-btn
                @click="sendToEdit({
                  id: props.row.id,
                  fullName: props.row.fullName,
                  address: props.row.address,
                  phoneNumber: props.row.phoneNumber,
                  mobileNumber: props.row.mobileNumber,
                  geoLocation: props.row.geoLocation,
                  description: props.row.description
                  })"
                dense
                class="q-mr-sm"
                flat
                round
                color="blue"
                icon="edit" />
              <q-btn
                @click="$emit('add', {id: props.row.id, fullName: props.row.fullName})"
                color="primary"
                label="انتخاب" />
            </div>
            <div v-else>
              <q-btn
                @click="sendToEdit({
                  id: props.row.id,
                  fullName: props.row.fullName,
                  address: props.row.address,
                  phoneNumber: props.row.phoneNumber,
                  mobileNumber: props.row.mobileNumber,
                  geoLocation: props.row.geoLocation,
                  description: props.row.description
                  })"
                dense
                flat
                round
                color="blue"
                icon="edit" />
              <q-btn
                @click="deleteDonor(props.row.id)"
                dense
                flat
                round
                color="red"
                icon="delete" />
            </div>
          </q-td>
        </q-tr>
      </template>

    </q-table>

    <edit-donor ref="editDonorDialog" @successEdit="reloadTable" />

  </div>
</template>

<script>
  import EditDonor from '../components/EditDonor.vue'
  export default {
    components: {
      EditDonor
    },
    props: ['isDonorSelecting'],
    data() {
      return {
        donorToSearch: '',
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
            name: 'fullName',
            required: true,
            label: 'نام کامل',
            align: 'left',
            field: row => row.fullName,
            format: val => `${val}`,
            sortable: true
          },
          {
            name: 'address',
            required: true,
            label: 'آدرس',
            align: 'left',
            field: row => row.address,
            format: val => `${val}`
          },
          {
            name: 'phoneNumber',
            required: true,
            label: 'شماره ثابت',
            align: 'left',
            field: row => row.phoneNumber,
            format: val => `${val}`
          },
          {
            name: 'mobileNumber',
            required: true,
            label: 'شماره موبایل',
            align: 'left',
            field: row => row.mobileNumber,
            format: val => `${val}`
          },
          {
            name: 'geoLocation',
            required: true,
            label: 'موقعیت مکانی',
            align: 'left',
            field: row => row.geoLocation,
            format: val => `${val}`
          },
          {
            name: 'description',
            required: true,
            label: 'توضیحات',
            align: 'left',
            field: row => row.description,
            format: val => `${val}`
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
    watch: {
      donorToSearch() {
        if (this.donorToSearch === '') {
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
        this.loading = true;
        const {page, rowsPerPage} = props.pagination;
        this.pagination.page = page;
        this.pagination.rowsPerPage = rowsPerPage;
        this.$axios.get(`/Donor?page=${this.pagination.page}&take=${this.pagination.rowsPerPage}`)
            .then(res => {
              this.data = res.data.result.items;
              this.pagination.rowsNumber = res.data.result.totalCount
              this.loading = false;
            }).catch(() => {
          const msg = 'ارتباط با سرور قطع است';
          const color = 'negative';
          const icon = 'error';
          this.showNotification(msg, color, icon);
        });
      },
      deleteDonor(id) {
        this.$axios.delete(`Donor/${id}`)
            .then(() => {
              this.showNotification('خیر با موفقیت حذف شد', 'primary', 'thumb_up');
              this.onRequest({
                pagination: this.pagination
              });
            })
            .catch(() => {
              this.showNotification('ارتباط با سرور قطع است', 'negative', 'error')
            });
      },
      sendToEdit(information) {
        this.$refs.editDonorDialog.show(information)
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
      searchDonor() {
        if (this.donorToSearch !== '') {
          this.pagination.page = 1
          this.loading = true
          this.$axios.get(`Donor/search?Q=${this.donorToSearch}&page=${this.pagination.page}&take=7`)
              .then(res => {
                this.data = res.data.result.items
                this.pagination.rowsNumber = res.data.result.totalCount
                this.loading = false
              })
              .catch(() => {
                const msg = 'مشکل در برقراری ارتباط با سرور'
                const color = 'negative'
                const icon = 'error'
                this.showNotification(msg, color, icon)
              })
        }
      }
    },
    mounted() {
      this.reloadTable()
    }
  }
</script>

<style scoped>

</style>
