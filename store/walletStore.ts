// import { ActionContext } from "vuex";
// // import Cookies from "js-cookie";
 

// import {
//   WalletCore,
//   WalletName,
//   NetworkName,
// } from "@aptos-labs/wallet-adapter-core";
// import { PetraWallet } from "petra-plugin-wallet-adapter";
// import { MartianWallet } from "@martianwallet/aptos-wallet-adapter";
// import { FewchaWallet } from "fewcha-plugin-wallet-adapter";
// import { PontemWallet } from "@pontem/wallet-adapter-plugin";
// import { RiseWallet } from "@rise-wallet/wallet-adapter";
// import { TrustWallet } from "@trustwallet/aptos-wallet-adapter";
// // import { MSafeWalletAdapter } from "msafe-plugin-wallet-adapter";
// import { BloctoWallet } from "@blocto/aptos-wallet-adapter-plugin";
// import { AptosClient, TokenClient, HexString, TxnBuilderTypes } from "aptos";
// import { IdentityConnectWallet } from "@identity-connect/wallet-adapter-plugin";
// import { SpikaWallet } from "@spika/aptos-plugin";
// import axios from "axios";

// export let NODE_URL = "";
// let initializedAccountChange = false;

// let network = NetworkName.Testnet;
// const clientNetwork = process.env.network;

// if (clientNetwork === "testnet") {
//   network = NetworkName.Testnet;
//   NODE_URL = `https://fullnode.${clientNetwork}.aptoslabs.com/v1`;
// } else {
//   network = NetworkName.Mainnet;
//   NODE_URL = `https://fullnode.${clientNetwork}.aptoslabs.com/v1`;
// }

// export const client = new AptosClient(NODE_URL);

// const wallets = [
//   new PetraWallet(),
//   new MartianWallet(),
//   new RiseWallet(),
//   new IdentityConnectWallet("d21761c1-fab1-4aa5-8c27-ec3749568e45", {
//     networkName: network,
//   }),
//   new PontemWallet(),
//   new FewchaWallet(),
//   new TrustWallet(),
//   // new MSafeWalletAdapter(),
//   new BloctoWallet({
//     network: network,
//     bloctoAppId: "6d85f56e-5f2e-46cd-b5f2-5cf9695b4d46",
//   }),
//   new SpikaWallet(),
// ];

// export const wallet = new WalletCore(wallets);

// const checkNetwork = () => {
//   if (wallet.network?.name.toLowerCase() !== network.toLowerCase()) {
//     throw new Error(`Please Change your network to ${network}`);
//   }
// };

// export const state = () => ({
//   connectDialog: false,
//   disconnectDialog: false,

//   wallet: {
//     wallet: "",
//     walletAddress: "",
//     publicKey: "",
//     initializedAccountChange: false,
//     resource: null,
//   },
//   balance: 0,
// });

// interface RootState {
//   walletStore: any;
//   connectDialog: boolean;
//   disconnectDialog: boolean;
//   wallet: {
//     wallet: any;
//     walletAddress: string;
//     publicKey: string;
//     initializedAccountChange: boolean;
//     resource: any;
//     balance: number;
//   };
// }

// export const mutations = {
//   connectDialogBox(state: any, connect: any) {
//     state.connectDialog = connect;
//   },
//   disconnectDialogBox(state: any, disconnect: any) {
//     state.disconnectDialog = disconnect;
//   },
//   setWallet(state: any, wallet: WalletAddress) {
//     state.wallet = wallet;
//   },
//   setInitializeAccountChange(state: any, accountChange: boolean) {
//     state.wallet.initializedAccountChange = accountChange;
//   },
//   setBalance(state: any, balance: any) {
//     state.balance = balance;
//   },
// };

// export const getters = {
//   getWalletsDetail() {
//     return wallets;
//   },
// };

// export const actions = {
//   async initializeWallet({
//     state,
//     dispatch,
//     commit,
//   }: {
//     state: any;
//     dispatch: any;
//     commit: any;
//   }) {
//     let localWallet: { wallet: any } | null = null;
//     if (localStorage.getItem("wallet")) {
//       localWallet = JSON.parse(localStorage.getItem("wallet") || "");
//       if (!wallet.isConnected() && localWallet?.wallet) {
//         dispatch("connectWallet", localWallet?.wallet);
//       }
//     }

//     if (!initializedAccountChange && wallet.isConnected()) {
//       try {
//         await wallet.onNetworkChange();
//         await wallet.onAccountChange();
//         initializedAccountChange = true;
//       } catch (error) {
//         initializedAccountChange = false;
//       }

