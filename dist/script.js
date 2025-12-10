"use strict";
// TypeScript code to add interactive behaviour to the new W3.CSS‑based template.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Function to handle scroll effect on the top navigation bar
function initScrollEffect() {
    const topBar = document.getElementById('topBar');
    if (!topBar)
        return;
    window.addEventListener('scroll', () => {
        if (window.scrollY > 0) {
            topBar.classList.add('header-scrolled');
        }
        else {
            topBar.classList.remove('header-scrolled');
        }
    });
}
// Functions to open and close the modal dialog
function openModal() {
    const modal = document.getElementById('myModal');
    if (modal) {
        modal.style.display = 'block';
    }
}
function closeModal() {
    const modal = document.getElementById('myModal');
    if (modal) {
        modal.style.display = 'none';
    }
}
// Close the modal if the user clicks outside of the modal content
function initModalOutsideClick() {
    const modal = document.getElementById('myModal');
    if (!modal)
        return;
    window.addEventListener('click', event => {
        if (event.target === modal) {
            closeModal();
        }
    });
}
// Fetch posts from the API, translate them and render to the page
function loadPosts() {
    return __awaiter(this, void 0, void 0, function* () {
        const postsContainer = document.getElementById('postsContainer');
        if (!postsContainer)
            return;
        try {
            const response = yield fetch('https://jsonplaceholder.typicode.com/posts?_limit=3');
            const posts = yield response.json();
            // Simple translation dictionaries for demonstration purposes
            const titleTranslations = {
                'sunt aut facere repellat provident occaecati excepturi optio reprehenderit': 'Сонце або робити, що відштовхує, забезпечує, за винятком опції відшкодування',
                'qui est esse': 'Хто це є',
                'ea molestias quasi exercitationem repellat qui ipsa sit aut': 'Ті незручності майже тренування, що відштовхує, коли вона сама сидить або'
            };
            const bodyTranslations = {
                'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto': 'Це тіло першого поста українською мовою. Тут може бути будь‑який текст, який описує зміст.',
                'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla': 'Це тіло другого поста українською мовою. Короткий приклад перекладу.',
                'et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut': 'Це тіло третього поста українською мовою. Воно демонструє завантаження та відображення даних.'
            };
            postsContainer.innerHTML = '';
            posts.forEach(post => {
                const translatedTitle = titleTranslations[post.title] || post.title;
                const translatedBody = bodyTranslations[post.body] || post.body;
                const card = document.createElement('div');
                card.className = 'post-card w3-animate-bottom';
                card.innerHTML = `
        <h3>${translatedTitle}</h3>
        <p>${translatedBody}</p>
      `;
                postsContainer.appendChild(card);
            });
        }
        catch (error) {
            console.error('Помилка завантаження публікацій:', error);
            postsContainer.innerHTML = '<p>Не вдалося завантажити публікації. Спробуйте пізніше.</p>';
        }
    });
}
// Initialize all interactions when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initScrollEffect();
    initModalOutsideClick();
    loadPosts();
    // Expose functions to global scope for inline HTML handlers
    window.openModal = openModal;
    window.closeModal = closeModal;
});
