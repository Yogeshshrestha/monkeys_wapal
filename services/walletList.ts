import { getFirestore, collection, getDoc, getDocs, onSnapshot, deleteDoc, doc, query, where, orderBy, updateDoc } from "firebase/firestore";

import { db } from "@/services/db";

export async function fetchWalletList() {
    const colRef = collection(db, 'list');
  
    try {
      const snapshot = await getDocs(colRef);
      const list = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      console.log(list);
      return list;
    } catch (error) {
      console.error("Error fetching wallet list:", error);
      throw error; // 
    }
  }
// const colRef = collection(db, 'list')

// export const getList = async () => {
//     const walletList = collection(db, 'list');
//     // const walletQuery = query(walletList);

//     // const res = await getDocs(walletQuery); 

//     const res = await getDocs(walletList);

//     res.forEach((doc) => {
//         console.log(doc.data);
//     })
// }
//  getDocs(colRef)
//     .then((snapshot) => {
//         let list: { id: any; }[] = []
//         snapshot.docs.forEach((doc) => {
//             list.push({...doc.data(), id: doc.id})
//         }) 
//         console.log(list);
//     })
//     .catch(err => {
//         console.log(err.message)
//     }) 

//live listner
// onSnapshot(colRef, (snapshot) => {
//     let list: { id: any; }[] = []
//     snapshot.docs.forEach((doc) => {
//     list.push({ ...doc.data(), id: doc.id })
//     })
//     console.log(list)
//     })

//queris
// const q = query(colRef, where("wallet_address", "==", "0x12b1"), orderBy('xp', 'desc'))

// onSnapshot(q, (snapshot) => {
//     let list: { id: any; }[] = []
//     snapshot.docs.forEach((doc) => {
//         list.push({ ...doc.data(), id: doc.id })
//     })
//     console.log(list)
// })

// const deleteList = document.querySelector('.delete')
// deleteList?.addEventListener('submit', (e) => {
//     e.preventDefault()
    // const docRefs = doc(db, 'list', deleteList.id.value)

    // deleteDoc(docRefs)
    //     .then(() => {
    //         deleteList.reset()
    //     })
// })

//update
// const updateList = document.querySelector('.update')
// updateList?.addEventListener('submit', (e) => {
//     e.preventDefault()
//     const docRef = doc(db, 'books', updateList.id.value)
//     updateDoc(docRef, {
//         title: 'updated title'
//     })
//         .then(() => {
//             updateList.reset
//         })
// })