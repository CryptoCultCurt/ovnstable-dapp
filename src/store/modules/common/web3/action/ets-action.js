import loadJSON from '@/utils/http-utils.js'

const state = {
    etsNetworkNames: [
        'optimism',
        'arbitrum',
        'polygon',
        'bsc'
    ],
    etsList: null,
};

const getters = {

    etsNetworkNames(state) {
        return state.etsNetworkNames;
    },

    etsNetworkUrl(state) {
        return state.etsNetworkUrl;
    },

    etsList(state) {
        return state.etsList;
    },
};

const actions = {
    async initEtsList({commit, dispatch, getters, rootState}) {

        let list = [];

        for (let i = 0; i < getters.etsNetworkNames.length; i++) {
           // let etses = await loadJSON(`https://api.overnight.fi/${getters.etsNetworkNames[i]}/usd+/design_ets/list`);
            // May add some fields
            let etses = [
                {
                "name": "qs_alpha_wbnb_busd",
                "nameUp": "THE ALPHA WBNB/BUSD",
                "nameToken": "ALPHA",
                "prototype": false,
                "openPrototype": false,
                "archive": false,
                "disabled": false,
                "highRisk": true,
                "exchangeContract": "ets_qs_alpha_wbnb_busd_exchanger",
                "tokenContract": "ets_qs_alpha_wbnb_busd_token",
                "etsTokenDecimals": 18,
                "actionAsset": "asset",
                "actionTokenName": "BUSD",
                "actionTokenDecimals": 18,
                "address": "0x45825f3FB0a5D5110923CEe0d8fDfb58164b7204",
                "tokenAddress": "0xf413B10FD5A5fA0Af5B1bA519A4528d86959F989",
                "chain": 56,
                "chainName": "bsc",
                "borrowFrom": "Venus",
                "dex": "Thena",
                "gauge": "",
                "poolName": "WBNB/BUSD",
                "range": "",
                "token1": "WBNB",
                "token2": "BUSD",
                "hedgeToken": "WBNB",
                "hasUsdPlus": false,
                "tokenPair": "wbnb_busd",
                "maxSupply": 4500000,
                "overcapEnabled": true,
                "show": true,
                "inceptionDate": "11 January 2023",
                "iconName": "ets_qs_alpha_wbnb_busd",
                "mainColor": "#F3BA2F",
                "cardBgColor": "radial-gradient(117.22% 424.06% at 96.59% -5.17%, #F4F4F4 0%, #808FA7 23.74%, #011945 52%, #E6B131 100%)",
                "cardTitle": "Generate yield on WBNB-BUSD pool by hedging your risks and simplify process.",
                "aboutText": "The exchange-traded strategy “Alpha” is an ERC-20 structured product built on BNB Chain that lets you leverage a collateralized debt position (BUSD lent on Venus) to borrow a volatile asset (WBNB), pair it with BUSD stablecoin, and provide WBNB/BUSD liquidity on Thena all in one action. This allows earning high APY and hedging against WBNB volatility. The unique feature of ETS “Alpha” is that it automatically administers a health factor on Venus and rebalances your Lent/Borrowed amounts to maintain a stringent Health Factor meaning. Payouts are happening every day and are auto compounded back into the strategy to further amplify rewards. This product might occasionally produce negative rebases, which will not be compensated.",
                "riskText": "By depositing BUSD into this strategy, you are automatically borrowing an equal value of WBNB from Venus at a rate roughly equal to the current price of WBNB denoted above.\n\nThe strategy's smart contract is designed to automatically invest these equal values of WBNB & BUSD into Thena WBNB/BUSD Liquidity Pool, after which these LP Tokens are staked into the Gauge Pool.",
                "impermanentText": "While the Thena pools will accrue transaction fees that generate yields, the pool may become imbalanced; when the user withdraws their investment, the strategy's smart contract may need to use the user's funds to buy additional WBNB to repay the lent amount (plus interest), which can result in a net loss from the initial deposit.",
                "ammText": "The strategy's smart contract automatically moves your deposit into the said Automated Market Maker (i.e., Thena) and, in doing so, may incur an AMM’s smart contract risk.",
                "importantText": "Yield/APY is not guaranteed and can be highly variable depending on the volume and rewards from the underlying AMM as well as the price of a volatile asset (WBNB). Farmers may incur net losses if the impermanent loss is more significant than the yield earned."
                }
                ]
            list.push(...etses);
        }

        await commit('setEtsList', list);
    },
};

const mutations = {

    setEtsList(state, value) {
        state.etsList = value;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
