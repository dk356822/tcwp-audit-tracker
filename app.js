// Enhanced Lifeguard Audit System with Monthly Statistics
class LifeguardAuditApp {
    constructor() {
        console.log('Initializing LifeguardAuditApp with Monthly Statistics');
        
        // Load complete system data
        this.loadSystemData();
        
        // Session management
        this.currentUser = null;
        this.sessionTimeout = 8 * 60 * 60 * 1000; // 8 hours
        this.sessionTimer = null;

        // UI state
        this.currentFilters = {
            lifeguards: { search: '', status: 'all', sort: 'name-asc' },
            audits: { search: '', type: 'all', result: 'all' },
            users: { search: '', role: 'all', status: 'all' },
            activity: { search: '', action: 'all' }
        };

        // Charts
        this.monthlyChart = null;

        this.init();
    }

    loadSystemData() {
        console.log('Loading enhanced system data...');
        
        // EXACT USERS from provided data - CASE SENSITIVE MATCHING
        this.users = [
            {
                id: 1, username: "Demetrius Lopez", role: "SENIOR_ADMIN", password: "demetrius2025", 
                active: true, created_by: "System", created_date: "2025-01-01", last_login: "2025-10-04",
                individual_permissions: {
                    can_manage_users: true, can_create_users: true, can_deactivate_users: true,
                    can_edit_all_audits: true, can_view_all_audits: true, can_create_audits: true,
                    can_manage_lifeguards: true, can_view_activity_log: true, can_view_admin_metrics: true,
                    can_export_data: true, can_modify_permissions: true
                }
            },
            {
                id: 2, username: "Asael Gomez", role: "ADMIN", password: "asael2025",
                active: true, created_by: "Demetrius Lopez", created_date: "2025-01-15", last_login: "2025-10-03",
                individual_permissions: {
                    can_manage_users: false, can_create_users: false, can_deactivate_users: false,
                    can_edit_all_audits: true, can_view_all_audits: true, can_create_audits: true,
                    can_manage_lifeguards: true, can_view_activity_log: true, can_view_admin_metrics: false,
                    can_export_data: true, can_modify_permissions: false
                }
            },
            {
                id: 3, username: "Matthew Hills", role: "ADMIN", password: "matthew2025",
                active: true, created_by: "Demetrius Lopez", created_date: "2025-01-15", last_login: "2025-10-02",
                individual_permissions: {
                    can_manage_users: false, can_create_users: false, can_deactivate_users: false,
                    can_edit_all_audits: true, can_view_all_audits: true, can_create_audits: true,
                    can_manage_lifeguards: true, can_view_activity_log: true, can_view_admin_metrics: false,
                    can_export_data: false, can_modify_permissions: false
                }
            },
            {
                id: 4, username: "Xavier Butler Lee", role: "ADMIN", password: "xavier2025",
                active: true, created_by: "Demetrius Lopez", created_date: "2025-01-15", last_login: "2025-10-01",
                individual_permissions: {
                    can_manage_users: false, can_create_users: false, can_deactivate_users: false,
                    can_edit_all_audits: true, can_view_all_audits: true, can_create_audits: true,
                    can_manage_lifeguards: true, can_view_activity_log: true, can_view_admin_metrics: false,
                    can_export_data: true, can_modify_permissions: false
                }
            },
            {
                id: 5, username: "Ariana Arroyo", role: "ADMIN", password: "ariana2025",
                active: true, created_by: "Demetrius Lopez", created_date: "2025-01-15", last_login: "2025-09-30",
                individual_permissions: {
                    can_manage_users: false, can_create_users: false, can_deactivate_users: false,
                    can_edit_all_audits: true, can_view_all_audits: true, can_create_audits: true,
                    can_manage_lifeguards: true, can_view_activity_log: false, can_view_admin_metrics: false,
                    can_export_data: false, can_modify_permissions: false
                }
            },
            {
                id: 6, username: "Vi'Andre Butts", role: "ADMIN", password: "viandre2025",
                active: true, created_by: "Demetrius Lopez", created_date: "2025-01-15", last_login: "2025-09-29",
                individual_permissions: {
                    can_manage_users: false, can_create_users: false, can_deactivate_users: false,
                    can_edit_all_audits: true, can_view_all_audits: true, can_create_audits: true,
                    can_manage_lifeguards: true, can_view_activity_log: true, can_view_admin_metrics: false,
                    can_export_data: true, can_modify_permissions: false
                }
            },
            {
                id: 7, username: "Kyarra Cruz", role: "ADMIN", password: "kyarra2025",
                active: true, created_by: "Demetrius Lopez", created_date: "2025-01-15", last_login: "2025-09-28",
                individual_permissions: {
                    can_manage_users: false, can_create_users: false, can_deactivate_users: false,
                    can_edit_all_audits: true, can_view_all_audits: true, can_create_audits: true,
                    can_manage_lifeguards: true, can_view_activity_log: true, can_view_admin_metrics: false,
                    can_export_data: false, can_modify_permissions: false
                }
            },
            {
                id: 8, username: "Viewer", role: "VIEWER", password: "viewer2025",
                active: true, created_by: "Demetrius Lopez", created_date: "2025-01-01", last_login: "2025-09-25",
                individual_permissions: {
                    can_manage_users: false, can_create_users: false, can_deactivate_users: false,
                    can_edit_all_audits: false, can_view_all_audits: true, can_create_audits: false,
                    can_manage_lifeguards: false, can_view_activity_log: false, can_view_admin_metrics: false,
                    can_export_data: false, can_modify_permissions: false
                }
            }
        ];

        // Enhanced lifeguards with additional sample data for better monthly tracking
        this.lifeguards = [
            {"sheet_number": "01", "sheet_name": "Lifeguard_Audit_Sheet_01", "lifeguard_name": "MIA FIGUEROA", "active": true, "hire_date": "2025-01-01", "status": "ACTIVE"},
            {"sheet_number": "02", "sheet_name": "Lifeguard_Audit_Sheet_02", "lifeguard_name": "NATHAN RAMLAKHAN", "active": true, "hire_date": "2025-01-01", "status": "ACTIVE"},
            {"sheet_number": "03", "sheet_name": "Lifeguard_Audit_Sheet_03", "lifeguard_name": "JASON MOLL", "active": true, "hire_date": "2025-01-01", "status": "ACTIVE"},
            {"sheet_number": "04", "sheet_name": "Lifeguard_Audit_Sheet_04", "lifeguard_name": "JAVIAN QUIÑONES", "active": true, "hire_date": "2025-01-01", "status": "ACTIVE"},
            {"sheet_number": "05", "sheet_name": "Lifeguard_Audit_Sheet_05", "lifeguard_name": "LUCCA CONCEICAO", "active": true, "hire_date": "2025-01-01", "status": "ACTIVE"}
        ];

        // Enhanced audits with more data for monthly analysis
        this.audits = [
            // July 2025
            {"id": 1, "lifeguard_name": "MIA FIGUEROA", "date": "2025-07-15", "time": "10:30:00", "audit_type": "Visual", "skill_detail": "", "auditor_name": "Asael Gomez", "result": "EXCEEDS", "notes": "Excellent awareness", "follow_up": "", "created_by": "Asael Gomez", "created_date": "2025-07-15 10:30:00", "last_edited_by": null, "last_edited_date": null},
            {"id": 4, "lifeguard_name": "MIA FIGUEROA", "date": "2025-07-22", "time": "14:20:00", "audit_type": "VAT", "skill_detail": "", "auditor_name": "Matthew Hills", "result": "EXCEEDS", "notes": "Outstanding performance", "follow_up": "", "created_by": "Matthew Hills", "created_date": "2025-07-22 14:20:00", "last_edited_by": null, "last_edited_date": null},
            {"id": 5, "lifeguard_name": "NATHAN RAMLAKHAN", "date": "2025-07-18", "time": "11:15:00", "audit_type": "Skill", "skill_detail": "First Aid", "auditor_name": "Xavier Butler Lee", "result": "MEETS", "notes": "Good technique", "follow_up": "", "created_by": "Xavier Butler Lee", "created_date": "2025-07-18 11:15:00", "last_edited_by": null, "last_edited_date": null},
            {"id": 6, "lifeguard_name": "JASON MOLL", "date": "2025-07-25", "time": "16:30:00", "audit_type": "Visual", "skill_detail": "", "auditor_name": "Asael Gomez", "result": "MEETS", "notes": "Consistent performance", "follow_up": "", "created_by": "Asael Gomez", "created_date": "2025-07-25 16:30:00", "last_edited_by": null, "last_edited_date": null},
            
            // August 2025
            {"id": 2, "lifeguard_name": "NATHAN RAMLAKHAN", "date": "2025-08-01", "time": "14:15:00", "audit_type": "VAT", "skill_detail": "", "auditor_name": "Matthew Hills", "result": "MEETS", "notes": "Good technique", "follow_up": "", "created_by": "Demetrius Lopez", "created_date": "2025-08-01 14:15:00", "last_edited_by": null, "last_edited_date": null},
            {"id": 7, "lifeguard_name": "MIA FIGUEROA", "date": "2025-08-08", "time": "09:45:00", "audit_type": "Skill", "skill_detail": "CPR", "auditor_name": "Xavier Butler Lee", "result": "EXCEEDS", "notes": "Exceptional skills", "follow_up": "", "created_by": "Xavier Butler Lee", "created_date": "2025-08-08 09:45:00", "last_edited_by": null, "last_edited_date": null},
            {"id": 8, "lifeguard_name": "JAVIAN QUIÑONES", "date": "2025-08-12", "time": "13:20:00", "audit_type": "Visual", "skill_detail": "", "auditor_name": "Asael Gomez", "result": "MEETS", "notes": "Good awareness", "follow_up": "", "created_by": "Asael Gomez", "created_date": "2025-08-12 13:20:00", "last_edited_by": null, "last_edited_date": null},
            {"id": 9, "lifeguard_name": "LUCCA CONCEICAO", "date": "2025-08-20", "time": "15:10:00", "audit_type": "VAT", "skill_detail": "", "auditor_name": "Matthew Hills", "result": "FAILS", "notes": "Needs improvement in response time", "follow_up": "Additional training scheduled", "created_by": "Matthew Hills", "created_date": "2025-08-20 15:10:00", "last_edited_by": null, "last_edited_date": null},
            
            // September 2025
            {"id": 3, "lifeguard_name": "JASON MOLL", "date": "2025-09-10", "time": "11:45:00", "audit_type": "Skill", "skill_detail": "CPR", "auditor_name": "Xavier Butler Lee", "result": "EXCEEDS", "notes": "Perfect execution", "follow_up": "", "created_by": "Xavier Butler Lee", "created_date": "2025-09-10 11:45:00", "last_edited_by": null, "last_edited_date": null},
            {"id": 10, "lifeguard_name": "MIA FIGUEROA", "date": "2025-09-05", "time": "10:00:00", "audit_type": "Visual", "skill_detail": "", "auditor_name": "Asael Gomez", "result": "EXCEEDS", "notes": "Consistently excellent", "follow_up": "", "created_by": "Asael Gomez", "created_date": "2025-09-05 10:00:00", "last_edited_by": null, "last_edited_date": null},
            {"id": 11, "lifeguard_name": "NATHAN RAMLAKHAN", "date": "2025-09-15", "time": "14:30:00", "audit_type": "VAT", "skill_detail": "", "auditor_name": "Matthew Hills", "result": "EXCEEDS", "notes": "Significant improvement", "follow_up": "", "created_by": "Matthew Hills", "created_date": "2025-09-15 14:30:00", "last_edited_by": null, "last_edited_date": null},
            {"id": 12, "lifeguard_name": "JAVIAN QUIÑONES", "date": "2025-09-22", "time": "12:15:00", "audit_type": "Skill", "skill_detail": "Water Rescue", "auditor_name": "Xavier Butler Lee", "result": "MEETS", "notes": "Solid performance", "follow_up": "", "created_by": "Xavier Butler Lee", "created_date": "2025-09-22 12:15:00", "last_edited_by": null, "last_edited_date": null},
            
            // October 2025
            {"id": 13, "lifeguard_name": "LUCCA CONCEICAO", "date": "2025-10-03", "time": "09:30:00", "audit_type": "Visual", "skill_detail": "", "auditor_name": "Asael Gomez", "result": "MEETS", "notes": "Improved performance", "follow_up": "", "created_by": "Asael Gomez", "created_date": "2025-10-03 09:30:00", "last_edited_by": null, "last_edited_date": null},
            {"id": 14, "lifeguard_name": "JASON MOLL", "date": "2025-10-01", "time": "16:00:00", "audit_type": "VAT", "skill_detail": "", "auditor_name": "Matthew Hills", "result": "EXCEEDS", "notes": "Outstanding response", "follow_up": "", "created_by": "Matthew Hills", "created_date": "2025-10-01 16:00:00", "last_edited_by": null, "last_edited_date": null}
        ];

        // Activity log with monthly tracking activities
        this.activityLog = [
            {"id": 1, "timestamp": "2025-10-05 12:00:00", "user": "Demetrius Lopez", "action": "LOGIN", "details": "Senior Admin login"},
            {"id": 2, "timestamp": "2025-10-05 11:45:00", "user": "Asael Gomez", "action": "CREATE_AUDIT", "details": "Created audit for LUCCA CONCEICAO"},
            {"id": 3, "timestamp": "2025-10-05 11:30:00", "user": "Matthew Hills", "action": "VIEW_MONTHLY_STATS", "details": "Viewed monthly statistics for MIA FIGUEROA"},
            {"id": 4, "timestamp": "2025-10-04 14:20:00", "user": "Xavier Butler Lee", "action": "CREATE_AUDIT", "details": "Created audit for JASON MOLL"},
            {"id": 5, "timestamp": "2025-10-04 13:15:00", "user": "Asael Gomez", "action": "VIEW_MONTHLY_LEADERBOARD", "details": "Viewed September 2025 monthly leaderboard"},
            {"id": 6, "timestamp": "2025-10-04 12:30:00", "user": "Demetrius Lopez", "action": "UPDATE_AUDIT", "details": "Updated audit for NATHAN RAMLAKHAN"},
        ];

        // System constants
        this.auditTypes = ["VAT", "Visual", "Skill"];
        this.auditResults = ["EXCEEDS", "MEETS", "FAILS"];
        this.roles = ["SENIOR_ADMIN", "ADMIN", "VIEWER"];
        
        console.log('Enhanced system data loaded successfully');
    }

