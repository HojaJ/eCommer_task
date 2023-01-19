import {createStore} from "vuex";
import axiosClient from "../axios";

const store = createStore({
    state: {
        user: {
            data: {},
            token: sessionStorage.getItem("TOKEN"),
        },
        products:{
            loading: false,
            links:[],
            data:[]
        },
        currentProduct: {
            data: [],
            loading:false
        },
        cartProducts: {
            data: [],
            totalCount: 0,
            total: 0,
            loading: false
        },
        cartOpen: false,
    },
    getters: {
    },
    actions: {
        getProducts({commit}, {url=null} = {}){
            commit('setProductsLoading', true);
            url = url || "/products";
            return axiosClient.get(url).then((res) => {
                commit('setProductsLoading', false);
                commit('setProducts',res.data)
            })
        },
        getCartProducts({commit}){
            commit('setProductsCart');
        },
        productToCart({commit}, product){
            commit('addProductToCart', product);
        },
        removeFromCart({commit}, product){
            commit('removeProductFromCart', product);
        },
        register({commit}, user){
            return axiosClient.post('/register', user)
                .then(({data}) => {
                    commit('setUser', data.user);
                    commit('setToken', data.token);
                    return data;
                })
        },
        logout({commit}) {
            return axiosClient.post('/logout')
                .then(response => {
                    commit('logout')
                    return response;
                })
        },
        login({commit}, user){
            return axiosClient.post('/login', user)
                .then(({data}) => {
                    commit('setUser', data.user);
                    commit('setToken', data.token);
                })
        },
        getHome({commit}, {url=null} = {}){
            commit('setProductsLoading', true);
            url = url || "/home";
            return axiosClient.get(url).then((res) => {
                commit('setProductsLoading', false);
                commit('setProducts',res.data)
            })
        },
        getProduct({ commit }, id) {
            commit("setCurrentProductLoading", true);
            return axiosClient
                .get(`/products/${id}`)
                .then((res) => {
                    commit("setCurrentProduct", res.data);
                    commit("setCurrentProductLoading", false);
                    return res;
                })
                .catch((err) => {
                    commit("setCurrentProductLoading", false);
                    throw err;
                });
        },
        saveProduct({ commit, dispatch }, product) {
            delete product.image_url;

            let response;
            if (product.id) {
                response = axiosClient
                    .put(`/products/${product.id}`,product)
                    .then((res) => {
                        commit('setCurrentProduct', res.data)
                        return res;
                    });
            } else {
                response = axiosClient.post("/products", product).then((res) => {
                    commit('setCurrentProduct', res.data)
                    return res;
                });
            }

            return response;
        },
        deleteProduct({ dispatch }, id) {
            return axiosClient.delete(`/products/${id}`).then((res) => {
                dispatch('getProduct')
                return res;
            });
        },
        openCart({commit}){
            commit('setCartOpen');
        },
        closeCart({commit}){
            commit('setCartClose');
        }
    },
    mutations: {
        addProductToCart: (state, product) => {
            const productInCartIndex = state.cartProducts.data.findIndex(
                (ci) => ci.id === product.id
            );
            if (productInCartIndex >= 0) {
                state.cartProducts.data[productInCartIndex].qty++;
            }else{
                const newProduct = {
                    id: product.id,
                    title: product.title,
                    image_url: product.image_url,
                    price: product.price,
                    qty:1
                }
                state.cartProducts.data.push(newProduct);
            }
            state.cartProducts.totalCount++
            state.cartProducts.total = (parseFloat(state.cartProducts.total) + parseFloat(product.price)).toFixed(2);
            localStorage.setItem('cartProducts', JSON.stringify(state.cartProducts));
        },
        removeProductFromCart: (state, product) => {
            const productInCartIndex = state.cartProducts.data.findIndex(
                (ci) => ci.id === product.id
            );

            const prodData = state.cartProducts.data[productInCartIndex];
            state.cartProducts.data.splice(productInCartIndex, 1);
            state.cartProducts.totalCount -= prodData.qty;

            state.cartProducts.total = parseFloat(state.cartProducts.total - (prodData.price * prodData.qty)).toFixed(2)

            localStorage.setItem('cartProducts', JSON.stringify(state.cartProducts));
        },
        setProductsCart(state){
            const products =  JSON.parse(localStorage.getItem('cartProducts'));
            if(products){
                state.cartProducts.data = products.data;
                state.cartProducts.totalCount = products.totalCount;
                state.cartProducts.total = products.total;
            }
        },
        logout: (state) => {
            state.user.token = null;
            state.user.data = {};
            sessionStorage.removeItem("TOKEN");
        },
        setUser: (state, user) => {
            state.user.data = user;
        },
        setToken: (state, token) => {
            state.user.token = token;
            sessionStorage.setItem('TOKEN', token);
        },
        setProductsLoading: (state, loading) => {
            state.products.loading = loading;
        },
        setProducts: (state, products) => {
            state.products.data = products.data;
            state.products.links = products.meta.links;
        },
        setCurrentProductLoading: (state, loading) => {
            state.currentProduct.loading = loading;
        },
        setCurrentProduct: (state, product) => {
            state.currentProduct.data = product.data;
        },
        seProductLoading: (state, loading) => {
            state.currentProduct.loading = loading;
        },
        setProduct: (state, product) => {
            state.products.links = product.meta.links;
            state.products.data = product.data;
        },
        setCartOpen: (state) => {
            state.cartOpen = true;
        },

        setCartClose: (state) => {
            state.cartOpen = false;
        }

    }
})

export default store;
