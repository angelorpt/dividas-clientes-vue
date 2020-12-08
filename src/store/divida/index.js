import Vue from 'vue'

export default {
    namespaced: true,
    state: () => {
        return {
            lstDivida : [],
            divida    : {},
            loading   : false,
            saving    : false,
            deleting  : false,
        }
    },

    mutations: {
        setLstDivida(state, lista) {
            state.lstDivida = lista;
        },
        setDivida(state, object) {
            state.divida = object;
        },
        setLoading(state, value) {
            state.loading = value
        },
        setSaving(state, value) {
            state.saving = value
        },
        setDeleting(state, value) {
            state.deleting = value
        },
    },
    
    actions: {

        /**
         * Lista de Dividas
         */
        async loadDividas({ commit, dispatch, rootGetters }, cliente_id) {
            commit('setLoading', true);
            const token  = rootGetters["Login/getToken"];
            const config = { headers: { Authorization: `Bearer ${token}` } };
            try {
                const response = await Vue.prototype.$axios.get(`/clientes/${cliente_id}/dividas`, config);
                commit('setLstDivida', response.data);
            } catch (error) {
                if (error.response.status == 401) {
                    dispatch('Login/changeToken', null, { root: true });
                }
            }
            commit('setLoading', false);
        },

        /**
         * Consulta Dívida by ID
         */
        async loadDivida({ commit, dispatch, rootGetters }, divida_id) {
            commit('setLoading', true);
            const token  = rootGetters["Login/getToken"];
            const config = { headers: { Authorization: `Bearer ${token}` } };
            try {
                const response = await Vue.prototype.$axios.get(`/dividas/${divida_id}`, config);
                commit('setDivida', response.data);
            } catch (error) {
                if (error.response.status == 401) {
                    dispatch('Login/changeToken', null, { root: true });
                }
            }
            commit('setLoading', false);
        },

        /**
         * Salvar Divida
         */
        async salvarDivida({ commit, dispatch, rootGetters }, divida) {
            commit('setSaving', true);
            const token  = rootGetters["Login/getToken"];
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const data   = {
                ...divida,
                cliente_id : divida.cliente.value,
                data       : Vue.prototype.$moment (divida.data, 'DD/MM/YYYY').format('YYYY-MM-DD'),
                valor      : divida.valor.replaceAll(',', '.')
            };
            try {
                if (divida.id != undefined) {
                    const response = await Vue.prototype.$axios.put(`/dividas/${divida.id}`, data, config);
                } else {
                    const response = await Vue.prototype.$axios.post('/dividas', data, config);
                }
                dispatch('Cliente/loadClientes', null, { root: true });
                dispatch('loadDividas', divida.cliente_id);
            } catch (error) {
                if (error.response.status == 401) {
                    dispatch('Login/changeToken', null, { root: true });
                }
            }
            commit('setSaving', false);
        },

        /**
         * Deletar Divida
         */
        async deletarDivida({ commit, dispatch, rootGetters }, divida) {
            commit('setDeleting', true);
            const token  = rootGetters["Login/getToken"];
            const config = { headers: { Authorization: `Bearer ${token}` } };
            try {
                const response = await Vue.prototype.$axios.delete(`/dividas/${divida.id}`,  config);
                dispatch('loadDividas', divida.cliente_id );
                dispatch('Cliente/loadClientes', null, { root: true });
            } catch (error) {
                if (error.response.status == 401) {
                    dispatch('Login/changeToken', null, { root: true });
                }
            }
            commit('setDeleting', false);
        },

    }, // actions
    
    getters: {
        
        listaDividaToTable(state) {
            let listaClone  = [...state.lstDivida];
            let listaSorted = listaClone.sort((a, b) => a.data > b.data ? 1 : (a.data < b.data ? -1 : 0))
            let listaNew    = listaSorted.map(item => {
                return {
                    ...item,
                    data  : Vue.prototype.$moment(item.data).format('DD/MM/YYYY'),
                    valor : Vue.prototype.$currency(parseFloat(item.valor), { symbol: "R$ ", separator: ".", decimal: ",", precision: 2 }).format()
                }
            });

            return listaNew;
        },

        dividaToEdit({divida}) {
             let dividaNew = {
                ...divida,
                cliente : { 
                    label : divida.cliente_nome,
                    value: parseInt(divida.cliente_id)
                },
                data  : Vue.prototype.$moment(divida.data).format('DD/MM/YYYY'),
                valor : Vue.prototype.$currency(parseFloat(divida.valor), { symbol: "", separator: ".", decimal: ",", precision: 2 }).format()
            };

            return dividaNew;
        },

    } // getters
}