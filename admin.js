// Admin Panel JavaScript

// Sample data (in production, this would come from an API)
let bookings = [
    {
        id: 1,
        name: 'Juan Pérez',
        email: 'juan@example.com',
        phone: '+34 600 123 456',
        origin: 'AEROPUERTO',
        destination: 'PALMA',
        date: '2024-01-15',
        time: '10:30',
        passengers: 2,
        luggage: 2,
        price: 25,
        status: 'confirmed',
        serviceType: 'standard',
        tripType: 'one-way'
    },
    {
        id: 2,
        name: 'Maria García',
        email: 'maria@example.com',
        phone: '+34 600 789 012',
        origin: 'MAGALUF',
        destination: 'AEROPUERTO',
        date: '2024-01-16',
        time: '14:00',
        passengers: 4,
        luggage: 4,
        price: 45,
        status: 'pending',
        serviceType: 'standard',
        tripType: 'one-way'
    },
    {
        id: 3,
        name: 'Thomas Müller',
        email: 'thomas@example.com',
        phone: '+49 123 456 789',
        origin: 'AEROPUERTO',
        destination: 'ALCUDIA',
        date: '2024-01-17',
        time: '09:00',
        passengers: 3,
        luggage: 3,
        price: 65,
        status: 'completed',
        serviceType: 'standard',
        tripType: 'one-way'
    }
];

let reviews = [
    {
        id: 1,
        author: 'Maria Garcia',
        rating: 5,
        text: 'Kristian es un super conductor, siempre puntual incluso con retrasos. Muy confiable y recomendable.',
        date: 'Hace 1 mes'
    },
    {
        id: 2,
        author: 'Thomas Müller',
        rating: 5,
        text: 'Sehr zuverlässig und pünktlich. Kristian war stets geduldig, selbst bei Verspätungen. Sehr empfehlenswert!',
        date: 'Hace 3 semanas'
    }
];

// Initialize admin panel
document.addEventListener('DOMContentLoaded', function() {
    showAdminSection('dashboard');
    loadDashboard();
    loadBookings();
    loadReviews();
    
    // Check authentication (simple check for demo)
    checkAuth();
});

// Check authentication
function checkAuth() {
    // In production, implement proper authentication
    const isAuthenticated = localStorage.getItem('adminAuthenticated');
    if (!isAuthenticated) {
        // Redirect to login page (create login.html if needed)
        // For now, just set authenticated for demo
        localStorage.setItem('adminAuthenticated', 'true');
    }
}

