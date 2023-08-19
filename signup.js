
import {auth, app, db, getFirestore, collection, addDoc, setDoc, doc, getAuth, createUserWithEmailAndPassword} from './firebaseConfig.js'

const username = document.querySelector('#username')
const firstName = document.querySelector('#firstName')
const lastName = document.querySelector('#lastName')
const email = document.querySelector('#email')
const password = document.querySelector('#inputPassword')

const signupBtn = document.querySelector('#signup')

signupBtn.addEventListener('click', signupHandler)

async function signupHandler() {
    try {
        const response = await createUserWithEmailAndPassword(auth, email.value, password.value)

        // console.log(response, "==>>response")

        if (response.user) {
            addUserHandler(response.user.uid)
        }
    } catch (error) {
        console.log(error)
    }
   
}

async function addUserHandler(uid) {
    try {
        const response = await setDoc(doc(db, "users", uid), {
            // firstName: firstName.value,
            // lastName: lastName.value,
            // userName: username.value,
            // email: email.value,
        });

        window.location.href = 'login.html'
    } catch (e) {
        console.log("Error adding document: ", e);
    }
}