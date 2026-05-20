// Smooth scroll navigation
document.querySelectorAll('.nav-links a, .btn-primary, .btn-outline').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const hash = this.getAttribute('href');
        if (hash && hash !== '#' && hash.startsWith('#') && hash.length > 1) {
            const target = document.querySelector(hash);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
                history.pushState(null, null, hash);
            }
        }
    });
});

// Profile Picture Upload Functionality
const profilePicInput = document.getElementById('profilePicInput');
const profilePicture = document.getElementById('profilePicture');
const profilePicContainer = document.getElementById('profilePicContainer');

// Click on container to trigger file upload
if (profilePicContainer) {
    profilePicContainer.addEventListener('click', function() {
        profilePicInput.click();
    });
}

// Handle file selection for profile picture
if (profilePicInput) {
    profilePicInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        
        if (file) {
            // Check if file is an image
            if (!file.type.startsWith('image/')) {
                alert('Please select an image file (PNG, JPG, WEBP, etc.)');
                return;
            }
            
            // Check file size (limit to 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert('File is too large! Please select an image under 5MB.');
                return;
            }
            
            const reader = new FileReader();
            
            reader.onload = function(e) {
                profilePicture.src = e.target.result;
                // Save to localStorage
                localStorage.setItem('profilePicture', e.target.result);
            };
            
            reader.readAsDataURL(file);
        }
    });
}

// Load saved profile picture from localStorage
const savedProfilePic = localStorage.getItem('profilePicture');
if (savedProfilePic && profilePicture) {
    profilePicture.src = savedProfilePic;
}

// Helper: upload screenshot function for each project
function setupUpload(targetId, screenshotImgId, placeholderId) {
    const uploadBtn = document.querySelector(`.upload-btn[data-target="${targetId}"]`);
    const screenshotArea = document.querySelector(`.screenshot-area[data-project="${targetId}"]`);
    
    const triggerUpload = () => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/png, image/jpeg, image/jpg, image/webp';
        fileInput.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                // Check file size
                if (file.size > 5 * 1024 * 1024) {
                    alert('File is too large! Please select an image under 5MB.');
                    return;
                }
                
                const reader = new FileReader();
                reader.onload = function(ev) {
                    const imgElement = document.getElementById(screenshotImgId);
                    const placeholderDiv = document.getElementById(placeholderId);
                    if (imgElement && placeholderDiv) {
                        imgElement.src = ev.target.result;
                        imgElement.style.display = 'block';
                        placeholderDiv.style.display = 'none';
                        localStorage.setItem(`project_${targetId}_screenshot`, ev.target.result);
                    }
                };
                reader.readAsDataURL(file);
            }
        };
        fileInput.click();
    };
    
    if (uploadBtn) uploadBtn.addEventListener('click', triggerUpload);
    if (screenshotArea) screenshotArea.addEventListener('click', triggerUpload);
    
    // Load saved screenshot if exists
    const saved = localStorage.getItem(`project_${targetId}_screenshot`);
    if (saved) {
        const imgElement = document.getElementById(screenshotImgId);
        const placeholderDiv = document.getElementById(placeholderId);
        if (imgElement && placeholderDiv) {
            imgElement.src = saved;
            imgElement.style.display = 'block';
            placeholderDiv.style.display = 'none';
        }
    }
}

// Initialize upload for 3 projects
setupUpload('1', 'screenshot1', 'placeholder1');
setupUpload('2', 'screenshot2', 'placeholder2');
setupUpload('3', 'screenshot3', 'placeholder3');

// Contact form handler
const contactForm = document.getElementById('demoForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('✓ Message sent! I will get back to you within 24 hours.');
        contactForm.reset();
    });
}

console.log('✓ Professional portfolio ready — upload your profile picture and school project screenshots!');