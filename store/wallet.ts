import { ActionContext } from "vuex";
import {
  NetworkName,
  WalletCore,
  WalletName,
} from "@aptos-labs/wallet-adapter-core";
import { AptosClient, Network } from "aptos";
import { PetraWallet } from "petra-plugin-wallet-adapter";
import { FewchaWallet } from "fewcha-plugin-wallet-adapter";
import { RiseWallet } from "@rise-wallet/wallet-adapter";
import { MartianWallet } from "@martianwallet/aptos-wallet-adapter";
import { PontemWallet } from "@pontem/wallet-adapter-plugin";

let NODE_URL = `https://aptos-testnet.nodereal.io/v1/0a895e985f7f44988b049760b76f6510/v1`;
let network = NetworkName.Testnet;
const pid = "b3336bbdf9fd4fbb983ff43d8942ab7632802ce920729ab9f3197c20b8383963";
  
const client = new AptosClient(NODE_URL);

const wallets = [
  new PetraWallet(),
  new MartianWallet(),
  new RiseWallet(),
  new PontemWallet(),
  new FewchaWallet(),
];

const wallet = new WalletCore(wallets);

const checkNetwork = () => {
  if (wallet.network?.name.toLowerCase() !== network.toLowerCase()) {
    throw new Error(`Please Change your network to ${network}`);
  }
};
 
export const state = () => ({
  wallet: {},
});
  // wallet: {
  //   wallet: "",
  //   walletAddress: "",
  //   publicKey: "", 
  //   resource: null,
  // },


// interface RootState { 
//   wallet: {
//     wallet: any;
//     walletAddress: string;
//     publicKey: string; 
//     resource: any; 
//   };
// }

export const mutations = {
  setWallet(state: any, payload: any) {
    state.wallet = payload;
  },
};

export const actions = {
  
  async connectWallet({ commit }: { commit: any }, payload: WalletName) {
    
  //   // checkNetwork();
    if (!wallet.isConnected()) {
      await wallet.connect(payload);
    }

    commit("setWallet", wallet.account);
    // this.$toast.showMessage({'wallet Connect Succesfully'})

    localStorage.setItem(
      "wallet",
      JSON.stringify({ ...wallet.account, name: payload })
    );

    return wallet.account;
  },
  // async connectWallet(
  //   context: ActionContext<RootState, RootState>,
  //   walletName: WalletName
  // ) {
  //   try {
  //     await wallet.connect(walletName);
  //     checkNetwork(); 
  //     context.commit("setWallet", {
  //       wallet: wallet.wallet?.name,
  //       walletAddress: wallet.account?.address,
  //       publicKey: Array.isArray(wallet.account?.publicKey)
  //         ? wallet.account?.publicKey[0]
  //         : wallet.account?.publicKey,
  //       initializedAccountChange: true,
  //     }); 
 
  //     // this.$toast.showMessage({
  //     //   message: `${context.state.wallet.wallet} Wallet Connected Successfully`,
  //     // });
  //     localStorage.setItem(
  //       "wallet",
  //       JSON.stringify({
  //         wallet: wallet.wallet?.name,
  //         walletAddress: wallet.account?.address,
  //         publicKey: Array.isArray(wallet.account?.publicKey)
  //           ? wallet.account?.publicKey[0]
  //           : wallet.account?.publicKey,
  //       })
  //     );
   
      
  //   } catch (error) {
  //     throw error;
  //   }
  // },
  async disconnectWallet({ commit }: { commit: any }) {
    await wallet.disconnect();
    commit("setWallet", { address: "" });

    localStorage.setItem("wallet", "");
  },
 
  async initiateCollection(
    {},
    {
      collection,
      description,
      baseUri,
      price, 
      royaltyNumerator,
      royaltyDenominator 
    }: {
      collection: string;
      description: string;
      baseUri: string;
      price: number; 
      royaltyNumerator: any;
      royaltyDenominator: any; 
    }
  ) {
    const payload = {
      function: pid + "::sanctury::initiate_collection",
      type: "entry_function_payload",
      type_arguments: [],
      arguments: [
        collection,
        description,
        baseUri,
        price,
        royaltyNumerator,
        royaltyDenominator  
      ],
    };

    const res = await executeTransaction(payload);

    return res;
  },

  async addRankings(
    {},
    {
      moduleOwner,
      rankings, 
    }: {
      moduleOwner: any;
      rankings: any; 
    }
  ) {
    const payload = {
      function: pid + "::sanctury::add_rankings",
      type: "entry_function_payload",
      type_arguments: [],
      arguments: [
        moduleOwner,
        rankings
      ],
    };
    const res = await executeTransaction(payload);
    return res;
  },
  async mintSanctuary({}) {
    const payload = {
      function: pid + "::sanctury::mint_sanctury",
      type: "entry_function_payload",
      type_arguments: [],
      arguments: [ 
      ],
    };
    const res = await executeTransaction(payload);
    return res;
  }
};

export const getters = {
  getWalletsDetail() {
    return wallets;
  },
};
 
function connectWallet(wallet: any) {
  throw new Error("Function not implemented.");
}

const executeTransaction = async (payload: any) => {
  const transaction = await wallet.signAndSubmitTransaction(payload);

  const result = await client.waitForTransactionWithResult(transaction.hash);

  if (result) {
    return result;
  }

  throw new Error("Execution Failed");
};