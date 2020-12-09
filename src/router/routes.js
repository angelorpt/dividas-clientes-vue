const MainLayout   = () => import('layouts/MainLayout.vue')
const LayoutLogin  = () => import('layouts/LayoutLogin.vue')
const ClienteIndex = () => import('pages/Cliente/Index.vue')
const DividasIndex = () => import('pages/Dividas/Index.vue')

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/login',
    component: LayoutLogin,
    children: [
      { path: '/login', component: () => import('pages/Login/Login.vue') }
    ]
  },
  {
    path: '/clientes',
    component: MainLayout,
    children: [
      { path: '/'        , component: ClienteIndex },
      { path: '/clientes', component: ClienteIndex }
    ]
  },
  {
    path: '/dividas',
    component: MainLayout,
    children: [
      { path: '/dividas', component: DividasIndex }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
