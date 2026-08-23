// ===================================================
// BRAIN2026 CONFERENCE WEBSITE
// Gallery & Lightbox (gallery.js)
// ===================================================

document.addEventListener('DOMContentLoaded', function() {
    initGalleryFilter();
    initLightbox();
    initGallerySearch();
    initLoadMore();
});

// ===================================================
// GALLERY DATA (placeholder - replace image URLs later)
// ===================================================

const galleryData = [
    { id: 1, category: 'keynote', title: 'Opening Keynote Session', color: '#17096E' },
    { id: 2, category: 'keynote', title: 'Distinguished Speaker Address', color: '#2E1A8F' },
    { id: 3, category: 'panel', title: 'Panel Discussion on Innovation', color: '#B07815' },
    { id: 4, category: 'panel', title: 'Industry Expert Roundtable', color: '#D4941F' },
    { id: 5, category: 'networking', title: 'Networking Lunch', color: '#890D0D' },
    { id: 6, category: 'networking', title: 'Coffee Break Conversations', color: '#A31414' },
    { id: 7, category: 'workshop', title: 'Interactive Workshop Session', color: '#17096E' },
    { id: 8, category: 'workshop', title: 'Hands-on Training', color: '#B07815' },
    { id: 9, category: 'award', title: 'Best Paper Award Ceremony', color: '#890D0D' },
    { id: 10, category: 'award', title: 'Recognition of Excellence', color: '#2E1A8F' },
    { id: 11, category: 'cultural', title: 'Cultural Evening Performance', color: '#D4941F' },
    { id: 12, category: 'cultural', title: 'Traditional Dance Showcase', color: '#A31414' },
    { id: 13, category: 'campus', title: 'NSUT Main Academic Block', color: '#17096E' },
    { id: 14, category: 'campus', title: 'NSUT Campus Gardens', color: '#B07815' }
];

let galleryVisibleCount = 9;
const galleryPageSize = 6;
let galleryCurrentFilter = 'all';
let gallerySearchTerm = '';

function getFilteredGalleryData() {
    return galleryData.filter(item => {
        const matchesCategory = galleryCurrentFilter === 'all' || item.category === galleryCurrentFilter;
        const matchesSearch = !gallerySearchTerm || item.title.toLowerCase().includes(gallerySearchTerm);
        return matchesCategory && matchesSearch;
    });
}

// ===================================================
// RENDER GALLERY
// ===================================================

function renderGallery(items) {
    const galleryGrid = document.getElementById('galleryGrid');
    
    if (!galleryGrid) return;

    galleryGrid.innerHTML = '';

    const visibleItems = items.slice(0, galleryVisibleCount);
    currentGalleryItems = items;

    visibleItems.forEach((item, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.setAttribute('data-category', item.category);
        galleryItem.style.animation = `fadeInUp 0.5s ease-out ${index * 0.05}s both`;
        
        galleryItem.innerHTML = `
            <div class="gallery-image" style="background: linear-gradient(135deg, ${item.color}, ${adjustColor(item.color, 30)});">
                <div class="gallery-item-overlay">
                    <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" width="30" height="30">
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="M21 21l-4.35-4.35"></path>
                        <line x1="11" y1="8" x2="11" y2="14"></line>
                        <line x1="8" y1="11" x2="14" y2="11"></line>
                    </svg>
                    <p>${item.title}</p>
                </div>
            </div>
        `;

        galleryItem.addEventListener('click', () => openLightbox(item));
        galleryGrid.appendChild(galleryItem);
    });

    const noResultsMsg = document.getElementById('galleryNoResults');
    if (noResultsMsg) {
        noResultsMsg.classList.toggle('show', items.length === 0);
    }

    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.style.display = (items.length > galleryVisibleCount) ? 'inline-flex' : 'none';
    }
}

// Helper to darken/lighten hex color
function adjustColor(color, amount) {
    const clamp = (val) => Math.min(255, Math.max(0, val));
    const num = parseInt(color.replace('#', ''), 16);
    const r = clamp((num >> 16) + amount);
    const g = clamp(((num >> 8) & 0x00FF) + amount);
    const b = clamp((num & 0x0000FF) + amount);
    return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
}

// ===================================================
// GALLERY FILTER
// ===================================================

function initGalleryFilter() {
    const galleryGrid = document.getElementById('galleryGrid');
    
    if (!galleryGrid) return;

    // Initial render with all items
    renderGallery(getFilteredGalleryData());

    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');

            galleryCurrentFilter = button.getAttribute('data-filter');
            galleryVisibleCount = 9;
            renderGallery(getFilteredGalleryData());
        });
    });
}

// ===================================================
// GALLERY SEARCH
// ===================================================

function initGallerySearch() {
    const searchInput = document.getElementById('gallerySearch');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        gallerySearchTerm = e.target.value.trim().toLowerCase();
        galleryVisibleCount = 9;
        renderGallery(getFilteredGalleryData());
    });
}

// ===================================================
// LOAD MORE
// ===================================================

