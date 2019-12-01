<template>
  <q-dialog ref="dialog">
    <q-card style="width: 60%;">

      <q-card-section class="row">
        <div class="text-h6">خیر جدید</div>
        <q-space />
        <q-btn flat round icon="close" v-close-popup />
      </q-card-section>

      <q-card-section>
        <div class="row">
          <q-input
            ref="fullName"
            :rules="[val => !!val]"
            class="col-6 q-pr-sm q-pb-sm"
            outlined
            v-model="donorToAdd.fullName"
            label="نام کامل" />
          <q-input
            ref="address"
            :rules="[val => !!val]"
            class="col-6 q-pl-sm q-pb-sm"
            outlined
            v-model="donorToAdd.address"
            label="آدرس" />
        </div>
        <div class="row">
          <q-input
            ref="phoneNumber"
            :rules="[val => !!val]"
            class="col-6 q-pr-sm q-pb-sm"
            outlined
            v-model="donorToAdd.phoneNumber"
            label="تلفن ثابت" />
          <q-input
            ref="mobileNumber"
            :rules="[val => !!val]"
            class="col-6 q-pl-sm q-pb-sm"
            outlined
            v-model="donorToAdd.mobileNumber"
            label="تلفن همراه" />
        </div>
        <div class="row">
          <q-input
            ref="geoLocation"
            class="col-6 q-pr-sm q-pb-sm"
            outlined
            v-model="donorToAdd.geoLocation"
            label="مکان روی نقشه" />
          <q-input
            class="col-6 q-pl-sm q-pb-sm"
            outlined
            v-model="donorToAdd.description"
            label="توضیحات" />
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          @click="addDonor"
          flat
          label="اضافه کردن"
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
        addDonorResult: '',
        donorToAdd: {
          fullName: '',
          address: '',
          phoneNumber: '',
          mobileNumber: '',
          geoLocation: '',
          avatarUrl: '',
          description: ''
        }
      }
    },
    methods: {
      addDonor() {
        if (this.isFormValid()) {
          this.$axios.post('Donor', this.donorToAdd)
              .then((res) => {
                console.log(res.data)
                this.addDonorResult = 'خیر با موفقیت ایجاد شد.';
                this.showNotification(this.addDonorResult, 'primary', 'thumb_up');
                this.hide();
                this.resetToDefaults();
                this.$emit('successAdd');
              })
              .catch(() => {
                this.addDonorResult = 'مشکلی پیش آمده است.';
                this.showNotification(this.addDonorResult, 'negative', 'error');
              })
        } else {
          this.addDonorResult = 'ورودی‌ها به دقت بررسی شوند.';
          this.showNotification(this.addDonorResult, 'negative', 'error');
        }
      },
      show() {
        this.$refs.dialog.show()
      },
      hide() {
        this.$refs.dialog.hide()
      },
      resetToDefaults() {
        this.donorToAdd.fullName = ''
        this.donorToAdd.address = ''
        this.donorToAdd.phoneNumber = ''
        this.donorToAdd.mobileNumber = ''
        this.donorToAdd.geoLocation = ''
        this.donorToAdd.avatarUrl = ''
        this.donorToAdd.description = ''
        this.addDonorResult = ''
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
      isFormValid() {
        this.$refs.fullName.validate()
        this.$refs.address.validate()
        this.$refs.phoneNumber.validate()
        this.$refs.mobileNumber.validate()
        return !(this.$refs.fullName.hasError || this.$refs.address.hasError || this.$refs.phoneNumber.hasError ||
            this.$refs.mobileNumber.hasError)
      }
    }
  }
</script>

<style>

</style>
