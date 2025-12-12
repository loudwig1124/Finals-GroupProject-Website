document.addEventListener('DOMContentLoaded', function() {
    const select = (el, all = false) => {
        el = el.trim()
        if (all) {
            return [...document.querySelectorAll(el)]
        } else {
            return document.querySelector(el)
        }
    }

/** Credits for Bootstrap
* Template Name: eBusiness
* Updated: May 30 2023 with Bootstrap v5.3.0
* Template URL: https://bootstrapmade.com/ebusiness-bootstrap-corporate-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/   
    
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
        if (!targetSection) return;

        event.preventDefault();

        document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active');
        });

        targetSection.classList.add('active');
        updateHeaderUnderline(targetId);
    });
    });

    document.addEventListener('click', function (event) {
        const link = event.target.closest('a');
        if (!link) return;
        if (link.closest('nav')) return;

        let href = link.getAttribute('href');
        if (!href) return;

        if (href === 'index.html' || href === './index.html') {
            href = 'home';
        }

        if (
            href.startsWith('http') ||
            href.startsWith('mailto:') ||
            href.startsWith('tel:') ||
            href.startsWith('#')
        ) {
            return;
        }

        const targetSection = document.getElementById(href);
        if (!targetSection) return;

        event.preventDefault();

        document.querySelectorAll('.page-section').forEach(section => {
            section.classList.remove('active');
        });

        targetSection.classList.add('active');
        updateHeaderUnderline(href);
    });
  let heroCarouselIndicators = select("#hero-carousel-indicators")
  let heroCarouselItems = select('#heroCarousel .carousel-item', true)

  heroCarouselItems.forEach((item, index) => {
    (index === 0) ?
    heroCarouselIndicators.innerHTML += "<li data-bs-target='#heroCarousel' data-bs-slide-to='" + index + "' class='active'></li>":
      heroCarouselIndicators.innerHTML += "<li data-bs-target='#heroCarousel' data-bs-slide-to='" + index + "'></li>"
  });
    const activeSection = document.querySelector('.page-section.active');
    if (activeSection) updateHeaderUnderline(activeSection.id);
        
    const categoryLinks = document.querySelectorAll('.menu-sidebar a');
    const searchInput = document.querySelector('.menu-search');
    const menuSections = document.querySelectorAll('.menu-section');
    const menuItems = document.querySelectorAll('.menu-item');
    
    if (categoryLinks.length > 0 && searchInput) {
        
        function filterByCategory(category, clickedLabel = null) {
            const subcategoryHeaders = document.querySelectorAll('.subcategory-header');
            const menuGrids = document.querySelectorAll('.menu-grid');
            
            if (category.includes('-')) {
                const [mainCategory, subCategory] = category.split('-');

                menuSections.forEach(section => {
                    const sectionCategory = section.getAttribute('data-category');
                    if (sectionCategory === mainCategory) {
                        section.style.display = '';

                        const categoryHeader = section.querySelector('.category-header');
                        if (categoryHeader) {
                            const originalHeader = categoryHeader.getAttribute('data-original') || categoryHeader.textContent;
                            if (!categoryHeader.getAttribute('data-original')) {
                                categoryHeader.setAttribute('data-original', originalHeader);
                            }

                            const formattedSubCategory = (clickedLabel && clickedLabel.trim())
                                ? clickedLabel.trim()
                                : subCategory
                                    .split(/(?=[A-Z])/).join(' ')
                                    .replace(/-/g, ' ')
                                    .replace(/\b\w/g, l => l.toUpperCase());

                            categoryHeader.textContent = `${originalHeader} - ${formattedSubCategory}`;
                        }
                    } else {
                        section.style.display = 'none';
                    }
                });

                subcategoryHeaders.forEach(header => header.style.display = 'none');
                menuGrids.forEach(grid => grid.style.display = 'none');

                menuItems.forEach(item => {
                    const itemCategory = item.getAttribute('data-category');
                    const itemSubcategory = item.getAttribute('data-subcategory');
                    
                    if (itemCategory === mainCategory && itemSubcategory === subCategory) {
                        item.style.display = '';
                        const parentGrid = item.closest('.menu-grid');
                        if (parentGrid) parentGrid.style.display = '';
                        const prevHeader = parentGrid.previousElementSibling;
                        if (prevHeader && prevHeader.classList.contains('subcategory-header')) {
                            prevHeader.style.display = '';
                        }
                    } else {
                        item.style.display = 'none';
                    }
                });
            } else {
                menuSections.forEach(section => {
                    const sectionCategory = section.getAttribute('data-category');
                    if (sectionCategory === category) {
                        section.style.display = '';

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

                subcategoryHeaders.forEach(header => header.style.display = '');
                menuGrids.forEach(grid => grid.style.display = '');
                
                menuItems.forEach(item => {
                    const itemCategory = item.getAttribute('data-category');
                    item.style.display = itemCategory === category ? '' : 'none';
                });
            }
        }

        categoryLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();

                const category = this.getAttribute('href').substring(1);
                const clickedLabel = this.textContent;
                searchInput.value = '';
                filterByCategory(category, clickedLabel);
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