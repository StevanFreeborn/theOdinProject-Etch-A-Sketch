import { GRIDS_CONTAINER_SIZE_IN_PIXELS } from './constants.js';

window.addEventListener('DOMContentLoaded', () => {
  const gridContainer = getGridsContainer();
  buildGridsContainer(
    gridContainer,
    GRIDS_CONTAINER_SIZE_IN_PIXELS
  );
});

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
  gridsPerRowAndColumn = 16
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
 * Returns the grids container.
 * @returns {HTMLElement} The grids container.
 */
function getGridsContainer() {
  return document.querySelector('#grids-container');
}

export { addGrid, addRow, getGridsContainer };
