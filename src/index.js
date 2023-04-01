import {
  DEFAULT_GRID_SIZE,
  GRIDS_CONTAINER_SIZE_IN_PIXELS,
} from './constants.js';

window.addEventListener('DOMContentLoaded', () => {
  const gridContainer = getGridsContainer();
  const clearButton = getClearButton();

  clearButton.addEventListener('click', () => {
    const newGridsPerRowAndColumn = getGridSizeFromUser();

    if (newGridsPerRowAndColumn === null) {
      return;
    }

    clearGridsContainer(gridContainer);

    buildGridsContainer(
      gridContainer,
      GRIDS_CONTAINER_SIZE_IN_PIXELS,
      newGridsPerRowAndColumn
    );
  });

  buildGridsContainer(
    gridContainer,
    GRIDS_CONTAINER_SIZE_IN_PIXELS
  );
});

/**
 * Gets the grid size from the user.
 * @returns {number} The grid size.
 */
function getGridSizeFromUser() {
  let newGridSize;

  do {
    newGridSize = prompt(
      'How many grids per row and column would you like in the new grid?'
    );

    if (newGridSize === null) {
      return null;
    }

    if (isNaN(newGridSize)) {
      alert('Please enter a number.');
    }

    if (newGridSize < 1) {
      alert('Please enter a number greater than 0.');
    }

    if (newGridSize > 100) {
      alert('Please enter a number less than 100.');
    }
  } while (
    isNaN(newGridSize) ||
    newGridSize < 1 ||
    newGridSize > 100
  );

  return parseInt(newGridSize);
}

/**
 * Clears the grids container.
 * @param {HTMLElement} gridsContainer The grids container to clear.
 * @returns {void}
 */
function clearGridsContainer(gridsContainer) {
  gridsContainer.innerHTML = '';
}

/**
 * Builds the grids container.
 * @param {HTMLElement} gridsContainer The grids container.
 * @param {number} gridContainerSizeInPixels The grid container size in pixels.
 * @param {number} gridsPerRowAndColumn The number of grids per row and column.
 * @returns {void}
 */
function buildGridsContainer(
  gridsContainer,
  gridContainerSizeInPixels,
  gridsPerRowAndColumn = DEFAULT_GRID_SIZE
) {
  const totalGrids =
    gridsPerRowAndColumn + gridsPerRowAndColumn;
  const gridSize = gridContainerSizeInPixels / totalGrids;
  const range = [...Array(gridsPerRowAndColumn).keys()];

  for (const num of range) {
    let row = addRow(gridsContainer, num);
    for (const num in range) {
      addGrid(row, num, gridSize);
    }
  }
}

/**
 * Adds a row to the grids container.
 * @param {HTMLElement} gridsContainer The grids container.
 * @param {number} num The row number.
 * @returns {HTMLElement} The row.
 */
function addRow(gridsContainer, num) {
  const row = document.createElement('div');
  row.id = `row-${num}`;
  row.className = 'row';
  gridsContainer.appendChild(row);
  return row;
}

/**
 * Adds a grid to the row.
 * @param {HTMLElement} row The row.
 * @param {number} gridNum The grid number.
 * @param {number} gridSize The grid size.
 * @returns {void}
 */
function addGrid(row, gridNum, gridSize) {
  const grid = document.createElement('div');
  grid.id = `${row.id}-grid-${gridNum}`;
  grid.style.width = `${gridSize}px`;
  grid.style.height = `${gridSize}px`;
  grid.className = 'grid';

  grid.addEventListener('mouseover', () => {
    grid.style.backgroundColor = 'black';
    grid.style.opacity = grid.style.opacity
      ? `${parseFloat(grid.style.opacity) + 0.1}`
      : '0.1';
  });

  row.appendChild(grid);
}

/**
 * Returns the clear button.
 * @returns {HTMLElement} The clear button.
 */
function getClearButton() {
  return document.querySelector('#clear-button');
}

/**
 * Returns the grids container.
 * @returns {HTMLElement} The grids container.
 */
function getGridsContainer() {
  return document.querySelector('#grids-container');
}

export {
  addGrid,
  addRow,
  buildGridsContainer,
  clearGridsContainer,
  getClearButton,
  getGridSizeFromUser,
  getGridsContainer,
};
