import previewView from './previewView';

class bookmarksView extends previewView {
  _pearantElement = document.querySelector('.bookmarks__list');
  _errorMessage = ' No bookmarks yet. Find a nice recipe and bookmark it :)';
  _message = '';

  _generateMarkup() {
    return this._data
      .map(bookmark => this._generateMarkupPrivew(bookmark))
      .join('');
  }
}

export default new bookmarksView();
