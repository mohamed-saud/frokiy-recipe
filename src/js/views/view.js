import icons from 'url:../../img/icons.svg';

export default class View {
  _pearantElement = document.querySelector('.recipe');
  _errorMessage = 'We could not find your recipe. please tray another one';
  _message = '';
  _data;

  /**
   *
   * @param {object} data . this data render to recipe object
   * @param {object, bollean} render
   * @returns null
   * @author Mohamed Sayed Thapet
   */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.heandelrError(this._errorMessage);
    this._data = data;
    const markup = this._generateMarkup();
    if (!render) return markup;
    this._clear();
    this._pearantElement.insertAdjacentHTML('afterbegin', markup);
  }
  update(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.heandelrError(this._errorMessage);
    this._data = data;
    const newMarkup = this._generateMarkup();
    const newDom = document.createRange().createContextualFragment(newMarkup);
    const currntElm = Array.from(this._pearantElement.querySelectorAll('*'));
    const newElm = Array.from(newDom.querySelectorAll('*'));

    newElm.forEach((newEl, i) => {
      const currEl = currntElm[i];
      if (
        !newEl.isEqualNode(currEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      )
        currEl.textContent = newEl.textContent;

      if (!newEl.isEqualNode(currEl))
        Array.from(newEl.attributes).forEach(attr => {
          currEl.setAttribute(attr.name, attr.value);
        });

      // if()currEl.textContent = newEl.textContent;
    });
  }
  _clear() {
    return (this._pearantElement.innerHTML = '');
  }
  renderingspener() {
    const markup = `
        <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>`;
    this._pearantElement.innerHTML = '';
    this._pearantElement.insertAdjacentHTML('afterbegin', markup);
  }

  //// heandel all events
  addHandelrRender(heandelr) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, heandelr));
  }

  ///// heandel error message
  heandelrError(message = this._errorMessage) {
    const markup = `
        <div class="error">
                <div>
                  <svg>
                    <use href="${icons}#icon-alert-triangle"></use>
                  </svg>
                </div>
                <p>${message}</p>
          </div>
    `;
    this._clear();
    this._pearantElement.insertAdjacentHTML('afterbegin', markup);
  }

  //// heandel message
  heandelrMessage(message = this._message) {
    const markup = `
        <div class="message">
                <div>
                  <svg>
                    <use href="${icons}#icon-alert-smile"></use>
                  </svg>
                </div>
                <p>${message}</p>
          </div>
    `;
    this._clear();
    this._pearantElement.insertAdjacentHTML('afterbegin', markup);
  }
}
