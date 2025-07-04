// Helper: check if landing section is in viewport
function isLandingVisible() {
    const landing = document.getElementById('landing');
    const rect = landing.getBoundingClientRect();
    // Consider visible if top of landing is near top of viewport
    return rect.top <= 80 && rect.bottom > 80;
}

// Helper: update menu icon based on active section
function updateMenuIcon() {
    const icon = document.getElementById('active-icon');
    const sections = [
        { id: 'landing', icon: 'fas fa-home' },
        { id: 'about', icon: 'fas fa-info-circle' },
        { id: 'team', icon: 'fas fa-users' },
        { id: 'projects', icon: 'fas fa-code' },
        { id: 'contact', icon: 'fas fa-envelope' }
    ];
    
    let activeSection = 'landing';
    const menuBarHeight = 72; // Height of the menu bar
    
    for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
            const rect = element.getBoundingClientRect();
            // Check if section is in viewport (considering menu bar height)
            // A section is considered active if its top is near the top of the viewport
            if (rect.top <= menuBarHeight + 50 && rect.bottom > menuBarHeight + 50) {
                activeSection = section.id;
                break;
            }
        }
    }
    
    // Update icon
    const activeSectionData = sections.find(s => s.id === activeSection);
    if (activeSectionData && icon.className !== activeSectionData.icon) {
        icon.className = activeSectionData.icon;
    }
}

// Helper: update menu icon with delay for smooth scrolling
function updateMenuIconDelayed() {
    setTimeout(updateMenuIcon, 100);
}

let animationActive = true;
let ball, paddles;

function showLandingElements(show) {
    const landing = document.getElementById('landing');
    const elements = landing.querySelectorAll('.landing-anim');
    elements.forEach(el => {
        if (show) {
            el.classList.remove('landing-fade');
        } else {
            el.classList.add('landing-fade');
        }
    });
}

// Generate smooth 2D gradient color based on four corners
function getGradientColor(x, y, columns, rows) {
    // Corner colors
    const topLeft = { r: 45, g: 8, b: 94 };     // #2d085e (dark purple)
    const topRight = { r: 164, g: 69, b: 166 }; // #a445a6 (violet/pink)
    const bottomLeft = { r: 26, g: 35, b: 126 }; // #1a237e (navy)
    const bottomRight = { r: 255, g: 140, b: 66 }; // #ff8c42 (orange)

    // Normalize x, y to [0,1]
    const tx = x / (columns - 1);
    const ty = y / (rows - 1);

    // Bilinear interpolation
    function lerp(a, b, t) {
        return a + (b - a) * t;
    }
    function lerpColor(c1, c2, t) {
        return {
            r: lerp(c1.r, c2.r, t),
            g: lerp(c1.g, c2.g, t),
            b: lerp(c1.b, c2.b, t)
        };
    }
    const top = lerpColor(topLeft, topRight, tx);
    const bottom = lerpColor(bottomLeft, bottomRight, tx);
    const final = lerpColor(top, bottom, ty);
    return `rgb(${Math.round(final.r)}, ${Math.round(final.g)}, ${Math.round(final.b)})`;
}

// Create grid
function createGrid() {
    const container = document.querySelector('.grid-container');
    const squareSize = 45;
    
    // Calculate number of squares needed with extra padding
    const columns = Math.ceil(window.innerWidth / squareSize) + 2;
    const rows = Math.ceil(window.innerHeight / squareSize) + 1;
    const squaresNeeded = columns * rows;
    
    // Clear existing squares
    container.innerHTML = '';
    
    // Create new squares
    for (let i = 0; i < squaresNeeded; i++) {
        const square = document.createElement('div');
        square.className = 'grid-square';
        const x = i % columns;
        const y = Math.floor(i / columns);
        square.style.backgroundColor = getGradientColor(x, y, columns, rows);
        container.appendChild(square);
    }

    // Force grid to fill the entire width
    container.style.width = `${columns * squareSize}px`;
}

