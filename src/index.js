import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { firebaseConfig } from "./library/config.js";
import { getStorage } from "firebase/storage";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const storage = getStorage(app);
const usersRef = ref(db, "users/");
onValue(usersRef, (snapshot) => {
  const data = snapshot.val();
  console.log(data);
});

function writeUserData(userId, name, email, gender) {
  set(ref(db, "users/" + userId), {
    name,
    email,
    gender,
  })
    .then(() => console.log("user add done successfully"))
    .catch(() => console.log("adding user error"));
}

writeUserData(4, "AungMya", "tedlkfj@gmail.com", "male");
writeUserData(5, "Nay Gyi", "dfkjlkf@getMultiFactorResolver.com", "male");

document.getElementById("saveUser").addEventListener("click", creatUser);

function creatUser() {
  let name = document.getElementById("username").value;
  let email = document.getElementById("email").value;
  let gender = document.getElementById("gender").value;

  if (!name || !email || !gender) {
    alert("All fields are required!");
    return;
  }

  const data = {
    name,
    email,
    gender,
  };
  const newUserRef = push(usersRef);
  set(newUserRef, data)
    .then(() => {
      console.log("User added successfully");
      // Clear the input fields
      document.getElementById("username").value = "";
      document.getElementById("email").value = "";
      document.getElementById("gender").value = "";
    })
    .catch((error) => {
      console.error("Error adding user: ", error);
    });
}
