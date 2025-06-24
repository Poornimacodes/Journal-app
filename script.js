function saveEntry() {
  const entryText = document.getElementById("entry").value.trim();
  if (!entryText) return alert("Please write something!");

  const timestamp = new Date().toLocaleString();
  const entry = { text: entryText, time: timestamp };

  // Get existing entries
  let entries = JSON.parse(localStorage.getItem("journalEntries")) || [];
  entries.unshift(entry); // Add new one on top
  localStorage.setItem("journalEntries", JSON.stringify(entries));

  document.getElementById("entry").value = "";
  loadEntries();
}

function loadEntries() {
  const entries = JSON.parse(localStorage.getItem("journalEntries")) || [];
  const entriesList = document.getElementById("entriesList");
  entriesList.innerHTML = "";

  entries.forEach((entry) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${entry.time}</strong><br>${entry.text}<hr>`;
    entriesList.appendChild(li);
  });
}

window.onload = loadEntries;
