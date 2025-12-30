// DOM Elements
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Mobile Menu Toggle
function toggleMobileMenu() {
    mobileMenu.classList.toggle('hidden');
}

mobileMenuBtn.addEventListener('click', toggleMobileMenu);

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const isClickInsideMenu = mobileMenu.contains(event.target);
    const isClickOnMenuButton = mobileMenuBtn.contains(event.target);
    
    if (!mobileMenu.classList.contains('hidden') && !isClickInsideMenu && !isClickOnMenuButton) {
        mobileMenu.classList.add('hidden');
    }
});

// Smooth scrolling function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Navigation link click handlers
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        scrollToSection(targetId);
        
        // Close mobile menu if open
        if (!mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
        }
        
        // Update active nav link
        navLinks.forEach(navLink => navLink.classList.remove('active'));
        this.classList.add('active');
    });
});

// Platform card interactions - 기본 버전
document.querySelectorAll('.platform-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        // 플랫폼 이름을 버튼 텍스트에서 가져오기
        const platformText = this.textContent;
        let platform = '';
        
        if (platformText.includes('자세히')) {
            // 부모 요소에서 플랫폼 이름 찾기
            const card = this.closest('.bg-white.rounded-lg');
            const platformName = card.querySelector('h4').textContent;
            
            if (platformName.includes('아프리카TV')) platform = 'afreeca';
            else if (platformName.includes('숲TV')) platform = 'soop';
            else if (platformName.includes('팬더TV')) platform = 'panda';
            else if (platformName.includes('팝콘TV')) platform = 'popkon';
        }
        
        if (platform) {
            showPlatformDetails(platform);
        }
    });
});

// Show platform details (mock function)
function showPlatformDetails(platform) {
    const platformNames = {
        'afreeca': '아프리카TV',
        'soop': '숲TV',
        'panda': '팬더TV',
        'popkon': '팝콘TV'
    };
    
    const platformName = platformNames[platform];
    
    // Create modal or show detailed information
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white rounded-lg p-8 max-w-md mx-4 relative">
            <button class="absolute top-4 right-4 text-gray-500 hover:text-gray-700" onclick="this.closest('.fixed').remove()">
                <i class="fas fa-times text-xl"></i>
            </button>
            <div class="text-center mb-6">
                <div class="w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center text-white font-bold text-xl ${
                    platform === 'afreeca' ? 'bg-gradient-to-br from-red-500 to-red-600' :
                    platform === 'soop' ? 'bg-black' :
                    platform === 'panda' ? 'bg-gradient-to-br from-purple-500 to-purple-700' :
                    'bg-gradient-to-br from-yellow-400 to-yellow-500'
                }">
                    ${platform === 'afreeca' ? 'A' : 
                      platform === 'soop' ? 'SOOP' :
                      platform === 'panda' ? 'PANDA' : 'P'}
                </div>
                <h3 class="text-2xl font-bold text-gray-800">${platformName}</h3>
            </div>
            <p class="text-gray-600 mb-6">${platformName} 방송을 시청하고 참여하는 뷰어 서비스입니다.</p>
            
            <div class="space-y-3 mb-6">
                <div class="flex items-center text-sm text-gray-500">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    방송 시청
                </div>
                <div class="flex items-center text-sm text-gray-500">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    채팅 참여
                </div>
                <div class="flex items-center text-sm text-gray-500">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    시청 시간 증가
                </div>
                <div class="flex items-center text-sm text-gray-500">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    안전한 운영
                </div>
            </div>
            
            <div class="space-y-3">
                <a href="https://open.kakao.com/o/s6ecK27h" target="_blank" class="flex items-center justify-center space-x-3 bg-yellow-400 hover:bg-yellow-500 text-gray-800 px-6 py-3 rounded-lg transition-colors w-full">
                    <i class="fas fa-comment text-xl"></i>
                    <div class="text-left">
                        <div class="font-semibold">카카오톡 문의</div>
                        <div class="text-xs text-gray-700">실시간 상담</div>
                    </div>
                </a>
                
                <a href="https://t.me/afreeca101" target="_blank" class="flex items-center justify-center space-x-3 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors w-full">
                    <i class="fab fa-telegram text-xl"></i>
                    <div class="text-left">
                        <div class="font-semibold">텔레그램 문의</div>
                        <div class="text-xs text-blue-100">빠른 응답</div>
                    </div>
                </a>
            </div>
            
            <div class="mt-4 text-center text-xs text-gray-500">
                <p>365일 24시간 연중무휴 문의 가능</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Export functions for global access
window.scrollToSection = scrollToSection;

