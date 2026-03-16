// Script to update placeholder images with better stock photo placeholders
// This script will replace the existing SVG placeholders with more realistic ones

const fs = require('fs');
const path = require('path');

// Function to create a more realistic property placeholder
function createPropertyPlaceholder(title, color) {
    return `<!-- Premium Property Placeholder - ${title} -->
<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${darkenColor(color, 20)};stop-opacity:1" />
    </linearGradient>
    <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000" flood-opacity="0.3"/>
    </filter>
  </defs>
  <rect width="100%" height="100%" fill="url(#grad)" filter="url(#shadow)"/>
  <rect x="40" y="40" width="720" height="520" fill="white" opacity="0.95" rx="8" ry="8"/>
  <rect x="60" y="60" width="680" height="200" fill="#f8f9fa" rx="4" ry="4"/>
  <rect x="60" y="280" width="680" height="260" fill="white" rx="4" ry="4"/>
  <circle cx="120" cy="160" r="40" fill="${color}" opacity="0.8"/>
  <text x="180" y="165" font-family="Arial, sans-serif" font-size="24" fill="#333" font-weight="600">${title}</text>
  <text x="60" y="320" font-family="Arial, sans-serif" font-size="18" fill="#666">Premium ${title.toLowerCase()} with modern amenities</text>
  <text x="60" y="350" font-family="Arial, sans-serif" font-size="16" fill="#888">Spacious interiors • High-end finishes • Prime location</text>
  <rect x="60" y="400" width="200" height="40" fill="${color}" rx="4" ry="4"/>
  <text x="160" y="425" font-family="Arial, sans-serif" font-size="14" fill="white" text-anchor="middle">View Details</text>
  <rect x="540" y="400" width="200" height="40" fill="#e9ecef" rx="4" ry="4"/>
  <text x="640" y="425" font-family="Arial, sans-serif" font-size="14" fill="#333" text-anchor="middle">Contact Agent</text>
</svg>`;
}

// Function to create a team member placeholder
function createTeamPlaceholder(name, title, color) {
    return `<!-- Premium Team Member - ${name} -->
<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${darkenColor(color, 20)};stop-opacity:1" />
    </linearGradient>
    <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000" flood-opacity="0.3"/>
    </filter>
  </defs>
  <rect width="100%" height="100%" fill="url(#grad)" filter="url(#shadow)"/>
  <circle cx="200" cy="120" r="60" fill="white" opacity="0.9"/>
  <circle cx="200" cy="120" r="50" fill="${color}" opacity="0.8"/>
  <text x="200" y="125" font-family="Arial, sans-serif" font-size="20" fill="white" text-anchor="middle">${name.split(' ')[0]}</text>
  <rect x="50" y="200" width="300" height="150" fill="white" opacity="0.95" rx="8" ry="8"/>
  <text x="200" y="230" font-family="Arial, sans-serif" font-size="20" fill="#333" text-anchor="middle" font-weight="600">${name}</text>
  <text x="200" y="260" font-family="Arial, sans-serif" font-size="14" fill="#666" text-anchor="middle">${title}</text>
  <text x="200" y="290" font-family="Arial, sans-serif" font-size="12" fill="#888" text-anchor="middle">10+ Years Experience</text>
  <rect x="100" y="340" width="200" height="30" fill="${color}" rx="4" ry="4"/>
  <text x="200" y="360" font-family="Arial, sans-serif" font-size="12" fill="white" text-anchor="middle">View Profile</text>
</svg>`;
}

// Function to create a client testimonial placeholder
function createClientPlaceholder(name, quote, color) {
    return `<!-- Premium Client Testimonial - ${name} -->
<svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${darkenColor(color, 20)};stop-opacity:1" />
    </linearGradient>
    <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000" flood-opacity="0.3"/>
    </filter>
  </defs>
  <rect width="100%" height="100%" fill="url(#grad)" filter="url(#shadow)"/>
  <circle cx="150" cy="80" r="40" fill="white" opacity="0.9"/>
  <text x="150" y="85" font-family="Arial, sans-serif" font-size="18" fill="#333" text-anchor="middle">"</text>
  <rect x="30" y="140" width="240" height="120" fill="white" opacity="0.95" rx="8" ry="8"/>
  <text x="150" y="170" font-family="Arial, sans-serif" font-size="12" fill="#666" text-anchor="middle" font-style="italic">${quote}</text>
  <text x="150" y="210" font-family="Arial, sans-serif" font-size="14" fill="#333" text-anchor="middle" font-weight="600">${name}</text>
  <text x="150" y="230" font-family="Arial, sans-serif" font-size="11" fill="#888" text-anchor="middle">Satisfied Client</text>
</svg>`;
}

