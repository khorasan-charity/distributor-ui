<template>

  <q-dialog ref="editDialog">
    <q-card style="width: 60%;">

      <q-card-section class="row">
        <div class="text-h6">ویرایش خیر</div>
        <q-space />
        <q-btn flat round icon="close" v-close-popup />
      </q-card-section>

      <q-card-section>
        <div class="row">
          <q-input
            ref="fullName"
            v-model="donorToEdit.fullName"
            class="col-6 q-pr-sm"
            outlined
            label="نام کامل"
            :rules="[ val => !!val ]"
          />
          <q-input
            ref="address"
            v-model="donorToEdit.address"
            class="col-6 q-pl-sm"
            outlined
            label="آدرس"
            :rules="[ val => !!val ]"
          />
        </div>
        <div class="row">
          <q-input
            outlined
            ref="phoneNumber"
            v-model="donorToEdit.phoneNumber"
            class="col-6 q-pr-sm"
            label="تلفن ثابت"
            :rules="[ val => !!val && val.length === 11 || '']"
          />
          <q-input
            ref="mobileNumber"
            v-model="donorToEdit.mobileNumber"
            class="col-6 q-pl-sm"
            outlined
            label="تلفن همراه"
            :rules="[ val => !!val && val.length === 11 || '']"
          />
        </div>
        <q-input
          v-model="donorToEdit.description"
          class="col-12"
          outlined
          label="توضیحات"
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          @click="editDonor"
          label="ویرایش"
          type="submit"
          color="primary"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>

</template>

<script>
  export default {
    data() {
      return {
        donorToEdit: {
          id: '',
          fullName: '',
          address: '',
          phoneNumber: '',
          mobileNumber: '',
          geoLocation: '',
          description: ''
        }
      }
    },
    methods: {
      show(information) {
        this.donorToEdit = information
        this.$refs.editDialog.show()
      },
      hide() {
        this.$refs.editDialog.hide()
      },
      goBack() {
        this.$router.push('/donors')
      },
      editDonor() {
        if (this.isFormValid()) {
          this.$axios.put('/Donor', this.donorToEdit)
              .then(() => {
                const msg = 'خیر با موفقیت ویرایش شد'
                const color = 'primary'
                const icon = 'thumb_up'
                this.showNotification(msg, color, icon)
                this.hide()
                this.resetToDefaults()
                this.$emit('successEdit')
              })
              .catch(() => {
                const msg = 'خطا در برقراری ارتباط با سرور'
                const color = 'negative'
                const icon = 'error'
                this.showNotification(msg, color, icon)
              })
        } else {
          const msg = 'ورودی‌ها به دقت بررسی شوند'
          const color = 'negative'
          const icon = 'error'
          this.showNotification(msg, color, icon)
        }
      },
      isFormValid() {
        this.$refs.fullName.validate()
        this.$refs.address.validate()
        this.$refs.phoneNumber.validate()
        this.$refs.mobileNumber.validate()
        return !(this.$refs.fullName.hasError || this.$refs.address.hasError ||
            this.$refs.phoneNumber.hasError || this.$refs.mobileNumber.hasError)
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
      resetToDefaults() {
        this.donorToEdit = {
          id: '',
          fullName: '',
          address: '',
          phoneNumber: '',
          mobileNumber: '',
          geoLocation: '',
          description: ''
        }
      }
    }
  }
</script>

<style></style>
