// src/main.ts
// Entry point for the blog application. This file imports the modularised
// functionality and sets up the UI event handlers when the DOM is ready.

import { initScroll } from './modules/scroll';
import { initModal } from './modules/modal';
import { fetchAndRenderPosts } from './modules/postService';

// Obtain references to the page elements. The `as` assertions tell TypeScript
// about the specific element types so that appropriate properties are exposed.
const headerElem = document.getElementById('header') as HTMLElement;
const modalElem = document.getElementById('modal') as HTMLElement;
const openModalBtn = document.getElementById('openModalButton') as HTMLElement;
const modalCloseBtn = document.getElementById('modalClose') as HTMLElement;
const postsContainer = document.getElementById('postsContainer') as HTMLElement;

// Initialise the application once the DOM has fully loaded. This ensures
// that all referenced elements are available for manipulation.
document.addEventListener('DOMContentLoaded', () => {
  initScroll(headerElem);
  initModal(modalElem, openModalBtn, modalCloseBtn);
  // Fetch and display blog posts
  fetchAndRenderPosts(postsContainer).catch((err) => console.error(err));
});