// Function to create a hero background placeholder
function createHeroBackground(title, subtitle, color) {
    return `<!-- Premium Hero Background - ${title} -->
<svg width="1920" height="1080" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${color};stop-opacity:0.9" />
      <stop offset="100%" style="stop-color:${darkenColor(color, 30)};stop-opacity:1" />
    </linearGradient>
    <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0" dy="10" stdDeviation="20" flood-color="#000" flood-opacity="0.5"/>
    </filter>
  </defs>
  <rect width="100%" height="100%" fill="url(#grad)" filter="url(#shadow)"/>
  <rect x="100" y="400" width="800" height="300" fill="white" opacity="0.9" rx="8" ry="8"/>
  <text x="500" y="500" font-family="Georgia, serif" font-size="64" fill="#333" text-anchor="middle" font-weight="700">${title}</text>
  <text x="500" y="560" font-family="Arial, sans-serif" font-size="24" fill="#666" text-anchor="middle">${subtitle}</text>
  <rect x="500" y="600" width="200" height="50" fill="${color}" rx="4" ry="4"/>
  <text x="600" y="635" font-family="Arial, sans-serif" font-size="16" fill="white" text-anchor="middle">Explore Properties</text>
  <rect x="720" y="600" width="200" height="50" fill="#e9ecef" rx="4" ry="4"/>
  <text x="820" y="635" font-family="Arial, sans-serif" font-size="16" fill="#333" text-anchor="middle">Contact Us</text>
</svg>`;
}

// Helper function to darken a color
function darkenColor(hex, percent) {
    const num = parseInt(hex.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
        (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
        (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
}

// Image configurations
const propertyImages = [
    { filename: 'property-1.jpg', title: 'Luxury Villa', color: '#2c3e50' },
    { filename: 'property-2.jpg', title: 'Modern Apartment', color: '#3498db' },
    { filename: 'property-3.jpg', title: 'Family Home', color: '#e74c3c' },
    { filename: 'property-4.jpg', title: 'Penthouse', color: '#9b59b6' },
    { filename: 'property-5.jpg', title: 'Mountain Retreat', color: '#27ae60' },
    { filename: 'property-6.jpg', title: 'Urban Loft', color: '#e67e22' },
    { filename: 'property-7.jpg', title: 'Suburban Home', color: '#16a085' },
    { filename: 'property-8.jpg', title: 'Waterfront Condo', color: '#f1c40f' },
    { filename: 'property-9.jpg', title: 'Historic Brownstone', color: '#95a5a6' },
    { filename: 'property-10.jpg', title: 'Modern Studio', color: '#e84393' }
];

const teamImages = [
    { filename: 'team-1.jpg', name: 'Sarah Johnson', title: 'Senior Agent', color: '#2c3e50' },
    { filename: 'team-2.jpg', name: 'Michael Chen', title: 'Investment Specialist', color: '#3498db' },
    { filename: 'team-3.jpg', name: 'Emily Rodriguez', title: 'Property Manager', color: '#e74c3c' },
    { filename: 'team-4.jpg', name: 'David Thompson', title: 'Luxury Specialist', color: '#9b59b6' }
];

const clientImages = [
    { filename: 'client-1.jpg', name: 'John & Sarah Wilson', quote: 'Dream Home Found', color: '#27ae60' },
    { filename: 'client-2.jpg', name: 'Robert Chen', quote: 'Excellent Investment', color: '#e67e22' },
    { filename: 'client-3.jpg', name: 'Maria Garcia', quote: 'Outstanding Service', color: '#16a085' }
];

const heroImages = [
    { filename: 'hero-bg.jpg', title: 'Luxury Estates', subtitle: 'Premium Real Estate Services', color: '#2c3e50' },
    { filename: 'hero-bg2.jpg', title: 'Exclusive Properties', subtitle: 'Find Your Perfect Home', color: '#3498db' },
    { filename: 'hero-bg3.jpg', title: 'Investment Opportunities', subtitle: 'Build Your Portfolio', color: '#e74c3c' }
];

// Create directory if it doesn't exist
const assetsDir = path.join(__dirname, 'assets', 'images');
if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
}

// Generate property images
propertyImages.forEach(img => {
    const content = createPropertyPlaceholder(img.title, img.color);
    fs.writeFileSync(path.join(assetsDir, img.filename), content);
    console.log(`Updated ${img.filename}`);
});

// Generate team images
teamImages.forEach(img => {
    const content = createTeamPlaceholder(img.name, img.title, img.color);
    fs.writeFileSync(path.join(assetsDir, img.filename), content);
    console.log(`Updated ${img.filename}`);
});

// Generate client images
clientImages.forEach(img => {
    const content = createClientPlaceholder(img.name, img.quote, img.color);
    fs.writeFileSync(path.join(assetsDir, img.filename), content);
    console.log(`Updated ${img.filename}`);
});

// Generate hero images
heroImages.forEach(img => {
    const content = createHeroBackground(img.title, img.subtitle, img.color);
    fs.writeFileSync(path.join(assetsDir, img.filename), content);
    console.log(`Updated ${img.filename}`);
});

console.log('All placeholder images have been updated with premium designs!');