// Quick contact button handlers
document.querySelectorAll('.quick-contact-btns a').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const url = this.getAttribute('href');
        const platform = this.querySelector('span').textContent.includes('텔레그램') ? '텔레그램' : '카카오톡';
        
        // Show notification
        showNotification(`${platform}으로 문의 채널이 열립니다...`, 'info');
        
        // Open link in new tab
        setTimeout(() => {
            window.open(url, '_blank');
        }, 500);
    });
});

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm ${type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500'} text-white`;
    notification.innerHTML = `
        <div class="flex items-center">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'} mr-2"></i>
            <span>${message}</span>
            <button class="ml-auto text-white hover:text-gray-200" onclick="this.closest('.fixed').remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Scroll animations - 기본 버전
function animateOnScroll() {
    const elements = document.querySelectorAll('.bg-white.rounded-lg, .feature-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize animations
window.addEventListener('scroll', animateOnScroll);
document.addEventListener('DOMContentLoaded', function() {
    // Set initial state for animated elements
    const elements = document.querySelectorAll('.bg-white.rounded-lg, .feature-card');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease';
    });
    
    animateOnScroll();
});

// Service status checking (mock)
function checkServiceStatus() {
    const platforms = ['afreeca', 'soop', 'panda', 'popkon'];
    
    platforms.forEach(platform => {
        // Simulate API call to check service status
        const isOnline = Math.random() > 0.1; // 90% uptime
        const statusElement = document.querySelector(`[data-platform="${platform}"]`);
        
        if (statusElement) {
            const statusBadge = document.createElement('div');
            statusBadge.className = `absolute top-3 right-3 w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`;
            statusBadge.title = isOnline ? '서비스 정상' : '서비스 점검중';
            
            // Remove existing badge
            const existingBadge = statusElement.querySelector('.absolute');
            if (existingBadge) {
                existingBadge.remove();
            }
            
            statusElement.style.position = 'relative';
            statusElement.appendChild(statusBadge);
        }
    });
}

// Check service status every 30 seconds
setInterval(checkServiceStatus, 30000);

// Initial status check
document.addEventListener('DOMContentLoaded', checkServiceStatus);

// SEO optimization - Update page title based on visibility
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        document.title = '방송국 뷰어 서비스 - 방송 시청';
    } else {
        document.title = '방송국 뷰어 서비스 - 아프리카TV 숲TV 팬더TV 팝콘TV 시청';
    }
});

// Performance optimization - Lazy loading for images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Export functions for global access
window.scrollToSection = scrollToSection;
// Export functions for global access
window.scrollToSection = scrollToSection;

// 문의하기 모달 열기
window.openContactModal = function() {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white rounded-lg p-8 max-w-md mx-4 relative">
            <button class="absolute top-4 right-4 text-gray-500 hover:text-gray-700" onclick="this.closest('.fixed').remove()">
                <i class="fas fa-times text-xl"></i>
            </button>
            <h3 class="text-2xl font-bold mb-6 text-center">문의하기</h3>
            <p class="text-gray-600 mb-6 text-center">궁금한 점이 있으신가요? 아래 채널로 문의해주세요.</p>
            
            <div class="space-y-4">
                <a href="https://open.kakao.com/o/s6ecK27h" target="_blank" class="flex items-center justify-between bg-yellow-400 hover:bg-yellow-500 text-gray-800 px-6 py-4 rounded-lg transition-colors">
                    <div class="flex items-center space-x-3">
                        <i class="fas fa-comment text-2xl"></i>
                        <div>
                            <div class="font-semibold text-lg">카카오톡 문의</div>
                            <div class="text-sm text-gray-700">실시간 상담 가능</div>
                        </div>
                    </div>
                    <div class="flex items-center space-x-2">
                        <div class="w-3 h-3 bg-green-500 rounded-full" title="온라인"></div>
                        <span class="text-sm">접속중</span>
                    </div>
                </a>
                
                <a href="https://t.me/afreeca101" target="_blank" class="flex items-center justify-between bg-blue-500 hover:bg-blue-600 text-white px-6 py-4 rounded-lg transition-colors">
                    <div class="flex items-center space-x-3">
                        <i class="fab fa-telegram text-2xl"></i>
                        <div>
                            <div class="font-semibold text-lg">텔레그램 문의</div>
                            <div class="text-sm text-blue-100">빠른 응답 보장</div>
                        </div>
                    </div>
                    <div class="flex items-center space-x-2">
                        <div class="w-3 h-3 bg-green-500 rounded-full" title="온라인"></div>
                        <span class="text-sm">접속중</span>
                    </div>
                </a>
            </div>
            
            <div class="mt-6 text-center text-sm text-gray-500">
                <p>운영시간: 365일 24시간 연중무휴</p>
                <p>평균 응답시간: 5분 이내</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
};
