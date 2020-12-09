
const router_guard = ({ router, store }) => {

  router.beforeEach((to, from, next) => {

    // console.log('store.getters', store.getters['Login/getLogado'])
    // console.log('Store', store.getters['Login/getToken']);
    // let logado = ls.get('logado') == 'true';
    // let logado = localStorage.getItem("logado");

    const logado = (store.getters['Login/getLogado'] == true && store.getters['Login/getToken'] != null);
    
    if (from.path == to.path && from.path == '/') {
      if (!logado) {
        next('/login');
        return;
      }
    }
    
    if (to.meta.requiresAuth == true) {
      if (!logado) {
        next('/login')
      } else {
        next()
      }
    } else {
      next()
    }

  });

}

export default router_guard;