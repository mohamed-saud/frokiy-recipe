import { COUNT_PAGE_RESULT } from '../config';
import View from './view';

import icons from 'url:../../img/icons.svg';

class paginationView extends View {
  _pearantElement = document.querySelector('.pagination');
  addHeandelerClick(heanderr) {
    this._pearantElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const curruntpage = +btn.dataset.goto;
      heanderr(curruntpage);
    });
  }

  _generateBtn(direction, _, currntPage) {
    if (direction === 'next') {
      return `
        <button data-goto=${
          currntPage + 1
        } class="btn--inline pagination__btn--next">
        <span>Page ${currntPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>`;
    }
    if (direction === 'prev') {
      return `
        <button data-goto=${
          currntPage - 1
        } class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currntPage - 1}</span>
        </button>`;
    }
  }
  _generateMarkup() {
    let numPage = Math.ceil(
      this._data.result.length / this._data.countPageResult
    );
    // this._data.page = numPage;
    const currntPage = this._data.page;

    // // 1) page 1 and there are another pages
    if (currntPage === 1 && numPage > 1) {
      return this._generateBtn('next', numPage, currntPage);
    }
    // // /3) last page
    if (currntPage === numPage && numPage > 1) {
      return this._generateBtn('prev', numPage, currntPage);
    }
    // //4) other page
    if (currntPage < numPage) {
      return `${this._generateBtn(
        'prev',
        numPage,
        currntPage
      )} ${this._generateBtn('next', numPage, currntPage)}`;
    }
    // // /2) page 1 and ther are no aother page
    return '';
  }
}

export default new paginationView();
