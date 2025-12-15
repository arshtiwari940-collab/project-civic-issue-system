//Chart.js static graph
const ctx = document.getElementById('issueChart');
new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Pothole', 'Streetlight', 'Garbage', 'Water Supply', 'Other'],
    datasets: [{
      label: 'Reported Cases',
      data: [15, 10, 20, 8, 5],
      backgroundColor: '#007bff'
    }]
  },
  options: {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true } }
  }
});

// Handle form submission
const form = document.getElementById("issueForm");
const reportsDiv = document.getElementById("reports");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
 console.log(formData)
  const res = await fetch("http://localhost:5000/api/issues", {
    method: "POST",
    body: formData
  });

  const data = await res.json();
  alert("Issue reported successfully!");
  form.reset();
  loadReports();
});

async function loadReports() {
  const res = await fetch("http://localhost:5000/api/issues");
  const issues = await res.json();

  reportsDiv.innerHTML = "<h2>Submitted Issues</h2>";

  issues.forEach(issue => {
    const card = document.createElement("div");
    card.classList.add("report-card");
    card.innerHTML = `
      <h3>${issue.category} - ${issue.location}</h3>
      <p><strong>Reported by:</strong> ${issue.name} (${issue.email})</p>
      <p><em>${new Date(issue.createdAt).toLocaleString()}</em></p>
      <p>${issue.details}</p>
      ${issue.image ? `<img src="http://localhost:5000/uploads/${issue.image}" />` : ""}
    `;
    reportsDiv.appendChild(card);
  });
}

loadReports();
