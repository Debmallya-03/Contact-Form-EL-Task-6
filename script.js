class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.nameInput = document.getElementById('name');
        this.emailInput = document.getElementById('email');
        this.messageInput = document.getElementById('message');
        this.submitBtn = this.form.querySelector('.submit-btn');
        this.successMessage = document.getElementById('successMessage');
        
        this.init();
    }
    
    init() {
        this.addEventListeners();
        this.addInputAnimations();
    }
    
    addEventListeners() {
        // Form submission
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Real-time validation
        this.nameInput.addEventListener('blur', () => this.validateName());
        this.emailInput.addEventListener('blur', () => this.validateEmail());
        this.messageInput.addEventListener('blur', () => this.validateMessage());
        
        // Clear errors on input
        this.nameInput.addEventListener('input', () => this.clearError('name'));
        this.emailInput.addEventListener('input', () => this.clearError('email'));
        this.messageInput.addEventListener('input', () => this.clearError('message'));
    }
    
    addInputAnimations() {
        const inputs = this.form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            // Add hover effects
            input.addEventListener('mouseenter', () => {
                if (!input.matches(':focus')) {
                    input.style.borderBottomColor = '#667eea';
                }
            });
            
            input.addEventListener('mouseleave', () => {
                if (!input.matches(':focus')) {
                    input.style.borderBottomColor = '#e0e0e0';
                }
            });
            
            // Handle label animations
            input.addEventListener('focus', () => {
                this.animateLabel(input, true);
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    this.animateLabel(input, false);
                }
            });
        });
    }
    
    animateLabel(input, isFocused) {
        const label = input.nextElementSibling;
        if (isFocused || input.value) {
            label.style.transform = 'translateY(-20px) scale(0.8)';
            label.style.color = '#667eea';
        } else {
            label.style.transform = 'translateY(0) scale(1)';
            label.style.color = '#999';
        }
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        // Validate all fields
        const isNameValid = this.validateName();
        const isEmailValid = this.validateEmail();
        const isMessageValid = this.validateMessage();
        
        if (!isNameValid || !isEmailValid || !isMessageValid) {
            this.shakeForm();
            return;
        }
        
        // Show loading state
        this.setLoadingState(true);
        
        try {
            // Simulate API call
            await this.simulateFormSubmission();
            
            // Show success state
            this.showSuccess();
            
        } catch (error) {
            this.showError('Something went wrong. Please try again.');
            this.setLoadingState(false);
        }
    }
    
    validateName() {
        const name = this.nameInput.value.trim();
        const wrapper = this.nameInput.closest('.input-wrapper');
        const errorElement = document.getElementById('nameError');
        
        if (!name) {
            this.showFieldError(wrapper, errorElement, 'Name is required');
            return false;
        }
        
        if (name.length < 2) {
            this.showFieldError(wrapper, errorElement, 'Name must be at least 2 characters');
            return false;
        }
        
        if (!/^[a-zA-Z\s]+$/.test(name)) {
            this.showFieldError(wrapper, errorElement, 'Name can only contain letters and spaces');
            return false;
        }
        
        this.showFieldSuccess(wrapper, errorElement);
        return true;
    }
    
    validateEmail() {
        const email = this.emailInput.value.trim();
        const wrapper = this.emailInput.closest('.input-wrapper');
        const errorElement = document.getElementById('emailError');
        
        if (!email) {
            this.showFieldError(wrapper, errorElement, 'Email is required');
            return false;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            this.showFieldError(wrapper, errorElement, 'Please enter a valid email address');
            return false;
        }
        
        this.showFieldSuccess(wrapper, errorElement);
        return true;
    }
    
    validateMessage() {
        const message = this.messageInput.value.trim();
        const wrapper = this.messageInput.closest('.input-wrapper');
        const errorElement = document.getElementById('messageError');
        
        if (!message) {
            this.showFieldError(wrapper, errorElement, 'Message is required');
            return false;
        }
        
        if (message.length < 10) {
            this.showFieldError(wrapper, errorElement, 'Message must be at least 10 characters');
            return false;
        }
        
        if (message.length > 500) {
            this.showFieldError(wrapper, errorElement, 'Message must be less than 500 characters');
            return false;
        }
        
        this.showFieldSuccess(wrapper, errorElement);
        return true;
    }
    
    showFieldError(wrapper, errorElement, message) {
        wrapper.classList.remove('success');
        wrapper.classList.add('error');
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
    
    showFieldSuccess(wrapper, errorElement) {
        wrapper.classList.remove('error');
        wrapper.classList.add('success');
        errorElement.classList.remove('show');
        errorElement.textContent = '';
    }
    
    clearError(fieldName) {
        const wrapper = document.getElementById(fieldName).closest('.input-wrapper');
        const errorElement = document.getElementById(fieldName + 'Error');
        
        wrapper.classList.remove('error');
        errorElement.classList.remove('show');
    }
    
    shakeForm() {
        this.form.style.animation = 'shake 0.5s ease';
        setTimeout(() => {
            this.form.style.animation = '';
        }, 500);
    }
    
    setLoadingState(isLoading) {
        if (isLoading) {
            this.submitBtn.classList.add('loading');
            this.submitBtn.disabled = true;
        } else {
            this.submitBtn.classList.remove('loading');
            this.submitBtn.disabled = false;
        }
    }
    
    async simulateFormSubmission() {
        // Simulate network delay
        return new Promise((resolve) => {
            setTimeout(resolve, 2000);
        });
    }
    
    showSuccess() {
        // Hide loading state
        this.setLoadingState(false);
        
        // Show success button state
        this.submitBtn.classList.add('success');
        
        // Show success message after a delay
        setTimeout(() => {
            this.successMessage.classList.add('show');
            
            // Reset form after showing success
            setTimeout(() => {
                this.resetForm();
            }, 3000);
        }, 1000);
    }
    
    showError(message) {
        // You can implement a toast notification or error display here
        alert(message);
    }
    
    resetForm() {
        // Hide success message
        this.successMessage.classList.remove('show');
        
        // Reset button state
        this.submitBtn.classList.remove('success');
        
        // Clear form
        this.form.reset();
        
        // Reset all field states
        const wrappers = this.form.querySelectorAll('.input-wrapper');
        wrappers.forEach(wrapper => {
            wrapper.classList.remove('error', 'success');
        });
        
        const errorMessages = this.form.querySelectorAll('.error-message');
        errorMessages.forEach(error => {
            error.classList.remove('show');
            error.textContent = '';
        });
        
        // Reset labels
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            this.animateLabel(input, false);
        });
    }
}

// Initialize the contact form when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ContactForm();
});

// Add some additional interactive effects
document.addEventListener('DOMContentLoaded', () => {
    // Add parallax effect to background
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        const wrapper = document.querySelector('.form-wrapper');
        const moveX = (mouseX - 0.5) * 20;
        const moveY = (mouseY - 0.5) * 20;
        
        wrapper.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
    
    // Add typing effect for placeholder text
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.style.caretColor = '#667eea';
        });
    });
});