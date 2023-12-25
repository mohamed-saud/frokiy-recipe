import PreviewView from './previewView';

class resultsView extends PreviewView {
  _pearantElement = document.querySelector('.results');
  _errorMessage = 'No recipes find from your query! please tray again!. ;)';
  _message = '';
  _generateMarkup() {
    return this._data
      .map(recipe => this._generateMarkupPrivew(recipe))
      .join('');
  }
}

export default new resultsView();
