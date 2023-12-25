import View from './view';

class AddRecipeView extends View {
  _pearantElement = document.querySelector('.upload');
  _overlay = document.querySelector('.overlay');
  _window = document.querySelector('.add-recipe-window');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addShowRecipeWindow();
    // this._addHideRecipeWindow();
  }

  toggelAddRecipeWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }
  _addShowRecipeWindow() {
    [this._overlay, this._btnClose, this._btnOpen].forEach(el =>
      el.addEventListener('click', this.toggelAddRecipeWindow.bind(this))
    );
  }
  addHeandelUplode(heandelr) {
    this._pearantElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      heandelr(data);
    });
  }
}

export default new AddRecipeView();
