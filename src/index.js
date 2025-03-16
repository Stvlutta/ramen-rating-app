// index.js

// In-memory storage for all ramens (including user-added ones)
let ramensData = [];

// Callbacks
const handleClick = (ramen) => {
  // Update the details section with the clicked ramen information
  const detailImg = document.querySelector("#ramen-detail > .detail-image");
  const detailName = document.querySelector("#ramen-detail > .name");
  const detailRestaurant = document.querySelector("#ramen-detail > .restaurant");
  const detailsRating = document.getElementById("rating-display");
  const detailsComment = document.getElementById("comment-display");
  
  detailImg.src = ramen.image;
  detailImg.alt = ramen.name;
  detailName.textContent = ramen.name;
  detailRestaurant.textContent = ramen.restaurant;
  detailsRating.textContent = ramen.rating;
  detailsComment.textContent = ramen.comment;
};

const addSubmitListener = (formElement) => {
  // Use the passed form element if it's provided (for testing)
  // Otherwise, find it in the DOM
  const ramenForm = formElement || document.getElementById('new-ramen');
  
  if (ramenForm) {
    ramenForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form values
      let imagePath = e.target.image.value;
      // Remove leading slash if present to ensure consistent path format
      if (imagePath.startsWith('/')) {
        imagePath = imagePath.substring(1);
      }
      
      const newRamen = {
        name: e.target.name.value,
        restaurant: e.target.restaurant.value,
        image: imagePath,
        rating: e.target.rating.value,
        comment: e.target["new-comment"].value,
        id: Date.now() // Generate a unique ID
      };
      
      // Add the new ramen to our data array
      ramensData.push(newRamen);
      
      // Create a new image element for the menu
      const img = document.createElement('img');
      img.src = newRamen.image;
      img.alt = newRamen.name;
      img.className = 'ramen-img'; // Add a class for styling
      
      // Add click event listener to the new image
      img.addEventListener('click', () => handleClick(newRamen));
      
      // Add new ramen to the menu
      const ramenMenu = document.getElementById('ramen-menu');
      ramenMenu.appendChild(img);
      
      // Automatically display the newly added ramen
      handleClick(newRamen);
      
      // Reset the form
      e.target.reset();
    });
  }
};

const displayRamens = () => {
  // If our data array is empty, initialize it with the default ramen data
  if (ramensData.length === 0) {
    ramensData = [
      {
        id: 1,
        name: "Shoyu Ramen",
        restaurant: "Nonono",
        image: "assets/ramen/shoyu.jpg",
        rating: 7,
        comment: "Delish. Can't go wrong with a classic!"
      },
      {
        id: 2,
        name: "Naruto Ramen",
        restaurant: "Naruto",
        image: "assets/ramen/naruto.jpg",
        rating: 10,
        comment: "My absolute fave!"
      },
      {
        id: 3,
        name: "Nirvana Shiromaru",
        restaurant: "Ippudo",
        image: "assets/ramen/nirvana.jpg",
        rating: 7,
        comment: "Do buy the hype."
      },
      {
        id: 4,
        name: "Gyukotsu Ramen",
        restaurant: "Za-Ya Ramen",
        image: "assets/ramen/gyukotsu.jpg",
        rating: 8,
        comment: "Good to the last drop."
      },
      {
        id: 5,
        name: "Kojiro Red Ramen",
        restaurant: "Ramen-Ya",
        image: "assets/ramen/kojiro.jpg",
        rating: 6,
        comment: "Perfect for a cold night."
      }
    ];
  }

  const ramenMenu = document.getElementById('ramen-menu');
  if (!ramenMenu) {
    console.error("Couldn't find ramen-menu element");
    return Promise.resolve([]);
  }
  
  // Clear existing content
  ramenMenu.innerHTML = '';
  
  console.log("Ramens loaded:", ramensData);
  
  // Create and append image elements for each ramen
  ramensData.forEach(ramen => {
    console.log("Creating image for:", ramen.name, "with src:", ramen.image);
    
    const img = document.createElement('img');
    img.src = ramen.image;
    img.alt = ramen.name;
    img.className = 'ramen-img'; // Add a class for styling
    
    // Add onerror handler to log when images fail to load
    img.onerror = function() { 
      console.error("Failed to load image:", ramen.image); 
    };
    
    // Add click event listener to display ramen details
    img.addEventListener('click', () => {
      console.log("Image clicked:", ramen.name);
      handleClick(ramen);
    });
    
    ramenMenu.appendChild(img);
  });
  
  // Display the first ramen details when page loads (for advanced deliverable)
  if (ramensData.length > 0) {
    handleClick(ramensData[0]);
  }
  
  // Return a promise for compatibility with the existing code
  return Promise.resolve(ramensData);
};

const main = () => {
  console.log("Application starting...");
  
  // Invoke displayRamens to show all ramens when page loads
  displayRamens().then(ramens => {
    console.log(`Successfully loaded ${ramens.length} ramens`);
  });
  
  // Invoke addSubmitListener to set up the form submission handler
  addSubmitListener();
};

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};

// Only call main if we're not in a test environment
if (typeof process === 'undefined' || !process.env.VITEST) {
  // Make sure DOM is fully loaded before running main
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', main);
  } else {
    main();
  }
}
