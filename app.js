// Storage Management
class StorageManager {
    static init() {
        if (!localStorage.getItem('users')) {
            // Default admin user
            const defaultUsers = [
                {
                    id: 1,
                    username: 'admin',
                    email: 'admin@example.com',
                    password: 'admin123',
                    createdAt: new Date().toISOString()
                }
            ];
            localStorage.setItem('users', JSON.stringify(defaultUsers));
        }
        
        if (!localStorage.getItem('emails')) {
            localStorage.setItem('emails', JSON.stringify([]));
        }
        
        if (!localStorage.getItem('currentUser')) {
            localStorage.setItem('currentUser', null);
        }
    }
    
    static getUsers() {
        return JSON.parse(localStorage.getItem('users') || '[]');
    }
    
    static saveUsers(users) {
        localStorage.setItem('users', JSON.stringify(users));
    }
    
    static getEmails() {
        return JSON.parse(localStorage.getItem('emails') || '[]');
    }
    
    static saveEmails(emails) {
        localStorage.setItem('emails', JSON.stringify(emails));
    }
    
    static getCurrentUser() {
        const userId = localStorage.getItem('currentUser');
        if (!userId) return null;
        const users = this.getUsers();
        return users.find(u => u.id == userId) || null;
    }
    
    static setCurrentUser(userId) {
        localStorage.setItem('currentUser', userId);
    }
    
    static logout() {
        localStorage.setItem('currentUser', null);
    }
}

// Initialize storage on load
StorageManager.init();

// Login functionality
if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        const users = StorageManager.getUsers();
        const user = users.find(u => 
            (u.username === username || u.email === username) && 
            u.password === password
        );
        
        if (user) {
            StorageManager.setCurrentUser(user.id);
            // Check if admin (username is 'admin')
            if (user.username === 'admin') {
                window.location.href = 'admin.html';
            } else {
                window.location.href = 'dashboard.html';
            }
        } else {
            alert('Nom d\'utilisateur ou mot de passe incorrect');
        }
    });
}

// Check authentication on dashboard and admin pages
if (window.location.pathname.includes('dashboard.html') || 
    window.location.pathname.includes('admin.html')) {
    const currentUser = StorageManager.getCurrentUser();
    if (!currentUser) {
        window.location.href = 'index.html';
    }
}