//       wallet.addListener("networkChange", async () => {
//         commit("setWallet", {
//           wallet: "",
//           walletAddress: "",
//           publicKey: "",
//           initializedAccountChange: state.wallet.initializedAccountChange
//             ? state.wallet.initializedAccountChange
//             : false,
//         });
//         localStorage.removeItem("wallet");
//         localStorage.removeItem("user");
//       });

//       wallet.addListener("accountChange", async (newAccount) => {
//         commit("setWallet", {
//           wallet: state.wallet.wallet,
//           walletAddress: newAccount?.address,
//           publicKey: Array.isArray(newAccount?.publicKey)
//             ? newAccount?.publicKey[0]
//             : newAccount?.publicKey,
//           initializedAccountChange: true,
//         });

//         localStorage.setItem(
//           "wallet",
//           JSON.stringify({
//             wallet: state.wallet.wallet,
//             walletAddress: newAccount?.address,
//             publicKey: Array.isArray(newAccount?.publicKey)
//               ? newAccount?.publicKey[0]
//               : newAccount?.publicKey,
//           })
//         );

//         localStorage.removeItem("user");
//         const userToken = await userConnected(wallet.account?.address);
//         setTimeout(() => {
//           localStorage.setItem(
//             "user",
//             JSON.stringify({
//               token: userToken.data.data.token,
//               user_id: userToken.data.data.user.id,
//             })
//           );
//         }, 50);
//       });
//     }
//   },
//   async connectWallet(
//     context: ActionContext<RootState, RootState>,
//     walletName: WalletName
//   ) {
//     try {
//       await wallet.connect(walletName);
//       checkNetwork();
//       if (!initializedAccountChange) {
//         await context.dispatch("initializeWallet");
//       }
//       context.commit("setWallet", {
//         wallet: wallet.wallet?.name,
//         walletAddress: wallet.account?.address,
//         publicKey: Array.isArray(wallet.account?.publicKey)
//           ? wallet.account?.publicKey[0]
//           : wallet.account?.publicKey,
//         initializedAccountChange: true,
//       });
//       initializedAccountChange = true;

//       context.commit("connectDialogBox", false);
//       this.$toast.showMessage({
//         message: `${context.state.wallet.wallet} Wallet Connected Successfully`,
//       });
//       localStorage.setItem(
//         "wallet",
//         JSON.stringify({
//           wallet: wallet.wallet?.name,
//           walletAddress: wallet.account?.address,
//           publicKey: Array.isArray(wallet.account?.publicKey)
//             ? wallet.account?.publicKey[0]
//             : wallet.account?.publicKey,
//         })
//       );

//       await userConnected(context.state.wallet.walletAddress);
//       let finish = false;
//       let page = 1;
//       context.dispatch("checkBalance");
//       while (finish == false) {
//         let collections = await getUserCollections(
//           context.state.wallet.walletAddress,
//           page,
//           5
//         );
//         saveCollection(collections);
//         page++;
//         if (collections) {
//           if (collections.length == 0) {
//             finish = true;
//           }
//         }
//       }
//     } catch (error) {
//       throw error;
//     }
//   },
//   async checkBalance({ commit, state }: { commit: any; state: any }) {
//     try {
//       if (!wallet.isConnected()) {
//         await wallet.connect(state.wallet.wallet);
//       }
//       let res = await axios.get(
//         `https://fullnode.${process.env.network}.aptoslabs.com/v1/accounts/${state.wallet.walletAddress}/resource/0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>`
//       );

//       const lamports = res.data.data.coin.value;
//       const balance = (lamports / 100000000).toFixed(4);
//       commit("setBalance", balance);
//     } catch (e) {
//       commit("setBalance", 0);
//       return 0;
//     }
//   },
//   async disconnectWallet({ commit, state }: { commit: any; state: any }) {
//     await wallet.disconnect();
//     commit("setWallet", {
//       wallet: "",
//       walletAddress: "",
//       publicKey: "",
//       initializedAccountChange: state.wallet.initializedAccountChange
//         ? state.wallet.initializedAccountChange
//         : false,
//     });
//     localStorage.removeItem("wallet");
//     this.$router.push("/");
//   },
//   async checkWalletLogin(context: ActionContext<RootState, RootState>) {
//     if (!wallet.isConnected()) {
//       await wallet.connect(context.state.wallet.wallet);
//     }
//     const wallets = localStorage.getItem("wallet");

//     if (wallets) {
//       context.commit("setWallet", JSON.parse(wallets));
//       return true;
//     } else {
//       context.commit("connectDialogBox", true);
//     }
//     return false;
//   },
// };
