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
  
  // Extract the base path without language suffixes
  let basePath = path;
  if (basePath.endsWith('_en')) {
    basePath = basePath.slice(0, -3);
  } else if (basePath.endsWith('_ru')) {
    basePath = basePath.slice(0, -3);
  }
  
  // Add appropriate language suffix
  if (lang === 'en') {
    path = basePath + '_en';
  } else if (lang === 'ru') {
    path = basePath + '_ru';
  } else {
    // Default to Georgian (no suffix)
    path = basePath;
  }
  
  // Return the final path (without .html as per requirements)
  return path;
}
