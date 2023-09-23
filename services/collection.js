import { wallet, client } from "@/store/walletStore";
const contractAddress = "YOUR_CONTRACT_ADDRESS";

export async function initiateCollection(collection, baseUri, price) {
  try {
    const functionParams = {
      collection,
      baseUri,
      price,
    };

    const transaction = await client.sendTransaction(
      contractAddress,
      "initiate_collection",
      functionParams
    );

    console.log("Transaction ID:", transaction.transaction_id);
  } catch (error) {
    console.error("Error initiating collection:", error);
  }
}

initiateCollection("MyCollection", "https://baseuri.com", 100);

export async function addRankings(rankings) {
  try {
    const functionParams = {
      rankings,
    };

    const transaction = await client.sendTransaction(
      contractAddress,
      "add_rankings",
      functionParams
    );

    console.log("Transaction ID:", transaction.transaction_id);
  } catch (error) {
    console.error("Error adding rankings:", error);
  }
}

const addressArray = ["0xAddress1", "0xAddress2", "0xAddress3"];
addRankings(addressArray);


export async function mintSanctuary(receiverAddress) {
  try {
    const functionParams = {
      receiver: receiverAddress,
    };
    var mint;
    mint = {
      type: "entry_function_payload",
      function: PID + "::sanctury::mint_sanctury",
      type_arguments: [],
      arguments: [receiver],
    };

    const transaction = await wallet.signAndSubmitTransaction(receiver);
    const res = await client.waitForTransactionWithResult(transaction.hash);
    // const transaction = await client.sendTransaction(contractAddress, 'mint_sanctuary', functionParams);

    console.log("Transaction ID:", transaction.transaction_id);
  } catch (error) {
    console.error("Error minting sanctuary:", error);
  }
}

const receiverAddress = "0xReceiverAddress";
mintSanctuary(receiverAddress);