// Ball animation
class Ball {
    constructor() {
        this.ball = document.querySelector('.ball');
        this.x = window.innerWidth / 2;
        this.y = window.innerHeight * 0.25; // 25% od górnej krawędzi
        this.updateSpeed();
        this.updateRadius();
        this.updatePosition();
    }

    updateRadius() {
        // Get ball size from CSS variable
        const ballSize = getComputedStyle(document.documentElement).getPropertyValue('--ball-size');
        this.radius = parseInt(ballSize) / 2;
    }

    updateSpeed() {
        // Adjust speed based on screen size
        const screenWidth = window.innerWidth;
        if (screenWidth > 1200) {
            this.dx = 5;
            this.dy = 5;
        } else if (screenWidth > 768) {
            this.dx = 4;
            this.dy = 4;
        } else if (screenWidth > 480) {
            this.dx = 3;
            this.dy = 3;
        } else if (screenWidth > 360) {
            this.dx = 2;
            this.dy = 2;
        } else if (screenWidth > 280) {
            this.dx = 1;
            this.dy = 1;
        } else if (screenWidth > 200) {
            this.dx = 1;
            this.dy = 1;
        } else {
            this.dx = 1;
            this.dy = 1;
        }
    }

    updatePosition() {
        this.ball.style.left = this.x + 'px';
        this.ball.style.top = this.y + 'px';
    }

    resetPosition() {
        this.x = window.innerWidth / 2;
        this.y = window.innerHeight * 0.25;
        this.updatePosition();
    }

    update(paddles) {
        if (this.x + this.radius > window.innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > window.innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        for (const paddle of paddles) {
            if (this.checkPaddleCollision(paddle)) {
                if (paddle.element.classList.contains('paddle-top') || paddle.element.classList.contains('paddle-bottom')) {
                    this.dy = -this.dy;
                } else {
                    this.dx = -this.dx;
                }
                
                // Change paddle color to orange for 3 seconds
                if (!paddle.element.classList.contains('hit-orange')) {
                    paddle.element.classList.add('hit-orange');
                    paddle.element.style.backgroundColor = 'orange';
                    setTimeout(() => {
                        paddle.element.classList.remove('hit-orange');
                        paddle.element.style.backgroundColor = '';
                    }, 3000);
                }
            }
        }
        // Collision with logo blocks
        if (document.querySelector('.logo-pixel')) {
            const ballRect = this.ball.getBoundingClientRect();
            const logoBlocks = getLogoBlockRectsWithElements();
            for (const {rect, el} of logoBlocks) {
                if (!(ballRect.right < rect.left || ballRect.left > rect.right || ballRect.bottom < rect.top || ballRect.top > rect.bottom)) {
                    // Determine collision side
                    const overlapX = Math.min(ballRect.right, rect.right) - Math.max(ballRect.left, rect.left);
                    const overlapY = Math.min(ballRect.bottom, rect.bottom) - Math.max(ballRect.top, rect.top);
                    if (overlapX < overlapY) {
                        this.dx = -this.dx;
                    } else {
                        this.dy = -this.dy;
                    }
                    // Change color to orange for 5 seconds
                    if (!el.classList.contains('hit-orange')) {
                        el.classList.add('hit-orange');
                        el.style.background = 'orange';
                        setTimeout(() => {
                            el.classList.remove('hit-orange');
                            el.style.background = '';
                        }, 5000);
                    }
                    break;
                }
            }
        }
        this.x += this.dx;
        this.y += this.dy;
        this.updatePosition();
    }

    checkPaddleCollision(paddle) {
        const paddleRect = paddle.element.getBoundingClientRect();
        const ballRect = this.ball.getBoundingClientRect();
        return !(ballRect.right < paddleRect.left || 
                ballRect.left > paddleRect.right || 
                ballRect.bottom < paddleRect.top || 
                ballRect.top > paddleRect.bottom);
    }
}

// Paddle class
class Paddle {
    constructor(element) {
        this.element = element;
        this.updateSpeed();
        this.position = 0;
    }

