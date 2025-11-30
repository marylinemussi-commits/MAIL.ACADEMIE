// Dashboard functionality
document.addEventListener('DOMContentLoaded', function() {
    const currentUser = StorageManager.getCurrentUser();
    
    if (currentUser) {
        document.getElementById('userEmail').textContent = currentUser.email;
    }
    
    // Navigation
    const navItems = document.querySelectorAll('.nav-item[data-page]');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const page = this.getAttribute('data-page');
            handlePageNavigation(page);
        });
    });
    
    // Folder navigation
    const folderItems = document.querySelectorAll('.nav-item[data-folder]');
    folderItems.forEach(item => {
        item.addEventListener('click', function() {
            const folder = this.getAttribute('data-folder');
            handleFolderNavigation(folder);
        });
    });
    
    // Light mode toggle
    const lightModeBtn = document.getElementById('lightModeBtn');
    if (lightModeBtn) {
        lightModeBtn.addEventListener('click', function() {
            alert('Mode clair non implémenté dans cette version');
        });
    }
    
    // Compose button
    const composeBtn = document.querySelector('.compose-btn');
    if (composeBtn) {
        composeBtn.addEventListener('click', function() {
            alert('Fonctionnalité de rédaction à venir');
        });
    }
    
    // Load inbox by default
    loadFolder('inbox');
});

function handlePageNavigation(page) {
    switch(page) {
        case 'contacts':
            showContacts();
            break;
        case 'settings':
            showSettings();
            break;
        case 'about':
            showAbout();
            break;
        default:
            loadFolder('inbox');
    }
}

function handleFolderNavigation(folder) {
    // Update active state
    document.querySelectorAll('.nav-item[data-folder]').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`.nav-item[data-folder="${folder}"]`).classList.add('active');
    
    loadFolder(folder);
}

function loadFolder(folder) {
    const contentArea = document.getElementById('contentArea');
    const emails = StorageManager.getEmails();
    
    // Filter emails by folder
    let folderEmails = [];
    switch(folder) {
        case 'inbox':
            folderEmails = emails.filter(e => e.folder === 'inbox' || !e.folder);
            break;
        case 'sent':
            folderEmails = emails.filter(e => e.folder === 'sent');
            break;
        case 'drafts':
            folderEmails = emails.filter(e => e.folder === 'drafts');
            break;
        case 'spam':
            folderEmails = emails.filter(e => e.folder === 'spam');
            break;
        case 'trash':
            folderEmails = emails.filter(e => e.folder === 'trash');
            break;
    }
    
    if (folderEmails.length === 0) {
        contentArea.innerHTML = `
            <div class="empty-state">
                <p>La liste est vide.</p>
            </div>
            <div class="illustration">
                <div class="illustration-sphere"></div>
                <div class="illustration-base">
                    <div class="illustration-base-top"></div>
                    <div class="illustration-base-front"></div>
                </div>
            </div>
        `;
    } else {
        // Display emails list
        const emailsHTML = folderEmails.map(email => `
            <div class="email-item" style="padding: 15px; border-bottom: 1px solid var(--border-color); cursor: pointer;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <strong style="color: var(--text-primary);">${email.from}</strong>
                        <p style="color: var(--text-secondary); margin-top: 5px;">${email.subject}</p>
                    </div>
                    <span style="color: var(--text-secondary); font-size: 12px;">${new Date(email.date).toLocaleDateString()}</span>
                </div>
            </div>
        `).join('');
        
        contentArea.innerHTML = `
            <div style="background-color: var(--bg-sidebar); border-radius: 4px; border: 1px solid var(--border-color);">
                ${emailsHTML}
            </div>
        `;
    }
}

function showContacts() {
    const contentArea = document.getElementById('contentArea');
    contentArea.innerHTML = `
        <div style="text-align: center; margin-top: 100px;">
            <h2 style="color: var(--text-primary); margin-bottom: 20px;">Contacts</h2>
            <p style="color: var(--text-secondary);">La liste est vide. Utiliser le bouton Créer pour ajouter un nouvel enregistrement.</p>
        </div>
        <div class="illustration">
            <div class="illustration-sphere"></div>
            <div class="illustration-base">
                <div class="illustration-base-top"></div>
                <div class="illustration-base-front"></div>
            </div>
        </div>
    `;
}

function showSettings() {
    const contentArea = document.getElementById('contentArea');
    contentArea.innerHTML = `
        <div style="background-color: var(--bg-sidebar); padding: 30px; border-radius: 4px; border: 1px solid var(--border-color);">
            <h2 style="color: var(--text-primary); margin-bottom: 30px;">Paramètres</h2>
            <div style="margin-bottom: 20px;">
                <h3 style="color: var(--text-primary); margin-bottom: 15px;">Préférences</h3>
                <div style="display: flex; flex-direction: column; gap: 15px;">
                    <div style="padding: 15px; background-color: var(--bg-dark); border-radius: 4px; cursor: pointer; border: 1px solid var(--border-color);">
                        <span style="color: var(--text-primary);">🖥️ Interface utilisateur</span>
                    </div>
                    <div style="padding: 15px; background-color: var(--bg-dark); border-radius: 4px; cursor: pointer; border: 1px solid var(--border-color);">
                        <span style="color: var(--text-primary);">✉️ Vue de la boîte de courriel</span>
                    </div>
                    <div style="padding: 15px; background-color: var(--bg-dark); border-radius: 4px; cursor: pointer; border: 1px solid var(--border-color);">
                        <span style="color: var(--text-primary);">📄 Affichage des courriels</span>
                    </div>
                    <div style="padding: 15px; background-color: var(--bg-dark); border-radius: 4px; cursor: pointer; border: 1px solid var(--border-color);">
                        <span style="color: var(--text-primary);">✈️ Rédaction de courriels</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function showAbout() {
    alert('Roundcube Webmail\nVersion 1.0.0');
}


