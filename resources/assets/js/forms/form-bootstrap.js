import './forms'
import './errors'
import http from './http'

// Add methods to App Object for HTTP Request
_.extend(App, http)

// All Fields Declared Here When Initiated Will Be Reactive
App.forms = {
    cartForm: {
        'id': null,
        'options': {},
        'qty': 0,
        'rowId': null
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
        password_confirmation: '',
        role: '',
        sponsor_id: ''
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
    },
    paymentForm: {
        id: '',
        transaction_no: '',
        date_paid: null,
        account_name: '',
        account_no: '',
        amount: '',
        currency: '',
        gateway: {
            id: '',
            name: '',
            slug: '',
            group: '',
            avatar: '',
            details: '',
            model: ''
        }
    },
    shipmentForm: {
        id: null,
        courier: {},
        shipping_fee: 0,
        currency: null,
        tracking_no: '',
        sent: false,
        date_sent: null,
        received: false,
        date_received: null
    },
    accountForm: {
        email: null,
        username: null,
        old_password: null,
        password: null,
        password_confirmation: null
    },
    profileForm: {
        first_name: null,
        last_name: null,
        contact_no: null,
        address_1: null,
        address_2: null,
        city: null,
        country: null,
        zip_code: null,
        state_province: null
    },
    contactDetailsForm: {
    },
    socialLinksForm: {
    },
    usersForm: {

    },
    linkForm: {
        link: '',
        link_id: '',
        user_id: ''
    },
    rolesForm: {
        roles: []
    },
    permissionsForm: {
        permissions: []
    },
    editProductForm: {
        'category_id': '',
        currency: '',
        excerpt: '',
        name: '',
        slug: '',
        sku: '',
        description: '',
        options: []
    }
    // Add Other Form Object Here
}
