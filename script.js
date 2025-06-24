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

function loadEntries(filteredEntries = null) {
  const entries = filteredEntries || JSON.parse(localStorage.getItem("journalEntries")) || [];
  const entriesList = document.getElementById("entriesList");
  entriesList.innerHTML = "";

  if (entries.length === 0) {
    entriesList.innerHTML = "<li>No matching entries found.</li>";
    return;
  }

  entries.forEach((entry) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${entry.time}</strong><br>${entry.text}<hr>`;
    entriesList.appendChild(li);
  });
}


  let entries = JSON.parse(localStorage.getItem("journalEntries")) || [];

  const filtered = entries.filter((entry) => {
    const textMatch = keyword ? entry.text.toLowerCase().includes(keyword) : true;
    return textMatch;
  });

  loadEntries(filtered);
}

function clearSearch() {
  document.getElementById("searchKeyword").value = "";
  document.getElementById("searchDate").value = "";
  loadEntries(); // reload all entries
}

window.onload = loadEntries;
