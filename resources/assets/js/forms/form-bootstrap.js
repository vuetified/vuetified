require('./forms')
require('./errors')

// Add methods to App Object for HTTP Request
_.extend(App, require('./http'))

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
    shoppingCart: {

    },
    checkOutForm: {
        orders: [],
        shipping_details: {
            address_1: null,
            address_2: null,
            city: null,
            country: null,
            zip_code: null,
            state: null
        },
        account_details: {
            first_name: null,
            middle_name: null,
            last_name: null,
            email: null,
            contact_no: null
        },
        mop: {

        }
    }

    // Add Other Form Object Here
}
