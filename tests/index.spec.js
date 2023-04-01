import { getGridsContainer } from '../src/index';
import { loadView } from './utils.js';

describe('index', () => {
  let dom;

  beforeEach(() => {
    dom = loadView('index.html');
    document.documentElement.innerHTML = dom;
  });

  describe('getGridsContainer', () => {
    it('should return the grids container', () => {
      const gridsContainer = getGridsContainer();
      expect(gridsContainer.id).toBe('grids-container');
    });
  });
});