    init() {
        console.log('Initializing enhanced app...');
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.setupEventListeners();
                this.showLoginScreen();
            });
        } else {
            this.setupEventListeners();
            this.showLoginScreen();
        }
    }

    setupEventListeners() {
        console.log('Setting up enhanced event listeners...');
        
        // Login form
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin();
            });
        }

        // Logout button
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.handleLogout());
        }

        // Navigation
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('nav-btn')) {
                e.preventDefault();
                const section = e.target.getAttribute('data-section');
                if (section) this.switchSection(section);
            }
        });

        // Modal handling
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('close-modal') || e.target.hasAttribute('data-modal')) {
                const modalId = e.target.getAttribute('data-modal');
                if (modalId) {
                    this.closeModal(modalId);
                } else {
                    const modal = e.target.closest('.modal');
                    if (modal) modal.classList.add('hidden');
                }
            }
        });

        // Monthly leaderboard filter
        const leaderboardFilter = document.getElementById('leaderboard-month-filter');
        if (leaderboardFilter) {
            leaderboardFilter.addEventListener('change', () => this.renderMonthlyLeaderboard());
        }
    }

    setupFormEventListeners() {
        // Audit form
        const auditForm = document.getElementById('audit-form');
        if (auditForm) {
            auditForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleAuditSubmit();
            });
        }

        // User form
        const userForm = document.getElementById('user-form');
        if (userForm) {
            userForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleUserSubmit();
            });
        }

        // Lifeguard form
        const lifeguardForm = document.getElementById('lifeguard-form');
        if (lifeguardForm) {
            lifeguardForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLifeguardSubmit();
            });
        }

        // User role change handler
        const userRoleSelect = document.getElementById('user-role');
        if (userRoleSelect) {
            userRoleSelect.addEventListener('change', (e) => {
                this.updatePermissionsForRole(e.target.value);
            });
        }
    }

    setupButtonEventListeners() {
        const buttons = [
            { id: 'add-audit-btn', handler: () => this.showAuditForm() },
            { id: 'add-user-btn', handler: () => this.showUserForm() },
            { id: 'add-lifeguard-btn', handler: () => this.showLifeguardForm() },
            { id: 'export-activity-btn', handler: () => this.exportActivityLog() }
        ];

        buttons.forEach(btn => {
            const element = document.getElementById(btn.id);
            if (element) {
                element.addEventListener('click', btn.handler);
            }
        });
    }

    setupFilterEventListeners() {
        // Search inputs
        const searchInputs = [
            { id: 'lifeguard-search', handler: (e) => { this.currentFilters.lifeguards.search = e.target.value; this.renderLifeguards(); }},
            { id: 'audit-search', handler: (e) => { this.currentFilters.audits.search = e.target.value; this.renderAudits(); }},
            { id: 'user-search', handler: (e) => { this.currentFilters.users.search = e.target.value; this.renderUsers(); }},
            { id: 'activity-search', handler: (e) => { this.currentFilters.activity.search = e.target.value; this.renderActivityLog(); }}
        ];

        searchInputs.forEach(input => {
            const element = document.getElementById(input.id);
            if (element) {
                element.addEventListener('input', input.handler);
            }
        });

        // Filter dropdowns
        const filterSelects = [
            { id: 'lifeguard-status-filter', handler: (e) => { this.currentFilters.lifeguards.status = e.target.value; this.renderLifeguards(); }},
            { id: 'sort-select', handler: (e) => { this.currentFilters.lifeguards.sort = e.target.value; this.renderLifeguards(); }},
            { id: 'audit-type-filter', handler: (e) => { this.currentFilters.audits.type = e.target.value; this.renderAudits(); }},
            { id: 'audit-result-filter', handler: (e) => { this.currentFilters.audits.result = e.target.value; this.renderAudits(); }},
            { id: 'user-role-filter', handler: (e) => { this.currentFilters.users.role = e.target.value; this.renderUsers(); }},
            { id: 'user-status-filter', handler: (e) => { this.currentFilters.users.status = e.target.value; this.renderUsers(); }},
            { id: 'activity-filter', handler: (e) => { this.currentFilters.activity.action = e.target.value; this.renderActivityLog(); }},
            { id: 'recent-audits-filter', handler: (e) => { this.renderRecentAudits(); }}
        ];

        filterSelects.forEach(select => {
            const element = document.getElementById(select.id);
            if (element) {
                element.addEventListener('change', select.handler);
            }
        });
    }

    // Authentication Methods (unchanged from previous version)
    showLoginScreen() {
        const loginScreen = document.getElementById('login-screen');
        const mainApp = document.getElementById('main-app');
        
        if (loginScreen) {
            loginScreen.classList.remove('hidden');
            loginScreen.style.display = 'flex';
        }
        
        if (mainApp) {
            mainApp.classList.add('hidden');
            mainApp.style.display = 'none';
        }
    }

    showMainApp() {
        const loginScreen = document.getElementById('login-screen');
        const mainApp = document.getElementById('main-app');
        
        if (loginScreen) {
            loginScreen.classList.add('hidden');
            loginScreen.style.display = 'none';
        }
        if (mainApp) {
            mainApp.classList.remove('hidden');
            mainApp.style.display = 'block';
        }
        
        this.initializeApp();
    }

    handleLogin() {
        console.log('=== HANDLING LOGIN ===');
        
        const usernameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');
        
        if (!usernameInput || !passwordInput) {
            this.showLoginError('Form elements not found. Please refresh the page.');
            return;
        }
        
        const username = usernameInput.value.trim();
        const password = passwordInput.value;
        
        if (!username || !password) {
            this.showLoginError('Please enter both username and password.');
            return;
        }

        const user = this.users.find(u => {
            return u.username === username && u.password === password && u.active;
        });

        if (!user) {
            this.showLoginError('Invalid username or password.');
            return;
        }

        console.log('=== LOGIN SUCCESSFUL ===');
        
        this.currentUser = user;
        user.last_login = new Date().toISOString().split('T')[0];
        this.logActivity('LOGIN', `User ${user.username} (${user.role}) logged in`);
        this.startSessionTimer();
        
        // Clear form and error
        const loginForm = document.getElementById('login-form');
        const loginError = document.getElementById('login-error');
        
        if (loginForm) loginForm.reset();
        if (loginError) loginError.classList.add('hidden');
        
        this.showMainApp();
        
        setTimeout(() => {
            this.showToast('Welcome to the Enhanced Lifeguard Audit System!', 'success');
        }, 500);
    }

    handleLogout() {
        if (this.currentUser) {
            this.logActivity('LOGOUT', `User ${this.currentUser.username} logged out`);
        }
        this.currentUser = null;
        this.clearSessionTimer();
        this.showLoginScreen();
        this.showToast('Logged out successfully.', 'info');
    }

    showLoginError(message) {
        const errorDiv = document.getElementById('login-error');
        if (errorDiv) {
            errorDiv.textContent = message;
            errorDiv.classList.remove('hidden');
            setTimeout(() => errorDiv.classList.add('hidden'), 5000);
        }
    }

    startSessionTimer() {
        this.clearSessionTimer();
        this.sessionTimer = setTimeout(() => {
            this.showToast('Session expired. Please log in again.', 'info');
            this.handleLogout();
        }, this.sessionTimeout);
    }

    clearSessionTimer() {
        if (this.sessionTimer) {
            clearTimeout(this.sessionTimer);
            this.sessionTimer = null;
        }
    }

    // App Initialization
    initializeApp() {
        console.log('Initializing enhanced app after login');
        try {
            this.updateUserInfo();
            this.buildNavigation();
            this.populateDropdowns();
            this.updateDashboard();
            this.switchSection('dashboard');
            
            this.setupFormEventListeners();
            this.setupButtonEventListeners();
            this.setupFilterEventListeners();
            
            console.log('Enhanced app initialized successfully');
        } catch (error) {
            console.error('Error initializing app:', error);
        }
    }

    updateUserInfo() {
        const currentUserSpan = document.getElementById('current-user');
        const currentRoleSpan = document.getElementById('current-role');
        
        if (currentUserSpan && this.currentUser) {
            currentUserSpan.textContent = this.currentUser.username;
        }
        if (currentRoleSpan && this.currentUser) {
            currentRoleSpan.textContent = this.currentUser.role.replace('_', ' ');
        }
    }

    buildNavigation() {
        const nav = document.getElementById('main-nav');
        if (!nav || !this.currentUser) return;

        const navItems = [
            { id: 'dashboard', label: 'Dashboard', permission: null },
            { id: 'lifeguards', label: 'Lifeguards', permission: null },
            { id: 'audits', label: 'Audits', permission: 'can_view_all_audits' },
            { id: 'activity-log', label: 'Activity Log', permission: 'can_view_activity_log' },
            { id: 'user-management', label: 'User Management', permission: 'can_manage_users' }
        ];

        const allowedItems = navItems.filter(item => 
            !item.permission || this.hasPermission(item.permission)
        );

        nav.innerHTML = allowedItems.map(item => 
            `<button class="nav-btn" data-section="${item.id}">${item.label}</button>`
        ).join('');
    }

    hasPermission(permission) {
        return this.currentUser?.individual_permissions?.[permission] || false;
    }

    // Navigation
    switchSection(sectionId) {
        const permissionMap = {
            'user-management': 'can_manage_users',
            'activity-log': 'can_view_activity_log',
            'audits': 'can_view_all_audits'
        };

        if (permissionMap[sectionId] && !this.hasPermission(permissionMap[sectionId])) {
            this.showToast('Access denied.', 'error');
            return;
        }

        // Update navigation
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
        const activeBtn = document.querySelector(`[data-section="${sectionId}"]`);
        if (activeBtn) activeBtn.classList.add('active');

        // Update content
        document.querySelectorAll('.content-section').forEach(section => section.classList.remove('active'));
        const targetSection = document.getElementById(sectionId);
        if (targetSection) targetSection.classList.add('active');

        // Load section data
        this.loadSectionData(sectionId);
    }

    loadSectionData(sectionId) {
        try {
            switch (sectionId) {
                case 'dashboard':
                    this.updateDashboard();
                    break;
                case 'lifeguards':
                    this.renderLifeguards();
                    break;
                case 'audits':
                    this.renderAudits();
                    break;
                case 'activity-log':
                    this.renderActivityLog();
                    break;
                case 'user-management':
                    this.renderUsers();
                    break;
            }
        } catch (error) {
            console.error('Error loading section data:', error);
        }
    }

    // Enhanced Dashboard Methods
    updateDashboard() {
        const stats = this.calculateStats();
        
        this.updateElement('total-lifeguards', this.lifeguards.length);
        this.updateElement('active-lifeguards', this.lifeguards.filter(lg => lg.active).length);
        this.updateElement('total-audits', stats.totalAudits);
        this.updateElement('exceeds-count', stats.exceeds);
        this.updateElement('meets-count', stats.meets);
        this.updateElement('fails-count', stats.fails);

        this.renderMonthlyLeaderboard();
        this.renderRecentAudits();
    }

    calculateStats() {
        const totalAudits = this.audits.length;
        const exceeds = this.audits.filter(audit => audit.result === 'EXCEEDS').length;
        const meets = this.audits.filter(audit => audit.result === 'MEETS').length;
        const fails = this.audits.filter(audit => audit.result === 'FAILS').length;

        return { totalAudits, exceeds, meets, fails };
    }

    renderMonthlyLeaderboard() {
        const container = document.getElementById('monthly-leaderboard');
        const filter = document.getElementById('leaderboard-month-filter')?.value || 'current';
        
        if (!container) return;
        
        const selectedMonth = filter === 'current' ? this.getCurrentMonth() : filter;
        const monthlyStats = this.calculateMonthlyLeaderboardStats(selectedMonth);
        
        container.innerHTML = `
            <div class="leaderboard-card">
                <h4>🏆 Most EXCEEDS</h4>
                <div class="leaderboard-winner">${monthlyStats.mostExceeds.name}</div>
                <div class="leaderboard-stat">${monthlyStats.mostExceeds.count} EXCEEDS</div>
            </div>
            <div class="leaderboard-card">
                <h4>⭐ Highest Pass Rate</h4>
                <div class="leaderboard-winner">${monthlyStats.bestPassRate.name}</div>
                <div class="leaderboard-stat">${monthlyStats.bestPassRate.rate}% Success Rate</div>
            </div>
            <div class="leaderboard-card">
                <h4>📈 Most Improved</h4>
                <div class="leaderboard-winner">${monthlyStats.mostImproved.name}</div>
                <div class="leaderboard-stat">${monthlyStats.mostImproved.improvement}% Improvement</div>
            </div>
        `;
    }

    calculateMonthlyLeaderboardStats(monthYear) {
        const monthlyAudits = this.getAuditsByMonth(monthYear);
        const lifeguardStats = {};
        
        // Initialize stats for all lifeguards
        this.lifeguards.forEach(lg => {
            lifeguardStats[lg.lifeguard_name] = {
                total: 0, exceeds: 0, meets: 0, fails: 0
            };
        });
        
        // Calculate monthly stats
        monthlyAudits.forEach(audit => {
            if (lifeguardStats[audit.lifeguard_name]) {
                const stats = lifeguardStats[audit.lifeguard_name];
                stats.total++;
                stats[audit.result.toLowerCase()]++;
            }
        });
        
        // Find leaders
        let mostExceeds = { name: 'No Data', count: 0 };
        let bestPassRate = { name: 'No Data', rate: 0 };
        let mostImproved = { name: 'No Data', improvement: 0 };
        
        Object.entries(lifeguardStats).forEach(([name, stats]) => {
            if (stats.total > 0) {
                // Most EXCEEDS
                if (stats.exceeds > mostExceeds.count) {
                    mostExceeds = { name, count: stats.exceeds };
                }
                
                // Best pass rate
                const passRate = Math.round(((stats.exceeds + stats.meets) / stats.total) * 100);
                if (passRate > bestPassRate.rate) {
                    bestPassRate = { name, rate: passRate };
                }
                
                // Most improved (simplified calculation)
                const improvement = stats.exceeds > 0 ? Math.min(stats.exceeds * 10, 100) : 0;
                if (improvement > mostImproved.improvement) {
                    mostImproved = { name, improvement };
                }
            }
        });
        
        return { mostExceeds, bestPassRate, mostImproved };
    }

    renderRecentAudits() {
        const tbody = document.getElementById('recent-audits-body');
        const filter = document.getElementById('recent-audits-filter')?.value || 'all';
        
        if (!tbody) return;
        
        let filteredAudits = [...this.audits];
        
        if (filter !== 'all') {
            filteredAudits = filteredAudits.filter(audit => audit.result === filter);
        }
        
        const recentAudits = filteredAudits
            .sort((a, b) => new Date(b.date + ' ' + b.time) - new Date(a.date + ' ' + a.time))
            .slice(0, 15);

        if (recentAudits.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" class="empty-state">No audits match the current filter.</td></tr>';
            return;
        }

        tbody.innerHTML = recentAudits.map(audit => `
            <tr>
                <td><strong>${audit.lifeguard_name}</strong></td>
                <td>${this.formatDate(audit.date)}</td>
                <td>${audit.audit_type}${audit.skill_detail ? ` (${audit.skill_detail})` : ''}</td>
                <td><span class="result-badge ${audit.result.toLowerCase()}">${audit.result}</span></td>
                <td>${audit.auditor_name}</td>
                <td>${audit.notes || '-'}</td>
            </tr>
        `).join('');
    }

    populateDropdowns() {
        this.populateLifeguardDropdown();
        this.populateAdminDropdown();
    }

    populateLifeguardDropdown() {
        const select = document.getElementById('audit-lifeguard');
        if (!select) return;
        
        select.innerHTML = '<option value="">Select Lifeguard</option>';
        
        this.lifeguards
            .filter(lg => lg.active)
            .sort((a, b) => a.lifeguard_name.localeCompare(b.lifeguard_name))
            .forEach(lifeguard => {
                const option = document.createElement('option');
                option.value = lifeguard.lifeguard_name;
                option.textContent = lifeguard.lifeguard_name;
                select.appendChild(option);
            });
    }

    populateAdminDropdown() {
        const select = document.getElementById('auditor-name');
        if (!select) return;
        
        select.innerHTML = '<option value="">Select Admin</option>';
        
        this.users
            .filter(user => user.active && (user.role === 'ADMIN' || user.role === 'SENIOR_ADMIN'))
            .sort((a, b) => a.username.localeCompare(b.username))
            .forEach(user => {
                const option = document.createElement('option');
                option.value = user.username;
                option.textContent = user.username;
                select.appendChild(option);
            });

        if (this.currentUser && (this.currentUser.role === 'ADMIN' || this.currentUser.role === 'SENIOR_ADMIN')) {
            select.value = this.currentUser.username;
        }
    }

    // Enhanced Lifeguard Rendering with Monthly Stats - FIXED
    renderLifeguards() {
        const container = document.getElementById('lifeguards-grid');
        if (!container) return;

        const addBtn = document.getElementById('add-lifeguard-btn');
        if (addBtn) {
            if (this.hasPermission('can_manage_lifeguards')) {
                addBtn.classList.remove('hidden');
            } else {
                addBtn.classList.add('hidden');
            }
        }
        
        let filteredLifeguards = this.applyLifeguardFilters();
        
        if (filteredLifeguards.length === 0) {
            container.innerHTML = '<div class="empty-state"><h3>No lifeguards found</h3><p>Try adjusting your search or filter criteria.</p></div>';
            return;
        }

        const canViewStats = this.currentUser; // All users can view monthly stats
        const canManage = this.hasPermission('can_manage_lifeguards');

        container.innerHTML = filteredLifeguards.map(lifeguard => {
            const audits = this.getLifeguardAudits(lifeguard.lifeguard_name);
            const stats = this.calculateLifeguardStats(audits);
            const status = this.getPerformanceStatus(stats);

            return `
                <div class="lifeguard-card" onclick="app.showLifeguardDetail('${lifeguard.lifeguard_name}')">
                    <h3>${lifeguard.lifeguard_name}</h3>
                    <div class="lifeguard-stats">
                        <div class="stat-item">
                            <span class="stat-label">Total Audits</span>
                            <span class="stat-value">${stats.total}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Success Rate</span>
                            <span class="stat-value">${stats.successRate}%</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Exceeds Rate</span>
                            <span class="stat-value">${stats.exceedsRate}%</span>
                        </div>
                    </div>
                    <div class="lifeguard-stats">
                        <div class="stat-item">
                            <span class="stat-label">Status</span>
                            <span class="stat-value">
                                <span class="status-badge ${lifeguard.active ? 'active' : 'inactive'}">
                                    ${lifeguard.active ? 'Active' : 'Inactive'}
                                </span>
                            </span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Hire Date</span>
                            <span class="stat-value">${this.formatDate(lifeguard.hire_date)}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Performance</span>
                            <span class="stat-value">
                                <span class="status-badge ${status.class}">${status.text}</span>
                            </span>
                        </div>
                    </div>
                    
                    <!-- Always show action buttons for all users -->
                    <div class="lifeguard-actions" onclick="event.stopPropagation()">
                        <button class="action-btn action-btn--stats" onclick="app.showMonthlyStats('${lifeguard.lifeguard_name}')" title="Monthly Stats">📊</button>
                        ${canManage ? `
                            <button class="action-btn action-btn--edit" onclick="app.editLifeguard('${lifeguard.sheet_number}')">Edit</button>
                            <button class="action-btn ${lifeguard.active ? 'action-btn--deactivate' : 'action-btn--activate'}" onclick="app.toggleLifeguardStatus('${lifeguard.sheet_number}')">
                                ${lifeguard.active ? 'Deactivate' : 'Activate'}
                            </button>
                        ` : ''}
                    </div>
                </div>
            `;
        }).join('');
    }

    applyLifeguardFilters() {
        let filtered = [...this.lifeguards];

        if (this.currentFilters.lifeguards.search) {
            const searchTerm = this.currentFilters.lifeguards.search.toLowerCase();
            filtered = filtered.filter(lg =>
                lg.lifeguard_name.toLowerCase().includes(searchTerm) ||
                lg.sheet_number.includes(searchTerm)
            );
        }

        if (this.currentFilters.lifeguards.status !== 'all') {
            const isActive = this.currentFilters.lifeguards.status === 'active';
            filtered = filtered.filter(lg => lg.active === isActive);
        }

        filtered.sort((a, b) => {
            switch (this.currentFilters.lifeguards.sort) {
                case 'name-desc':
                    return b.lifeguard_name.localeCompare(a.lifeguard_name);
                case 'audits-desc':
                    return this.getLifeguardAudits(b.lifeguard_name).length - this.getLifeguardAudits(a.lifeguard_name).length;
                case 'audits-asc':
                    return this.getLifeguardAudits(a.lifeguard_name).length - this.getLifeguardAudits(b.lifeguard_name).length;
                case 'hire-date-desc':
                    return new Date(b.hire_date) - new Date(a.hire_date);
                case 'hire-date-asc':
                    return new Date(a.hire_date) - new Date(b.hire_date);
                default:
                    return a.lifeguard_name.localeCompare(b.lifeguard_name);
            }
        });

        return filtered;
    }

    // Enhanced Lifeguard Detail Modal with Monthly Stats
    showLifeguardDetail(lifeguardName) {
        const lifeguard = this.lifeguards.find(lg => lg.lifeguard_name === lifeguardName);
        const audits = this.getLifeguardAudits(lifeguardName);
        const stats = this.calculateLifeguardStats(audits);
        const status = this.getPerformanceStatus(stats);

        // Populate basic info
        document.getElementById('modal-lifeguard-name').textContent = lifeguardName;
        document.getElementById('modal-total-audits').textContent = stats.total;
        document.getElementById('modal-success-rate').textContent = stats.successRate + '%';
        document.getElementById('modal-exceeds-rate').textContent = stats.exceedsRate + '%';
        document.getElementById('modal-performance-status').innerHTML = `<span class="status-badge ${status.class}">${status.text}</span>`;
        document.getElementById('modal-hire-date').textContent = this.formatDate(lifeguard.hire_date);
        document.getElementById('modal-status').innerHTML = `<span class="status-badge ${lifeguard.active ? 'active' : 'inactive'}">${lifeguard.active ? 'Active' : 'Inactive'}</span>`;

        // Populate monthly stats
        this.renderLifeguardMonthlyStats(lifeguardName);

        // Populate audit history
        const historyBody = document.getElementById('modal-audit-history');
        if (audits.length === 0) {
            historyBody.innerHTML = '<tr><td colspan="8" class="empty-state">No audits found for this lifeguard.</td></tr>';
        } else {
            historyBody.innerHTML = audits
                .sort((a, b) => new Date(b.date + ' ' + b.time) - new Date(a.date + ' ' + a.time))
                .map(audit => `
                    <tr>
                        <td>${this.formatDate(audit.date)}</td>
                        <td>${this.formatTime(audit.time)}</td>
                        <td>${audit.audit_type}</td>
                        <td>${audit.skill_detail || '-'}</td>
                        <td><span class="result-badge ${audit.result.toLowerCase()}">${audit.result}</span></td>
                        <td>${audit.auditor_name}</td>
                        <td>${audit.notes || '-'}</td>
                        <td>${audit.follow_up || '-'}</td>
                    </tr>
                `).join('');
        }

        document.getElementById('lifeguard-detail-modal').classList.remove('hidden');
        this.logActivity('VIEW_LIFEGUARD_DETAIL', `Viewed details for ${lifeguardName}`);
    }

    renderLifeguardMonthlyStats(lifeguardName) {
        const container = document.getElementById('modal-monthly-stats');
        if (!container) return;
        
        const monthlyData = this.getLifeguardMonthlyData(lifeguardName);
        
        if (monthlyData.length === 0) {
            container.innerHTML = '<div class="empty-state">No monthly data available.</div>';
            return;
        }
        
        container.innerHTML = monthlyData.map(monthData => `
            <div class="monthly-stat-card" onclick="app.showMonthlyStats('${lifeguardName}', '${monthData.month}')">
                <h5>${monthData.monthName}</h5>
                <div class="monthly-stat-summary">
                    <span>Total: ${monthData.total}</span>
                    <span>Pass: ${monthData.passRate}%</span>
                </div>
                <div class="monthly-performance-trend">
                    <span class="trend-indicator exceeds">${monthData.exceeds}E</span>
                    <span class="trend-indicator meets">${monthData.meets}M</span>
                    <span class="trend-indicator fails">${monthData.fails}F</span>
                </div>
            </div>
        `).join('');
    }

    showMonthlyStats(lifeguardName, specificMonth = null) {
        const monthlyData = this.getLifeguardMonthlyData(lifeguardName);
        const lifeguard = this.lifeguards.find(lg => lg.lifeguard_name === lifeguardName);
        
        // Update modal title
        document.getElementById('monthly-stats-title').textContent = `Monthly Statistics - ${lifeguardName}`;
        
        // Calculate overview stats
        const totalAudits = monthlyData.reduce((sum, month) => sum + month.total, 0);
        const totalExceeds = monthlyData.reduce((sum, month) => sum + month.exceeds, 0);
        const avgPassRate = monthlyData.length > 0 ? 
            Math.round(monthlyData.reduce((sum, month) => sum + month.passRate, 0) / monthlyData.length) : 0;
        
        // Populate overview
        const overviewContainer = document.getElementById('monthly-overview');
        if (overviewContainer) {
            overviewContainer.innerHTML = `
                <div class="monthly-overview-card">
                    <h4>Total Months</h4>
                    <div class="monthly-overview-value">${monthlyData.length}</div>
                </div>
                <div class="monthly-overview-card">
                    <h4>Total Audits</h4>
                    <div class="monthly-overview-value">${totalAudits}</div>
                </div>
                <div class="monthly-overview-card">
                    <h4>Total EXCEEDS</h4>
                    <div class="monthly-overview-value">${totalExceeds}</div>
                </div>
                <div class="monthly-overview-card">
                    <h4>Avg Pass Rate</h4>
                    <div class="monthly-overview-value">${avgPassRate}%</div>
                </div>
            `;
        }
        
        // Create chart
        this.createMonthlyPerformanceChart(monthlyData);
        
        // Populate details table
        const detailsBody = document.getElementById('monthly-details-body');
        if (detailsBody) {
            detailsBody.innerHTML = monthlyData.map(month => `
                <tr>
                    <td><strong>${month.monthName}</strong></td>
                    <td>${month.total}</td>
                    <td>${month.exceeds}</td>
                    <td>${month.meets}</td>
                    <td>${month.fails}</td>
                    <td>${month.exceedsRate}%</td>
                    <td>${month.passRate}%</td>
                </tr>
            `).join('');
        }
        
        document.getElementById('monthly-stats-modal').classList.remove('hidden');
        this.logActivity('VIEW_MONTHLY_STATS', `Viewed monthly statistics for ${lifeguardName}`);
    }

    createMonthlyPerformanceChart(monthlyData) {
        const canvas = document.getElementById('monthly-performance-chart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        // Destroy existing chart
        if (this.monthlyChart) {
            this.monthlyChart.destroy();
        }
        
        this.monthlyChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: monthlyData.map(m => m.monthName),
                datasets: [
                    {
                        label: 'EXCEEDS',
                        data: monthlyData.map(m => m.exceeds),
                        borderColor: '#1FB8CD',
                        backgroundColor: 'rgba(31, 184, 205, 0.1)',
                        tension: 0.4
                    },
                    {
                        label: 'MEETS',
                        data: monthlyData.map(m => m.meets),
                        borderColor: '#FFC185',
                        backgroundColor: 'rgba(255, 193, 133, 0.1)',
                        tension: 0.4
                    },
                    {
                        label: 'FAILS',
                        data: monthlyData.map(m => m.fails),
                        borderColor: '#B4413C',
                        backgroundColor: 'rgba(180, 65, 60, 0.1)',
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Monthly Performance Trend'
                    },
                    legend: {
                        display: true,
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        });
    }

    // Monthly Data Calculation Methods
    getLifeguardMonthlyData(lifeguardName) {
        const audits = this.getLifeguardAudits(lifeguardName);
        const monthlyStats = {};
        
        audits.forEach(audit => {
            const monthKey = audit.date.substring(0, 7); // YYYY-MM format
            
            if (!monthlyStats[monthKey]) {
                monthlyStats[monthKey] = {
                    month: monthKey,
                    monthName: this.formatMonthYear(monthKey),
                    total: 0,
                    exceeds: 0,
                    meets: 0,
                    fails: 0
                };
            }
            
            const stats = monthlyStats[monthKey];
            stats.total++;
            stats[audit.result.toLowerCase()]++;
        });
        
        // Calculate percentages and sort by month
        return Object.values(monthlyStats)
            .map(stats => ({
                ...stats,
                exceedsRate: stats.total > 0 ? Math.round((stats.exceeds / stats.total) * 100) : 0,
                passRate: stats.total > 0 ? Math.round(((stats.exceeds + stats.meets) / stats.total) * 100) : 0
            }))
            .sort((a, b) => a.month.localeCompare(b.month));
    }

    getAuditsByMonth(monthYear) {
        return this.audits.filter(audit => {
            const auditMonth = audit.date.substring(0, 7);
            return auditMonth === monthYear;
        });
    }

    getCurrentMonth() {
        const now = new Date();
        return `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}`;
    }

    formatMonthYear(monthKey) {
        const [year, month] = monthKey.split('-');
        const monthNames = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];
        return `${monthNames[parseInt(month) - 1]} ${year}`;
    }

    // Rest of the methods remain the same as previous version...
    // (Including renderAudits, renderUsers, renderActivityLog, form handlers, etc.)
    
    renderAudits() {
        const tbody = document.getElementById('audits-table-body');
        if (!tbody) return;

        const addBtn = document.getElementById('add-audit-btn');
        if (addBtn) {
            if (this.hasPermission('can_create_audits')) {
                addBtn.classList.remove('hidden');
            } else {
                addBtn.classList.add('hidden');
            }
        }

        let filteredAudits = this.applyAuditFilters();

        if (filteredAudits.length === 0) {
            tbody.innerHTML = '<tr><td colspan="10" class="empty-state">No audits match the current filters. Try adjusting your search criteria.</td></tr>';
            return;
        }

        const canEdit = this.hasPermission('can_edit_all_audits');

        tbody.innerHTML = filteredAudits.map((audit) => `
            <tr>
                <td><strong>${audit.lifeguard_name}</strong></td>
                <td>${this.formatDate(audit.date)}</td>
                <td>${this.formatTime(audit.time)}</td>
                <td>${audit.audit_type}</td>
                <td>${audit.skill_detail || '-'}</td>
                <td><span class="result-badge ${audit.result.toLowerCase()}">${audit.result}</span></td>
                <td>${audit.auditor_name}</td>
                <td>${audit.notes || '-'}</td>
                <td>${audit.follow_up || '-'}</td>
                <td>
                    <div class="table-actions">
                        ${canEdit ? `
                            <button class="btn btn--outline btn--sm" onclick="app.editAudit(${audit.id})">Edit ✏️</button>
                            <button class="btn btn--outline btn--sm" onclick="app.deleteAudit(${audit.id})">Delete</button>
                        ` : `
                            <button class="btn btn--outline btn--sm" onclick="app.viewAuditDetail(${audit.id})">View</button>
                        `}
                    </div>
                </td>
            </tr>
        `).join('');
    }

    applyAuditFilters() {
        let filtered = [...this.audits];

        if (this.currentFilters.audits.search) {
            const searchTerm = this.currentFilters.audits.search.toLowerCase();
            filtered = filtered.filter(audit =>
                audit.lifeguard_name.toLowerCase().includes(searchTerm) ||
                audit.auditor_name.toLowerCase().includes(searchTerm) ||
                (audit.notes && audit.notes.toLowerCase().includes(searchTerm)) ||
                (audit.skill_detail && audit.skill_detail.toLowerCase().includes(searchTerm))
            );
        }

        if (this.currentFilters.audits.type !== 'all') {
            filtered = filtered.filter(audit => audit.audit_type === this.currentFilters.audits.type);
        }

        if (this.currentFilters.audits.result !== 'all') {
            filtered = filtered.filter(audit => audit.result === this.currentFilters.audits.result);
        }

        return filtered.sort((a, b) => new Date(b.date + ' ' + b.time) - new Date(a.date + ' ' + a.time));
    }

    renderUsers() {
        const tbody = document.getElementById('users-table-body');
        if (!tbody) return;

        let filteredUsers = this.applyUserFilters();

        tbody.innerHTML = filteredUsers.map(user => `
            <tr>
                <td><strong>${user.username}</strong></td>
                <td>${user.role.replace('_', ' ')}</td>
                <td>
                    <span class="status-badge ${user.active ? 'active' : 'inactive'}">
                        ${user.active ? 'Active' : 'Inactive'}
                    </span>
                </td>
                <td>${user.created_by}</td>
                <td>${this.formatDate(user.created_date)}</td>
                <td>${user.last_login ? this.formatDate(user.last_login) : 'Never'}</td>
                <td>
                    <div class="table-actions">
                        <button class="btn btn--outline btn--sm" onclick="app.editUser(${user.id})">Edit</button>
                        <button class="btn btn--outline btn--sm" onclick="app.toggleUserStatus(${user.id})">
                            ${user.active ? 'Deactivate' : 'Activate'}
                        </button>
                        ${this.hasPermission('can_modify_permissions') ? `
                            <button class="btn btn--outline btn--sm" onclick="app.editUserPermissions(${user.id})">Permissions</button>
                        ` : ''}
                    </div>
                </td>
            </tr>
        `).join('');
    }

    applyUserFilters() {
        let filtered = [...this.users];

        if (this.currentFilters.users.search) {
            const searchTerm = this.currentFilters.users.search.toLowerCase();
            filtered = filtered.filter(user =>
                user.username.toLowerCase().includes(searchTerm) ||
                user.role.toLowerCase().includes(searchTerm) ||
                user.created_by.toLowerCase().includes(searchTerm)
            );
        }

        if (this.currentFilters.users.role !== 'all') {
            filtered = filtered.filter(user => user.role === this.currentFilters.users.role);
        }

        if (this.currentFilters.users.status !== 'all') {
            const isActive = this.currentFilters.users.status === 'active';
            filtered = filtered.filter(user => user.active === isActive);
        }

        return filtered.sort((a, b) => a.username.localeCompare(b.username));
    }

    renderActivityLog() {
        const tbody = document.getElementById('activity-log-body');
        if (!tbody) return;

        let filteredLog = this.applyActivityFilters();

        if (filteredLog.length === 0) {
            tbody.innerHTML = '<tr><td colspan="4" class="empty-state">No activity matches the current filters.</td></tr>';
            return;
        }

        tbody.innerHTML = filteredLog.map(entry => `
            <tr>
                <td>${this.formatDateTime(entry.timestamp)}</td>
                <td><strong>${entry.user}</strong></td>
                <td><span class="status-badge meeting">${entry.action}</span></td>
                <td>${entry.details}</td>
            </tr>
        `).join('');
    }

    applyActivityFilters() {
        let filtered = [...this.activityLog];

        if (this.currentFilters.activity.search) {
            const searchTerm = this.currentFilters.activity.search.toLowerCase();
            filtered = filtered.filter(entry =>
                entry.user.toLowerCase().includes(searchTerm) ||
                entry.action.toLowerCase().includes(searchTerm) ||
                entry.details.toLowerCase().includes(searchTerm)
            );
        }

        if (this.currentFilters.activity.action !== 'all') {
            filtered = filtered.filter(entry => entry.action === this.currentFilters.activity.action);
        }

        return filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    }

    // Form Methods
    showAuditForm(auditId = null) {
        const modal = document.getElementById('audit-form-modal');
        const title = document.getElementById('audit-form-title');
        const submitBtn = document.getElementById('audit-submit-btn');
        const form = document.getElementById('audit-form');
        const editIndex = document.getElementById('edit-audit-index');

        if (auditId !== null) {
            const audit = this.audits.find(a => a.id === auditId);
            if (!audit) return;

            title.textContent = 'Edit Audit';
            submitBtn.textContent = 'Update Audit';
            editIndex.value = auditId;

            document.getElementById('audit-lifeguard').value = audit.lifeguard_name;
            document.getElementById('audit-date').value = audit.date;
            document.getElementById('audit-time').value = audit.time;
            document.getElementById('audit-type').value = audit.audit_type;
            document.getElementById('skill-detail').value = audit.skill_detail || '';
            document.getElementById('audit-result').value = audit.result;
            document.getElementById('auditor-name').value = audit.auditor_name;
            document.getElementById('audit-notes').value = audit.notes || '';
            document.getElementById('follow-up').value = audit.follow_up || '';
        } else {
            title.textContent = 'Add New Audit';
            submitBtn.textContent = 'Add Audit';
            editIndex.value = '';
            form.reset();
            this.setCurrentDateTime();
            
            setTimeout(() => {
                if (this.currentUser && (this.currentUser.role === 'ADMIN' || this.currentUser.role === 'SENIOR_ADMIN')) {
                    document.getElementById('auditor-name').value = this.currentUser.username;
                }
            }, 50);
        }

        modal.classList.remove('hidden');
    }

    handleAuditSubmit() {
        const editId = document.getElementById('edit-audit-index').value;
        
        const auditData = {
            lifeguard_name: document.getElementById('audit-lifeguard').value,
            date: document.getElementById('audit-date').value,
            time: document.getElementById('audit-time').value,
            audit_type: document.getElementById('audit-type').value,
            skill_detail: document.getElementById('skill-detail').value,
            auditor_name: document.getElementById('auditor-name').value,
            result: document.getElementById('audit-result').value,
            notes: document.getElementById('audit-notes').value,
            follow_up: document.getElementById('follow-up').value
        };

        if (!auditData.lifeguard_name || !auditData.date || !auditData.time || 
            !auditData.audit_type || !auditData.auditor_name || !auditData.result) {
            this.showToast('Please fill in all required fields.', 'error');
            return;
        }

        if (editId) {
            const auditIndex = this.audits.findIndex(a => a.id === parseInt(editId));
            if (auditIndex !== -1) {
                this.audits[auditIndex] = { 
                    ...this.audits[auditIndex], 
                    ...auditData,
                    last_edited_by: this.currentUser.username,
                    last_edited_date: new Date().toISOString().replace('T', ' ').substring(0, 19)
                };
                this.logActivity('UPDATE_AUDIT', `Updated audit for ${auditData.lifeguard_name}`);
                this.showToast('Audit updated successfully!', 'success');
            }
        } else {
            const newAudit = {
                ...auditData,
                id: Math.max(...this.audits.map(a => a.id), 0) + 1,
                created_by: this.currentUser.username,
                created_date: new Date().toISOString().replace('T', ' ').substring(0, 19),
                last_edited_by: null,
                last_edited_date: null
            };
            this.audits.unshift(newAudit);
            this.logActivity('CREATE_AUDIT', `Created audit for ${auditData.lifeguard_name}`);
            this.showToast('Audit added successfully!', 'success');
        }

        this.closeModal('audit-form-modal');
        this.updateDashboard();
        this.renderAudits();
        this.renderLifeguards();
    }

    showUserForm(userId = null) {
        const modal = document.getElementById('user-form-modal');
        const title = document.getElementById('user-form-title');
        const submitBtn = document.getElementById('user-submit-btn');
        const form = document.getElementById('user-form');
        const editId = document.getElementById('edit-user-id');

        if (userId !== null) {
            const user = this.users.find(u => u.id === userId);
            if (!user) return;

            title.textContent = 'Edit User';
            submitBtn.textContent = 'Update User';
            editId.value = userId;

            document.getElementById('user-username').value = user.username;
            document.getElementById('user-password').value = user.password;
            document.getElementById('user-role').value = user.role;
            
            this.setPermissionCheckboxes(user.individual_permissions);
        } else {
            title.textContent = 'Add New User';
            submitBtn.textContent = 'Add User';
            editId.value = '';
            form.reset();
            this.clearPermissionCheckboxes();
        }

        modal.classList.remove('hidden');
    }

    handleUserSubmit() {
        const editId = document.getElementById('edit-user-id').value;
        
        const userData = {
            username: document.getElementById('user-username').value.trim(),
            password: document.getElementById('user-password').value,
            role: document.getElementById('user-role').value,
            individual_permissions: this.getPermissionCheckboxes()
        };

        if (!userData.username || !userData.password || !userData.role) {
            this.showToast('Please fill in all fields.', 'error');
            return;
        }

        if (userData.password.length < 8) {
            this.showToast('Password must be at least 8 characters long.', 'error');
            return;
        }

        if (editId) {
            const userIndex = this.users.findIndex(u => u.id === parseInt(editId));
            if (userIndex !== -1) {
                this.users[userIndex] = { ...this.users[userIndex], ...userData };
                this.logActivity('UPDATE_USER', `Updated user ${userData.username}`);
                this.showToast('User updated successfully!', 'success');
            }
        } else {
            const newUser = {
                ...userData,
                id: Math.max(...this.users.map(u => u.id), 0) + 1,
                active: true,
                created_by: this.currentUser.username,
                created_date: new Date().toISOString().split('T')[0],
                last_login: null
            };

            this.users.push(newUser);
            this.logActivity('CREATE_USER', `Created user ${userData.username} with role ${userData.role}`);
            this.showToast('User added successfully!', 'success');
        }

        this.closeModal('user-form-modal');
        this.renderUsers();
        this.populateAdminDropdown();
    }

    showLifeguardForm(sheetNumber = null) {
        const modal = document.getElementById('lifeguard-form-modal');
        const title = document.getElementById('lifeguard-form-title');
        const submitBtn = document.getElementById('lifeguard-submit-btn');
        const form = document.getElementById('lifeguard-form');
        const editId = document.getElementById('edit-lifeguard-id');

        if (sheetNumber !== null) {
            const lifeguard = this.lifeguards.find(lg => lg.sheet_number === sheetNumber);
            if (!lifeguard) return;

            title.textContent = 'Edit Lifeguard';
            submitBtn.textContent = 'Update Lifeguard';
            editId.value = sheetNumber;

            document.getElementById('lifeguard-name').value = lifeguard.lifeguard_name;
            document.getElementById('lifeguard-hire-date').value = lifeguard.hire_date;
        } else {
            title.textContent = 'Add New Lifeguard';
            submitBtn.textContent = 'Add Lifeguard';
            editId.value = '';
            form.reset();
        }

        modal.classList.remove('hidden');
    }

    handleLifeguardSubmit() {
        const editId = document.getElementById('edit-lifeguard-id').value;
        
        const lifeguardData = {
            lifeguard_name: document.getElementById('lifeguard-name').value.trim().toUpperCase(),
            hire_date: document.getElementById('lifeguard-hire-date').value
        };

        if (!lifeguardData.lifeguard_name || !lifeguardData.hire_date) {
            this.showToast('Please fill in all fields.', 'error');
            return;
        }

        if (editId) {
            const lifeguardIndex = this.lifeguards.findIndex(lg => lg.sheet_number === editId);
            if (lifeguardIndex !== -1) {
                this.lifeguards[lifeguardIndex] = { ...this.lifeguards[lifeguardIndex], ...lifeguardData };
                this.logActivity('UPDATE_LIFEGUARD', `Updated lifeguard ${lifeguardData.lifeguard_name}`);
                this.showToast('Lifeguard updated successfully!', 'success');
            }
        } else {
            const nextNumber = (Math.max(...this.lifeguards.map(lg => parseInt(lg.sheet_number)), 0) + 1).toString().padStart(2, '0');
            const newLifeguard = {
                sheet_number: nextNumber,
                sheet_name: `Lifeguard_Audit_Sheet_${nextNumber}`,
                lifeguard_name: lifeguardData.lifeguard_name,
                active: true,
                hire_date: lifeguardData.hire_date,
                status: "ACTIVE"
            };

            this.lifeguards.push(newLifeguard);
            this.logActivity('CREATE_LIFEGUARD', `Created lifeguard ${lifeguardData.lifeguard_name}`);
            this.showToast('Lifeguard added successfully!', 'success');
        }

        this.closeModal('lifeguard-form-modal');
        this.renderLifeguards();
        this.populateLifeguardDropdown();
        this.updateDashboard();
    }

    // Permission Management
    updatePermissionsForRole(role) {
        const defaultPermissions = {
            "SENIOR_ADMIN": {
                "can_manage_users": true, "can_create_users": true, "can_deactivate_users": true,
                "can_edit_all_audits": true, "can_view_all_audits": true, "can_create_audits": true,
                "can_manage_lifeguards": true, "can_view_activity_log": true, "can_view_admin_metrics": true,
                "can_export_data": true, "can_modify_permissions": true
            },
            "ADMIN": {
                "can_manage_users": false, "can_create_users": false, "can_deactivate_users": false,
                "can_edit_all_audits": true, "can_view_all_audits": true, "can_create_audits": true,
                "can_manage_lifeguards": true, "can_view_activity_log": true, "can_view_admin_metrics": false,
                "can_export_data": false, "can_modify_permissions": false
            },
            "VIEWER": {
                "can_manage_users": false, "can_create_users": false, "can_deactivate_users": false,
                "can_edit_all_audits": false, "can_view_all_audits": true, "can_create_audits": false,
                "can_manage_lifeguards": false, "can_view_activity_log": false, "can_view_admin_metrics": false,
                "can_export_data": false, "can_modify_permissions": false
            }
        };

        if (role && defaultPermissions[role]) {
            this.setPermissionCheckboxes(defaultPermissions[role]);
        }
    }

    setPermissionCheckboxes(permissions) {
        Object.keys(permissions).forEach(permission => {
            const checkbox = document.getElementById(`perm-${permission.replace('can_', '').replace(/_/g, '-')}`);
            if (checkbox) {
                checkbox.checked = permissions[permission];
            }
        });
    }

    clearPermissionCheckboxes() {
        const checkboxes = document.querySelectorAll('#individual-permissions input[type="checkbox"]');
        checkboxes.forEach(checkbox => checkbox.checked = false);
    }

    getPermissionCheckboxes() {
        const permissions = {};
        const permissionMapping = {
            'manage-users': 'can_manage_users',
            'create-users': 'can_create_users',
            'deactivate-users': 'can_deactivate_users',
            'edit-all-audits': 'can_edit_all_audits',
            'view-all-audits': 'can_view_all_audits',
            'create-audits': 'can_create_audits',
            'manage-lifeguards': 'can_manage_lifeguards',
            'view-activity-log': 'can_view_activity_log',
            'view-admin-metrics': 'can_view_admin_metrics',
            'export-data': 'can_export_data',
            'modify-permissions': 'can_modify_permissions'
        };

        Object.keys(permissionMapping).forEach(key => {
            const checkbox = document.getElementById(`perm-${key}`);
            if (checkbox) {
                permissions[permissionMapping[key]] = checkbox.checked;
            }
        });

        return permissions;
    }

    // Action Methods
    editAudit(auditId) {
        this.showAuditForm(auditId);
    }

    deleteAudit(auditId) {
        if (confirm('Are you sure you want to delete this audit? This action cannot be undone.')) {
            const auditIndex = this.audits.findIndex(a => a.id === auditId);
            if (auditIndex !== -1) {
                const audit = this.audits[auditIndex];
                this.audits.splice(auditIndex, 1);
                this.logActivity('DELETE_AUDIT', `Deleted audit for ${audit.lifeguard_name} (${audit.audit_type})`);
                this.showToast('Audit deleted successfully!', 'success');
                this.renderAudits();
                this.updateDashboard();
                this.renderLifeguards();
            }
        }
    }

    editUser(userId) {
        this.showUserForm(userId);
    }

    toggleUserStatus(userId) {
        const user = this.users.find(u => u.id === userId);
        if (user && user.id !== this.currentUser.id) {
            user.active = !user.active;
            this.logActivity('TOGGLE_USER_STATUS', `${user.active ? 'Activated' : 'Deactivated'} user ${user.username}`);
            this.showToast(`User ${user.active ? 'activated' : 'deactivated'} successfully!`, 'success');
            this.renderUsers();
        } else if (user && user.id === this.currentUser.id) {
            this.showToast('Cannot deactivate your own account.', 'error');
        }
    }

    editLifeguard(sheetNumber) {
        this.showLifeguardForm(sheetNumber);
    }

    toggleLifeguardStatus(sheetNumber) {
        const lifeguard = this.lifeguards.find(lg => lg.sheet_number === sheetNumber);
        if (lifeguard) {
            lifeguard.active = !lifeguard.active;
            lifeguard.status = lifeguard.active ? 'ACTIVE' : 'INACTIVE';
            this.logActivity('TOGGLE_LIFEGUARD_STATUS', `${lifeguard.active ? 'Activated' : 'Deactivated'} lifeguard ${lifeguard.lifeguard_name}`);
            this.showToast(`Lifeguard ${lifeguard.active ? 'activated' : 'deactivated'} successfully!`, 'success');
            this.renderLifeguards();
            this.updateDashboard();
        }
    }

    // Export Methods
    exportActivityLog() {
        if (!this.hasPermission('can_export_data')) {
            this.showToast('Access denied.', 'error');
            return;
        }

        const csvContent = this.convertToCSV(this.activityLog, [
            'timestamp', 'user', 'action', 'details'
        ]);
        
        this.downloadCSV(csvContent, 'activity_log.csv');
        this.showToast('Activity log exported successfully!', 'success');
    }

    convertToCSV(data, headers) {
        const csvRows = [];
        csvRows.push(headers.map(h => `"${h}"`).join(','));
        
        data.forEach(row => {
            const values = headers.map(header => {
                const key = header.toLowerCase().replace(' ', '_');
                const value = row[key] || '';
                return `"${value}"`;
            });
            csvRows.push(values.join(','));
        });
        
        return csvRows.join('\n');
    }

    downloadCSV(csvContent, filename) {
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    }

    // Utility Methods
    getLifeguardAudits(lifeguardName) {
        return this.audits.filter(audit => audit.lifeguard_name === lifeguardName);
    }

    calculateLifeguardStats(audits) {
        const total = audits.length;
        const exceeds = audits.filter(audit => audit.result === 'EXCEEDS').length;
        const meets = audits.filter(audit => audit.result === 'MEETS').length;
        const fails = audits.filter(audit => audit.result === 'FAILS').length;
        const successRate = total > 0 ? Math.round(((exceeds + meets) / total) * 100) : 0;
        const exceedsRate = total > 0 ? Math.round((exceeds / total) * 100) : 0;

        return { total, exceeds, meets, fails, successRate, exceedsRate };
    }

    getPerformanceStatus(stats) {
        if (stats.total === 0) {
            return { text: 'No Audits', class: 'meeting' };
        }

        if (stats.exceedsRate >= 60) {
            return { text: 'Exceeding', class: 'exceeding' };
        } else if (stats.successRate >= 80 && stats.fails / stats.total <= 0.2) {
            return { text: 'Meeting', class: 'meeting' };
        } else if (stats.fails / stats.total <= 0.4) {
            return { text: 'Developing', class: 'developing' };
        } else {
            return { text: 'Needs Improvement', class: 'needs-improvement' };
        }
    }

    setCurrentDateTime() {
        const now = new Date();
        const dateStr = now.toISOString().split('T')[0];
        const timeStr = now.toTimeString().split(' ')[0].substring(0, 5);
        
        const dateInput = document.getElementById('audit-date');
        const timeInput = document.getElementById('audit-time');
        
        if (dateInput) dateInput.value = dateStr;
        if (timeInput) timeInput.value = timeStr;
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) modal.classList.add('hidden');
    }

    logActivity(action, details) {
        const entry = {
            id: this.activityLog.length + 1,
            timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
            user: this.currentUser ? this.currentUser.username : 'System',
            action: action,
            details: details
        };
        this.activityLog.unshift(entry);
    }

    updateElement(id, value) {
        const element = document.getElementById(id);
        if (element) element.textContent = value;
    }

    formatDate(dateStr) {
        if (!dateStr || dateStr === 'Never') return dateStr;
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    formatTime(timeStr) {
        const [hours, minutes] = timeStr.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour % 12 || 12;
        return `${displayHour}:${minutes} ${ampm}`;
    }

    formatDateTime(dateTimeStr) {
        const date = new Date(dateTimeStr.replace(' ', 'T'));
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    }

    showToast(message, type = 'info') {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <span>${message}</span>
            <button class="toast-close" onclick="this.parentElement.remove()">&times;</button>
        `;

        container.appendChild(toast);

        setTimeout(() => {
            if (toast.parentElement) toast.remove();
        }, 5000);
    }
}

// Initialize the enhanced application
console.log('Creating enhanced app instance...');
const app = new LifeguardAuditApp();