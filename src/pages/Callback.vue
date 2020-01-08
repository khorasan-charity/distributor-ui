<template>
  <div>
    This is callback
  </div>
</template>

<script>
  import AuthService from '../services/AuthService';
  import { mapActions } from 'vuex'; // will be removed
  export default {
    data() {
      return {}
    },
    methods: {
      ...mapActions('user', ['logInUser']) // will be removed
    },
    mounted() {
      const mgr = new AuthService()
      mgr.signinRedirectCallback()
        .then(user => {
          if (user !== null) {
            localStorage.setItem('access_token', user.access_token)
            this.logInUser()
            window.location.href = '/'
          } else {
            console.log('no user loggedin')
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
</script>

<style scoped>

</style>