    updateSpeed() {
        // Adjust speed based on screen size
        const screenWidth = window.innerWidth;
        if (screenWidth > 1200) {
            this.speed = 8;
        } else if (screenWidth > 768) {
            this.speed = 7;
        } else if (screenWidth > 480) {
            this.speed = 6;
        } else if (screenWidth > 360) {
            this.speed = 5;
        } else if (screenWidth > 280) {
            this.speed = 4;
        } else if (screenWidth > 200) {
            this.speed = 3;
        } else {
            this.speed = 2;
        }
    }

    update(ball) {
        const paddleRect = this.element.getBoundingClientRect();
        let targetPosition;
        if (this.element.classList.contains('paddle-top') || this.element.classList.contains('paddle-bottom')) {
            targetPosition = ball.x;
            const currentPosition = paddleRect.left + paddleRect.width / 2;
            const diff = targetPosition - currentPosition;
            const moveAmount = Math.min(Math.abs(diff), this.speed) * Math.sign(diff);
            this.element.style.left = (currentPosition + moveAmount) + 'px';
        } else {
            targetPosition = ball.y;
            const currentPosition = paddleRect.top + paddleRect.height / 2;
            const diff = targetPosition - currentPosition;
            const moveAmount = Math.min(Math.abs(diff), this.speed) * Math.sign(diff);
            let newTop = currentPosition + moveAmount;
            // Limit so paddle does not go above menu bar (72px)
            const minTop = 72 + paddleRect.height / 2;
            const maxTop = window.innerHeight - paddleRect.height / 2;
            if (newTop < minTop) newTop = minTop;
            if (newTop > maxTop) newTop = maxTop;
            this.element.style.top = newTop + 'px';
        }
    }
}

// LEGALCHAIN pixel-art logo (1=white, 0=transparent)
const letterBitmaps = {
  L: [
    '10000',
    '10000',
    '10000',
    '10000',
    '10000',
    '10000',
    '11111',
  ],
  E: [
    '11111',
    '10000',
    '10000',
    '111110',
    '10000',
    '10000',
    '11111',
  ],
  G: [
    '01111',
    '10000',
    '10000',
    '10011',
    '10001',
    '10001',
    '01111',
  ],
  A: [
    '01110',
    '10001',
    '10001',
    '11111',
    '10001',
    '10001',
    '10001',
  ],
  C: [
    '01111',
    '10000',
    '10000',
    '10000',
    '10000',
    '10000',
    '01111',
  ],
  H: [
    '10001',
    '10001',
    '10001',
    '11111',
    '10001',
    '10001',
    '10001',
  ],
  i: [
    '1',
    '0',
    '1',
    '1',
    '1',
    '1',
    '1',
  ],
  N: [
    '10001', // row 0
    '11001', // row 1
    '10101', // row 2
    '11011', // row 3: original '10011', plus extra '1' at col 2 (one to the right of col 1)
    '10101', // row 4
    '10011', // row 5
    '10001', // row 6
  ]
};

function getLogoPixelMap() {
  // LEGALCHAIN (with modified E, second L, and i)
  const letters = ['L','E','G','A','L','C','H','A','i','N'];
  const height = 7;
  const letterWidth = { i: 1 };
  const defaultWidth = 5;
  const spacing = 1;
  // Calculate total width
  let totalWidth = 0;
  for (let idx = 0; idx < letters.length; idx++) {
    let l = letters[idx];
    if (l === 'L' && idx === 4) {
      l = 'L2';
    }
    totalWidth += (letterWidth[l] || defaultWidth) + spacing;
  }
  totalWidth -= spacing; // no space after last letter
  // Build empty grid
  const grid = Array.from({length: height}, () => Array(totalWidth).fill(0));
  // Fill grid
  let x = 0;
  for (let idx = 0; idx < letters.length; idx++) {
    let l = letters[idx];
    let bitmap;
    let w;
    if (l === 'L' && idx === 4) {
      bitmap = [
        '10000',
        '10000',
        '10000',
        '10000',
        '10000',
        '10000',
        '10011',
      ];
      w = 5;
    } else if (l === 'N') {
      // Copy the middle pixel of the left vertical bar and move it one square to the right
      bitmap = [
        '10001', // row 0
        '11001', // row 1
        '10101', // row 2
        '11011', // row 3: original '10011', plus extra '1' at col 2 (one to the right of col 1)
        '10101', // row 4
        '10011', // row 5
        '10001', // row 6
      ];
      w = 5;
    } else if (l === 'i') {
      bitmap = [
        '1',
        '0',
        '1',
        '1',
        '1',
        '1',
        '1',
      ];
      w = 1;
    } else {
      bitmap = letterBitmaps[l];
      w = letterWidth[l] || defaultWidth;
    }
    for (let row = 0; row < height; row++) {
      for (let col = 0; col < w; col++) {
        if (bitmap[row][col] === '1') grid[row][x+col] = 1;
      }
    }
    x += w + spacing;
  }
  return grid;
}

function renderLogoPixel() {
  const logo = document.querySelector('.logo-pixel');
  logo.innerHTML = '';
  const logoPixelMap = getLogoPixelMap();
  const rows = logoPixelMap.length;
  const cols = logoPixelMap[0].length;
  
  // Calculate dynamic square size based on screen width with padding consideration
  const screenWidth = window.innerWidth;
  const availableWidth = screenWidth * 0.9; // 90% of screen width (5% padding on each side)
  
  // Calculate optimal square size and gap
  // We need to account for gaps between squares: total width = (cols * squareSize) + ((cols - 1) * gapSize)
  // For small screens, we'll use smaller gaps proportionally
  let squareSize, gapSize;
  
  // Start with maximum size and work down
  const maxSquareSize = 14;
  const maxGapSize = 2;
  
  // Calculate what size we could fit with maximum gap
  const maxPossibleSize = Math.floor((availableWidth - (cols - 1) * maxGapSize) / cols);
  
  if (maxPossibleSize >= maxSquareSize) {
    // We can use maximum size
    squareSize = maxSquareSize;
    gapSize = maxGapSize;
  } else if (maxPossibleSize >= 8) {
    // Use calculated size with proportional gap
    squareSize = maxPossibleSize;
    gapSize = Math.max(1, Math.floor(maxPossibleSize / 7)); // Proportional gap
  } else if (maxPossibleSize >= 4) {
    // For smaller sizes, use fixed smaller gap
    squareSize = maxPossibleSize;
    gapSize = 1;
  } else {
    // For very small sizes, use minimum size with minimal gap
    squareSize = Math.max(2, maxPossibleSize);
    gapSize = 0; // No gap for very small sizes to prevent overlap
  }
  
  // Double-check that everything fits
  const totalWidth = (cols * squareSize) + ((cols - 1) * gapSize);
  if (totalWidth > availableWidth) {
    // Recalculate with smaller square size
    const adjustedSquareSize = Math.floor((availableWidth - (cols - 1) * gapSize) / cols);
    squareSize = Math.max(2, adjustedSquareSize);
  }
  
  // Final safety check - if squares are too small, remove gap entirely
  if (squareSize <= 3 && gapSize > 0) {
    gapSize = 0;
    // Recalculate square size without gap
    squareSize = Math.floor(availableWidth / cols);
    squareSize = Math.max(2, squareSize);
  }
  
  // Set grid properties
  logo.style.gridTemplateColumns = `repeat(${cols}, ${squareSize}px)`;
  logo.style.gridTemplateRows = `repeat(${rows}, ${squareSize}px)`;
  logo.style.gap = `${gapSize}px`;
  
  // Ensure grid doesn't stretch or shrink
  logo.style.gridAutoFlow = 'dense';
  logo.style.alignItems = 'start';
  logo.style.justifyItems = 'start';
  
  // Debug info (remove in production)
  console.log(`Screen: ${screenWidth}px, Available: ${availableWidth}px, Square: ${squareSize}px, Gap: ${gapSize}px, Total: ${totalWidth}px`);

  // Find the x start positions for each letter
  const letters = ['L','E','G','A','L','C','H','A','i','N'];
  const letterWidth = { i: 1 };
  const defaultWidth = 5;
  const spacing = 1;
  let xStarts = [];
  let xPos = 0;
  for (let idx = 0; idx < letters.length; idx++) {
    xStarts.push(xPos);
    let l = letters[idx];
    if (l === 'L' && idx === 4) l = 'L2';
    xPos += (letterWidth[l] || defaultWidth) + spacing;
  }

  // Indices: first A is idx 3, second L is idx 4
  const aStart = xStarts[3];
  const aWidth = defaultWidth;
  const l2Start = xStarts[4];
  const l2Width = defaultWidth;

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const color = logoPixelMap[y][x];
      const square = document.createElement('div');
      square.className = 'logo-pixel-square';
      square.style.width = `${squareSize}px`;
      square.style.height = `${squareSize}px`;
      if (color === 1) {
        // If in first A or second L, set random opacity
        if ((x >= aStart && x < aStart + aWidth) || (x >= l2Start && x < l2Start + l2Width)) {
          const opacity = (Math.random() * 0.65 + 0.25).toFixed(2); // 0.25 - 0.90
          square.style.opacity = opacity;
        }
        square.classList.add('white');
      }
      logo.appendChild(square);
    }
  }
}

