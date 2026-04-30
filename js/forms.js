/* =============================================
   BRICKSY ENTERPRISE — Form Handling
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
  initFormValidation();
});

function initFormValidation() {
  document.querySelectorAll('form[data-validate]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (validateForm(form)) {
        submitForm(form);
      }
    });

    // Real-time validation
    form.querySelectorAll('.form-input, .form-textarea, .form-select').forEach(input => {
      input.addEventListener('blur', () => validateField(input));
      input.addEventListener('input', () => {
        if (input.closest('.form-group').classList.contains('error')) {
          validateField(input);
        }
      });
    });
  });
}

function validateForm(form) {
  let isValid = true;
  form.querySelectorAll('[required]').forEach(field => {
    if (!validateField(field)) isValid = false;
  });
  return isValid;
}

function validateField(field) {
  const group = field.closest('.form-group');
  if (!group) return true;
  const errorEl = group.querySelector('.form-error');
  let error = '';

  const value = field.value.trim();

  if (field.hasAttribute('required') && !value) {
    error = 'This field is required';
  } else if (field.type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    error = 'Please enter a valid email address';
  } else if (field.type === 'tel' && value && !/^[\+]?[\d\s\-\(\)]{7,15}$/.test(value)) {
    error = 'Please enter a valid phone number';
  } else if (field.minLength > 0 && value.length < field.minLength) {
    error = `Minimum ${field.minLength} characters required`;
  }

  if (error) {
    group.classList.add('error');
    if (errorEl) { errorEl.textContent = error; errorEl.style.display = 'block'; }
    return false;
  } else {
    group.classList.remove('error');
    if (errorEl) { errorEl.style.display = 'none'; }
    return true;
  }
}

function submitForm(form) {
  const btn = form.querySelector('button[type="submit"]');
  const originalText = btn ? btn.textContent : '';

  if (btn) {
    btn.disabled = true;
    btn.textContent = 'Sending...';
  }

  // Simulate submission (replace with Google Forms integration)
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  console.log('Form submitted:', data);

  // Google Forms integration example:
  // const googleFormUrl = 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse';
  // fetch(googleFormUrl, { method: 'POST', body: formData, mode: 'no-cors' });

  setTimeout(() => {
    if (btn) {
      btn.disabled = false;
      btn.textContent = originalText;
    }
    form.reset();
    form.querySelectorAll('.form-group').forEach(g => g.classList.remove('error'));
    showFormSuccess(form);
  }, 1200);
}

function showFormSuccess(form) {
  // Show success modal
  const overlay = document.getElementById('successModal');
  if (overlay) {
    overlay.classList.add('active');
    return;
  }

  // Fallback toast
  if (typeof showToast === 'function') {
    showToast('Your message has been sent successfully! We\'ll get back to you soon.', 'success');
  } else {
    alert('Thank you! Your message has been sent successfully.');
  }
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.remove('active');
}
