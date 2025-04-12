// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS if it exists
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'slide',
      once: true
    });
  }

  // Site Menu Clone functionality
  const siteMenuClone = function() {
    // Clone navigation menus
    document.querySelectorAll('.js-clone-nav').forEach(function(nav) {
      const clone = nav.cloneNode(true);
      clone.className = 'site-nav-wrap';
      
      const mobileMenuBody = document.querySelector('.site-mobile-menu-body');
      if (mobileMenuBody) {
        mobileMenuBody.appendChild(clone);
      }
    });

    // Setup mobile menu after a short delay
    setTimeout(function() {
      let counter = 0;
      document.querySelectorAll('.site-mobile-menu .has-children').forEach(function(item) {
        // Create arrow collapse element
        const arrowCollapse = document.createElement('span');
        arrowCollapse.className = 'arrow-collapse collapsed';
        item.prepend(arrowCollapse);

        // Setup attributes for toggle
        arrowCollapse.setAttribute('data-toggle', 'collapse');
        arrowCollapse.setAttribute('data-target', '#collapseItem' + counter);

        // Setup submenu
        const submenu = item.querySelector('> ul');
        if (submenu) {
          submenu.className = 'collapse';
          submenu.id = 'collapseItem' + counter;
        }

        counter++;
      });
    }, 1000);
  };

  // Call the menu clone function
  siteMenuClone();

  // Initialize Bootstrap native components
  if (typeof BSN !== 'undefined') {
    // Initialize mobile menu
    new BSN.MobileMenu('.site-wrap');
    
    // Initialize collapse elements
    document.querySelectorAll('.collapse').forEach(function(collapseEl) {
      new BSN.Collapse(collapseEl, { duration: 300 });
    });
  }
});