function getLogoBlockRectsWithElements() {
  const logo = document.querySelector('.logo-pixel');
  if (!logo) return [];
  const blocks = Array.from(logo.children);
  return blocks
    .map(block => ({
      rect: block.getBoundingClientRect(),
      el: block
    }))
    .filter(obj => obj.el.classList.contains('white'));
}

function renderAboutGradient() {
  const container = document.querySelector('.about-gradient');
  if (!container) return;
  container.innerHTML = '';
  const squareSize = 45;
  const columns = Math.ceil(window.innerWidth / squareSize) + 2;
  const rows = Math.ceil(window.innerHeight / squareSize) + 1;
  const squaresNeeded = columns * rows;
  container.style.display = 'grid';
  container.style.gridTemplateColumns = `repeat(${columns}, ${squareSize}px)`;
  container.style.gridTemplateRows = `repeat(${rows}, ${squareSize}px)`;
  // Black to gray diagonal gradient
  function getGrayGradientColor(x, y, columns, rows) {
    const topLeft = { r: 10, g: 10, b: 10 };
    const topRight = { r: 80, g: 80, b: 80 };
    const bottomLeft = { r: 40, g: 40, b: 40 };
    const bottomRight = { r: 180, g: 180, b: 180 };
    const tx = x / (columns - 1);
    const ty = y / (rows - 1);
    function lerp(a, b, t) { return a + (b - a) * t; }
    function lerpColor(c1, c2, t) {
      return {
        r: lerp(c1.r, c2.r, t),
        g: lerp(c1.g, c2.g, t),
        b: lerp(c1.b, c2.b, t)
      };
    }
    const top = lerpColor(topLeft, topRight, tx);
    const bottom = lerpColor(bottomLeft, bottomRight, tx);
    const final = lerpColor(top, bottom, ty);
    return `rgb(${Math.round(final.r)}, ${Math.round(final.g)}, ${Math.round(final.b)})`;
  }
  for (let i = 0; i < squaresNeeded; i++) {
    const x = i % columns;
    const y = Math.floor(i / columns);
    const square = document.createElement('div');
    square.style.width = `${squareSize}px`;
    square.style.height = `${squareSize}px`;
    square.style.background = getGrayGradientColor(x, y, columns, rows);
    container.appendChild(square);
  }
}

