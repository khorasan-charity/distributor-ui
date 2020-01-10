<template>
  <q-dialog ref="editScheduleResultTypeDialog">
    <q-card style="min-width: 350px">
      <q-card-section class="row">
          <div class="text-h6">ویرایش وضعیت ماموریت</div>
          <q-space />
          <q-btn flat round icon="close" v-close-popup />
        </q-card-section>

      <q-card-section>
        <q-input
          label="نام"
          ref="scheduleResultTypeName"
          outlined
          v-model="scheduleResultTypeToEdit.name"
          :rules="[value => value.trim().length > 0 || 'پر کردن این قسمت اجباری است']"
          @keyup.enter="edit"
        />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="ایجاد" @click="edit" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapActions } from 'vuex'
import Notification from '../services/Notification'
export default {
  data() {
    return {
      scheduleResultTypeToEdit: {
        name: '',
        id: 0
      }
    }
  },
  methods: {
    ...mapActions('scheduleResultTypes', ['editScheduleResultType', 'reloadScheduleResultTypes']),
    edit() {
      if (this.isScheduleResultTypeNameValid()) {
        this.editScheduleResultType(this.scheduleResultTypeToEdit)
          .then(res => {
            if (res.data.result && res.data.success) {
              const notification = new Notification({
                message: 'وضعیت ماموریت با موفقیت ویرایش شد.',
                color: 'primary',
                icon: 'thumb_up',
                textColor: 'white',
                timeout: 1000
              })
              notification.show()
              this.reloadScheduleResultTypes()
              this.hide()
            } else {
              const notification = new Notification({
                message: 'وضعیت ماموریت ویرایش نشد.',
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
              message: 'عدم برقراری ارتباط با سرور.',
              color: 'negative',
              icon: 'error',
              textColor: 'white',
              timeout: 1000
            });
            notification.show();
          })
      }
    },
    show(scheduleResultTypeInformation) {
      this.scheduleResultTypeToEdit = scheduleResultTypeInformation
      this.$refs.editScheduleResultTypeDialog.show()
    },
    hide() {
      this.$refs.editScheduleResultTypeDialog.hide()
    },
    isScheduleResultTypeNameValid() {
      this.$refs.scheduleResultTypeName.validate()
      return !this.$refs.scheduleResultTypeName.hasError
    }
  }
}
</script>

<style scoped>

</style>
