"use client"

import { useState } from "react"
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes} from "firebase/storage"


const firebaseConfig = {
  apiKey: "AIzaSyDSNJ3eyuZr6wN9k94gwVSYyUp0NXHkHqk",
  authDomain: "my-first-firestore-me.firebaseapp.com",
  projectId: "my-first-firestore-me",
  storageBucket: "my-first-firestore-me.appspot.com",
  messagingSenderId: "319055119181",
  appId: "1:319055119181:web:d97224476de57536392d04"
};

export default function Home() {
  const [file, setFile] = useState()
  const [uploadedFile, setUploadedFile] = useState()
  const handleFile = (e) => {
    console.log(e.target.files[0])
    setFile(e.target.files[0])
    // connect to storage
    const app = initializeApp(firebaseConfig); // connects to our project
    const storage = getStorage(app) //connects to storage
    // create a reference to our file in storage using file name
    const filename = e.target.files[0].name
    const imageRef = ref(storage, 'photos/' + filename)
    // use Todd's hack to get the url for that file
    const url = `https://firebasestorage.googleapis.com/v0/b/my-first-firestore-me.appspot.com/o/photos%2F${filename}?alt=media`
    // upload
    uploadBytes(imageRef, e.target.files[0])
    .then(() => setUploadedFile(url))
    .catch(alert)
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     <h1 className="text-3xl font-bold">Upload a Photo</h1>
     <input type="file" accept="image/*" onChange={handleFile} />
     {file &&
     <div className="w-1/2 h-1/2 rounded">
      <h2 className="text-xl font-semibold">Image from computer:</h2>
        <img src = {URL.createObjectURL(file)} className="object-cover"/>
     </div>
     }
     {uploadedFile &&
     <div className="w-1/2 h-1/2 rounded">
      <h2 className="text-xl font-semibold">Image from storage:</h2>
        <img src = {uploadedFile} className="object-cover"/>
     </div>
     }
    </main>
  )
}
