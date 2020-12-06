import Vue from 'vue'

export default {
    namespaced: true,
    state: () => {
        return {
            lstCliente  : [],
            loading     : false,
            deleting    : false,
            integrating : false,
        }
    },
    mutations: {
        setLstCliente(state, lista) {
            state.lstCliente = lista;
        },
        setLoading(state, value) {
            state.loading = value
        },
        setDeleting(state, value) {
            state.deleting = value
        },
        setIntegrating(state, value) {
            state.integrating = value
        },
    },
    
    actions: {

        /**
         * Lista de Clientes
         */
        async loadClientes({ commit, dispatch, rootGetters }) {
            commit('setLoading', true);
            const token  = rootGetters["Login/getToken"];
            const config = { headers: { Authorization: `Bearer ${token}` } };
            try {
                const response = await Vue.prototype.$axios.get('/clientes', config);
                commit('setLstCliente', response.data);
            } catch (error) {
                if (error.response.status == 401) {
                    dispatch('Login/changeToken', null, { root: true });
                }
            }
            commit('setLoading', false);
        },

        /**
         * Integrar Clientes
         */
        async integrarClientes({ commit, dispatch, rootGetters }) {
            commit('setIntegrating', true);
            const token  = rootGetters["Login/getToken"];
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const data   = { };
            try {
                const response = await Vue.prototype.$axios.put('/integracao/clientes', data, config);
                dispatch('loadClientes');
            } catch (error) {
                if (error.response.status == 401) {
                    dispatch('Login/changeToken', null, { root: true });
                }
            }
            commit('setIntegrating', false);
        },

    }, // actions
    
    getters: {
        
        
    } // getters
}