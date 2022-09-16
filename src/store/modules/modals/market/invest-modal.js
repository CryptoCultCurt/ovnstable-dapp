const state = {
    isMintView: true,

    show: false,
    showBusdWbnbModal: false,
    showWmaticUsdcModal: false,
    showEtsMoonstoneModal: false,

    usdPlusWmaticApproved: false,
    wmaticUsdcApproved: false,
    etsMoonstoneApproved: false,
    usdPlusWbnbApproved: false,
    busdWbnbApproved: false,
    usdPlusApproved: false,
};

const getters = {

    isMintView(state) {
        return state.isMintView;
    },

    show(state) {
        return state.show;
    },

    showBusdWbnbModal(state) {
        return state.showBusdWbnbModal;
    },

    showWmaticUsdcModal(state) {
        return state.showWmaticUsdcModal;
    },

    showEtsMoonstoneModal(state) {
        return state.showEtsMoonstoneModal;
    },

    usdPlusWmaticApproved(state) {
        return state.usdPlusWmaticApproved;
    },

    wmaticUsdcApproved(state) {
        return state.wmaticUsdcApproved;
    },

    etsMoonstoneApproved(state) {
        return state.etsMoonstoneApproved;
    },

    usdPlusWbnbApproved(state) {
        return state.usdPlusWbnbApproved;
    },

    busdWbnbApproved(state) {
        return state.busdWbnbApproved;
    },

    usdPlusApproved(state) {
        return state.usdPlusApproved;
    },
};

const actions = {

    showInvestModal({commit, dispatch, getters}) {
        commit('setShow', true);
    },

    showBusdWbnbModal({commit, dispatch, getters}) {
        commit('setShowBusdWbnbModal', true);
    },

    showWmaticUsdcModal({commit, dispatch, getters}) {
        commit('setShowWmaticUsdcModal', true);
    },

    showEtsMoonstoneModal({commit, dispatch, getters}) {
        commit('setShowEtsMoonstoneModal', true);
    },

    async showRedeemView({commit, dispatch, getters, rootState}){
        commit('setIsMintView', false)
    },

    async showMintView({commit, dispatch, getters, rootState}){
        commit('setIsMintView', true)
    },

    closeInvestModal({commit, dispatch, getters}) {
        commit('setShow', false);
    },

    closeBusdWbnbModal({commit, dispatch, getters}) {
        commit('setShowBusdWbnbModal', false);
    },

    closeWmaticUsdcModal({commit, dispatch, getters}) {
        commit('setShowWmaticUsdcModal', false);
    },

    closeEtsMoonstoneModal({commit, dispatch, getters}) {
        commit('setShowEtsMoonstoneModal', false);
    },

    approveUsdPlusWmatic({commit, dispatch, getters}) {
        commit('setUsdPlusWmaticApproved', true);
    },

    approveWmaticUsdc({commit, dispatch, getters}) {
        commit('setWmaticUsdcApproved', true);
    },

    approveEtsMoonstone({commit, dispatch, getters}) {
        commit('setEtsMoonstoneApproved', true);
    },

    approveUsdPlusWbnb({commit, dispatch, getters}) {
        commit('setUsdPlusWbnbApproved', true);
    },

    approveBusdWbnb({commit, dispatch, getters}) {
        commit('setBusdWbnbApproved', true);
    },

    approveUsdPlus({commit, dispatch, getters}) {
        commit('setUsdPlusApproved', true);
    },
};

const mutations = {

    setIsMintView(state, value) {
        state.isMintView = value;
    },

    setShow(state, show) {
        state.show = show;
    },

    setShowBusdWbnbModal(state, value) {
        state.showBusdWbnbModal = value;
    },

    setShowWmaticUsdcModal(state, value) {
        state.showWmaticUsdcModal = value;
    },

    setShowEtsMoonstoneModal(state, value) {
        state.showEtsMoonstoneModal = value;
    },

    setUsdPlusWmaticApproved(state, value) {
        state.usdPlusWmaticApproved = value;
    },

    setWmaticUsdcApproved(state, value) {
        state.wmaticUsdcApproved = value;
    },

    setEtsMoonstoneApproved(state, value) {
        state.etsMoonstoneApproved = value;
    },

    setUsdPlusWbnbApproved(state, value) {
        state.usdPlusWbnbApproved = value;
    },

    setBusdWbnbApproved(state, value) {
        state.busdWbnbApproved = value;
    },

    setUsdPlusApproved(state, value) {
        state.usdPlusApproved = value;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
