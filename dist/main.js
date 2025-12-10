"use strict";
// src/main.ts
// Entry point for the blog application. This file imports the modularised
// functionality and sets up the UI event handlers when the DOM is ready.
Object.defineProperty(exports, "__esModule", { value: true });
const scroll_1 = require("./modules/scroll");
const modal_1 = require("./modules/modal");
const postService_1 = require("./modules/postService");
// Obtain references to the page elements. The `as` assertions tell TypeScript
// about the specific element types so that appropriate properties are exposed.
const headerElem = document.getElementById('header');
const modalElem = document.getElementById('modal');
const openModalBtn = document.getElementById('openModalButton');
const modalCloseBtn = document.getElementById('modalClose');
const postsContainer = document.getElementById('postsContainer');
// Initialise the application once the DOM has fully loaded. This ensures
// that all referenced elements are available for manipulation.
document.addEventListener('DOMContentLoaded', () => {
    (0, scroll_1.initScroll)(headerElem);
    (0, modal_1.initModal)(modalElem, openModalBtn, modalCloseBtn);
    // Fetch and display blog posts
    (0, postService_1.fetchAndRenderPosts)(postsContainer).catch((err) => console.error(err));
});
