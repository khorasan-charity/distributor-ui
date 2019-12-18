
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Index.vue')
      },
      {
        path: '/distributors',
        component: () => import('pages/Distributors.vue')
      },
      {
        path: '/donors',
        component: () => import('pages/Donors.vue')
      },
      {
        path: '/assignments',
        component: () => import('pages/Assignments.vue')
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
