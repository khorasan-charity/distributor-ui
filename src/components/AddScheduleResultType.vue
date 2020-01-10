<template>
  <q-dialog ref="scheduleResultTypeDialog">
    <q-card style="min-width: 350px">
      <q-card-section class="row">
          <div class="text-h6">ایجاد وضعیت ماموریت</div>
          <q-space />
          <q-btn @click="reset" flat round icon="close" v-close-popup />
        </q-card-section>

      <q-card-section>
        <q-input
          label="نام"
          ref="schedulResultTypeName"
          outlined
          v-model="scheduleResultTypeToAdd.name"
          :rules="[value => value.trim().length > 0 || 'پر کردن این قسمت اجباری است']"
          @keyup.enter="add"
        />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="ایجاد" @click="add" />
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
      scheduleResultTypeToAdd: {
        name: ''
      }
    }
  },
  methods: {
    ...mapActions('scheduleResultTypes', ['addScheduleResultType', 'reloadScheduleResultTypes']),
    show() {
      this.$refs.scheduleResultTypeDialog.show()
    },
    hide() {
      this.$refs.scheduleResultTypeDialog.hide()
    },
    reset() {
      this.scheduleResultTypeToAdd = {
        name: ''
      }
    },
    add() {
      if (this.isScheduleResultTypeNameValid()) {
        this.addScheduleResultType(this.scheduleResultTypeToAdd)
          .then(res => {
            if (res.data.result && res.data.success) {
              const notification = new Notification({
                message: 'با موفقیت ایجاد شد.',
                color: 'primary',
                icon: 'thumb_up',
                textColor: 'white',
                timeout: 1000
              })
              notification.show()
              this.reset()
              this.hide()
              this.reloadScheduleResultTypes()
            } else {
              const notification = new Notification({
                message: 'خطا در عملیات',
                color: 'negative',
                icon: 'error',
                textColor: 'white',
                timeout: 1000
              })
              notification.show()
            }
          })
          .catch(err => {
            const notification = new Notification({
              message: 'عدم برقراری ارتباط با سرور',
              color: 'negative',
              icon: 'error',
              textColor: 'white',
              timeout: 1000
            })
            notification.show()
          })
      }
    },
    isScheduleResultTypeNameValid() {
      this.$refs.schedulResultTypeName.validate()
      return !this.$refs.schedulResultTypeName.hasError
    }
  }
}
</script>

<style scoped>

</style>
