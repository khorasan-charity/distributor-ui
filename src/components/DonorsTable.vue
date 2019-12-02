<template>
  <div>
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
          <!-- TODO: create operations for donor -->
          <q-td key="operations" :props="props">
            <q-btn dense flat round color="primary" icon="add" />
            <q-btn
              @click="sendToEdit(props.row.id, props.row.fullName, props.row.address, props.row.phoneNumber, props.row.mobileNumber, props.row.geoLocation, props.row.avatarUrl, props.row.description)"
              dense
              flat
              round
              color="blue"
              icon="edit" />
            <q-btn dense flat round color="brown-6" icon="camera" />
            <q-btn
              @click="deleteDonor(props.row.id)"
              dense
              flat
              round
              color="red"
              icon="delete" />
          </q-td>
        </q-tr>
      </template>

    </q-table>

  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
    data() {
      return {
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
    methods: {
      ...mapActions('donors', ['editDonor']),
      reloadTable() {
        this.onRequest({
          pagination: this.pagination
        })
      },
      onRequest(props) {
        // TODO: Read about parameters and set them to the function
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
      sendToEdit(id) {
        this.$router.push(`/donors/edit-donor?id=${id}`)
      },
      showNotification(msg, color, icon) {
        this.$q.notify({
          message: msg,
          color: color,
          icon: icon,
          textColor: 'white',
          timeout: 1000
        })
      }
    },
    mounted() {
      this.reloadTable()
    }
  }
</script>

<style scoped>

</style>
