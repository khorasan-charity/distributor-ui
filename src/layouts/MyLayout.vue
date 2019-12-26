<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-btn
          v-if="$route.fullPath !== '/login'"
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />

        <q-toolbar-title class="text-center heading">
          <div class="q-pr-xl">
            حمایت از کودکان مبتلا به سرطان خراسان رضوی
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-if="$route.fullPath !== '/login'"
      :width=150
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-2"
    >
      <q-list>
        <q-item-label header>نوار ابزار</q-item-label>
        <q-item exact clickable to="/">
          <q-item-section>
            <q-item-label>صفحه اصلی</q-item-label>
          </q-item-section>
        </q-item>
        <q-item exact clickable to="/distributors">
          <q-item-section>
            <q-item-label>موزعین</q-item-label>
          </q-item-section>
        </q-item>
        <q-item exact clickable to="/donors">
          <q-item-section>
            <q-item-label>خیرین</q-item-label>
          </q-item-section>
        </q-item>
        <q-item exact clickable to="/assignments">
          <q-item-section>
            <q-item-label>ماموریت‌ها</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MyLayout',

  data () {
    return {
      leftDrawerOpen: false
    }
  },
  methods: {
  }
}
</script>

<style scoped>

  @media screen and (max-width: 500px) {
    .heading {
      font-size: 13px;
    }
  }
</style>
