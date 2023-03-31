import loadJSON from '@/utils/http-utils.js'

const state = {};

const getters = {};

const actions = {
    async initContracts({commit, dispatch, getters, rootState}) {
        const ERC20 = await loadJSON('/contracts/ERC20.json');

        console.log("contractAction/initContracts");

        let web3 = rootState.web3.web3;
        let network = rootState.network.networkName;
        let contracts = {};

        let networkAssetMap = {
            polygon: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
            polygon_dev: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
            optimism: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
            arbitrum: '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8',
            bsc: '0x55d398326f99059fF775485246999027B3197955', // usdt
        };

        let networkDaiMap = {
            polygon: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
            optimism: '0xda10009cbd5d07dd0cecc66161fc93d7c9000da1',
        };

        [
            contracts.exchange,
            contracts.govToken,
            contracts.governor,
            contracts.pm,
            contracts.timelockController,
            contracts.usdPlus,
            contracts.m2m,
            contracts.market,
            contracts.wUsdPlus,
            contracts.asset,
            contracts.dai,
        ] = await Promise.all([
            _load(await loadJSON(`/contracts/${network}/Exchange.json`), web3),
            _load(await loadJSON(`/contracts/${network}/OvnToken.json`), web3),
            _load(await loadJSON(`/contracts/${network}/OvnGovernor.json`), web3),
            _load(await loadJSON(`/contracts/${network}/PortfolioManager.json`), web3),
            _load(await loadJSON(`/contracts/${network}/OvnTimelockController.json`), web3),
            _load(await loadJSON(`/contracts/${network}/UsdPlusToken.json`), web3),
            _load(await loadJSON(`/contracts/${network}/Mark2Market.json`), web3),
            (network !== "bsc") ? _load(await loadJSON(`/contracts/${network}/Market.json`), web3) : _load_empty(),
            (network !== "bsc") ? _load(await loadJSON(`/contracts/${network}/WrappedUsdPlusToken.json`), web3) : _load_empty(),
            networkAssetMap[network] ? _load(ERC20, web3, networkAssetMap[network]) : _load_empty(),
            networkDaiMap[network] ? _load(ERC20, web3, networkDaiMap[network]) : _load_empty(),
        ]);

        let etsesByNetwork  = [
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
        // await loadJSON(`https://api.overnight.fi/${network}/usd+/design_ets/list`);

        await Promise.all(
            etsesByNetwork.map(async ets => {
                await _load_ets(network, ets, contracts, web3);
            })
        );

        let insurances = [
            { network: 'polygon' },
        ];

        for (let i = 0; i < insurances.length; i++) {
            if (network === insurances[i].network) {
                let ExchangerContract = await loadJSON(`/contracts/${insurances[i].network}/insurance/exchanger.json`);
                let TokenContract = await loadJSON(`/contracts/${insurances[i].network}/insurance/token.json`);
                let M2MContract = await loadJSON(`/contracts/${insurances[i].network}/insurance/m2m.json`);

                contracts.insurance = {};

                contracts.insurance[insurances[i].network + '_exchanger'] = _load(ExchangerContract, web3);
                contracts.insurance[insurances[i].network + '_token'] = _load(TokenContract, web3);
                contracts.insurance[insurances[i].network + '_m2m'] = _load(M2MContract, web3);
            }
        }

        commit('web3/setContracts', contracts, {root: true})
    },
};

const mutations = {};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};


function _load(file, web3, address) {
    if (!address) {
        address = file.address;
    }

    return new web3.eth.Contract(file.abi, address);
}

async function _load_ets(network, etsParams, contracts, web3) {

    let exchangerContract;
    let tokenContract;

    try {
        exchangerContract = _load(await loadJSON('/contracts/abi/ets/exchanger.json'), web3, etsParams.address);
        tokenContract = _load(await loadJSON('/contracts/abi/ets/token.json'), web3, etsParams.tokenAddress);
    } catch (e) {
        exchangerContract = _load(await loadJSON(`/contracts/${network}/ets/${etsParams.name}/exchanger.json`), web3);
        tokenContract = _load(await loadJSON(`/contracts/${network}/ets/${etsParams.name}/token.json`), web3);
    }

    contracts['ets_' + etsParams.name + '_exchanger'] = exchangerContract;
    contracts['ets_' + etsParams.name + '_token'] = tokenContract;
}

function _load_empty() {
    return null;
}

