// src/modules/scroll.ts
// Handles adding or removing a CSS class on the header when the page is scrolled.

/**
 * Adds a scroll listener to toggle the `scrolled` class on the given header element.
 * When the user scrolls more than 50 pixels from the top, the class is added; otherwise it is removed.
 *
 * @param header - The HTML element representing the header
 */
export function initScroll(header: HTMLElement): void {
  function onScroll(): void {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll);
}