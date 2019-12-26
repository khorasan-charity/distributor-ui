<template>
  <div>
    <form class="container" @submit.prevent="login">
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
        style="margin-top: 10px; width: 100px;"
        color="primary"
        label="ورود"
      />
    </form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        username: '',
        password: '',
        showPassword: false
      }
    },
    methods: {
      login() {
        console.log('User log in') // TODO: will be changed
      }
    }
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
