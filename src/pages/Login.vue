<template>
  <div class="container">
    <img style="width: 450px; height: 300px" src="../assets/images/Logo.jpg" >
    <form
      style="display: flex; flex-direction: column; align-items: center"
      @submit.prevent="login"
    >
      <q-input
        style="width: 400px; margin-bottom: 5px"
        v-model="username"
        outlined
        label="نام کاربری"
      >
        <template v-slot:append>
          <q-btn disable color="grey-9" flat icon="account_circle" />
        </template>
      </q-input>
      <q-input
        :type="showPassword ? '' : 'password'"
        style="width: 400px; margin-top: 5px;"
        @blur="showPassword = false"
        v-model="password"
        outlined
        label="رمز عبور"
      >
        <template v-slot:append>
          <q-btn
            color="grey-7"
            @click="showPassword = !showPassword"
            flat
            icon="remove_red_eye"
          />
        </template>
      </q-input>
      <q-btn
        type="submit"
        style="margin-top: 20px; width: 100px;"
        color="primary"
        label="ورود"
      />
      <q-btn
        style="margin-top: 20px; width: 100px;"
        color="primary"
        label="خروج"
        @click="logout"
      />
    </form>
  </div>
</template>

<script>
  import AuthService from '../services/AuthService'
  const auth = new AuthService()
  export default {
    components: {
    },
    data() {
      return {
        username: '',
        password: '',
        showPassword: false,
      }
    },
    methods: {
      login() {
        auth.login()
      },
      logout() {
        auth.logout()
        localStorage.removeItem('access_token')
      }
    },
  }
</script>

<style scoped>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 80vh;
  }
</style>