function renderTeamGradient() {
  const container = document.querySelector('.team-gradient');
  if (!container) return;
  container.innerHTML = '';
  const squareSize = 45;
  const columns = Math.ceil(window.innerWidth / squareSize) + 2;
  const rows = Math.ceil(window.innerHeight / squareSize) + 1;
  const squaresNeeded = columns * rows;
  container.style.display = 'grid';
  container.style.gridTemplateColumns = `repeat(${columns}, ${squareSize}px)`;
  container.style.gridTemplateRows = `repeat(${rows}, ${squareSize}px)`;
  // Black to gray diagonal gradient
  function getGrayGradientColor(x, y, columns, rows) {
    const topLeft = { r: 10, g: 10, b: 10 };
    const topRight = { r: 80, g: 80, b: 80 };
    const bottomLeft = { r: 40, g: 40, b: 40 };
    const bottomRight = { r: 180, g: 180, b: 180 };
    const tx = x / (columns - 1);
    const ty = y / (rows - 1);
    function lerp(a, b, t) { return a + (b - a) * t; }
    function lerpColor(c1, c2, t) {
      return {
        r: lerp(c1.r, c2.r, t),
        g: lerp(c1.g, c2.g, t),
        b: lerp(c1.b, c2.b, t)
      };
    }
    const top = lerpColor(topLeft, topRight, tx);
    const bottom = lerpColor(bottomLeft, bottomRight, tx);
    const final = lerpColor(top, bottom, ty);
    return `rgb(${Math.round(final.r)}, ${Math.round(final.g)}, ${Math.round(final.b)})`;
  }
  for (let i = 0; i < squaresNeeded; i++) {
    const x = i % columns;
    const y = Math.floor(i / columns);
    const square = document.createElement('div');
    square.style.width = `${squareSize}px`;
    square.style.height = `${squareSize}px`;
    square.style.background = getGrayGradientColor(x, y, columns, rows);
    container.appendChild(square);
  }
}

