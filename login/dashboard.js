import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import {
    getFirestore, collection, addDoc, setDoc, doc, query, where, orderBy, getDocs, getDoc, deleteDoc, updateDoc, serverTimestamp 
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAXF_Ir8UtixTsy0ioa0WK-qJyZX2l79ho",
    authDomain: "mini-hackathon-ba799.firebaseapp.com",
    projectId: "mini-hackathon-ba799",
    storageBucket: "mini-hackathon-ba799.appspot.com",
    messagingSenderId: "19783936855",
    appId: "1:19783936855:web:a263d637b8e58cef37ec12"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);


export {
    auth,
    app,
    db,
    getFirestore,
    collection,
    addDoc,
    setDoc,
    doc,
    getDoc,
    getAuth,
    createUserWithEmailAndPassword,
    query,
    where,
    getDocs,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    storage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
    deleteDoc,
    updateDoc,
    orderBy,
    serverTimestamp,
};


document.addEventListener('click', function() {
    const profileButton = document.querySelector('#profile-button');
  
    profileButton.addEventListener('click', gotoprofilepage);
  
    async function gotoprofilepage() {
        window.location.href = "profile.html";
      
    }

})


document.addEventListener('click', function() {
    const logoutButton = document.querySelector('#logout-button');
  
    logoutButton.addEventListener('click', gotologinpage);
  
    async function gotologinpage() {
        window.location.href = "login.html";
      
    }

})


const currentUser = auth().currentUser;

if (currentUser) {
    // Display user's full name
    document.getElementById("user-full-name").textContent = currentUser.displayName;

    // Logout button
    const logoutButton = document.getElementById("logout-button");
    logoutButton.addEventListener("click", () => {
        signOut().then(() => {
            window.location.href = "login.html";
        });
    });

   
    const newBlogForm = document.getElementById("new-blog-form");
    newBlogForm.addEventListener("submit", async (e) => {

        const blogTitle = newBlogForm["blog-title"].value;
        const blogBody = newBlogForm["blog-body"].value;
        const publishDate = new Date();

        try {
            await db.collection("blogs").add({
                userId: currentUser.uid,
                title: blogTitle,
                body: blogBody,
                publishDate: publishDate
            });

            newBlogForm.reset();
        } catch (error) {
            console.error("Error adding blog post:", error);
        }
    });


    const blogList = document.getElementById("blog-list");
    db.collection("blogs")
        .where("userId", "==", currentUser.uid)
        .orderBy("publishDate", "desc")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const blogData = doc.data();
                const li = document.createElement("li");
                li.innerHTML = `<h3>${blogData.title}</h3>
                    <p>${blogData.body}</p>
                    <p>Publish Date: ${blogData.publishDate.toDate().toLocaleString()}</p>
                    <button class="update-blog">Update</button>
                    <button class="delete-blog">Delete</button>`;
                blogList.appendChild(li);

                // Update blog post
                const updateButton = li.querySelector(".update-blog");
                updateButton.addEventListener("click", () => {
                    // Implement update logic here
                });

                // Delete blog post
                const deleteButton = li.querySelector(".delete-blog");
                deleteButton.addEventListener("click", () => {
                    const confirmDelete = window.confirm("Are you sure you want to delete this blog post?");
                    if (confirmDelete) {
                        // Implement delete logic here
                    }
                });
            });
        })
        .catch((error) => {
            console.error("Error fetching blogs:", error);
        });
} else {
    // User is not logged in, redirect to login page
    window.location.href = "login.html";
}
