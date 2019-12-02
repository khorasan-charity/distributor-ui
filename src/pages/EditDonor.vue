<template>
  <div class="q-pa-md">

    <h5>ویرایش خیر</h5>

    <q-form class="row">
      <q-input
        ref="fullName"
        v-model="donorToEdit.fullName"
        class="col-3 q-pr-sm"
        outlined
        label="نام کامل"
        :rules="[ val => !!val ]"
      />
      <q-input
        ref="address"
        v-model="donorToEdit.address"
        class="col-3 q-pr-sm"
        outlined
        label="آدرس"
        :rules="[ val => !!val ]"
      />
      <q-input
        outlined
        ref="phoneNumber"
        v-model="donorToEdit.phoneNumber"
        class="col-3 q-pr-sm"
        label="تلفن ثابت"
        :rules="[ val => !!val && val.length === 11 || '']"
      />
      <q-input
        ref="mobileNumber"
        v-model="donorToEdit.mobileNumber"
        class="col-3"
        outlined
        label="تلفن همراه"
        :rules="[ val => !!val && val.length === 11 || '']"
      />
      <q-input
        v-model="donorToEdit.description"
        class="col-12"
        outlined
        label="توضیحات"
      />

      <div class="q-mt-lg">
        <q-btn
          @click="editDonor"
          label="ویرایش"
          type="submit"
          color="primary"/>
        <q-btn
          @click="goBack"
          label="بازگشت"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm" />
      </div>
    </q-form>

  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
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
          avatarUrl: '',
          description: ''
        }
      }
    },
    mounted() {
      const id = this.$route.query.id
      this.$axios.get(`/Donor/${id}`)
          .then(res => {
            this.donorToEdit.id = res.data.result.id
            this.donorToEdit.fullName = res.data.result.fullName
            this.donorToEdit.address = res.data.result.address
            this.donorToEdit.phoneNumber = res.data.result.phoneNumber
            this.donorToEdit.mobileNumber = res.data.result.mobileNumber
            this.donorToEdit.geoLocation = res.data.result.geoLocation
            this.donorToEdit.avatarUrl = res.data.result.avatarUrl
            this.donorToEdit.description = res.data.result.description
          })
          .catch(err => {
            console.log(err.message)
          })
    },
    methods: {
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
                this.$router.push('/donors')
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
      }
    }
  }
</script>

<style></style>
