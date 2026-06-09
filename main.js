function getBadge(status) {
    const map = {
        'Applied':   ['b-applied',   '#185FA5'],
        'Interview': ['b-interview', '#854F0B'],
        'Offer':     ['b-offer',     '#3B6D11'],
        'Rejected':  ['b-rejected',  '#A32D2D'],
    };
    const [cls, dotColor] = map[status] || ['b-applied', '#185FA5'];
    return `<span class="jt-badge ${cls}"><span class="jt-dot" style="background:${dotColor}"></span>${status}</span>`;
}

let allJobs = [];

function loadJobs() {
    fetch("api/get-job.php")
        .then(res => res.json())
        .then(jobs => {
            allJobs = jobs;
            updateStats(jobs);
            renderTable(jobs);
        })
        .catch(err => console.error("Error:", err));
}

function updateStats(jobs) {
    document.getElementById("statTotal").textContent    = jobs.length;
    document.getElementById("statInterview").textContent = jobs.filter(j => j.status === 'Interview').length;
    document.getElementById("statOffer").textContent     = jobs.filter(j => j.status === 'Offer').length;
    document.getElementById("statRejected").textContent  = jobs.filter(j => j.status === 'Rejected').length;
}

function renderTable(jobs) {
    const tbody = document.getElementById("jobList");
    tbody.innerHTML = "";

    if (jobs.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" class="jt-empty">No applications yet. <a href="add-job.html">Add one!</a></td></tr>`;
        return;
    }

    jobs.forEach(job => {
        tbody.innerHTML += `
        <tr>
            <td>
                <div class="jt-company">${job.company}</div>
                <div class="jt-role">${job.role}</div>
            </td>
            <td>
                <select class="jt-select" onchange="updateStatus(${job.id}, this.value)">
                    ${["Applied","Interview","Offer","Rejected"].map(s =>
                        `<option ${job.status === s ? "selected" : ""}>${s}</option>`
                    ).join("")}
                </select>
            </td>
            <td>${job.apply_date}</td>
            <td>${job.deadline || "—"}</td>
            <td>${job.job_link ? `<a href="${job.job_link}" target="_blank" style="color:#1D9E75;font-size:13px"><i class="ti ti-external-link"></i> View</a>` : "—"}</td>
            <td style="max-width:150px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${job.notes || "—"}</td>
            <td>
                <button class="jt-delbtn" onclick="deleteJob(${job.id})"><i class="ti ti-trash"></i></button>
            </td>
        </tr>`;
    });
}

function filterJobs(status, btn) {
    document.querySelectorAll('.jt-chip').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    const filtered = status === 'All' ? allJobs : allJobs.filter(j => j.status === status);
    renderTable(filtered);
}

function addJob() {
    const company    = document.getElementById("company").value.trim();
    const role       = document.getElementById("role").value.trim();
    const status     = document.getElementById("status").value;
    const apply_date = document.getElementById("apply_date").value;
    const deadline   = document.getElementById("deadline").value;
    const job_link   = document.getElementById("job_link").value.trim();
    const notes      = document.getElementById("notes").value.trim();

    if (!company || !role || !apply_date) {
        alert("Please fill in Company, Role, and Apply Date.");
        return;
    }

    fetch("api/add-job.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ company, role, status, apply_date, deadline, job_link, notes })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            alert("✅ Application saved!");
            window.location.href = "index.html";
        } else {
            alert("Error: " + data.error);
        }
    });
}

function updateStatus(id, status) {
    fetch("api/update-status.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status })
    });
}

function deleteJob(id) {
    if (!confirm("Delete this application?")) return;
    fetch("api/delete-job.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
    })
    .then(res => res.json())
    .then(data => { if (data.success) loadJobs(); });
}

if (document.getElementById("jobList")) {
    loadJobs();
}