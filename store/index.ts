export const state = () => ({});

export const mutations = {};

const parseCookies = (str: string) =>
  str
    .split(";")
    .map((v) => v.split("="))
    .reduce((acc: any, v: any) => {
      acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
      return acc;
    }, {});

export const actions = {
  nuxtServerInit({ commit }: { commit: any }, { req }: { req: any }) {
    const cookieHeader = req.headers.cookie;

    if (cookieHeader) {
      const cookies = parseCookies(cookieHeader);

      const wallet = JSON.parse(cookies.wallet || "false");
 
        commit("wallet/setWallet", wallet ? wallet : {});
    }
  },
};
