const {axios} = require('@/plugins/http-axios');


const state = {

    show: false,

    gasPriceStation: {
        low: 10,
        standard: 20,
        fast: 30,
        ultra: 50,

        usdPrice: 0
    },

    gasPriceType: 'standard',
    gasPrice: 0,
    gasPriceGwei: '0',
};

const getters = {

    show(state) {
        return state.show;
    },

    gasPriceStation(state) {
        return state.gasPriceStation;
    },

    gasPrice(state) {
        return state.gasPrice;
    },

    gasPriceGwei(state) {
        return state.gasPriceGwei;
    },

    gasPriceType(state) {
        return state.gasPriceType;
    },
};

const actions = {

    async showGasSettings({commit, dispatch, getters, rootState}) {
        dispatch('refreshGasPrice');
        commit('setShow', true);
    },

    async hideGasSettings({commit, dispatch, getters, rootState}) {
        commit('setShow', false);
    },

    async refreshGasPrice({commit, dispatch, getters, rootState}) {

        let networkId = rootState.network.networkId;

        console.log("Getting gas price for network_id=" + networkId);

        let url;
        if (networkId === 137)
            url = "https://gpoly.blockscan.com/gasapi.ashx?apikey=key&method=gasoracle";
        else if(networkId === 56 || networkId === 31337)
            url = "https://gbsc.blockscan.com/gasapi.ashx?apikey=key&method=gasoracle";
        else if (networkId === 10 || networkId === 42161){
            console.log('GAS STATION: fixed for op');

            let gwei = networkId === 10 ? 0.001 : (networkId === 42161 ? 0.1 : 0.001)

            try {
                let price = {
                    low: gwei,
                    standard: gwei,
                    fast: gwei,
                    ultra: gwei,

                    usdPrice: 0
                }
                commit('setGasPriceStation', price);

                let element = price[getters.gasPriceType];

                commit('setGasPrice', element)
                commit('setGasPriceGwei', rootState.web3.web3.utils.toWei(element + "", 'gwei'))
            } catch (reason) {
                console.debug('Error get gas price: ' + reason);
            }

            return;
        }

        console.log('GAS STATION: ' + url);
        axios.get(url).then(value => {

            let result = value.data.result;
            let price = {
                low: result.SafeGasPrice,
                standard: result.ProposeGasPrice,
                fast: result.FastGasPrice,
                ultra: result.FastGasPrice * 3,

                usdPrice: result.UsdPrice
            }
            commit('setGasPriceStation', price);

            let element = price[getters.gasPriceType];

            commit('setGasPrice', element)
            commit('setGasPriceGwei', rootState.web3.web3.utils.toWei(element + "", 'gwei'))
        }).catch(reason => {
            console.debug('Error get gas price: ' + reason);
        })
    },
};

const mutations = {

    setShow(state, value) {
        state.show = value;
    },

    setGasPriceStation(state, value) {
        state.gasPriceStation = value;
    },

    setGasPriceType(state, value) {
        state.gasPriceType = value;
    },

    setGasPrice(state, value) {
        state.gasPrice = value;
    },


    setGasPriceGwei(state, value) {
        state.gasPriceGwei = value;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