function initLoadMore() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (!loadMoreBtn) return;

    loadMoreBtn.addEventListener('click', () => {
        galleryVisibleCount += galleryPageSize;
        renderGallery(getFilteredGalleryData());
    });
}

// ===================================================
// LIGHTBOX
// ===================================================

let currentLightboxIndex = 0;
let currentGalleryItems = galleryData;

function initLightbox() {
    // Create lightbox HTML if not present
    if (!document.getElementById('lightbox')) {
        const lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-overlay"></div>
            <div class="lightbox-content">
                <button class="lightbox-close" id="lightboxClose">&times;</button>
                <button class="lightbox-prev" id="lightboxPrev">&lsaquo;</button>
                <div class="lightbox-image" id="lightboxImage"></div>
                <button class="lightbox-next" id="lightboxNext">&rsaquo;</button>
                <div class="lightbox-caption" id="lightboxCaption"></div>
            </div>
        `;
        document.body.appendChild(lightbox);

        // Add lightbox styles
        addLightboxStyles();

        // Event listeners
        document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
        document.querySelector('.lightbox-overlay').addEventListener('click', closeLightbox);
        document.getElementById('lightboxPrev').addEventListener('click', showPrevImage);
        document.getElementById('lightboxNext').addEventListener('click', showNextImage);

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            const lightbox = document.getElementById('lightbox');
            if (lightbox.classList.contains('active')) {
                if (e.key === 'Escape') closeLightbox();
                if (e.key === 'ArrowLeft') showPrevImage();
                if (e.key === 'ArrowRight') showNextImage();
            }
        });
    }
}

function openLightbox(item) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');

    currentLightboxIndex = currentGalleryItems.findIndex(i => i.id === item.id);

    lightboxImage.style.background = `linear-gradient(135deg, ${item.color}, ${adjustColor(item.color, 30)})`;
    lightboxCaption.textContent = item.title;

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function showPrevImage() {
    currentLightboxIndex = (currentLightboxIndex - 1 + currentGalleryItems.length) % currentGalleryItems.length;
    updateLightboxImage();
}

function showNextImage() {
    currentLightboxIndex = (currentLightboxIndex + 1) % currentGalleryItems.length;
    updateLightboxImage();
}

function updateLightboxImage() {
    const item = currentGalleryItems[currentLightboxIndex];
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');

    lightboxImage.style.background = `linear-gradient(135deg, ${item.color}, ${adjustColor(item.color, 30)})`;
    lightboxCaption.textContent = item.title;
}

// ===================================================
// LIGHTBOX STYLES (injected dynamically)
// ===================================================

function addLightboxStyles() {
    if (document.getElementById('lightboxStyles')) return;

    const style = document.createElement('style');
    style.id = 'lightboxStyles';
    style.textContent = `
        .lightbox {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 9999;
            display: none;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        .lightbox.active {
            display: flex;
            opacity: 1;
        }

        .lightbox-overlay {
            position: absolute;
            inset: 0;
            background: rgba(0, 0, 0, 0.9);
        }

        .lightbox-content {
            position: relative;
            width: 90%;
            max-width: 800px;
            z-index: 10;
        }

        .lightbox-image {
            width: 100%;
            height: 500px;
            border-radius: 1rem;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
        }

        .lightbox-caption {
            text-align: center;
            color: white;
            font-size: 1.25rem;
            margin-top: 1.5rem;
            font-weight: 600;
        }

        .lightbox-close {
            position: absolute;
            top: -50px;
            right: 0;
            background: none;
            border: none;
            color: white;
            font-size: 40px;
            cursor: pointer;
            line-height: 1;
            padding: 10px;
        }

        .lightbox-prev,
        .lightbox-next {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(255, 255, 255, 0.1);
            border: none;
            color: white;
            font-size: 40px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background 0.3s ease;
        }

        .lightbox-prev:hover,
        .lightbox-next:hover {
            background: rgba(255, 255, 255, 0.2);
        }

        .lightbox-prev {
            left: -70px;
        }

        .lightbox-next {
            right: -70px;
        }

        @media (max-width: 768px) {
            .lightbox-image {
                height: 300px;
            }

            .lightbox-prev {
                left: 10px;
            }

            .lightbox-next {
                right: 10px;
            }

            .lightbox-close {
                top: -40px;
            }
        }

        .gallery-item {
            cursor: pointer;
            border-radius: 1rem;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .gallery-item:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 25px rgba(0, 0, 0, 0.15);
        }

        .gallery-image {
            position: relative;
            aspect-ratio: 4/3;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .gallery-item-overlay {
            position: absolute;
            inset: 0;
            background: rgba(0, 0, 0, 0.4);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 0.75rem;
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        .gallery-item:hover .gallery-item-overlay {
            opacity: 1;
        }

        .gallery-item-overlay p {
            color: white;
            font-weight: 600;
            text-align: center;
            padding: 0 1rem;
            margin: 0;
        }
    `;
    document.head.appendChild(style);
}

// ===================================================
// EXPORT FUNCTIONS
// ===================================================

window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
