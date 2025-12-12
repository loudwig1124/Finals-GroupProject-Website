document.addEventListener('DOMContentLoaded', function() {
/** Credits for Bootstrap
* Template Name: eBusiness
* Updated: May 30 2023 with Bootstrap v5.3.0
* Template URL: https://bootstrapmade.com/ebusiness-bootstrap-corporate-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/   
    /**
     * Easy select helper function
     */
    const select = (el, all = false) => {
        el = el.trim()
        if (all) {
            return [...document.querySelectorAll(el)]
        } else {
            return document.querySelector(el)
        }
    }
    
    const updateHeaderUnderline = (activeSectionId) => {
    document.querySelectorAll('header nav a').forEach(a => {
        a.classList.toggle('nav-current', a.getAttribute('href') === activeSectionId);
    });
    };

    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
    link.addEventListener('click', function (event) {
        const targetId = this.getAttribute('href');
        const targetSection = document.getElementById(targetId);

        // If it's not one of your page sections (ex: #coffee or https://...), don't block it
        if (!targetSection) return;

        event.preventDefault();

        document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active');
        });

        targetSection.classList.add('active');
        updateHeaderUnderline(targetId);
    });
    });
  /**
   * Hero carousel indicators
   */
  let heroCarouselIndicators = select("#hero-carousel-indicators")
  let heroCarouselItems = select('#heroCarousel .carousel-item', true)

  heroCarouselItems.forEach((item, index) => {
    (index === 0) ?
    heroCarouselIndicators.innerHTML += "<li data-bs-target='#heroCarousel' data-bs-slide-to='" + index + "' class='active'></li>":
      heroCarouselIndicators.innerHTML += "<li data-bs-target='#heroCarousel' data-bs-slide-to='" + index + "'></li>"
  });

    // on load: underline the currently active section in the header
    const activeSection = document.querySelector('.page-section.active');
    if (activeSection) updateHeaderUnderline(activeSection.id);
        
    const categoryLinks = document.querySelectorAll('.menu-sidebar a');
    const searchInput = document.querySelector('.menu-search');
    const menuSections = document.querySelectorAll('.menu-section');
    const menuItems = document.querySelectorAll('.menu-item');
    
    if (categoryLinks.length > 0 && searchInput) {
        
        function filterByCategory(category) {
            const subcategoryHeaders = document.querySelectorAll('.subcategory-header');
            const menuGrids = document.querySelectorAll('.menu-grid');
            
            if (category.includes('-')) {
                const [mainCategory, subCategory] = category.split('-');
                
                // Show only the matching main category section
                menuSections.forEach(section => {
                    const sectionCategory = section.getAttribute('data-category');
                    if (sectionCategory === mainCategory) {
                        section.style.display = '';
                        
                        // Update the category header to show subcategory
                        const categoryHeader = section.querySelector('.category-header');
                        if (categoryHeader) {
                            const originalHeader = categoryHeader.getAttribute('data-original') || categoryHeader.textContent;
                            if (!categoryHeader.getAttribute('data-original')) {
                                categoryHeader.setAttribute('data-original', originalHeader);
                            }
                            
                            // Format subcategory name
                            const formattedSubCategory = subCategory
                                .split(/(?=[A-Z])/).join(' ')  // Split camelCase
                                .replace(/-/g, ' ')             // Replace hyphens
                                .replace(/\b\w/g, l => l.toUpperCase()); // Capitalize
                            
                            categoryHeader.textContent = `${originalHeader} - ${formattedSubCategory}`;
                        }
                    } else {
                        section.style.display = 'none';
                    }
                });
                
                // Hide all subcategory headers and grids first
                subcategoryHeaders.forEach(header => header.style.display = 'none');
                menuGrids.forEach(grid => grid.style.display = 'none');
                
                // Show only items matching the subcategory and their grids
                menuItems.forEach(item => {
                    const itemCategory = item.getAttribute('data-category');
                    const itemSubcategory = item.getAttribute('data-subcategory');
                    
                    if (itemCategory === mainCategory && itemSubcategory === subCategory) {
                        item.style.display = '';
                        // Show the parent grid
                        const parentGrid = item.closest('.menu-grid');
                        if (parentGrid) parentGrid.style.display = '';
                        // Show the preceding subcategory header
                        const prevHeader = parentGrid.previousElementSibling;
                        if (prevHeader && prevHeader.classList.contains('subcategory-header')) {
                            prevHeader.style.display = '';
                        }
                    } else {
                        item.style.display = 'none';
                    }
                });
            } else {
                // Show all for main category
                menuSections.forEach(section => {
                    const sectionCategory = section.getAttribute('data-category');
                    if (sectionCategory === category) {
                        section.style.display = '';
                        
                        // Restore original header
                        const categoryHeader = section.querySelector('.category-header');
                        if (categoryHeader) {
                            const originalHeader = categoryHeader.getAttribute('data-original');
                            if (originalHeader) {
                                categoryHeader.textContent = originalHeader;
                            }
                        }
                    } else {
                        section.style.display = 'none';
                    }
                });
                
                // Show all subcategory headers and grids for this category
                subcategoryHeaders.forEach(header => header.style.display = '');
                menuGrids.forEach(grid => grid.style.display = '');
                
                menuItems.forEach(item => {
                    const itemCategory = item.getAttribute('data-category');
                    item.style.display = itemCategory === category ? '' : 'none';
                });
            }
        }
        
        // ADD THESE EVENT LISTENERS THAT WERE MISSING:
        categoryLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const category = this.getAttribute('href').substring(1);
                searchInput.value = '';
                filterByCategory(category);
            });
        });
        
        searchInput.addEventListener('input', function() {
            const searchText = this.value.toLowerCase();
            
            if (searchText === '') {
                showAllSections();
            } else {
                filterBySearch(searchText);
            }
        });
        
        function filterBySearch(searchText) {
            menuSections.forEach(section => {
                section.style.display = '';
            });
            
            menuItems.forEach(item => {
                const itemName = item.getAttribute('data-name').toLowerCase();
                
                if (itemName.includes(searchText)) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });
            
            menuSections.forEach(section => {
                const visibleItems = section.querySelectorAll('.menu-item:not([style*="display: none"])');
                if (visibleItems.length === 0) {
                    section.style.display = 'none';
                }
            });
        }
        
        function showAllSections() {
            const subcategoryHeaders = document.querySelectorAll('.subcategory-header');
            const menuGrids = document.querySelectorAll('.menu-grid');
            
            menuSections.forEach(section => {
                section.style.display = '';
                
                // Restore original headers
                const categoryHeader = section.querySelector('.category-header');
                if (categoryHeader) {
                    const originalHeader = categoryHeader.getAttribute('data-original');
                    if (originalHeader) {
                        categoryHeader.textContent = originalHeader;
                    }
                }
            });
            menuItems.forEach(item => {
                item.style.display = '';
            });
            subcategoryHeaders.forEach(header => {
                header.style.display = '';
            });
            menuGrids.forEach(grid => {
                grid.style.display = '';
            });
        }
    }
});