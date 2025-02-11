localStorage// script.js
let noClick = 0;
let animationId = null;

// Button movement state
let velocity = {
    x: 2,
    y: 2
};

// Function to get random velocity
function getRandomVelocity() {
    const speed = 2;
    const angle = Math.random() * 2 * Math.PI;
    return {
        x: Math.cos(angle) * speed,
        y: Math.sin(angle) * speed
    };
}

// Function to handle final state
function activateFinalState() {
    // Stop the animation
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
    
    // Remove the No button
    const noButton = document.getElementById('no-button');
    noButton.style.display = 'none';
    
    // Update and enlarge Yes button
    const yesButton = document.getElementById('yes-button');
    yesButton.innerText = 'YESSS!!!!';
    yesButton.style.fontSize = '48px'; // Make it extra large
    yesButton.style.padding = '20px 40px'; // Make the button bigger overall
}

// Function to move and bounce button
function animateButton() {
    const button = document.getElementById('no-button');
    const buttonWidth = button.offsetWidth;
    const buttonHeight = button.offsetHeight;
    
    // Get current position
    let posX = parseFloat(button.style.left) || 0;
    let posY = parseFloat(button.style.top) || 0;
    
    // Update position
    posX += velocity.x;
    posY += velocity.y;
    
    // Check for collision with window edges
    if (posX <= 0 || posX + buttonWidth >= window.innerWidth) {
        velocity.x = -velocity.x; // Reverse horizontal direction
        // Add some randomness to vertical velocity on collision
        velocity.y += (Math.random() - 0.5) * 2;
    }
    
    if (posY <= 0 || posY + buttonHeight >= window.innerHeight) {
        velocity.y = -velocity.y; // Reverse vertical direction
        // Add some randomness to horizontal velocity on collision
        velocity.x += (Math.random() - 0.5) * 2;
    }
    
    // Keep velocity in check
    const speed = 2;
    const currentSpeed = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y);
    velocity.x = (velocity.x / currentSpeed) * speed;
    velocity.y = (velocity.y / currentSpeed) * speed;
    
    // Apply position
    button.style.position = 'fixed';
    button.style.left = posX + 'px';
    button.style.top = posY + 'px';
    
    // Continue animation
    animationId = requestAnimationFrame(animateButton);
}

// Function to start bouncing movement
function startBouncingMovement() {
    const button = document.getElementById('no-button');
    button.style.position = 'fixed';
    
    // Set initial position if not set
    if (!button.style.left) {
        button.style.left = (window.innerWidth / 2) + 'px';
    }
    if (!button.style.top) {
        button.style.top = (window.innerHeight / 2) + 'px';
    }
    
    // Set initial random velocity
    velocity = getRandomVelocity();
    
    // Start the animation
    animateButton();
}

function getRandomPosition() {
    // Get viewport dimensions, accounting for button size
    const maxX = window.innerWidth - 100; // 100px for button width
    const maxY = window.innerHeight - 50; // 50px for button height
    
    return {
        x: Math.max(0, Math.floor(Math.random() * maxX)),
        y: Math.max(0, Math.floor(Math.random() * maxY))
    };
}

function moveButtonRandomly() {
    const button = document.getElementById('no-button');
    const pos = getRandomPosition();
    
    button.style.position = 'fixed'; // Make the button position absolute
    button.style.left = pos.x + 'px';
    button.style.top = pos.y + 'px';
}


// Function to handle button click events
function selectOption(option) {
    // Check which option was clicked
    if (option === 'yes') {

        if (animationId) {
            cancelAnimationFrame(animationId);
        }

        // Flash rainbow colors
        flashRainbowColors(function() {
            document.getElementById('question').style.display = 'none'; // Hide the question
            displayCatHeart(); // Display the cat-heart.gif
        });
    } else if (option === 'no') {
        noClick++;
        // Change text on the "No" button to "You sure?"
        if (noClick == 1) {
            document.getElementById('no-button').innerText = 'You sure?'; 
        }
        else if (noClick == 2) {
            document.getElementById('no-button').innerText = 'Are you really really sure?'
        }
        else if (noClick == 3) {
            moveButtonRandomly();
        }
        else if (noClink == 5){
            document.getElementById('no-button').innerText = 'Can you say now now?'
            startBouncingMovement();
        }
        else {
            activateFinalState();
        }
        

        // Increase font size of "Yes" button
        // var yesButton = document.getElementById('yes-button');
        // var currentFontSize = window.getComputedStyle(yesButton).getPropertyValue('font-size');
        // var newSize = parseFloat(currentFontSize) * 2; // Increase font size by  * 2px
        // yesButton.style.fontSize = newSize + 'px

    } else {
        // If neither "Yes" nor "No" was clicked, show an alert message
        alert('Invalid option!');
    }
}

// Handle window resize
window.addEventListener('resize', () => {
    const button = document.getElementById('no-button');
    const buttonWidth = button.offsetWidth;
    const buttonHeight = button.offsetHeight;
    
    // Keep button in bounds when window is resized
    const posX = parseFloat(button.style.left);
    const posY = parseFloat(button.style.top);
    
    if (posX + buttonWidth > window.innerWidth) {
        button.style.left = (window.innerWidth - buttonWidth) + 'px';
    }
    if (posY + buttonHeight > window.innerHeight) {
        button.style.top = (window.innerHeight - buttonHeight) + 'px';
    }
});

// Clean up animation when page unloads
window.addEventListener('unload', () => {
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
});

// Function to flash rainbow colors and then execute a callback function
function flashRainbowColors(callback) {
    var colors = ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#9400d3'];
    var i = 0;
    var interval = setInterval(function() {
        document.body.style.backgroundColor = colors[i];
        i = (i + 1) % colors.length;
    }, 200); // Change color every 200 milliseconds
    setTimeout(function() {
        clearInterval(interval);
        document.body.style.backgroundColor = ''; // Reset background color
        if (callback) {
            callback();
        }
    }, 2000); // Flash colors for 2 seconds
}

// Function to display the cat.gif initially
function displayCat() {
    // Get the container where the image will be displayed
    var imageContainer = document.getElementById('image-container');
    // Create a new Image element for the cat
    var catImage = new Image();
    // Set the source (file path) for the cat image
    catImage.src = 'cat.gif'; // Assuming the cat image is named "cat.gif"
    // Set alternative text for the image (for accessibility)
    catImage.alt = 'Cat';
    // When the cat image is fully loaded, add it to the image container
    catImage.onload = function() {
        imageContainer.appendChild(catImage);
    };
}

// Function to display the cat-heart.gif
function displayCatHeart() {
    // Clear existing content in the image container
    document.getElementById('image-container').innerHTML = '';
    // Get the container where the image will be displayed
    var imageContainer = document.getElementById('image-container');
    // Create a new Image element for the cat-heart
    var catHeartImage = new Image();
    // Set the source (file path) for the cat-heart image
    catHeartImage.src = 'cat-heart.gif'; // Assuming the cat-heart image is named "cat-heart.gif"
    // Set alternative text for the image (for accessibility)
    catHeartImage.alt = 'Cat Heart';
    // When the cat-heart image is fully loaded, add it to the image container
    catHeartImage.onload = function() {
        imageContainer.appendChild(catHeartImage);
        // Hide the options container
        document.getElementById('options').style.display = 'none';
    };
}

// Display the cat.gif initially
displayCat();
