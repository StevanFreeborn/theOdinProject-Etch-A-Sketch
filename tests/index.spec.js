import { jest } from '@jest/globals';
import {
  addGrid,
  addRow,
  buildGridsContainer,
  clearGridsContainer,
  getClearButton,
  getGridSizeFromUser,
  getGridsContainer,
} from '../src/index';
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

  describe('getClearButton', () => {
    it('should return the clear button', () => {
      const clearButton = getClearButton();
      expect(clearButton.id).toBe('clear-button');
    });
  });

  describe('addGrid', () => {
    it('should add a grid to the row', () => {
      const row = document.createElement('div');
      row.id = 'row-1';
      row.className = 'row';
      const gridSize = 10;

      addGrid(row, 1, gridSize);

      const grid = row.children[0];

      expect(row.children.length).toBe(1);
      expect(grid.id).toBe('row-1-grid-1');
      expect(grid.style.width).toBe(`${gridSize}px`);
      expect(grid.style.height).toBe(`${gridSize}px`);
      expect(grid.className).toBe('grid');
    });

    it('should add a grid to the row with a mouseover event listener that changes grid background color to black and sets opacity to 0.1', () => {
      const row = document.createElement('div');
      row.id = 'row-1';
      row.className = 'row';
      const gridSize = 10;

      addGrid(row, 1, gridSize);

      const grid = row.children[0];

      expect(row.children.length).toBe(1);
      expect(grid.id).toBe('row-1-grid-1');
      expect(grid.style.width).toBe(`${gridSize}px`);
      expect(grid.style.height).toBe(`${gridSize}px`);
      expect(grid.className).toBe('grid');

      grid.dispatchEvent(
        new Event('mouseover', {
          bubbles: true,
          cancelable: true,
        })
      );

      expect(grid.style.backgroundColor).toBe('black');
      expect(grid.style.opacity).toBe('0.1');
    });

    it('should add a grid to the row with a mouseover event listener that increases opacity by 0.1 on each event', () => {
      const row = document.createElement('div');
      row.id = 'row-1';
      row.className = 'row';
      const gridSize = 10;

      addGrid(row, 1, gridSize);

      const grid = row.children[0];

      expect(row.children.length).toBe(1);
      expect(grid.id).toBe('row-1-grid-1');
      expect(grid.style.width).toBe(`${gridSize}px`);
      expect(grid.style.height).toBe(`${gridSize}px`);
      expect(grid.className).toBe('grid');

      grid.dispatchEvent(
        new Event('mouseover', {
          bubbles: true,
          cancelable: true,
        })
      );

      expect(grid.style.backgroundColor).toBe('black');
      expect(grid.style.opacity).toBe('0.1');

      grid.dispatchEvent(
        new Event('mouseover', {
          bubbles: true,
          cancelable: true,
        })
      );

      expect(grid.style.backgroundColor).toBe('black');
      expect(grid.style.opacity).toBe('0.2');
    });
  });

  describe('addRow', () => {
    it('should add a row to the grids container', () => {
      const gridsContainer = getGridsContainer();
      const rowNumber = 1;

      addRow(gridsContainer, rowNumber);

      expect(gridsContainer.children.length).toBe(1);
      expect(gridsContainer.children[0].id).toBe('row-1');
      expect(gridsContainer.children[0].className).toBe(
        'row'
      );
    });
  });

  describe('buildGridsContainer', () => {
    it('should build a grids container with the default number of rows and grids', () => {
      const gridsContainer = getGridsContainer();
      const gridContainerSizeInPixels = 500;
      const expectedGridSizeInPixels =
        gridContainerSizeInPixels / (16 + 16);

      buildGridsContainer(
        gridsContainer,
        gridContainerSizeInPixels
      );

      const firstRow = gridsContainer.children[0];
      const firstGrid = firstRow.children[0];

      expect(gridsContainer.children.length).toBe(16);
      expect(firstRow.id).toBe('row-0');
      expect(firstRow.className).toBe('row');
      expect(firstRow.children.length).toBe(16);
      expect(firstGrid.id).toBe('row-0-grid-0');
      expect(firstGrid.className).toBe('grid');
      expect(firstGrid.style.width).toBe(
        `${expectedGridSizeInPixels}px`
      );
      expect(firstGrid.style.height).toBe(
        `${expectedGridSizeInPixels}px`
      );
    });

    it('should build a grids container with the correct number of rows and grids given a specific number of grids per row and column', () => {
      const gridsContainer = getGridsContainer();
      const gridContainerSizeInPixels = 500;
      const expectedGridSizeInPixels =
        gridContainerSizeInPixels / (32 + 32);

      buildGridsContainer(
        gridsContainer,
        gridContainerSizeInPixels,
        32
      );
      const firstRow = gridsContainer.children[0];
      const firstGrid = firstRow.children[0];

      expect(gridsContainer.children.length).toBe(32);
      expect(firstRow.id).toBe('row-0');
      expect(firstRow.className).toBe('row');

      expect(firstRow.children.length).toBe(32);

      expect(firstGrid.id).toBe('row-0-grid-0');
      expect(firstGrid.className).toBe('grid');

      expect(firstGrid.style.width).toBe(
        `${expectedGridSizeInPixels}px`
      );

      expect(firstGrid.style.height).toBe(
        `${expectedGridSizeInPixels}px`
      );
    });
  });

  describe('clearGridsContainer', () => {
    it('should clear the grids container', () => {
      const gridsContainer = getGridsContainer();
      const gridContainerSizeInPixels = 500;

      buildGridsContainer(
        gridsContainer,
        gridContainerSizeInPixels
      );

      expect(gridsContainer.children.length).toBe(16);

      clearGridsContainer(gridsContainer);

      expect(gridsContainer.children.length).toBe(0);
    });
  });

  describe('getGridSizeFromUser', () => {
    it('should get the grid size from the user when user enters a number', () => {
      const promptSpy = jest.spyOn(window, 'prompt');
      promptSpy.mockImplementation(() => 16);

      const gridSize = getGridSizeFromUser();

      expect(gridSize).toBe(16);

      promptSpy.mockRestore();
    });

    it('should present the user with an error message when user enters a non-number', () => {
      const promptSpy = jest.spyOn(window, 'prompt');
      promptSpy
        .mockImplementationOnce(() => 'a')
        .mockImplementationOnce(() => 16);

      const alertSpy = jest.spyOn(window, 'alert');
      alertSpy.mockImplementation(() => {});

      const gridSize = getGridSizeFromUser();

      expect(gridSize).toBe(16);
      expect(alertSpy).toHaveBeenCalledTimes(1);

      promptSpy.mockRestore();
      alertSpy.mockRestore();
    });

    it('should present the user with an error message when user enters a number less than 1', () => {
      const promptSpy = jest.spyOn(window, 'prompt');
      promptSpy
        .mockImplementationOnce(() => 0)
        .mockImplementationOnce(() => 16);

      const alertSpy = jest.spyOn(window, 'alert');
      alertSpy.mockImplementation(() => {});

      const gridSize = getGridSizeFromUser();

      expect(gridSize).toBe(16);
      expect(alertSpy).toHaveBeenCalledTimes(1);

      promptSpy.mockRestore();
      alertSpy.mockRestore();
    });

    it('should present the user with an error message when user enters a number greater than 100', () => {
      const promptSpy = jest.spyOn(window, 'prompt');
      promptSpy
        .mockImplementationOnce(() => 101)
        .mockImplementationOnce(() => 16);

      const alertSpy = jest.spyOn(window, 'alert');
      alertSpy.mockImplementation(() => {});

      const gridSize = getGridSizeFromUser();

      expect(gridSize).toBe(16);
      expect(alertSpy).toHaveBeenCalledTimes(1);

      promptSpy.mockRestore();
      alertSpy.mockRestore();
    });

    it('should return null when user cancels the prompt', () => {
      const promptSpy = jest.spyOn(window, 'prompt');
      promptSpy.mockImplementation(() => null);

      const gridSize = getGridSizeFromUser();

      expect(gridSize).toBe(null);

      promptSpy.mockRestore();
    });
  });

  describe('after the page loads', () => {
    it('should build a grids container with the default number of rows and grids', () => {
      window.dispatchEvent(new Event('DOMContentLoaded'));

      const gridsContainer = getGridsContainer();
      expect(gridsContainer.children.length).toBe(16);
      expect(gridsContainer.children[0].id).toBe('row-0');
      expect(gridsContainer.children[0].className).toBe(
        'row'
      );
      expect(
        gridsContainer.children[0].children.length
      ).toBe(16);
      expect(
        gridsContainer.children[0].children[0].id
      ).toBe('row-0-grid-0');
      expect(
        gridsContainer.children[0].children[0].className
      ).toBe('grid');
    });

    it('should add a click event listener to the clear button whose callback prompts user for new grid size and resets the grid', () => {
      window.dispatchEvent(new Event('DOMContentLoaded'));
      const promptSpy = jest.spyOn(window, 'prompt');
      promptSpy.mockImplementation(() => 32);

      const clearButton = getClearButton();
      clearButton.click();

      expect(promptSpy).toHaveBeenCalledTimes(1);
    });

    it('should add a click event listener to the clear button whose callback returns early when user cancels the prompt', () => {
      window.dispatchEvent(new Event('DOMContentLoaded'));
      const promptSpy = jest.spyOn(window, 'prompt');
      promptSpy.mockImplementation(() => null);

      const clearButton = getClearButton();
      clearButton.click();

      expect(promptSpy).toHaveBeenCalledTimes(1);
    });
  });
});
