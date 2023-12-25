import * as model from './model.js';
import recipeView from './views/recipeView.js';
import 'core-js/stable/index.js';
import 'regenerator-runtime';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationViwe from './views/paginationViwe.js';
import bookmarksView from './views/bookmarksView.js';
import AddRecipeView from './views/addRecipeView.js';
import addRecipeView from './views/addRecipeView.js';
//////show recipe to the user
const controlleRecipe = async function () {
  try {
    let id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderingspener();

    ///1) loading Recipe
    await model.loaRecipe(id);

    ///2) rendering recipe
    // recipeView.update(model.state.recipe);

    recipeView.render(model.state.recipe);
    bookmarksView.render(model.state.bookmarks);
  } catch (err) {
    recipeView.heandelrError();
  }
};

const searchResult = async function () {
  try {
    const query = searchView.query();

    if (!query) return;
    //// get data searsh result
    await model.loadSearchResult(query);
    //// render spiner
    resultsView.renderingspener();
    ///// render and display search result
    resultsView.render(model.getSearchResultPage());
    ////// pagination page
    paginationViwe.render(model.state.search);
  } catch (err) {
    resultsView.heandelrError();
  }
};

const controllePagination = function (goToPage) {
  ///// render and display search result
  resultsView.render(model.getSearchResultPage(goToPage));
  ////// pagination page
  paginationViwe.render(model.state.search);
};

const controlleServing = function (newServing) {
  //// update serving
  model.updateServing(newServing);
  //// reander and update recipe
  recipeView.update(model.state.recipe);
};

const controlleBookmarks = function () {
  //// add/remove bookmark :)
  if (model.state.recipe.bookmarked === false)
    model.addBookmarks(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  /// update recipe
  recipeView.render(model.state.recipe);
  ////// reander bookmark and update
  bookmarksView.render(model.state.bookmarks);
};

const controlleAddRecipe = async function (newRecipe) {
  try {
    /// render spener
    addRecipeView.renderingspener();
    //////uplode data
    await model.uplodeRecipe(newRecipe);
    ////////render the recipe
    recipeView.render(model.state.recipe);
    //////////close add recipe window
    addRecipeView.toggelAddRecipeWindow();
    ////////// add this recipe to bookmarks
    model.addBookmarks(model.state.recipe);
    /////////// update bookmark view
    bookmarksView.render(model.state.bookmarks);
    ///////// save the id link to the nav link
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
  } catch (err) {
    addRecipeView.heandelrError(err.message);
  }
};

const init = function () {
  recipeView.addHandelrRender(controlleRecipe);
  recipeView.addHeandelrUpdateServing(controlleServing);
  searchView.headlSearchResult(searchResult);
  paginationViwe.addHeandelerClick(controllePagination);
  recipeView.addheandelrBookmark(controlleBookmarks);
  AddRecipeView.addHeandelUplode(controlleAddRecipe);
};
init();
