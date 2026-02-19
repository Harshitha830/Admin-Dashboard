// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {

// Menu Toggle for Mobile
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
const mainContent = document.querySelector('.main-content');

if (menuToggle && sidebar && mainContent) {
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('show');
        sidebar.classList.toggle('collapsed');
        mainContent.classList.toggle('expanded');
    });
}

// Profile Dropdown
const profileBtn = document.getElementById('profileBtn');
const dropdownMenu = document.getElementById('dropdownMenu');

if (profileBtn && dropdownMenu) {
    profileBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdownMenu.classList.toggle('show');
    });

    document.addEventListener('click', () => {
        dropdownMenu.classList.remove('show');
    });
}

// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const icon = darkModeToggle.querySelector('i');
        if (body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });
}

// Animated Counter
const counters = document.querySelectorAll('.counter');
counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const increment = target / 100;
    
    const updateCounter = () => {
        const current = +counter.innerText;
        if (current < target) {
            counter.innerText = Math.ceil(current + increment);
            setTimeout(updateCounter, 20);
        } else {
            counter.innerText = target;
        }
    };
    
    updateCounter();
});

// Charts - Check if Chart.js is loaded
if (typeof Chart !== 'undefined') {
    // Line Chart
    const lineCanvas = document.getElementById('lineChart');
    if (lineCanvas) {
        const lineCtx = lineCanvas.getContext('2d');
        const lineChart = new Chart(lineCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Student Registrations',
                    data: [50, 80, 120, 150, 200, 245],
                    borderColor: '#4f46e5',
                    backgroundColor: 'rgba(79, 70, 229, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // Pie Chart
    const pieCanvas = document.getElementById('pieChart');
    if (pieCanvas) {
        const pieCtx = pieCanvas.getContext('2d');
        const pieChart = new Chart(pieCtx, {
            type: 'doughnut',
            data: {
                labels: ['Open Internships', 'Closed Internships'],
                datasets: [{
                    data: [70, 30],
                    backgroundColor: ['#10b981', '#ef4444'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom'
                    }
                }
            }
        });
    }
}

// Table Search
const searchTable = document.getElementById('searchTable');
const activityTable = document.getElementById('activityTable');

if (searchTable && activityTable) {
    const tableRows = activityTable.querySelectorAll('tbody tr');
    
    searchTable.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        tableRows.forEach(row => {
            const text = row.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });
}

// Filter Status
const filterStatus = document.getElementById('filterStatus');

if (filterStatus && activityTable) {
    const tableRows = activityTable.querySelectorAll('tbody tr');
    
    filterStatus.addEventListener('change', (e) => {
        const filterValue = e.target.value;
        
        tableRows.forEach(row => {
            if (filterValue === 'all') {
                row.style.display = '';
            } else {
                const status = row.querySelector('.status');
                if (status && status.classList.contains(filterValue)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            }
        });
    });
}

// Delete Row
const deleteButtons = document.querySelectorAll('.btn-delete');

deleteButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        if (confirm('Are you sure you want to delete this item?')) {
            const row = e.target.closest('tr');
            if (row) {
                row.remove();
            }
        }
    });
});

// Edit Row
const editButtons = document.querySelectorAll('.btn-edit');

editButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        alert('Edit functionality - Connect to backend to update data');
    });
});

// Active Navigation with Page Switching
const navItems = document.querySelectorAll('.nav-item');
const pageSection = document.querySelectorAll('.page-section');

navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetPage = item.getAttribute('data-page');
        
        if (targetPage === 'logout') {
            if (confirm('Are you sure you want to logout?')) {
                alert('Logged out successfully!');
            }
            return;
        }
        
        // Remove active from all nav items
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
        
        // Hide all page sections
        pageSection.forEach(section => section.classList.remove('active'));
        
        // Show target page section
        const targetSection = document.getElementById(targetPage);
        if (targetSection) {
            targetSection.classList.add('active');
        }
    });
});

// Notification and Message buttons
const notificationBtn = document.getElementById('notificationBtn');
const messageBtn = document.getElementById('messageBtn');
const notificationPanel = document.getElementById('notificationPanel');
const messagePanel = document.getElementById('messagePanel');
const closeNotifications = document.getElementById('closeNotifications');
const closeMessages = document.getElementById('closeMessages');

// Profile Modal
const profileLink = document.getElementById('profileLink');
const profileModal = document.getElementById('profileModal');
const closeProfile = document.getElementById('closeProfile');

// Notification Panel
if (notificationBtn && notificationPanel) {
    notificationBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        notificationPanel.classList.toggle('show');
        messagePanel.classList.remove('show');
    });
}

if (closeNotifications) {
    closeNotifications.addEventListener('click', () => {
        notificationPanel.classList.remove('show');
    });
}

// Message Panel
if (messageBtn && messagePanel) {
    messageBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        messagePanel.classList.toggle('show');
        notificationPanel.classList.remove('show');
    });
}

if (closeMessages) {
    closeMessages.addEventListener('click', () => {
        messagePanel.classList.remove('show');
    });
}

// Profile Modal
if (profileLink && profileModal) {
    profileLink.addEventListener('click', (e) => {
        e.preventDefault();
        profileModal.classList.add('show');
        dropdownMenu.classList.remove('show');
    });
}

if (closeProfile) {
    closeProfile.addEventListener('click', () => {
        profileModal.classList.remove('show');
    });
}

// Close panels when clicking outside
document.addEventListener('click', (e) => {
    if (!notificationPanel.contains(e.target) && !notificationBtn.contains(e.target)) {
        notificationPanel.classList.remove('show');
    }
    if (!messagePanel.contains(e.target) && !messageBtn.contains(e.target)) {
        messagePanel.classList.remove('show');
    }
});

// Close modal when clicking overlay
if (profileModal) {
    profileModal.addEventListener('click', (e) => {
        if (e.target === profileModal) {
            profileModal.classList.remove('show');
        }
    });
}

});
