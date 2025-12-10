"use strict";
// src/modules/postService.ts
// Handles fetching posts from the JSONPlaceholder API and rendering them to the DOM.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchPosts = fetchPosts;
exports.renderPosts = renderPosts;
exports.fetchAndRenderPosts = fetchAndRenderPosts;
const translation_1 = require("./translation");
/**
 * Fetches a limited number of posts from the JSONPlaceholder API. If an error
 * occurs during the fetch, the promise is rejected.
 *
 * @param limit - The maximum number of posts to fetch
 * @returns A promise resolving to an array of Post objects
 */
function fetchPosts() {
    return __awaiter(this, arguments, void 0, function* (limit = 3) {
        const response = yield fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}`);
        const posts = yield response.json();
        return posts;
    });
}
/**
 * Renders an array of posts into a container element. For each post, this
 * function translates the title and body to Ukrainian using a simple dictionary and
 * creates a card with an image and text content. Images are fetched from
 * picsum.photos using the post id as a seed to produce deterministic pictures.
 *
 * @param posts - The array of posts to render
 * @param container - The DOM element to which the posts will be appended
 */
function renderPosts(posts, container) {
    // Clear any existing content
    container.innerHTML = '';
    posts.forEach((post) => {
        const translatedTitle = (0, translation_1.translateText)(post.title, translation_1.dictionary);
        const translatedBody = (0, translation_1.translateText)(post.body, translation_1.dictionary);
        const card = document.createElement('div');
        card.className = 'w3-card-4 w3-margin w3-white post-card';
        // Image placeholder
        const img = document.createElement('img');
        img.src = `https://picsum.photos/seed/${post.id}/800/400`;
        img.alt = 'Зображення для посту';
        card.appendChild(img);
        // Text container
        const containerDiv = document.createElement('div');
        containerDiv.className = 'w3-container';
        const h3 = document.createElement('h3');
        h3.innerHTML = `<b>${translatedTitle}</b>`;
        const p = document.createElement('p');
        p.textContent = translatedBody;
        containerDiv.appendChild(h3);
        containerDiv.appendChild(p);
        card.appendChild(containerDiv);
        container.appendChild(card);
    });
}
/**
 * Convenience function that fetches posts and renders them into the given
 * container. Any errors are logged to the console.
 *
 * @param container - The element to populate with posts
 * @param limit - The number of posts to fetch (default is 3)
 */
function fetchAndRenderPosts(container_1) {
    return __awaiter(this, arguments, void 0, function* (container, limit = 3) {
        try {
            const posts = yield fetchPosts(limit);
            renderPosts(posts, container);
        }
        catch (error) {
            console.error('Error fetching posts:', error);
        }
    });
}
