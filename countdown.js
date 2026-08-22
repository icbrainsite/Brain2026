// ===================================================
// BRAIN2026 CONFERENCE WEBSITE
// Countdown Timer (countdown.js)
// ===================================================

// Conference date: December 21, 2026, 00:00:00
const CONFERENCE_DATE = new Date('2026-12-21T00:00:00').getTime();

// Initialize countdown
document.addEventListener('DOMContentLoaded', function() {
    initCountdown();
});

// ===================================================
// COUNTDOWN TIMER FUNCTION
// ===================================================

function initCountdown() {
    // Update countdown immediately
    updateCountdown();

    // Update countdown every second
    setInterval(updateCountdown, 1000);
}

function updateCountdown() {
    // Get current time
    const now = new Date().getTime();

    // Calculate time difference
    const distance = CONFERENCE_DATE - now;

    // Calculate time units
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Get countdown elements
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');

    // Update elements with animation
    if (daysElement) {
        updateCountdownElement(daysElement, days);
    }
    if (hoursElement) {
        updateCountdownElement(hoursElement, hours);
    }
    if (minutesElement) {
        updateCountdownElement(minutesElement, minutes);
    }
    if (secondsElement) {
        updateCountdownElement(secondsElement, seconds);
    }

    // If countdown is finished
    if (distance < 0) {
        clearInterval(countdownInterval);
        if (daysElement) daysElement.textContent = '0';
        if (hoursElement) hoursElement.textContent = '0';
        if (minutesElement) minutesElement.textContent = '0';
        if (secondsElement) secondsElement.textContent = '0';

        // Show conference is live message
        const countdownSection = document.querySelector('.countdown-section');
        if (countdownSection) {
            countdownSection.innerHTML = `
                <div class="container">
                    <h2 class="section-title" style="text-align: center; color: white;">Brain2026 Conference is LIVE!</h2>
                    <p style="text-align: center; color: rgba(255, 255, 255, 0.9); font-size: 1.25rem;">
                        Thank you for attending. Join us online or in-person at NSUT, New Delhi
                    </p>
                </div>
            `;
        }
    }
}

// ===================================================
// UPDATE COUNTDOWN ELEMENT WITH ANIMATION
// ===================================================

function updateCountdownElement(element, newValue) {
    const currentValue = parseInt(element.textContent);

    // Add animation class if value changed
    if (currentValue !== newValue) {
        element.classList.add('countdown-flip');

        setTimeout(() => {
            element.textContent = newValue;
            element.classList.remove('countdown-flip');
        }, 300);
    }

    // Ensure element has content
    if (element.textContent === '') {
        element.textContent = newValue;
    }
}

// ===================================================
// COUNTDOWN FLIP ANIMATION CSS (added dynamically)
// ===================================================

// Add CSS for countdown flip animation if not already present
if (!document.getElementById('countdownAnimationStyle')) {
    const style = document.createElement('style');
    style.id = 'countdownAnimationStyle';
    style.textContent = `
        @keyframes countdownFlip {
            0% {
                opacity: 1;
                transform: translateY(0);
            }
            50% {
                opacity: 0;
                transform: translateY(-10px);
            }
            100% {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .countdown-flip {
            animation: countdownFlip 0.3s ease-in-out !important;
        }
    `;
    document.head.appendChild(style);
}

// ===================================================
// ALTERNATIVE COUNTDOWN WITH SOUND
// ===================================================

function playCountdownSound() {
    // Create a simple beep sound using Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
}

// ===================================================
// GET COUNTDOWN STATUS
// ===================================================

function getCountdownStatus() {
    const now = new Date().getTime();
    const distance = CONFERENCE_DATE - now;

    if (distance < 0) {
        return 'finished';
    } else if (distance < 24 * 60 * 60 * 1000) {
        return 'urgent'; // Less than 1 day
    } else if (distance < 7 * 24 * 60 * 60 * 1000) {
        return 'soon'; // Less than 1 week
    } else {
        return 'normal';
    }
}

// ===================================================
// FORMAT TIME WITH LEADING ZEROS
// ===================================================

function formatTime(value) {
    return value < 10 ? '0' + value : value;
}

// ===================================================
// GET HUMAN READABLE COUNTDOWN
// ===================================================

function getReadableCountdown() {
    const now = new Date().getTime();
    const distance = CONFERENCE_DATE - now;

    if (distance < 0) {
        return 'Conference is happening now!';
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    let message = '';

    if (days > 0) {
        message += days + ' day' + (days > 1 ? 's' : '') + ', ';
    }

    if (hours > 0) {
        message += hours + ' hour' + (hours > 1 ? 's' : '') + ', ';
    }

    if (minutes > 0) {
        message += minutes + ' minute' + (minutes > 1 ? 's' : '');
    }

    return message || 'Less than a minute!';
}

// ===================================================
// CONSOLE LOG COUNTDOWN STATUS
// ===================================================

function logCountdownStatus() {
    const status = getCountdownStatus();
    const readableCountdown = getReadableCountdown();

    console.log('🎉 Brain2026 Conference Countdown');
    console.log('Status: ' + status);
    console.log('Time remaining: ' + readableCountdown);
    console.log('Conference Date: December 21-22, 2026');
}

// Log countdown status when page loads
document.addEventListener('DOMContentLoaded', function() {
    logCountdownStatus();
});

// ===================================================
// NOTIFICATION WHEN CONFERENCE IS STARTING SOON
// ===================================================

function initCountdownNotification() {
    const status = getCountdownStatus();

    if (status === 'urgent') {
        // Create a notification banner
        const banner = document.createElement('div');
        banner.style.cssText = `
            position: fixed;
            top: 70px;
            left: 0;
            right: 0;
            background: linear-gradient(135deg, #890D0D, #B07815);
            color: white;
            padding: 15px 20px;
            text-align: center;
            z-index: 1000;
            animation: slideDown 0.3s ease-out;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        `;

        banner.textContent = '⏰ The Brain2026 Conference starts in less than 24 hours! ' + getReadableCountdown();

        document.body.insertBefore(banner, document.body.firstChild);

        // Add close button
        const closeBtn = document.createElement('button');
        closeBtn.textContent = '×';
        closeBtn.style.cssText = `
            position: absolute;
            right: 20px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            color: white;
            font-size: 24px;
            cursor: pointer;
            padding: 0;
        `;

        closeBtn.addEventListener('click', () => {
            banner.remove();
        });

        banner.appendChild(closeBtn);
    }
}

// Initialize notification on page load
document.addEventListener('DOMContentLoaded', function() {
    initCountdownNotification();
});

// ===================================================
// EXPORT FUNCTIONS FOR USE IN OTHER FILES
// ===================================================

// Make functions globally available
window.getCountdownStatus = getCountdownStatus;
window.getReadableCountdown = getReadableCountdown;
window.formatTime = formatTime;
window.logCountdownStatus = logCountdownStatus;
