const API_URL = 'http://localhost:3000/api';

// --- FUNCIONES DE APOYO ---

const fetchPatients = async () => {
    const res = await fetch(`${API_URL}/patients`);
    const patients = await res.json();
    const tbody = document.getElementById('patientTableBody');
    tbody.innerHTML = patients.map(p => `
        <tr>
            <td>${p.id}</td>
            <td>${p.name}</td>
            <td>${p.email}</td>
            <td>
                <button onclick="editPatient(${p.id})" class="btn-edit">Edit</button>
                <button onclick="deletePatient(${p.id})" class="btn-delete">Delete</button>
            </td>
        </tr>
    `).join('');
};

// --- CRUD: CREAR Y ACTUALIZAR ---
document.getElementById('patientForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('patientId').value;
    const data = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value
    };

    const method = id ? 'PUT' : 'POST';
    const url = id ? `${API_URL}/patients/${id}` : `${API_URL}/patients`;

    await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    resetForm();
    fetchPatients();
});

// --- CRUD: EDITAR (Cargar datos al form) ---
window.editPatient = async (id) => {
    const res = await fetch(`${API_URL}/patients/${id}`);
    const p = await res.json();
    
    document.getElementById('patientId').value = p.id;
    document.getElementById('name').value = p.name;
    document.getElementById('email').value = p.email;
    document.getElementById('phone').value = p.phone;
    document.getElementById('address').value = p.address;
    
    document.getElementById('formTitle').innerText = "Editing Patient";
    document.getElementById('cancelBtn').style.display = "inline-block";
};

// --- CRUD: ELIMINAR ---
window.deletePatient = async (id) => {
    if (confirm('Are you sure?')) {
        await fetch(`${API_URL}/patients/${id}`, { method: 'DELETE' });
        fetchPatients();
    }
};

// --- CARGA MASIVA (BULK) ---
document.getElementById('uploadForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', document.getElementById('csvFile').files[0]);

    const status = document.getElementById('uploadStatus');
    status.innerText = "Processing CSV...";

    await fetch(`${API_URL}/bulk`, { method: 'POST', body: formData });
    status.innerText = "✅ Upload completed!";
    fetchPatients();
});

window.resetForm = () => {
    document.getElementById('patientForm').reset();
    document.getElementById('patientId').value = "";
    document.getElementById('formTitle').innerText = "Patient Details";
    document.getElementById('cancelBtn').style.display = "none";
};

// Carga inicial
fetchPatients();