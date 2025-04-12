document.addEventListener('DOMContentLoaded', function() {
  // Initialize language from localStorage or default to 'ka' (Georgian)
  const currentLanguage = localStorage.getItem('language') || 'ka';
  
  // Set the initial language
  setLanguage(currentLanguage);
  
  // Set active class on the current language flag
  const flags = document.querySelectorAll('.language-switcher img');
  flags.forEach(flag => {
    if (flag.getAttribute('data-lang') === currentLanguage) {
      flag.classList.add('active');
    } else {
      flag.classList.remove('active');
    }
    
    // Add click event listeners to language flags
    flag.addEventListener('click', function() {
      const lang = this.getAttribute('data-lang');
      
      // Save the selected language to localStorage
      localStorage.setItem('language', lang);
      
      // If we're on the same page but different language, just redirect to the proper version
      const currentPath = window.location.pathname;
      const newPath = getLanguagePath(currentPath, lang);
      
      // Navigate to the new page
      window.location.href = newPath;
    });
  });
});

// Function to set language-specific elements
function setLanguage(lang) {
  // Set the html lang attribute
  document.documentElement.lang = lang;
}

// Function to get the correct path for the selected language
function getLanguagePath(currentPath, lang) {
  // Strip trailing slash if exists
  let path = currentPath.endsWith('/') ? currentPath.slice(0, -1) : currentPath;
  
  // If path is root, set to index
  if (path === '' || path === '/') {
    path = '/index';
  }
  
  // Remove .html extension if present
  if (path.endsWith('.html')) {
    path = path.slice(0, -5);
  }
  
  // English version has _en suffix
  if (lang === 'en') {
    // Check if already has _en suffix
    if (!path.endsWith('_en')) {
      path = path + '_en';
    }
  } else {
    // For Georgian, remove _en suffix if present
    if (path.endsWith('_en')) {
      path = path.slice(0, -3);
    }
  }
  
  // Return the final path (without .html as per requirements)
  return path;
}