// Show admin section
function showAdminSection(section) {
    // Hide all sections
    document.querySelectorAll('.admin-section').forEach(sec => {
        sec.classList.remove('active');
    });
    
    // Remove active from all nav links
    document.querySelectorAll('.admin-nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Show selected section
    const targetSection = document.getElementById(`admin-${section}`);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Activate nav link
    const navLink = document.querySelector(`[data-section="${section}"]`);
    if (navLink) {
        navLink.classList.add('active');
    }
    
    // Load section-specific data
    if (section === 'dashboard') {
        loadDashboard();
    } else if (section === 'bookings') {
        loadBookings();
    } else if (section === 'reviews') {
        loadReviews();
    }
}

// Load dashboard data
function loadDashboard() {
    // Calculate stats
    const totalBookings = bookings.length;
    const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length;
    const pendingBookings = bookings.filter(b => b.status === 'pending').length;
    const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    
    // Update stats
    document.getElementById('totalBookings').textContent = totalBookings;
    document.getElementById('confirmedBookings').textContent = confirmedBookings;
    document.getElementById('pendingBookings').textContent = pendingBookings;
    document.getElementById('averageRating').textContent = averageRating.toFixed(1);
    
    // Load recent bookings
    loadRecentBookings();
    
    // Load revenue chart
    loadRevenueChart();
}

// Load recent bookings table
function loadRecentBookings() {
    const tableBody = document.getElementById('recentBookingsTable');
    if (!tableBody) return;
    
    const recentBookings = bookings.slice(0, 5);
    tableBody.innerHTML = recentBookings.map(booking => `
        <tr>
            <td>${booking.name}</td>
            <td>${booking.origin} → ${booking.destination}</td>
            <td>${booking.date} ${booking.time}</td>
            <td><span class="status-badge status-${booking.status}">${getStatusText(booking.status)}</span></td>
            <td>
                <button class="btn btn-primary btn-sm" onclick="viewBooking(${booking.id})">Ver</button>
            </td>
        </tr>
    `).join('');
}

// Load bookings table
function loadBookings() {
    const tableBody = document.getElementById('bookingsTable');
    if (!tableBody) return;
    
    tableBody.innerHTML = bookings.map(booking => `
        <tr>
            <td>#${booking.id}</td>
            <td>${booking.name}</td>
            <td>${booking.email}</td>
            <td>${booking.phone}</td>
            <td>${booking.origin} → ${booking.destination}</td>
            <td>${booking.date} ${booking.time}</td>
            <td>${booking.passengers}</td>
            <td>${booking.price}€</td>
            <td><span class="status-badge status-${booking.status}">${getStatusText(booking.status)}</span></td>
            <td>
                <button class="btn btn-primary btn-sm" onclick="viewBooking(${booking.id})">Ver</button>
                <button class="btn btn-secondary btn-sm" onclick="editBooking(${booking.id})">Editar</button>
            </td>
        </tr>
    `).join('');
}

// Load reviews table
function loadReviews() {
    const tableBody = document.getElementById('reviewsTable');
    if (!tableBody) return;
    
    tableBody.innerHTML = reviews.map(review => `
        <tr>
            <td>${review.author}</td>
            <td>${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</td>
            <td>${review.text.substring(0, 100)}${review.text.length > 100 ? '...' : ''}</td>
            <td>${review.date}</td>
            <td>
                <button class="btn btn-primary btn-sm" onclick="editReview(${review.id})">Editar</button>
                <button class="btn btn-secondary btn-sm" onclick="deleteReview(${review.id})">Eliminar</button>
            </td>
        </tr>
    `).join('');
}

// Get status text
function getStatusText(status) {
    const statusMap = {
        'pending': 'Pendiente',
        'confirmed': 'Confirmada',
        'completed': 'Completada',
        'cancelled': 'Cancelada'
    };
    return statusMap[status] || status;
}

// Filter bookings
function filterBookings() {
    const filter = document.getElementById('bookingFilter').value;
    const tableBody = document.getElementById('bookingsTable');
    
    if (filter === 'all') {
        loadBookings();
        return;
    }
    
    const filtered = bookings.filter(b => b.status === filter);
    tableBody.innerHTML = filtered.map(booking => `
        <tr>
            <td>#${booking.id}</td>
            <td>${booking.name}</td>
            <td>${booking.email}</td>
            <td>${booking.phone}</td>
            <td>${booking.origin} → ${booking.destination}</td>
            <td>${booking.date} ${booking.time}</td>
            <td>${booking.passengers}</td>
            <td>${booking.price}€</td>
            <td><span class="status-badge status-${booking.status}">${getStatusText(booking.status)}</span></td>
            <td>
                <button class="btn btn-primary btn-sm" onclick="viewBooking(${booking.id})">Ver</button>
                <button class="btn btn-secondary btn-sm" onclick="editBooking(${booking.id})">Editar</button>
            </td>
        </tr>
    `).join('');
}

// Search bookings
function searchBookings() {
    const search = document.getElementById('bookingSearch').value.toLowerCase();
    const tableBody = document.getElementById('bookingsTable');
    
    const filtered = bookings.filter(b => 
        b.name.toLowerCase().includes(search) ||
        b.email.toLowerCase().includes(search) ||
        b.origin.toLowerCase().includes(search) ||
        b.destination.toLowerCase().includes(search)
    );
    
    tableBody.innerHTML = filtered.map(booking => `
        <tr>
            <td>#${booking.id}</td>
            <td>${booking.name}</td>
            <td>${booking.email}</td>
            <td>${booking.phone}</td>
            <td>${booking.origin} → ${booking.destination}</td>
            <td>${booking.date} ${booking.time}</td>
            <td>${booking.passengers}</td>
            <td>${booking.price}€</td>
            <td><span class="status-badge status-${booking.status}">${getStatusText(booking.status)}</span></td>
            <td>
                <button class="btn btn-primary btn-sm" onclick="viewBooking(${booking.id})">Ver</button>
                <button class="btn btn-secondary btn-sm" onclick="editBooking(${booking.id})">Editar</button>
            </td>
        </tr>
    `).join('');
}

// View booking details
function viewBooking(id) {
    const booking = bookings.find(b => b.id === id);
    if (!booking) return;
    
    const modalBody = document.getElementById('bookingModalBody');
    modalBody.innerHTML = `
        <div class="booking-details">
            <div class="detail-row">
                <strong>ID:</strong> #${booking.id}
            </div>
            <div class="detail-row">
                <strong>Cliente:</strong> ${booking.name}
            </div>
            <div class="detail-row">
                <strong>Email:</strong> ${booking.email}
            </div>
            <div class="detail-row">
                <strong>Teléfono:</strong> ${booking.phone}
            </div>
            <div class="detail-row">
                <strong>Ruta:</strong> ${booking.origin} → ${booking.destination}
            </div>
            <div class="detail-row">
                <strong>Fecha/Hora:</strong> ${booking.date} ${booking.time}
            </div>
            <div class="detail-row">
                <strong>Pasajeros:</strong> ${booking.passengers}
            </div>
            <div class="detail-row">
                <strong>Equipaje:</strong> ${booking.luggage} maletas
            </div>
            <div class="detail-row">
                <strong>Tipo de Servicio:</strong> ${booking.serviceType}
            </div>
            <div class="detail-row">
                <strong>Tipo de Viaje:</strong> ${booking.tripType}
            </div>
            <div class="detail-row">
                <strong>Precio:</strong> ${booking.price}€
            </div>
            <div class="detail-row">
                <strong>Estado:</strong> <span class="status-badge status-${booking.status}">${getStatusText(booking.status)}</span>
            </div>
        </div>
    `;
    
    openModal('bookingModal');
    window.currentBookingId = id;
}

// Confirm booking
function confirmBooking() {
    if (!window.currentBookingId) return;
    
    const booking = bookings.find(b => b.id === window.currentBookingId);
    if (booking) {
        booking.status = 'confirmed';
        loadBookings();
        loadDashboard();
        closeModal('bookingModal');
        alert('Reserva confirmada exitosamente');
    }
}

// Edit booking
function editBooking(id) {
    // Implement edit functionality
    alert('Funcionalidad de edición en desarrollo');
}

// Show add review modal
function showAddReviewModal() {
    document.getElementById('addReviewForm').reset();
    openModal('addReviewModal');
}

// Save review
function saveReview() {
    const form = document.getElementById('addReviewForm');
    const formData = new FormData(form);
    
    const newReview = {
        id: reviews.length + 1,
        author: formData.get('author'),
        rating: parseInt(formData.get('rating')),
        text: formData.get('text'),
        date: formData.get('date') || 'Hace 1 semana'
    };
    
    reviews.push(newReview);
    loadReviews();
    loadDashboard();
    closeModal('addReviewModal');
    alert('Reseña añadida exitosamente');
}

// Edit review
function editReview(id) {
    const review = reviews.find(r => r.id === id);
    if (!review) return;
    
    // Populate form and show modal
    document.getElementById('addReviewForm').querySelector('[name="author"]').value = review.author;
    document.getElementById('addReviewForm').querySelector('[name="rating"]').value = review.rating;
    document.getElementById('addReviewForm').querySelector('[name="text"]').value = review.text;
    document.getElementById('addReviewForm').querySelector('[name="date"]').value = review.date;
    
    openModal('addReviewModal');
    window.currentReviewId = id;
}

// Delete review
function deleteReview(id) {
    if (confirm('¿Estás seguro de que quieres eliminar esta reseña?')) {
        reviews = reviews.filter(r => r.id !== id);
        loadReviews();
        loadDashboard();
    }
}

// Vehicle management
function editVehicle(type) {
    alert(`Editar vehículo: ${type}`);
}

function deleteVehicle(type) {
    if (confirm(`¿Estás seguro de que quieres eliminar el vehículo ${type}?`)) {
        alert(`Vehículo ${type} eliminado`);
    }
}

function showAddVehicleModal() {
    alert('Funcionalidad de añadir vehículo en desarrollo');
}

// Modal functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
    }
    window.currentBookingId = null;
    window.currentReviewId = null;
}

