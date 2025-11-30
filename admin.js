// Admin functionality
document.addEventListener('DOMContentLoaded', function() {
    const currentUser = StorageManager.getCurrentUser();
    
    // Check if user is admin
    if (!currentUser || currentUser.username !== 'admin') {
        alert('Accès refusé. Vous devez être administrateur.');
        window.location.href = 'index.html';
        return;
    }
    
    // Navigation
    const navItems = document.querySelectorAll('.nav-item[data-admin-page]');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const page = this.getAttribute('data-admin-page');
            switchAdminPage(page);
        });
    });
    
    // Back to webmail
    const backBtn = document.getElementById('backToWebmail');
    if (backBtn) {
        backBtn.addEventListener('click', function() {
            window.location.href = 'dashboard.html';
        });
    }
    
    // Logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            StorageManager.logout();
            window.location.href = 'index.html';
        });
    }
    
    // Add user button
    const addUserBtn = document.getElementById('addUserBtn');
    if (addUserBtn) {
        addUserBtn.addEventListener('click', function() {
            openUserModal();
        });
    }
    
    // Modal handlers
    const modal = document.getElementById('userModal');
    const modalClose = document.querySelector('.modal-close');
    const cancelBtn = document.querySelector('.btn-cancel');
    
    if (modalClose) {
        modalClose.addEventListener('click', closeUserModal);
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', closeUserModal);
    }
    
    // User form
    const userForm = document.getElementById('userForm');
    if (userForm) {
        userForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveUser();
        });
    }
    
    // Load users by default
    loadUsers();
});

function switchAdminPage(page) {
    // Update active nav
    document.querySelectorAll('.nav-item[data-admin-page]').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`.nav-item[data-admin-page="${page}"]`).classList.add('active');
    
    // Update active panel
    document.querySelectorAll('.admin-panel').forEach(panel => {
        panel.classList.remove('active');
    });
    
    // Update title
    const titles = {
        'users': 'Gestion des Utilisateurs',
        'emails': 'Gestion des Emails',
        'settings': 'Paramètres'
    };
    document.getElementById('adminPageTitle').textContent = titles[page] || 'Administration';
    
    // Show appropriate panel
    switch(page) {
        case 'users':
            document.getElementById('usersPanel').classList.add('active');
            loadUsers();
            break;
        case 'emails':
            document.getElementById('emailsPanel').classList.add('active');
            loadEmails();
            break;
        case 'settings':
            document.getElementById('settingsPanel').classList.add('active');
            loadSettings();
            break;
    }
}

function loadUsers() {
    const users = StorageManager.getUsers();
    const tbody = document.getElementById('usersTableBody');
    
    if (users.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 40px; color: var(--text-secondary);">Aucun utilisateur</td></tr>';
        return;
    }
    
    tbody.innerHTML = users.map(user => `
        <tr>
            <td>${user.id}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${'*'.repeat(user.password.length)}</td>
            <td>${new Date(user.createdAt).toLocaleDateString()}</td>
            <td>
                <button class="action-btn" onclick="editUser(${user.id})">Modifier</button>
                <button class="action-btn delete" onclick="deleteUser(${user.id})">Supprimer</button>
            </td>
        </tr>
    `).join('');
}

function loadEmails() {
    const emails = StorageManager.getEmails();
    const tbody = document.getElementById('emailsTableBody');
    
    if (emails.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 40px; color: var(--text-secondary);">Aucun email</td></tr>';
        return;
    }
    
    tbody.innerHTML = emails.map(email => `
        <tr>
            <td>${email.id || '-'}</td>
            <td>${email.from}</td>
            <td>${email.to}</td>
            <td>${email.subject}</td>
            <td>${new Date(email.date).toLocaleDateString()}</td>
            <td>
                <button class="action-btn delete" onclick="deleteEmail(${email.id})">Supprimer</button>
            </td>
        </tr>
    `).join('');
}

function loadSettings() {
    // Settings are loaded from the HTML form
    // You can add logic to load saved settings from localStorage if needed
}

function openUserModal(userId = null) {
    const modal = document.getElementById('userModal');
    const form = document.getElementById('userForm');
    const title = document.getElementById('modalTitle');
    
    if (userId) {
        // Edit mode
        const users = StorageManager.getUsers();
        const user = users.find(u => u.id == userId);
        if (user) {
            title.textContent = 'Modifier un utilisateur';
            document.getElementById('userId').value = user.id;
            document.getElementById('modalUsername').value = user.username;
            document.getElementById('modalEmail').value = user.email;
            document.getElementById('modalPassword').value = '';
            document.getElementById('modalPasswordConfirm').value = '';
            document.getElementById('modalPassword').required = false;
            document.getElementById('modalPasswordConfirm').required = false;
        }
    } else {
        // Add mode
        title.textContent = 'Ajouter un utilisateur';
        form.reset();
        document.getElementById('userId').value = '';
        document.getElementById('modalPassword').required = true;
        document.getElementById('modalPasswordConfirm').required = true;
    }
    
    modal.classList.add('active');
}

function closeUserModal() {
    const modal = document.getElementById('userModal');
    modal.classList.remove('active');
    document.getElementById('userForm').reset();
}

function saveUser() {
    const userId = document.getElementById('userId').value;
    const username = document.getElementById('modalUsername').value;
    const email = document.getElementById('modalEmail').value;
    const password = document.getElementById('modalPassword').value;
    const passwordConfirm = document.getElementById('modalPasswordConfirm').value;
    
    if (password && password !== passwordConfirm) {
        alert('Les mots de passe ne correspondent pas');
        return;
    }
    
    const users = StorageManager.getUsers();
    
    if (userId) {
        // Edit existing user
        const userIndex = users.findIndex(u => u.id == userId);
        if (userIndex !== -1) {
            users[userIndex].username = username;
            users[userIndex].email = email;
            if (password) {
                users[userIndex].password = password;
            }
        }
    } else {
        // Add new user
        const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
        users.push({
            id: newId,
            username: username,
            email: email,
            password: password,
            createdAt: new Date().toISOString()
        });
    }
    
    StorageManager.saveUsers(users);
    loadUsers();
    closeUserModal();
}

function editUser(userId) {
    openUserModal(userId);
}

function deleteUser(userId) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
        const users = StorageManager.getUsers();
        const filteredUsers = users.filter(u => u.id != userId);
        StorageManager.saveUsers(filteredUsers);
        loadUsers();
    }
}

function deleteEmail(emailId) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet email ?')) {
        const emails = StorageManager.getEmails();
        const filteredEmails = emails.filter(e => e.id != emailId);
        StorageManager.saveEmails(filteredEmails);
        loadEmails();
    }
}

// Make functions available globally
window.editUser = editUser;
window.deleteUser = deleteUser;
window.deleteEmail = deleteEmail;


