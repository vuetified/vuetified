const state = {
    steps: [
        {title: 'Customer Details', subtitle: 'Fill Up Customer Info', component: 'customer-details', active: true, validated: true},
        {title: 'Delivery Method', subtitle: 'Choose Courier', component: 'delivery-method', active: true, validated: true},
        {title: 'Shipment Details', subtitle: 'Fill Up Shipping Details', component: 'shipping-details', active: false, validated: true},
        {title: 'Mode of Payment', subtitle: 'Select Payment Options', component: 'mode-of-payment', active: true, validated: true},
        {title: 'Purchase', subtitle: 'Create Order', component: 'order-details', active: true, validated: true}
    ],
    current: {title: 'Customer Details', subtitle: 'Fill Up Customer Info', component: 'customer-details', active: true, validated: true},
    step: 1,
    previous: null,
    next: 2
}

const getters = {
    getSteps: state => state.steps,
    getActiveSteps: state => _.filter(state.steps, _.iteratee(['active', true])),
    getCurrent: state => state.current,
    getIndex: (state) => {
        return _.findIndex(state.steps, (step) => { return step.component === state.current.component })
    },
    getStep: state => state.step,
    getPrevious: state => state.previous,
    getNext: state => state.next
}

const actions = {
    /* payload = checkout form */
    async checkout ({ dispatch }, form) {
        form.busy = true
        try {
            const payload = await App.post(route('api.order.add'), form)
            form.busy = false
            dispatch('resetWizard')
            vm.$popup({ message: payload.message, backgroundColor: '#4db6ac', delay: 5, color: '#fffffa' })
        } catch ({errors, message}) {
            form.errors.set(errors)
            form.busy = false
            vm.$popup({ message: message, backgroundColor: '#e57373', delay: 5, color: '#fffffa' })
        }
    },
    /* payload = step */
    move ({ state, commit }, payload) {
        // Moving Forward
        if (state.current.validated) {
            commit('setStep', payload)
            let next = payload + 1
            commit('setNext', next)
            let previous = payload - 1
            commit('setPrevious', previous)
            let current = null
            if (state.previous > 0) {
                current = state.steps[state.previous]
            } else {
                current = state.steps[0]
            }
            commit('setCurrent', current)
        // Moving Back
        } else if (state.step > payload) {
            commit('setStep', payload)
            let next = payload + 1
            commit('setNext', next)
            let previous = payload - 1
            commit('setPrevious', previous)
            let current = null
            if (state.previous > 0) {
                current = state.steps[state.previous]
            } else {
                current = state.steps[0]
            }
            commit('setCurrent', current)
        }
    },
    /* no payload */
    resetWizard ({ commit }) {
        let steps = [
            {title: 'Customer Details', subtitle: 'Fill Up Customer Info', component: 'customer-details', active: true, validated: true},
            {title: 'Delivery Method', subtitle: 'Choose Courier', component: 'delivery-method', active: true, validated: true},
            {title: 'Shipment Details', subtitle: 'Fill Up Shipping Details', component: 'shipping-details', active: true, validated: true},
            {title: 'Mode of Payment', subtitle: 'Select Payment Options', component: 'mode-of-payment', active: true, validated: true},
            {title: 'Purchase', subtitle: 'Create Order', component: 'order-details', active: true, validated: true}
        ]
        let current = {title: 'Customer Details', subtitle: 'Fill Up Customer Info', component: 'customer-details', active: true, validated: true}
        let step = parseInt(1)
        let previous = null
        let next = parseInt(2)
        commit('setSteps', steps)
        commit('setCurrent', current)
        commit('setStep', step)
        commit('setPrevious', previous)
        commit('setNext', next)
    }
}

const mutations = {
    /* payload = int */
    setStep: (state, payload) => {
        state.step = payload
    },
    /* payload = int */
    setPrevious: (state, payload) => {
        state.previous = payload
    },
    /* payload = int */
    setNext: (state, payload) => {
        state.next = payload
    },
    /* payload = object */
    setCurrent: (state, payload) => {
        state.current = payload
    },
    /* payload = array */
    setSteps: (state, payload) => {
        state.steps = payload
    },
    /* payload = component and active */
    setStepStatus: (state, payload) => {
        let index = _.findIndex(state.steps, (step) => { return step.component === payload.component })
        let step = _.find(state.steps, (step) => { return step.component === payload.component })
        step.active = payload.active
        vm.$set(state.steps, index, step)
    },
    /* payload = component and validated */
    setStepValidated: (state, payload) => {
        let index = _.findIndex(state.steps, (step) => { return step.component === payload.component })
        let step = _.find(state.steps, (step) => { return step.component === payload.component })
        step.validated = payload.validated
        vm.$set(state.steps, index, step)
    }

}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
