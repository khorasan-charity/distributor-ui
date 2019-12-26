<template>
  <div>

    <q-table
      :loading="loading"
      @request="onRequest"
      :pagination.sync="pagination"
      :rows-per-page-options="[7]"
      title="ماموریت‌ها"
      :data="data"
      :columns="columns"
      row-key="name"
    >

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="id" :props="props">
            {{ props.row.__index + 1 }}
          </q-td>
          <q-td key="distributor" :props="props">
            {{ props.row.distributorFullName }}
          </q-td>
          <q-td key="donor" :props="props">
            {{ props.row.donorFullName }}
          </q-td>
          <q-td key="dueAt" :props="props">
            {{ formatDate(props.row.dueAt) }}
          </q-td>
          <q-td key="doneAt" :props="props">
            {{ formatDate(props.row.doneAt) }}
          </q-td>
          <q-td key="scheduleType" :props="props">
            {{ props.row.scheduleTypeName }}
          </q-td>
          <q-td key="description" :props="props">
            {{ props.row.description }}
          </q-td>
          <q-td key="operations" :props="props">
            <div>
              <q-btn
                dense
                flat
                round
                color="blue"
                icon="edit"
                @click="sendToEdit({
                  id: props.row.id,
                  distributorId: props.row.distributorId,
                  distributorFullName: props.row.distributorFullName,
                  donorId: props.row.donorId,
                  donorFullName: props.row.donorFullName,
                  scheduleTypeName: props.row.scheduleTypeName,
                  scheduleTypeId: props.row.scheduleTypeId,
                  description: props.row.description,
                  dueAt: props.row.dueAt,
                  doneAt: props.row.doneAt
                })" />
              <q-btn
                dense
                flat
                round
                color="red"
                icon="delete"
                @click="deleteAssignment(props.row.id)" />
            </div>
          </q-td>
        </q-tr>
      </template>

    </q-table>

    <edit-assignment ref="editAssignmentComponent" @successEdit="reloadTable" />
  </div>
</template>

<script>
  import EditAssignment from '../components/EditAssignment.vue'
  export default {
    components: {
      EditAssignment
    },
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
            name: 'distributor',
            required: true,
            label: 'موزع',
            align: 'left',
            field: row => row.distributorFullName,
            format: val => `${val}`,
            sortable: true
          },
          {
            name: 'donor',
            align: 'left',
            label: 'خیر (ارگان)',
            field: row => row.donorFullName,
            sortable: true
          },
          {
            name: 'dueAt',
            label: 'تاریخ ثبت',
            align: 'left',
            field: row => row.dueAt,
            sortable: true
          },
          {
            name: 'doneAt',
            label: 'تاریخ اتمام',
            align: 'left',
            field: row => row.doneAt
          },
          {
            name: 'scheduleType',
            label: 'نوع ماموریت',
            align: 'left',
            field: row => row.scheduleTypeName
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
        this.$axios.get(`/Schedule?page=${this.pagination.page}&take=${this.pagination.rowsPerPage}`)
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
      formatDate(dateNumber) {
        const date = dateNumber.toString()
        const year = date[0] + date[1] + date[2] + date[3]
        const month = date[4] + date[5]
        const day = date[6] + date[7]
        return year + '/' + month + '/' + day
      },
      sendToEdit(information) {
        this.$refs.editAssignmentComponent.show(information)
      },
      showNotification(notification) {
        this.$q.notify({
          message: notification.msg,
          color: notification.color,
          icon: notification.icon,
          textColor: 'white',
          timeout: 1000
        })
      },
      deleteAssignment(id) {
        this.$axios.delete(`/Schedule/${id}`)
          .then(res => {
            if (res.data.result && res.data.success) {
              this.showNotification({
                msg: 'ماموریت با موفقیت حذف شد.',
                color: 'primary',
                icon: 'thumb_up'
              })
              this.reloadTable()
            } else {
              this.showNotification({
                msg: 'ماموریت حذف نشد.',
                color: 'negative',
                icon: 'error'
              })
            }
          })
          .catch(() => {
            this.showNotification({
              msg: 'مشکل در برقراری ارتباط با سرور',
              color: 'negative',
              icon: 'error'
            })
          })
      }
    }
  }
</script>

<style scoped>

</style>
