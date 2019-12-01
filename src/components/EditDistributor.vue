<template>
  <q-dialog ref="editDialog">
    <q-card style="width: 60%;">

      <q-card-section class="row">
        <div v-if="isPasswordEditing" class="text-h6">تغییر رمز عبور</div>
        <div v-else class="text-h6">ویرایش موزع</div>
        <q-space />
        <q-btn flat round icon="close" v-close-popup />
      </q-card-section>

      <q-card-section v-if="isPasswordEditing">
        <div class="row">
          <q-input
            ref="password"
            :rules="[val => !!val]"
            class="col-6 q-pr-sm q-pb-sm"
            outlined
            v-model="distributorToEdit.password"
            label="رمز عبور" />
          <q-input
            ref="repeatedPassword"
            :rules="[val => !!val]"
            class="col-6 q-pl-sm q-pb-sm"
            outlined
            v-model="distributorToEdit.repeatedPassword"
            label="تکرار رمز عبور" />
        </div>
      </q-card-section>

      <q-card-section v-else>
        <div class="row">
          <q-input
            ref="firstName"
            :rules="[val => !!val]"
            class="col-6 q-pr-sm q-pb-sm"
            outlined
            v-model="distributorToEdit.firstName"
            label="نام" />
          <q-input
            ref="lastName"
            :rules="[val => !!val]"
            class="col-6 q-pl-sm q-pb-sm"
            outlined
            v-model="distributorToEdit.lastName"
            label="نام خانوادگی" />
        </div>
        <div class="row">
          <q-input
            ref="mobileNumber"
            :rules="[val => !!val]"
            class="col-6 q-pr-sm q-pb-sm"
            outlined
            v-model="distributorToEdit.mobileNumber"
            label="تلفن همراه" />
          <q-input
            autogrow
            type="number"
            ref="nationalId"
            :rules="[val => val.length === 10]"
            class="col-6 q-pl-sm q-pb-sm"
            outlined
            v-model="distributorToEdit.nationalId"
            label="کد ملی" />
        </div>
        <q-input
          autogrow
          outlined
          v-model="distributorToEdit.description"
          label="توضیحات" />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          v-if="isPasswordEditing"
          @click="editDistributor"
          flat
          label="تغییر"
          color="primary"
        />
        <q-btn
          v-else
          @click="editDistributor"
          flat
          label="ویرایش"
          color="primary"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
  export default {
    props: ['isPasswordEditing'],
    data() {
      return {
        editDistributorResult: '',
        distributorToEdit: {
          id: '',
          firstName: '',
          lastName: '',
          mobileNumber: '',
          password: '',
          repeatedPassword: '',
          nationalId: '',
          avatarUrl: '',
          description: ''
        }
      }
    },
    methods: {
      show(information) {
        if (!this.isPasswordEditing) {
          this.distributorToEdit.id = information.id
          this.distributorToEdit.firstName = information.firstName
          this.distributorToEdit.lastName = information.lastName
          this.distributorToEdit.mobileNumber = information.mobileNumber
          this.distributorToEdit.nationalId = information.nationalId
          this.distributorToEdit.avatarUrl = information.avatarUrl
          this.distributorToEdit.description = information.description
        }
        this.$refs.editDialog.show()
      },
      hide() {
        this.$refs.editDialog.hide()
      },
      editDistributor() {
        if (this.isAddFormValid()) {
          this.$axios.put('Distributor', this.distributorToEdit)
              .then(() => {
                this.editDistributorResult = 'موزع با موفقیت ویرایش شد.'
                this.showNotification(this.editDistributorResult, 'primary', 'thumb_up')
                this.hide()
                this.resetToDefaults()
                this.$emit('successEdit')
              })
              .catch(() => {
                this.editDistributorResult = 'مشکلی پیش آمده است.'
                this.showNotification(this.editDistributorResult, 'negative', 'error')
              })
        } else {
          this.editDistributorResult = 'ورودی‌ها به دقت بررسی شوند.'
          this.showNotification(this.editDistributorResult, 'negative', 'error')
        }
      },
      isAddFormValid() {
        this.$refs.firstName.validate()
        this.$refs.lastName.validate()
        this.$refs.mobileNumber.validate()
        this.$refs.nationalId.validate()
        return !(this.$refs.firstName.hasError || this.$refs.lastName.hasError ||
            this.$refs.nationalId.hasError || this.$refs.mobileNumber.hasError)
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
        this.distributorToEdit.id = ''
        this.distributorToEdit.firstName = ''
        this.distributorToEdit.lastName = ''
        this.distributorToEdit.mobileNumber = ''
        this.distributorToEdit.avatarUrl = ''
        this.distributorToEdit.description = ''
        this.distributorToEdit.nationalId = ''
        this.editDistributorResult = ''
      }
    }
  }
</script>
