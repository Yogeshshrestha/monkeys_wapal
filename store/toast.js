export const state = () => ({
  message: "",
  error: false,
  show: false,
});

export const mutations = { 
    showToast(state , payload ) {
      state.message = payload.message;
      state.error = payload.error;
    },
  
  clearToast(state) {
    state.message = "";
  },
};

export const actions = {
  showToast({ commit }, { message, error = false }) {
    const payload = {
      show: true,
      message,
      error,
    };
    commit("setToast", payload);
  },
};