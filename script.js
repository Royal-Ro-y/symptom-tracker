import { db } from "./firebase.js";
import {
collection,
addDoc,
getDocs,
deleteDoc,
doc,
updateDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
const symptomInput = document.getElementById("symptomInput");
const symptomList = document.getElementById("symptomList");
async function saveSymptom() {
const symptom = symptomInput.value.trim();
if (symptom === "") {
alert("PLease enter a symptom");
return;
 }
try {
await addDoc(
collection(db, "symptoms"),
 {
symptom: symptom,
createdAt: new Date().toISOString()
 }
 );
symptomInput.value = "";
await getSymptoms();
 } catch (error) {
console.error(error);
 }
}
window.saveSymptom = saveSymptom;
async function getSymptoms() {
 try {
const querySnapshot = await getDocs(
collection(db, "symptoms")
 );
const symptoms = querySnapshot.docs.map(function(document) {
return {
id: document.id,
symptom: document.data().symptom
 };
 });
symptomList.replaceChildren(...symptoms.map(function(item) {
const listItem = document.createElement("li");
const symptomText = document.createElement("span");
const actions = document.createElement("div");
const editButton = document.createElement("button");
const deleteButton = document.createElement("button");

symptomText.textContent = item.symptom;
actions.className = "symptom-actions";

editButton.type = "button";
editButton.textContent = "Edit";
editButton.addEventListener("click", function() {
editSymptom(item.id, item.symptom);
});

deleteButton.type = "button";
deleteButton.textContent = "Delete";
deleteButton.addEventListener("click", function() {
deleteSymptom(item.id);
});

actions.append(editButton, deleteButton);
listItem.append(symptomText, actions);
return listItem;
}));
 } catch (error) {
console.error("Error getting symptoms:", error);
 }
}
async function editSymptom(id, currentSymptom) {
const updatedSymptom = prompt("Edit symptom:", currentSymptom);
if (updatedSymptom === null) {
return;
}
if (updatedSymptom.trim() === "") {
alert("Please enter a symptom");
return;
}
try {
await updateDoc(
doc(db, "symptoms", id),
{ symptom: updatedSymptom.trim() }
);
await getSymptoms();
} catch (error) {
console.error("Error updating symptom:", error);
}
}
async function deleteSymptom(id) {
 try {
await deleteDoc(
doc(db, "symptoms", id)
 );
await getSymptoms();
 } catch (error) {
console.error("Error deleting symptom:", error);
 }
}
getSymptoms();