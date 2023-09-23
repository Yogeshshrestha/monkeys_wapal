export default ({ app, store }, inject) => {
  inject("toast", {
    showMessage({ message = "", error = false }) {
      store.commit("toast/showToast", { message, error });
    },
  });
};
