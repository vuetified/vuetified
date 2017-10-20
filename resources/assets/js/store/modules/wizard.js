const state = {
    current_step: 0,
    step_1_validated: false,
    step_2_validated: false,
    step_3_validated: false,
    step_4_validated: false,
    step_5_validated: false
}

const getters = {
    getCurrentStep: state => state.current_step,
    getStepOne: state => state.step_1_validated,
    getStepTwo: state => state.step_2_validated,
    getStepThree: state => state.step_3_validated,
    getStepFour: state => state.step_4_validated,
    getStepFive: state => state.step_5_validated
}

const actions = {
    async checkout ({ commit, state }) {
        commit('newForm')
        state.form.busy = true
        commit('setForm')
        try {
            const payload = await App.post(route('api.order.add'), state.form)
            state.form.busy = false
            commit('newForm')
            vm.$popup({ message: payload.message, backgroundColor: '#4db6ac', delay: 5, color: '#fffffa' })
        } catch ({errors, message}) {
            state.form.errors.set(errors)
            state.form.busy = false
            commit('newForm')
            vm.$popup({ message: message, backgroundColor: '#e57373', delay: 5, color: '#fffffa' })
        }
    }
}

const mutations = {
    setCurrentStep: (state, payload) => {
        switch (payload) {
        case 1:
            state.current_step = payload
            break
        case 2:
            vm.$emit('validate_step_1')
            if (state.step_1_validated) {
                state.current_step = payload
            }
            break
        case 3:
            vm.$emit('validate_step_2')
            if (state.step_2_validated) {
                state.current_step = payload
            }
            break
        case 4:
            vm.$emit('validate_step_3')
            if (state.step_3_validated) {
                state.current_step = payload
            }
            break
        case 5:
            vm.$emit('validate_step_4')
            if (state.step_4_validated) {
                state.current_step = payload
            }
            break
        default:
            vm.$emit('validate_step_5')
            if (state.step_5_validated) {
                state.current_step = payload
            }
            break
        }
    },
    setStepOne: (state, payload) => {
        state.step_1_validated = payload
    },
    setStepTwo: (state, payload) => {
        state.step_2_validated = payload
    },
    setStepThree: (state, payload) => {
        state.step_3_validated = payload
    },
    setStepFour: (state, payload) => {
        state.step_4_validated = payload
    },
    setStepFive: (state, payload) => {
        state.step_5_validated = payload
    }

}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
