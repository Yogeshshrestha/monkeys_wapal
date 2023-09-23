import {
  NetworkName,
  WalletCore,
  WalletName,
} from "@aptos-labs/wallet-adapter-core";
import { AptosClient } from "aptos";
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

export const mutations = {
  setWallet(state: any, payload: any) {
    state.wallet = payload;
  },
};

export const actions = {
  
  async connectWallet({ commit }: { commit: any }, payload: WalletName) {
    
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
  async disconnectWallet({ commit }: { commit: any }) {
    await wallet.disconnect();
    commit("setWallet", { address: "" });

    localStorage.setItem("wallet", "");
  },
 
  async initiateCollection(
    {},
    {
      collection,
      baseUri,
      price, 
    }: {
      collection: string;
      baseUri: string;
      price: number; 
    }
  ) {
    const payload = {
      function: pid + "::sanctury::initiate_collection",
      type: "entry_function_payload",
      type_arguments: [],
      arguments: [
        collection,
        baseUri,
        price 
      ],
    };

    const res = await executeTransaction(payload);

    return res;
  },

  async addRankings(
    {},
    {
      rankings, 
    }: {
      rankings: any; 
    }
  ) {
    const payload = {
      function: pid + "::sanctury::add_rankings",
      type: "entry_function_payload",
      type_arguments: [],
      arguments: [
        rankings
      ],
    };
    const res = await executeTransaction(payload);
    return res;
  },
  async mintSanctuary(
    {},
    {
      receiverAddress, 
    }: {
      receiverAddress: any; 
    }
  ) {
    const payload = {
      function: pid + "::sanctury::mint_sanctury",
      type: "entry_function_payload",
      type_arguments: [],
      arguments: [
        receiverAddress
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