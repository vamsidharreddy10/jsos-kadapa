// Smooth Scrolling for Navigation Links
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        
        // Close mobile menu if open
        document.querySelector('.nav-links').classList.remove('active');
    });
});

// Regular link behavior for page navigation
document.querySelectorAll('nav a[href$=".html"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        // Allow default link behavior (page navigation)
        // Close mobile menu if open
        document.querySelector('.nav-links').classList.remove('active');
    });
});
// PDF Upload Form Handling
document.getElementById('pdf-upload-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const fileInput = document.getElementById('pdf-file');
    const fileName = document.getElementById('pdf-name').value;
    const userEmail = document.getElementById('pdf-email').value;
    
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        
        // Validate file type
        if (file.type !== 'application/pdf') {
            alert('Please upload only PDF files.');
            return;
        }
        
        // Validate file size (e.g., 5MB max)
        if (file.size > 5 * 1024 * 1024) {
            alert('File size should be less than 5MB.');
            return;
        }
        
        // Here you would typically send the file to your server
        // This is just a simulation
        alert(`Thank you ${fileName}! Your PDF "${file.name}" has been received. We'll contact you at ${userEmail} if needed.`);
        
        // Reset form
        this.reset();
    } else {
        alert('Please select a PDF file to upload.');
    }
});
// Photo Gallery Lightbox
const galleryItems = document.querySelectorAll('.gallery-item');
const modal = document.createElement('div');
modal.className = 'modal';
modal.innerHTML = `
    <span class="close">&times;</span>
    <div class="modal-content">
        <img class="modal-img" src="" alt="">
    </div>
`;
document.body.appendChild(modal);

galleryItems.forEach(item => {
    item.addEventListener('click', function() {
        const imgSrc = this.querySelector('img').src;
        const imgAlt = this.querySelector('img').alt;
        modal.style.display = 'flex';
        modal.querySelector('.modal-img').src = imgSrc;
        modal.querySelector('.modal-img').alt = imgAlt;
    });
});

modal.querySelector('.close').addEventListener('click', function() {
    modal.style.display = 'none';
});

modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});
// Gallery Filter Functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        const filterValue = this.getAttribute('data-filter');
        
        // Filter gallery items
        galleryItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Enhanced Lightbox Functionality
const modal = document.querySelector('.modal');
const modalImg = document.querySelector('.modal-img');
const modalTitle = document.querySelector('.modal-title');
const modalDescription = document.querySelector('.modal-description');
const modalDate = document.querySelector('.modal-date');

galleryItems.forEach(item => {
    item.addEventListener('click', function() {
        const imgSrc = this.querySelector('img').src;
        const imgAlt = this.querySelector('img').alt;
        const title = this.querySelector('h3').textContent;
        const description = this.querySelector('p').textContent;
        const date = this.querySelector('.photo-date').textContent;
        
        modal.style.display = 'flex';
        modalImg.src = imgSrc;
        modalImg.alt = imgAlt;
        modalTitle.textContent = title;
        modalDescription.textContent = description;
        modalDate.textContent = date;
        
        // Prevent scrolling when lightbox is open
        document.body.style.overflow = 'hidden';
    });
});

// Close lightbox
document.querySelector('.close').addEventListener('click', function() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Close with ESC key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});
// Volunteer Form Submission
document.querySelector('.volunteer-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Form validation
    const requiredFields = this.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = '#e74c3c';
            isValid = false;
        } else {
            field.style.borderColor = '#ddd';
        }
    });
    
    if (isValid) {
        // In a real implementation, you would send the form data to your server
        alert('Thank you for your application! We will review your information and contact you soon.');
        this.reset();
    } else {
        alert('Please fill in all required fields.');
    }
});

