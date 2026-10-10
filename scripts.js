script.js
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
symptomList.innerHTML = symptoms.map(function(item) {
return "<li>" + item.symptom +
' <button onclick="deleteSymptom(\'' +
item.id + "')\">Delete</button></li>";
 }).join("");
 } catch (error) {
console.error("Error getting symptoms:", error);
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
window.deleteSymptom = deleteSymptom;
getSymptoms();