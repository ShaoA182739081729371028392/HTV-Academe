
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, Timestamp, updateDoc, addDoc, query, where, onSnapshot} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDofR9A1ldqMQRb90dCznxg3hiaUv6p-lg",
  authDomain: "academe-2c24b.firebaseapp.com",
  projectId: "academe-2c24b",
 
};
import {_send_Home} from "./urls.jsx"
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore();

import { collection, getDocs } from "firebase/firestore"; 

// Get a reference to the database service

const my_collection = collection(db, "users")

export async function signup(username, password){
    // Creates a New Username + Password inside of the Database
    localStorage['signed_in'] = true;
    localStorage['Username'] = username;
    localStorage['Password'] = password;
    
    await addDoc(my_collection, {
        _id: username, 
        password: password,
        //folder_name: null, // ID selection 
        //contents: {
            // The Meat and Potatoes
        //    entry_name: null, 
        //    photo_preview: null,
        //    transcription:  null
        //}
    }); // Create an Empty User
    _send_Home();


} 
export async function SearchExistingUsers(username, callback) {
  
  
  let output = query(my_collection, where ("_id", "==", username))
  let user = {}
  onSnapshot(output, (querySnapshot) => {
    const cities = [];
    querySnapshot.forEach((doc) => {
        user = doc.data();
    });
    callback(user);
  })



}
export async function login(username, password, callback) {
    // Query that a Given Username and Password is even on the system 
   
    let output = query(my_collection, where("_id", "==", username), where("password", "==", password))
    let vars = {} 
    let DOC = undefined
    onSnapshot(output, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
          vars = doc.data();
          DOC = doc;
         

          
      });
      callback(vars, DOC);
          

      
    })


}

export async function insert_entry(username, password, folder_name, entry_name, photo_preview, text_data) {
    let structure = {_id: username, // Login System, only query the rest
        password: password, 
        folder_name: folder_name, // ID selection 
        contents: {
            // The Meat and Potatoes
            entry_name: entry_name, 
            photo_preview: photo_preview,
            transcription:  text_data
        }
    }
    // Search that the given query exists, and get the docs
    login(username, password, (docs, DOC) => {
      console.log(docs) 
      if (docs === {}) {
          console.log("Have not even signed up yet");
          return;
      }
      
      // If this exists, then the folder already exists, update the current data
   
      // needs a new Document, so create and add a new folder and insert the data
      // Add new Data Element 
      let new_data = docs
      
      // Now, just grab all other folders and append onto it 
      
      
      new_data[`${folder_name}`] =  {
          entry_name: entry_name,
          photo_preview: photo_preview,
          text_data: text_data
      }
      
      const docRef = doc(db, 'users', DOC.id);

      // Update the timestamp field with the value from the server
      updateDoc(docRef, new_data);
    });
    
}
