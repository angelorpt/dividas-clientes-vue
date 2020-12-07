import Vue from 'vue'

export default {
    namespaced: true,
    state: () => {
        return {
            loading : false,
            saving  : false,
        }
    },

    mutations: {
        setLoading(state, value) {
            state.loading = value
        },
        setSaving(state, value) {
            state.saving = value
        },
    },
    
    actions: {

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
                const response = await Vue.prototype.$axios.post('/dividas', data, config);
                dispatch('Cliente/loadClientes', null, { root: true });
            } catch (error) {
                if (error.response.status == 401) {
                    dispatch('Login/changeToken', null, { root: true });
                }
            }
            commit('setSaving', false);
        },

    }, // actions
    
    getters: {


    } // getters
}