// Event card hover effects
document.querySelectorAll('.event-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.querySelector('.event-date').style.backgroundColor = '#2980b9';
    });
    
    card.addEventListener('mouseleave', function() {
        this.querySelector('.event-date').style.backgroundColor = '#3498db';
    });
});
// Donation Buttons
document.querySelectorAll('.donate-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const amount = this.dataset.amount || document.getElementById('custom-amount').value;
    if (!amount || amount < 100) {
      alert('Please enter a valid amount (minimum ₹100)');
      return;
    }
    
    document.getElementById('payment-amount').textContent = `₹${amount}`;
    document.querySelector('.card-amount').textContent = amount;
    document.querySelector('.payment-modal').style.display = 'block';
    document.body.style.overflow = 'hidden';
  });
});

// Payment Method Selection
document.querySelectorAll('.payment-method').forEach(method => {
  method.addEventListener('click', function() {
    document.querySelectorAll('.payment-method').forEach(m => m.classList.remove('active'));
    this.classList.add('active');
    
    const methodType = this.dataset.method;
    document.getElementById('payment-method').textContent = 
      methodType.charAt(0).toUpperCase() + methodType.slice(1);
    
    document.querySelectorAll('.payment-form').forEach(form => form.classList.remove('active'));
    document.querySelector(`.${methodType}-form`).classList.add('active');
  });
});

// Close Modal
document.querySelector('.close-modal').addEventListener('click', function() {
  document.querySelector('.payment-modal').style.display = 'none';
  document.body.style.overflow = 'auto';
});

// Process Payment (simulated)
document.querySelectorAll('.confirm-payment').forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Simulate payment processing
    btn.textContent = 'Processing...';
    btn.disabled = true;
    
    setTimeout(() => {
      document.querySelectorAll('.payment-form').forEach(form => form.style.display = 'none');
      document.querySelector('.thank-you-message').style.display = 'block';
      
      // In a real implementation, you would submit to a payment gateway
      console.log('Payment processed');
    }, 2000);
  });
});

// Return Home
document.querySelector('.return-home').addEventListener('click', function() {
  document.querySelector('.payment-modal').style.display = 'none';
  document.body.style.overflow = 'auto';
  window.location.href = 'index.html';
});

// Recurring Donation Toggle
document.getElementById('recurring').addEventListener('change', function() {
  const badge = document.querySelector('.recurring-badge');
  if (this.checked) {
    badge.style.display = 'inline-block';
    badge.style.animation = 'none';
    void badge.offsetWidth; // Trigger reflow
    badge.style.animation = 'float 3s ease-in-out infinite';
  } else {
    badge.style.display = 'none';
  }
});
// just sum css
const card = document.getElementById("card");
const cardNumber = document.getElementById("card-number");
const cardHolder = document.getElementById("card-holder");
const cardExpiry = document.getElementById("card-expiry");
const cardCvv = document.getElementById("card-cvv");

document.getElementById("input-card-number").addEventListener("input", (e) => {
  let value = e.target.value.replace(/\D/g, "").substring(0, 16);
  value = value.replace(/(\d{4})(?=\d)/g, "$1 ");
  cardNumber.textContent = value || "#### #### #### ####";
});

document.getElementById("input-card-holder").addEventListener("input", (e) => {
  cardHolder.textContent = e.target.value.toUpperCase() || "FULL NAME";
});

document.getElementById("input-expiry").addEventListener("input", (e) => {
  let value = e.target.value.replace(/\D/g, "").substring(0, 4);
  if (value.length > 2) {
    value = value.replace(/(\d{2})(\d{1,2})/, "$1/$2");
  }
  cardExpiry.textContent = value || "MM/YY";
});

document.getElementById("input-cvv").addEventListener("focus", () => {
  card.style.transform = "rotateY(180deg)";
});

document.getElementById("input-cvv").addEventListener("blur", () => {
  card.style.transform = "rotateY(0deg)";
});

document.getElementById("input-cvv").addEventListener("input", (e) => {
  cardCvv.textContent = e.target.value || "###";
});
