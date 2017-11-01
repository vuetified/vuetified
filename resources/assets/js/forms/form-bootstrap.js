import './forms'
import './errors'
import http from './http'

// Add methods to App Object for HTTP Request
_.extend(App, http)

// All Fields Declared Here When Initiated Will Be Reactive
App.forms = {
    cartForm: {
        'sku': '',
        'qty': 0,
        'rowId': ''
    },
    passwordResetForm: {
        username: '',
        password: '',
        password_confirmation: '',
        token: ''
    },
    resetForm: {
        username: ''
    },
    logoutForm: {
        submit: true
    },
    loginForm: {
        username: '',
        email: '',
        password: '',
        remember: false
    },
    registerForm: {
        username: '',
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    },
    checkOutForm: {
        cart: {
            items: [],
            subtotal: 0,
            tax: 0,
            total: 0
        },
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
        shipping_fee: 0,
        courier: {} // fetch courrier or save it on store for courier.js
    },
    toggleForm: {
        toggle: false
    },
    customerForm: {
        customer_details: {
            first_name: '',
            last_name: '',
            email: '',
            contact_no: ''
        }
    },
    addressForm: {
        shipping_details: {
            address_1: '',
            address_2: '',
            city: '',
            country: '',
            zip_code: '',
            state_province: ''
        }
    }

    // Add Other Form Object Here
}
