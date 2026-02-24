

document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("leadForm");
  const leadList = document.getElementById("leadList");

  let editId = null;

  // ================= FETCH LEADS =================
  async function fetchLeads() {
    const res = await fetch("http://localhost:5000/api/leads");
    const leads = await res.json();

    leadList.innerHTML = "";

    leads.forEach((lead) => {

      // Main Card Div
      const div = document.createElement("div");
      div.classList.add("lead-card");   
      // Lead Info
      div.innerHTML = `
        <strong>${lead.name}</strong>
        <p>${lead.email}</p>
        <p>${lead.phone}</p>
      `;

      // Actions Div (Edit + Delete)
      const actionsDiv = document.createElement("div");
      actionsDiv.classList.add("lead-actions");   

      const editBtn = document.createElement("button");
      editBtn.innerText = "Edit";
      editBtn.classList.add("edit");
      editBtn.setAttribute("data-id", lead._id);

      const deleteBtn = document.createElement("button");
      deleteBtn.innerText = "Delete";
      deleteBtn.classList.add("delete");
      deleteBtn.setAttribute("data-id", lead._id);

      actionsDiv.appendChild(editBtn);
      actionsDiv.appendChild(deleteBtn);

      div.appendChild(actionsDiv);

      leadList.appendChild(div);
    });
  }

  // ================= FORM SUBMIT =================
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;

    if (editId) {
      await fetch(`http://localhost:5000/api/leads/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone })
      });
      editId = null;
    } else {
      await fetch("http://localhost:5000/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone })
      });
    }

    form.reset();
    fetchLeads();
  });

  // ================= DELETE + EDIT =================
  leadList.addEventListener("click", async function (e) {

    if (e.target.classList.contains("delete")) {
      const id = e.target.getAttribute("data-id");

      await fetch(`http://localhost:5000/api/leads/${id}`, {
        method: "DELETE"
      });

      fetchLeads();
    }

    if (e.target.classList.contains("edit")) {
      const id = e.target.getAttribute("data-id");

      const res = await fetch("http://localhost:5000/api/leads");
      const leads = await res.json();
      const lead = leads.find(l => l._id === id);

      document.getElementById("name").value = lead.name;
      document.getElementById("email").value = lead.email;
      document.getElementById("phone").value = lead.phone;

      editId = id;
    }

  });

  // Initial Load
  fetchLeads();

});