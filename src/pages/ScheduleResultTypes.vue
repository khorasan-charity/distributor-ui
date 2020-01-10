<template>
  <div>
    <div class="q-pa-md">
      <q-table
        title="وضعیت ماموریت‌ها"
        :data="scheduleResultTypes"
        :columns="columns"
        row-key="name"
        :rows-per-page-options="[0]"
        :pagination.sync="pagination"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="name" :props="props">
              {{ props.row.label }}
            </q-td>
            <q-td key="operations" :props="props">
              <div>
                <q-btn
                  dense
                  flat
                  round
                  color="blue"
                  icon="edit"
                  @click="sendToEdit({id: props.row.value, name: props.row.label})"
                />
                <q-btn
                  dense
                  flat
                  round
                  color="red"
                  icon="delete"
                  @click="remove(props.row.value)"
                />
              </div>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>

    <q-btn
      @click="$refs.addScheduleResultTypeComponent.show()"
      round
      icon="add"
      class="fixed-bottom-right q-mr-md q-mb-md"
      color="primary"
    />

    <add-schedule-result-types ref="addScheduleResultTypeComponent" />
    <edit-schedule-result-type ref="editScheduleResultTypeComponent" />

  </div>
</template>

<script>
import AddScheduleResultTypes from '../components/AddScheduleResultType.vue'
import EditScheduleResultType from '../components/EditScheduleResultType.vue'
import { mapGetters, mapActions } from 'vuex'
import Notification from '../services/Notification'
export default {
  components: {
    AddScheduleResultTypes,
    EditScheduleResultType
  },
  data() {
    return {
      pagination: {
        rowsPerPage: 0,
        page: 1,
      },
      columns: [
        {
          name: 'name',
          required: true,
          label: 'عنوان',
          align: 'center',
          field: row => row.label,
        },
        {
          name: 'operations',
          label: 'عملیات',
          align: 'center'
        }
      ]
    }
  },
  methods: {
    ...mapActions('scheduleResultTypes', ['deleteScheduleResultType', 'reloadScheduleResultTypes']),
    sendToEdit(scheduleResultTypeInformation) {
      this.$refs.editScheduleResultTypeComponent.show(scheduleResultTypeInformation)
    },
    remove(scheduleResultTypeId) {
      this.$q.dialog({
          title: 'هشدار',
          message: 'آیا از حذف وضعیت ماموریت اطمینان دارید؟',
          cancel: true,
          persistent: true
        }).onOk(() => {
          this.deleteScheduleResultType(scheduleResultTypeId)
            .then(res => {
              if (res.data.result && res.data.success) {
                const notification = new Notification({
                  message: 'وضعیت ماموریت با موفقیت حذف شد.',
                  color: 'primary',
                  icon: 'thumb_up',
                  textColor: 'white',
                  timeout: 1000
                })
                this.reloadScheduleResultTypes()
                notification.show()
              } else {
                const notification = new Notification({
                  message: 'وضعیت ماموریت حذف نشد.',
                  color: 'negative',
                  icon: 'error',
                  textColor: 'white',
                  timeout: 1000
                });
                notification.show();
              }
            })
            .catch(err => {
              const notification = new Notification({
                message: 'عدم اتصال به سرور',
                color: 'negative',
                icon: 'error',
                textColor: 'white',
                timeout: 1000
              });
              notification.show();
            })
        });
    }
  },
  computed: {
    ...mapGetters('scheduleResultTypes', ['scheduleResultTypes'])
  }
}
</script>

<style scoped>

</style>
