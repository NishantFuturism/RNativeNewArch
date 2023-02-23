'use strict'


export default {
    appConfiguration: {
        serviceTimeOut: 5000,
        baseUrlDev: '',
        baseUrlUAT: '',
        baseUrlStaging: '',
    },

    regex: {
        mobile: /^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/,
        email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        password: /^(?:([A-Za-z0-9 !@#\$%\^&\*\[\]"\';:_\-<>\.,=\+\/\\()])(?!.*\1))*$/,
    },
    headerTypes : {
        normalHeader : {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        normalHeaderWithToken : {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: ''
        },
        formUrlEncodedHeader : { 
            'content-type': 'application/x-www-form-urlencoded' 
        },
        formUrlEncodedHeaderWithToken : { 
            'content-type': 'application/x-www-form-urlencoded',
             Authorization: ''
        },
        multipartFormDataHeader : {
            'Content-Type': 'multipart/form-data',
        },
        multipartFormDataHeaderWithToken : {
            'Content-Type': 'multipart/form-data',
            Authorization: ''
        }
    },

    api: {
        login: 'users/login',
        register: 'users/register',
        forgotPassword: 'users/forgot-password',
        changePassword: 'users/',
        saveUserData: 'users/',
        saveUserImage: 'storage/general/upload-file',
        privacyPolicy: 'privacypolicy',
        termsConditions: 'terms-conditions',
        contactUs: 'contactus',
        delete_user_saved_stripe_card: 'payment/delete_user_saved_stripe_card',
    },

    request_type: {
        get: 'GET',
        post: 'POST',
        put: 'PUT',
        patch: 'PATCH',
        delete: 'DELETE'
    },

    status: {
        SUCCESS: 200,
        SUCCESSFULLY_CREATED_201: 201,
        NO_BODY_RESPONSE : 204,
        NO_RESOURCE_MODIFIED : 304,
        BAD_REQUEST : 400,
        AUTHENTICATION_FAILED : 401,
        USER_NOT_ALLOWED : 403,
        NOT_EXIST : 404,
        METHOD_NOT_ALLOWED : 405,
        UNSUPPORTED_MEDIA_TYPE : 415,
        DATA_VALIDATION_FAILED : 422,
        TOO_MANY_REQUEST : 429,
        INTERNAL_SERVER_ERROR : 500
    },
    PLATFORM: {
        iOS: 'ios',
        android: 'android'
    }

}