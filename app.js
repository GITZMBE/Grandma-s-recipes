const recipeSection = document.getElementById('recipe-section');
const homeMadeRecipeContainer = document.getElementById('home-made-recipe-container');
const randomRecipesContainer = document.getElementById('random-recipe-container');
const beerRecipeContainer = document.getElementById('beer-recipe-container');
const searchBar = document.getElementById('search-bar');
const searchBtn = document.getElementById('search-btn');
const searchTitle = document.getElementById('search-title');
const searchContainer = document.getElementById('searched-container');

searchBar.addEventListener('input', e => {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            if (searchBar.focus && searchBar.value !== '') {
                searchContainer.innerHTML = '';
                searchTitle.classList.add('hide');
                searchContainer.classList.add('hide');
                for (const key in data) {
                    const element = data[key];
                    if (element.meal == capitalize(searchBar.value) && data.hasOwnProperty(key)) {
                        searchTitle.classList.remove('hide');
                        searchContainer.classList.remove('hide');
                        createCustomRecipe(element, searchContainer);
                    }
                }
            }
        })
        .catch(error => {
            console.log('Error:', error);
        });
})

searchBtn.addEventListener('click', e => {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            if (searchBar.focus && searchBar.value !== '') {
                searchContainer.innerHTML = '';
                searchTitle.classList.add('hide');
                searchContainer.classList.add('hide');
                for (const key in data) {
                    const element = data[key];
                    if (element.meal == capitalize(searchBar.value) && data.hasOwnProperty(key)) {
                        searchTitle.classList.remove('hide');
                        searchContainer.classList.remove('hide');
                        createCustomRecipe(element, searchContainer);
                    }
                }
            }
        })
        .catch(error => {
            console.log('Error:', error);
        });
})

fetch('data.json')
.then(response => response.json())
.then(data => {
    for(const element in data) {
        createCustomRecipe(data[element], homeMadeRecipeContainer);
    }
})
.catch(error => {
    console.log('Error:', error);
});

const foodUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';

for(let i = 1; i <= 10; i++) {
    fetch(foodUrl)
    .then(response => response.json())
    .then(data => {
        // console.log(data.meals[0]);
        createMealRecipe(data.meals[0], randomRecipesContainer);
    })
    .catch(error => {
        console.log('Error:', error);
    });
}

const beerUrl = 'https://api.punkapi.com/v2/beers/';

for(let i = 1; i <= 30; i++) {
    fetch(`${beerUrl}${i}`)
    .then(response => response.json())
    .then(data => {
        // console.log(data[0]);
        createBeerRecipe(data[0], beerRecipeContainer);
    })
    .catch(error => {
        console.log('Error:', error);
    });
}

function createCustomRecipe(data, container) {
    let mealContainer = document.createElement('div');
    mealContainer.classList.add('recipe-container');
    container.append(mealContainer);

    let img = document.createElement('img');
    img.src = data.image + data.meal;
    img.classList.add('dish-img');

    let title = document.createElement('h3');
    title.innerText = data.meal;
    title.classList.add('dish-title');

    let description = document.createElement('p');
    description.innerText = data.description;
    description.classList.add('dish-description');

    mealContainer.append(img, title, description);
}

function createMealRecipe(data, container) {
    let mealContainer = document.createElement('div');
    mealContainer.classList.add('recipe-container');
    container.append(mealContainer);

    let img = document.createElement('img');
    img.src = data.strMealThumb;
    img.classList.add('dish-img');

    let title = document.createElement('h3');
    title.innerText = data.strMeal;
    title.classList.add('dish-title');

    let description = document.createElement('p');
    description.innerText = data.strInstructions;
    // description.innerText = `${data.strArea} meal with the main ingredient of ${data.strIngredient1} and has the category of ${data.strCategory}.`;
    description.classList.add('dish-description');

    mealContainer.append(img, title, description);
}

function createBeerRecipe(data, container) {
    let beerContainer = document.createElement('div');
    beerContainer.classList.add('beer-recipe-container');
    container.append(beerContainer);

    let img = document.createElement('img');
    img.src = data.image_url;
    img.classList.add('dish-img');

    let title = document.createElement('h3');
    title.innerText = data.name;
    title.classList.add('dish-title');

    let description = document.createElement('p');
    description.innerText = data.description;
    description.classList.add('dish-description');

    beerContainer.append(img, title, description);
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}