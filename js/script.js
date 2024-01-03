/* ---------------
!!! Get the API !!!
----------------- */
let newsDataByCategory = {};
console.log(newsDataByCategory);

const fetchNews = async () => {
  const response = await fetch("https://ok.surf/api/v1/cors/news-feed");
  const data = await response.json();

  // Organize news data by category
  Object.keys(data).forEach((category) => {
    newsDataByCategory[category.toLowerCase()] = data[category];
  });

  const container = document.getElementById("news-container");

  // Display news for the default category (e.g., "business")
  displayNewsByCategory("business", container);
};

/* ----------------
!!! Display News by Category !!!
------------------- */
const displayNewsByCategory = (category, container) => {
  // Convert category to lowercase for consistency
  const lowerCaseCategory = category.toLowerCase();

  // Check if data for the specified category is available
  if (
    newsDataByCategory[lowerCaseCategory] &&
    newsDataByCategory[lowerCaseCategory].length > 0
  ) {
    // Clear the existing content
    container.innerHTML = "";

    // Iterate over the data for the specified category
    newsDataByCategory[lowerCaseCategory].forEach((item) => {
      const card = createItemCard(item);
      container.appendChild(card);
    });
  }
};

/* --------------------
!!! Create Elements !!!
--------------------- */
const makeElements = (type, parameters) => {
  // creates an element with the given parameters
  const element = document.createElement(type);
  Object.entries(parameters).forEach(([propertyKey, propertyValue]) => {
    element[propertyKey] = propertyValue;
  });
  return element;
};

const createItemCard = (item) => {
  // creates a card for the given item
  const card = makeElements("div", { className: "item-card" });
  const link = makeElements("a", { href: item.link, className: "news-link" });
  const image = makeElements("img", {
    src: item.og || "./media/no-img.png",
    alt: item.title || "News Image",
    className: "news-image",
  });
  const title = makeElements("p", {
    textContent: item.title,
    className: "news-title",
  });

  link.appendChild(image);
  link.appendChild(title);
  card.appendChild(link);

  return card;
};

/* ----------------
!!! Create Nav !!!
------------------- */
const navMenu = document.getElementById("nav-Menu");

// Manually create buttons for each category
const categories = [
  "business",
  "entertainment",
  "health",
  "science",
  "sports",
  "technology",
  "us",
  "world",
];

categories.forEach((category) => {
  const button = makeElements("button", {
    type: "button",
    textContent: category,
  });

  button.addEventListener("click", () => {
    const container = document.getElementById("news-container");
    displayNewsByCategory(category, container);
  });

  navMenu.appendChild(button);
});

// Initial fetch of news
fetchNews();