function renderProjectsGradient() {
  const container = document.querySelector('.projects-gradient');
  if (!container) return;
  container.innerHTML = '';
  const squareSize = 45;
  const columns = Math.ceil(window.innerWidth / squareSize) + 2;
  const rows = Math.ceil(window.innerHeight / squareSize) + 1;
  const squaresNeeded = columns * rows;
  container.style.display = 'grid';
  container.style.gridTemplateColumns = `repeat(${columns}, ${squareSize}px)`;
  container.style.gridTemplateRows = `repeat(${rows}, ${squareSize}px)`;
  function getGrayGradientColor(x, y, columns, rows) {
    const topLeft = { r: 10, g: 10, b: 10 };
    const topRight = { r: 80, g: 80, b: 80 };
    const bottomLeft = { r: 40, g: 40, b: 40 };
    const bottomRight = { r: 180, g: 180, b: 180 };
    const tx = x / (columns - 1);
    const ty = y / (rows - 1);
    function lerp(a, b, t) { return a + (b - a) * t; }
    function lerpColor(c1, c2, t) {
      return {
        r: lerp(c1.r, c2.r, t),
        g: lerp(c1.g, c2.g, t),
        b: lerp(c1.b, c2.b, t)
      };
    }
    const top = lerpColor(topLeft, topRight, tx);
    const bottom = lerpColor(bottomLeft, bottomRight, tx);
    const final = lerpColor(top, bottom, ty);
    return `rgb(${Math.round(final.r)}, ${Math.round(final.g)}, ${Math.round(final.b)})`;
  }
  for (let i = 0; i < squaresNeeded; i++) {
    const x = i % columns;
    const y = Math.floor(i / columns);
    const square = document.createElement('div');
    square.style.width = `${squareSize}px`;
    square.style.height = `${squareSize}px`;
    square.style.background = getGrayGradientColor(x, y, columns, rows);
    container.appendChild(square);
  }
}

function renderContactGradient() {
  const container = document.querySelector('.contact-gradient');
  if (!container) return;
  container.innerHTML = '';
  const squareSize = 45;
  const columns = Math.ceil(window.innerWidth / squareSize) + 2;
  const rows = Math.ceil(window.innerHeight / squareSize) + 1;
  const squaresNeeded = columns * rows;
  container.style.display = 'grid';
  container.style.gridTemplateColumns = `repeat(${columns}, ${squareSize}px)`;
  container.style.gridTemplateRows = `repeat(${rows}, ${squareSize}px)`;
  for (let i = 0; i < squaresNeeded; i++) {
    const x = i % columns;
    const y = Math.floor(i / columns);
    const square = document.createElement('div');
    square.style.width = `${squareSize}px`;
    square.style.height = `${squareSize}px`;
    square.style.background = getGradientColor(x, y, columns, rows); // Home gradient
    container.appendChild(square);
  }
}