// Close modal on outside click
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('admin-modal')) {
        e.target.classList.remove('active');
    }
});

// Logout
function logout() {
    if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
        localStorage.removeItem('adminAuthenticated');
        // Redirect to login page or home
        window.location.href = 'index.html';
    }
}

// Load revenue chart (simple implementation)
function loadRevenueChart() {
    const canvas = document.getElementById('revenueChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.parentElement.offsetWidth - 40;
    canvas.height = 250;
    
    // Simple bar chart
    const data = [1200, 1500, 1800, 2100, 1900, 2200]; // Sample monthly revenue
    const maxValue = Math.max(...data);
    const barWidth = (canvas.width - 60) / data.length;
    const barSpacing = 10;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    data.forEach((value, index) => {
        const barHeight = (value / maxValue) * (canvas.height - 60);
        const x = 30 + index * (barWidth + barSpacing);
        const y = canvas.height - 30 - barHeight;
        
        // Draw bar
        ctx.fillStyle = '#1a56db';
        ctx.fillRect(x, y, barWidth - barSpacing, barHeight);
        
        // Draw value
        ctx.fillStyle = '#1f2937';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(value + '€', x + (barWidth - barSpacing) / 2, y - 5);
    });
}

// Add some CSS for booking details
const style = document.createElement('style');
style.textContent = `
    .booking-details {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    .detail-row {
        padding: 0.75rem 0;
        border-bottom: 1px solid var(--border-color);
    }
    .detail-row:last-child {
        border-bottom: none;
    }
    .detail-row strong {
        color: var(--primary-blue);
        margin-right: 0.5rem;
    }
`;
document.head.appendChild(style);
