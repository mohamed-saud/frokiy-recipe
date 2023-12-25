class SearchViw {
  #pearantEl = document.querySelector('.search');
  query() {
    const query = this.#pearantEl.querySelector('.search__field').value;
    this.#clearInput();
    return query;
  }
  headlSearchResult(headling) {
    this.#pearantEl.addEventListener('submit', e => {
      e.preventDefault();
      headling();
    });
  }
  #clearInput() {
    return (this.#pearantEl.querySelector('.search__field').value = '');
  }
  displaySearchResult() {
    const markup = `
        <div class="spinner">
            <svg>
            <use href="${icons}#icon-loader"></use>
            </svg>
         </div>
        `;
    this.#pearantEl.innerHTML = '';
    this.#pearantEl.insertAdjacentHTML('afterbegin', markup);
  }
}
export default new SearchViw();
