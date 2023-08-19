import {
    storage, ref, uploadBytesResumable, doc,
    db, getDoc, auth, onAuthStateChanged, getDownloadURL, setDoc
} from "/firebaseConfig.js"

const currentUser = auth().currentUser;
if (currentUser) {
    const profileForm = document.getElementById("profile-form");
    const profilePhotoInput = document.getElementById("profile-photo");
    const firstNameInput = document.getElementById("first-name");
    const lastNameInput = document.getElementById("last-name");
    const newPasswordInput = document.getElementById("new-password");

    // Populate profile information
    profilePhotoInput.value = "";
    firstNameInput.value = currentUser.displayName.split(" ")[0];
    lastNameInput.value = currentUser.displayName.split(" ")[1];

    profileForm.addEventListener("submit", async (e) => {

        const newFirstName = firstNameInput.value;
        const newLastName = lastNameInput.value;
        const newPhoto = profilePhotoInput.files[0];
        const newPassword = newPasswordInput.value;

        try {
            // Update profile display name
            await currentUser.updateProfile({
                displayName: `${newFirstName} ${newLastName}`
            });

            // Update profile photo
            if (newPhoto) {
                const storageRef = firebase.storage().ref(`profile-photos/${currentUser.uid}`);
                const photoSnapshot = await storageRef.put(newPhoto);
                const photoURL = await photoSnapshot.ref.getDownloadURL();
                await currentUser.updateProfile({
                    photoURL: photoURL
                });
            }

            // Update password if provided
            if (newPassword) {
                await currentUser.updatePassword(newPassword);
            }

            alert("Profile updated successfully!");
        } catch (error) {
            console.log("Error updating profile:", error);
        }
    });
} else {
    // User is not logged in, redirect to login page
    window.location.href = "login.html";
}
