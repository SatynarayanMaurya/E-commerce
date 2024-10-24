
// const BASE_URL = "http://localhost:4000"
const BASE_URL = "http://192.168.1.25:4000"


export const authEndpoints = {
    SEND_OTP_API : BASE_URL + "/api/v1/auth/sendotp",
    SIGNUP_API : BASE_URL + "/api/v1/auth/signup",
    LOGIN_API : BASE_URL + "/api/v1/auth/login",
    USER_DETAILS_API : BASE_URL + "/api/v1/user-details"
}

export const adminEndpoints = {
    ADD_PRODUCT_API : BASE_URL + "/api/v1/add-product",
    GET_ALL_PRODUCTS_API : BASE_URL + "/api/v1/get-all-product",
    GET_CATEGORY_PRODUCTS_API : BASE_URL + "/api/v1/get-category-products"
}

export const productEndpoints = {
    GET_SINGLE_PRODUCT_API : BASE_URL + "/api/v1/get-single-product",
    ADD_TO_CART_API : BASE_URL + "/api/v1/add-to-cart",
    GET_ALL_CART_PRODUCT_API : BASE_URL + "/api/v1/get-all-cart-product",
    PLACE_ORDER_API : BASE_URL + "/api/v1/place-order",
    ORDERED_PRODUCT_API : BASE_URL + "/api/v1/ordered-product",
    GET_ALL_ORDERED_PRODUCT_ADMIN_API : BASE_URL + "/api/v1/all-ordered-product",
    DELETE_FROM_CART_API : BASE_URL + "/api/v1/delete-from-cart"

}