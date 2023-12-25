import { AJAX } from './helpers';
import { API_URL, COUNT_PAGE_RESULT, KEY } from './config';
export const state = {
  recipe: {},
  search: {
    query: '',
    result: [],
    page: 1,
    countPageResult: COUNT_PAGE_RESULT,
  },
  bookmarks: [],
};
export const loaRecipe = async function (id) {
  try {
    const data = await AJAX(`${API_URL}${id}?key=${KEY}`);
    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      image: recipe.image_url,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
      ...(recipe.key && { key: recipe.key }),
    };
    if (state.bookmarks.some(bookmark => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (err) {
    throw err;
  }
};
export const loadSearchResult = async function (query) {
  try {
    state.search.query = query;

    const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);

    state.search.result = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        image: recipe.image_url,
        publisher: recipe.publisher,
        ...(recipe.key && { key: recipe.key }),
      };
    });
    state.search.page = 1;
  } catch (err) {
    throw err;
  }
};
const presistBookmark = function () {
  return localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const getSearchResultPage = function (page = state.search.page) {
  state.search.page = page;
  let start = (page - 1) * state.search.countPageResult;
  let end = page * state.search.countPageResult;
  return state.search.result.slice(start, end);
};
export const updateServing = function (newServing) {
  console.log(newServing, state.recipe.ingredients);
  state.recipe.ingredients.forEach(onldServing => {
    onldServing.quantity =
      (onldServing.quantity * newServing) / state.recipe.servings;
  });
  state.recipe.servings = newServing;
};

export const addBookmarks = function (recipe) {
  state.bookmarks.push(recipe);
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  presistBookmark();
};
export const deleteBookmark = function (id) {
  const index = state.bookmarks.findIndex(el => el.id == id);
  state.bookmarks.splice(index, 1);
  if (state.recipe.id === state.recipe.id) state.recipe.bookmarked = false;
  presistBookmark();
};
const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};
init();
const clearBookmarks = function () {
  localStorage.clear('bookmarks');
};
// clearBookmarks();
export const uplodeRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const ingarr = ing[1].replaceAll(' ', '').split(',');
        if (ingarr.length !== 3)
          throw new Error('please add some reale ingredient');
        const [quantity, unit, description] = ingarr;
        return { quantity: quantity ? +quantity : null, unit, description };
      });

    const recipe = {
      title: newRecipe.title,
      image_url: newRecipe.image,
      cooking_time: newRecipe.cookingTime,
      servings: newRecipe.servings,
      publisher: newRecipe.publisher,
      ingredients: ingredients,
      source_url: newRecipe.sourceUrl,
      key: KEY,
    };

    const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);
    console.log(data);
    state.recipe = data.data.recipe;
  } catch (err) {
    throw err;
  }
};
