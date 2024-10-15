const newsletterSignupForm = document.getElementById('newsletter-signup-form');

newsletterSignupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = newsletterSignupForm.elements['email'].value;
  localStorage.setItem('email', email);
  console.log(`Email saved to local storage: ${email}`);

  const successMessage = document.createElement('div');
  successMessage.textContent = 'Thank you for signing up for our newsletter!';
  newsletterSignupForm.appendChild(successMessage);
});