// Function to update game elements sizes
function updateGameElements() {
    if (ball) {
        ball.updateRadius();
        ball.updateSpeed();
    }
    if (paddles) {
        paddles.forEach(paddle => paddle.updateSpeed());
    }
}

// Initialize
window.addEventListener('load', () => {
    createGrid();
    ball = new Ball();
    
    // Create paddles
    paddles = [
        new Paddle(document.querySelector('.paddle-top')),
        new Paddle(document.querySelector('.paddle-right')),
        new Paddle(document.querySelector('.paddle-bottom')),
        new Paddle(document.querySelector('.paddle-left'))
    ];
    
    function animate() {
        // Only animate if landing is visible
        animationActive = isLandingVisible();
        showLandingElements(animationActive);
        if (animationActive) {
            ball.update(paddles);
            paddles.forEach(paddle => paddle.update(ball));
        }
        requestAnimationFrame(animate);
    }
    
    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        createGrid();
        renderLogoPixel();
        renderAboutGradient();
        renderTeamGradient();
        renderProjectsGradient();
        renderContactGradient();
        updateGameElements();
        
        // Reset ball position to start position (25% from top)
        if (ball) {
            ball.resetPosition();
        }
    });

    // Handle scroll to update menu icon
    window.addEventListener('scroll', updateMenuIcon);
    
    // Handle menu navigation clicks
    const menuLinks = document.querySelectorAll('.menu-bar a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Update icon after a short delay to allow smooth scrolling
            setTimeout(updateMenuIcon, 300);
            setTimeout(updateMenuIcon, 600);
            setTimeout(updateMenuIcon, 1000);
        });
    });
    
    // Initial icon update
    updateMenuIcon();

    renderLogoPixel();
    renderAboutGradient();
    renderTeamGradient();
    renderProjectsGradient();
    renderContactGradient();
});

// Team section hover functionality
document.addEventListener('DOMContentLoaded', function() {
    const teamRightContainer = document.querySelector('.team-right-container');
    const teamLeftContainer = document.querySelector('.team-left-container');
    const teamTextOverlay = document.querySelector('.team-text-overlay');
    const teamTextOverlayRight = document.querySelector('.team-text-overlay-right');
    const teamLeftImages = teamLeftContainer.querySelectorAll('img');
    const teamRightImages = teamRightContainer.querySelectorAll('img');

    if (teamRightContainer && teamLeftContainer && teamTextOverlay && teamTextOverlayRight) {
        // Hover over right container - affects left container
        teamRightContainer.addEventListener('mouseenter', function() {
            // Change left container background to black
            teamLeftContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
            
            // Show text overlay
            teamTextOverlay.style.opacity = '1';
            teamTextOverlay.style.visibility = 'visible';
            
            // Hide left container images
            teamLeftImages.forEach(img => {
                img.style.opacity = '0';
            });
        });

        teamRightContainer.addEventListener('mouseleave', function() {
            // Restore left container background
            teamLeftContainer.style.backgroundColor = 'rgba(20, 20, 20, 0.3)';
            
            // Hide text overlay
            teamTextOverlay.style.opacity = '0';
            teamTextOverlay.style.visibility = 'hidden';
            
            // Show left container images
            teamLeftImages.forEach(img => {
                img.style.opacity = '1';
            });
        });

        // Hover over left container - affects right container
        teamLeftContainer.addEventListener('mouseenter', function() {
            // Change right container background to black
            teamRightContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
            
            // Show text overlay
            teamTextOverlayRight.style.opacity = '1';
            teamTextOverlayRight.style.visibility = 'visible';
            
            // Hide right container images
            teamRightImages.forEach(img => {
                img.style.opacity = '0';
            });
        });

        teamLeftContainer.addEventListener('mouseleave', function() {
            // Restore right container background
            teamRightContainer.style.backgroundColor = 'rgba(20, 20, 20, 0.3)';
            
            // Hide text overlay
            teamTextOverlayRight.style.opacity = '0';
            teamTextOverlayRight.style.visibility = 'hidden';
            
            // Show right container images
            teamRightImages.forEach(img => {
                img.style.opacity = '1';
            });
        });
    }
}); 