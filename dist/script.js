"use strict";
// TypeScript code for the blog template
// This script adds scroll effects, a modal window, and dynamically fetches posts
// from JSONPlaceholder, translates some English words to Ukrainian, and
// renders them into the page. All variables are typed to leverage TypeScript's
// static checking.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Get references to DOM elements and assert their types
const headerElem = document.getElementById('header');
const modalElem = document.getElementById('modal');
const openModalBtn = document.getElementById('openModalButton');
const modalCloseBtn = document.getElementById('modalClose');
const postsContainer = document.getElementById('postsContainer');
// Apply or remove a CSS class on the header when scrolling
function onScroll() {
    if (window.scrollY > 50) {
        headerElem.classList.add('scrolled');
    }
    else {
        headerElem.classList.remove('scrolled');
    }
}
// Show the modal
function openModal() {
    modalElem.style.display = 'block';
}
// Hide the modal
function closeModal() {
    modalElem.style.display = 'none';
}
// Basic English → Ukrainian translation using a dictionary
function translateText(text, dictionary) {
    return text
        .split(/(\s+|\W+)/) // Split by whitespace or non-word characters, preserving separators
        .map((token) => {
        const lower = token.toLowerCase();
        return dictionary[lower] ? dictionary[lower] : token;
    })
        .join('');
}
// Fetch posts from JSONPlaceholder and render them
function fetchAndRenderPosts() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('https://jsonplaceholder.typicode.com/posts?_limit=3');
            const posts = yield response.json();
            // Translation dictionary for basic words
            const dictionary = {
                sunt: 'є',
                aut: 'або',
                facere: 'робити',
                repellat: 'відштовхувати',
                provident: 'передбачливий',
                occaecati: 'прихований',
                excepturi: 'виняток',
                optio: 'опція',
                reprehenderit: 'відповідальність',
                qui: 'хто',
                quia: 'тому що',
                suscipit: 'приймає',
                nam: 'назва',
                voluptate: 'задоволення',
                pariatur: 'участь',
                vero: 'правда',
                nostrum: 'наш',
                et: 'і',
                omnis: 'кожен',
                iste: 'цей',
                nisi: 'якщо не',
                nihil: 'нічого'
            };
            // Clear any existing posts
            postsContainer.innerHTML = '';
            posts.forEach((post) => {
                const translatedTitle = translateText(post.title, dictionary);
                const translatedBody = translateText(post.body, dictionary);
                // Create card
                const card = document.createElement('div');
                card.className = 'w3-card-4 w3-margin w3-white post-card';
                // Image for each post (random placeholder based on post ID)
                const img = document.createElement('img');
                img.src = `https://picsum.photos/seed/${post.id}/800/400`;
                img.alt = 'Зображення для посту';
                card.appendChild(img);
                // Container for text
                const container = document.createElement('div');
                container.className = 'w3-container';
                const h3 = document.createElement('h3');
                h3.innerHTML = `<b>${translatedTitle}</b>`;
                const p = document.createElement('p');
                p.textContent = translatedBody;
                container.appendChild(h3);
                container.appendChild(p);
                card.appendChild(container);
                postsContainer.appendChild(card);
            });
        }
        catch (error) {
            console.error('Error fetching posts:', error);
        }
    });
}
// Initialize event listeners when the DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('scroll', onScroll);
    openModalBtn.addEventListener('click', openModal);
    modalCloseBtn.addEventListener('click', closeModal);
    // Close modal when clicking outside of it
    window.addEventListener('click', (event) => {
        if (event.target === modalElem) {
            closeModal();
        }
    });
    fetchAndRenderPosts().catch((err) => console.error(err));
});
