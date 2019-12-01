<template>
  <q-dialog ref="dialog">
    <q-card style="width: 60%;">

      <q-card-section class="row">
        <div class="text-h6">موزع جدید</div>
        <q-space />
        <q-btn flat round icon="close" v-close-popup />
      </q-card-section>

      <q-card-section>
        <div class="row">
          <q-input
            ref="firstName"
            :rules="[val => !!val]"
            class="col-6 q-pr-sm q-pb-sm"
            outlined
            v-model="distributorToAdd.firstName"
            label="نام" />
          <q-input
            ref="lastName"
            :rules="[val => !!val]"
            class="col-6 q-pl-sm q-pb-sm"
            outlined
            v-model="distributorToAdd.lastName"
            label="نام خانوادگی" />
        </div>
        <div class="row">
          <q-input
            ref="mobileNumber"
            :rules="[val => !!val]"
            class="col-6 q-pr-sm q-pb-sm"
            outlined
            v-model="distributorToAdd.mobileNumber"
            label="تلفن همراه" />
          <q-input
            autogrow
            type="number"
            ref="nationalId"
            :rules="[val => val.length === 10]"
            class="col-6 q-pl-sm q-pb-sm"
            outlined
            v-model="distributorToAdd.nationalId"
            label="کد ملی" />
        </div>
        <div class="row">
          <q-input
            type="password"
            ref="password"
            :rules="[val => !!val]"
            class="col-6 q-pr-sm q-pb-sm"
            outlined
            v-model="distributorToAdd.password"
            label="رمز عبور" />
          <q-input
            type="password"
            ref="repeatedPassword"
            :rules="[val => !!val && val === distributorToAdd.password]"
            class="col-6 q-pl-sm q-pb-sm"
            outlined
            v-model="distributorToAdd.repeatedPassword"
            label="تکرار رمز عبور" />
        </div>
        <q-input
          autogrow
          outlined
          v-model="distributorToAdd.description"
          label="توضیحات" />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          @click="addDistributor"
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
    props: {
      value: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        addDistributorResult: '',
        distributorToAdd: {
          firstName: '',
          lastName: '',
          nationalId: '',
          mobileNumber: '',
          password: '',
          repeatedPassword: '',
          avatarUrl: '',
          description: ''
        }
      }
    },
    methods: {
      addDistributor: function () {
        if (this.isAddFormValid()) {
          this.$axios.post('Distributor', this.distributorToAdd)
              .then(() => {
                this.addDistributorResult = 'موزع با موفقیت ایجاد شد.';
                this.showNotification(this.addDistributorResult, 'primary', 'thumb_up');
                this.hide();
                this.resetToDefaults();
                this.$emit('successAdd');
              })
              .catch(() => {
                this.addDistributorResult = 'مشکلی پیش آمده است.';
                this.showNotification(this.addDistributorResult, 'negative', 'error');
              })
        } else {
          this.addDistributorResult = 'ورودی‌ها به دقت بررسی شوند.';
          this.showNotification(this.addDistributorResult, 'negative', 'error');
        }
      },
      isAddFormValid() {
        this.$refs.firstName.validate()
        this.$refs.lastName.validate()
        this.$refs.mobileNumber.validate()
        this.$refs.nationalId.validate()
        this.$refs.password.validate()
        this.$refs.repeatedPassword.validate()
        return !(this.$refs.repeatedPassword.hasError || this.$refs.firstName.hasError ||
            this.$refs.lastName.hasError || this.$refs.nationalId.hasError ||
            this.$refs.password.hasError || this.$refs.mobileNumber.hasError);
        // TODO: is repeated === pass
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
      show() {
        this.$refs.dialog.show();
      },
      hide() {
        this.$refs.dialog.hide();
      },
      resetToDefaults() {
        this.distributorToAdd.firstName = ''
        this.distributorToAdd.lastName = ''
        this.distributorToAdd.mobileNumber = ''
        this.distributorToAdd.password = ''
        this.distributorToAdd.repeatedPassword = ''
        this.distributorToAdd.avatarUrl = ''
        this.distributorToAdd.description = ''
        this.distributorToAdd.nationalId = ''
        this.addDistributorResult = ''
      }
    }
  }
</script>

<style scoped>
</style>
