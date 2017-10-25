const state = {
    shipping_details: {
        address_1: '',
        address_2: '',
        city: '',
        country: '',
        zip_code: '',
        state_province: ''
    },
    customer_details: {
        first_name: '',
        last_name: '',
        email: '',
        contact_no: ''
    },
    couriers: [],
    courier: null,
    gateways: [],
    mop: null

}

const getters = {
    getShippingDetails: state => state.shipping_details,
    getCustomerDetails: state => state.customer_details,
    getModeOfPayment: state => state.mop,
    getDeliveryMethod: state => state.courier,
    getCouriers: state => state.couriers,
    getGateways: state => state.gateways
}

const actions = {
    async checkout ({ dispatch }, form) {
        form.busy = true
        try {
            const payload = await App.post(route('api.order.create'), form)
            form.busy = false
            dispatch('resetCheckout')
            vm.$router.push({name: 'thankyou'})
            vm.$popup({ message: payload.message, backgroundColor: '#4db6ac', delay: 5, color: '#fffffa' })
        } catch ({errors, message}) {
            form.errors.set(errors)
            form.busy = false
            vm.$popup({ message: message, backgroundColor: '#e57373', delay: 5, color: '#fffffa' })
        }
    },
    async fetchCouriers ({ commit }) {
        await axios.get('/couriers').then((response) => {
            commit('setCouriers', response.data)
        })
    },
    async fetchGateways ({ commit }) {
        await axios.get('/gateways').then((response) => {
            commit('setGateways', response.data)
        })
    },
    resetCheckout ({commit}) {
        commit('setShippingDetails', {
            address_1: '',
            address_2: '',
            city: '',
            country: '',
            zip_code: '',
            state_province: ''
        })
        commit('setCustomerDetails', {
            first_name: '',
            last_name: '',
            email: '',
            contact_no: ''
        })
        commit('setDeliveryMethod', null)
        commit('setModeOfPayment', null)
    }

}

const mutations = {
    setShippingDetails: (state, payload) => {
        state.shipping_details = payload
    },
    setCustomerDetails: (state, payload) => {
        state.customer_details = payload
    },
    setModeOfPayment: (state, payload) => {
        state.mop = payload
    },
    setDeliveryMethod: (state, payload) => {
        state.courier = payload
    },
    newForm: (state) => {
        state.form = new AppForm(state.form)
    },
    setForm: (state) => {
        state.form.cart = state.cart
        state.form.shipping_details = state.shipping_details
        state.form.customer_details = state.customer_details
        state.form.courier = state.courier
    },
    setCouriers: (state, payload) => {
        state.couriers = payload
    },
    setGateways: (state, payload) => {
        state.gateways = payload
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
