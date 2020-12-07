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

        listaClientesToTable(state) {
            let listaClone = [...state.lstCliente];
            let listaNew   = listaClone.map(item => {
                return {
                    ...item,
                    total: parseFloat(item.total)
                }
            });
            let listaSorted = listaNew.sort((a, b) => a.total < b.total ? 1 : (a.total > b.total ? -1 : 0))
            let lista = listaSorted.map(item => {
                return {
                    ...item,
                    total: Vue.prototype.$currency(item.total, { symbol: "R$ ", separator: ".", decimal: "," }).format()
                }
            })
            
            return lista;
        },

        listaClientesToSelect(state) {
            let listaClone  = [...state.lstCliente];
            let listaSorted = listaClone.sort((a, b,) => a.name > b.name ? 1 : (a.name < b.name ? -1 : 0))
            let listaNew    = listaSorted.map(item => {
                return {
                    label : item.name,
                    value : item.id,
                }
            });
            return listaNew;
        }

    } // getters
}