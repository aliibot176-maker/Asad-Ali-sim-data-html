
// SIM DATABASE LOGIC
const searchBtn = document.getElementById("searchBtn");
const phoneInput = document.getElementById("phoneInput");
const phoneError = document.getElementById("phoneError");
const loadingArea = document.getElementById("loadingArea");
const resultArea = document.getElementById("resultArea");

searchBtn.addEventListener("click", async () => {
  const phone = phoneInput.value.trim();
  if (!phone) {
    phoneError.style.display = "block";
    return;
  }
  phoneError.style.display = "none";
  resultArea.innerHTML = "";
  loadingArea.classList.remove("hidden");

  try {
    const res = await fetch(`/api/search?phone=${phone}`);
    const data = await res.json();
    loadingArea.classList.add("hidden");

    if (data.records && data.records.length > 0) {
      data.records.forEach((record) => {
        const card = document.createElement("div");
        card.className = `p-6 rounded-xl shadow-2xl bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 text-white border border-white/20`;
        card.innerHTML = `
          <p class="mb-1"><strong>👤 Name:</strong> ${record.Name || "N/A"}</p>
          <p class="mb-1"><strong>📱 Mobile:</strong> ${record.Mobile || "N/A"}</p>
          <p class="mb-1"><strong>🌍 Country:</strong> ${record.Country || "N/A"}</p>
          <p class="mb-1"><strong>🆔 CNIC:</strong> ${record.CNIC || "N/A"}</p>
          <p class="mb-3"><strong>🏠 Address:</strong> ${record.Address || "N/A"}</p>
          <button onclick="copyDetails(this)" class="px-4 py-2 rounded-lg bg-black/40 hover:bg-black/60 text-white">📋 Copy</button>
        `;
        resultArea.appendChild(card);
      });
    } else {
      resultArea.innerHTML = `<p class="text-red-300 font-semibold text-center">❌ No record found.</p>`;
    }
  } catch (error) {
    loadingArea.classList.add("hidden");
    resultArea.innerHTML = `<p class="text-red-300 font-semibold text-center">⚠️ Error fetching data.</p>`;
  }
});

// ✅ Copy function
function copyDetails(btn){
  const text = btn.parentElement.innerText;
  navigator.clipboard.writeText(text);
  btn.innerText = "✅ Copied!";
  setTimeout(()=>{ btn.innerText="📋 Copy"; },2000);
}
