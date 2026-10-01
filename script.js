const pages = ["home","detect","legal","evidence","support"];

function showPage(id){
  pages.forEach(p => document.getElementById(p).classList.remove("active"));
  document.getElementById(id).classList.add("active");
  window.scrollTo({top:0,behavior:"smooth"});
}

function toggleNav(){
  const nav = document.querySelector("nav");
  nav.style.display = nav.style.display === "flex" ? "" : "flex";
  nav.style.position = "absolute";
  nav.style.top = "76px";
  nav.style.right = "5%";
  nav.style.background = "#fff";
  nav.style.padding = "10px";
  nav.style.borderRadius = "14px";
  nav.style.boxShadow = "0 10px 30px rgba(20,50,90,.12)";
  nav.style.flexDirection = "column";
}

const mediaInput = document.getElementById("mediaInput");
const preview = document.getElementById("preview");
const uploadContent = document.getElementById("uploadContent");
const analyzeBtn = document.getElementById("analyzeBtn");
const analysis = document.getElementById("analysis");
const analysisImage = document.getElementById("analysisImage");

mediaInput.addEventListener("change", () => {
  const file = mediaInput.files[0];
  if(!file) return;
  const url = URL.createObjectURL(file);
  preview.src = url;
  preview.style.display = "block";
  uploadContent.style.display = "none";
  analysisImage.src = url;
  analyzeBtn.disabled = false;
});

function runDemoAnalysis(){
  if(!mediaInput.files[0]) return;
  analysis.classList.remove("hidden");
  document.getElementById("analysisText").innerHTML =
    `<div class="notice" style="margin-top:18px"><b>Analyzing…</b><br>Checking the selected file for demonstration purposes.</div>`;
  setTimeout(() => {
    document.getElementById("analysisText").innerHTML = `
      <div class="result">
        <h3>⚠ Possible manipulation indicators</h3>
        <p><b>Demo screening result:</b> suspicious indicators detected.</p>
        <p>This is a prototype result. It does <b>not</b> prove that the image is fake or establish an exact percentage of manipulation.</p>
        <ul>
          <li>Inconsistent visual patterns</li>
          <li>Possible texture/compression anomalies</li>
          <li>Context should be checked against the original source</li>
        </ul>
        <div class="confidence"><i></i></div>
        <small>Illustrative confidence bar — not a real forensic score.</small>
        <br><br>
        <button class="primary" onclick="showPage('legal')">View legal guidance →</button>
      </div>`;
  }, 1800);
}

function saveEvidence(){
  const date = document.getElementById("incidentDate").value || "Not provided";
  const platform = document.getElementById("platform").value || "Not provided";
  const url = document.getElementById("sourceUrl").value || "Not provided";
  const notes = document.getElementById("notes").value || "Not provided";
  document.getElementById("recordOutput").innerHTML = `
    <div class="record-line"><b>Date:</b> ${escapeHtml(date)}</div>
    <div class="record-line"><b>Platform:</b> ${escapeHtml(platform)}</div>
    <div class="record-line"><b>Original link:</b> ${escapeHtml(url)}</div>
    <div class="record-line"><b>Notes:</b><br>${escapeHtml(notes).replace(/\n/g,"<br>")}</div>
    <p class="notice">Demo only: this record is not uploaded to a server. A production version should use encrypted storage and an appropriate privacy/security design.</p>`;
}

function escapeHtml(value){
  return String(value).replace(/[&<>"']/g, c => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  }[c]));
}
