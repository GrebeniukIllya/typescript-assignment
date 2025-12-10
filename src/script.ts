// TypeScript code for the blog template
// This script adds scroll effects, a modal window, and dynamically fetches posts
// from JSONPlaceholder, translates some English words to Ukrainian, and
// renders them into the page. All variables are typed to leverage TypeScript's
// static checking.

// Get references to DOM elements and assert their types
const headerElem = document.getElementById('header') as HTMLElement;
const modalElem = document.getElementById('modal') as HTMLElement;
const openModalBtn = document.getElementById('openModalButton') as HTMLButtonElement;
const modalCloseBtn = document.getElementById('modalClose') as HTMLElement;
const postsContainer = document.getElementById('postsContainer') as HTMLElement;

// Apply or remove a CSS class on the header when scrolling
function onScroll(): void {
  if (window.scrollY > 50) {
    headerElem.classList.add('scrolled');
  } else {
    headerElem.classList.remove('scrolled');
  }
}

// Show the modal
function openModal(): void {
  modalElem.style.display = 'block';
}

// Hide the modal
function closeModal(): void {
  modalElem.style.display = 'none';
}

// Basic English → Ukrainian translation using a dictionary
function translateText(text: string, dictionary: { [key: string]: string }): string {
  return text
    .split(/(\s+|\W+)/) // Split by whitespace or non-word characters, preserving separators
    .map((token) => {
      const lower = token.toLowerCase();
      return dictionary[lower] ? dictionary[lower] : token;
    })
    .join('');
}

// Fetch posts from JSONPlaceholder and render them
async function fetchAndRenderPosts(): Promise<void> {
  try {
    const response: Response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=3');
    const posts: Array<{ id: number; title: string; body: string }> = await response.json();

    // Translation dictionary for basic words
    const dictionary: { [key: string]: string } = {
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
      const translatedTitle: string = translateText(post.title, dictionary);
      const translatedBody: string = translateText(post.body, dictionary);

      // Create card
      const card: HTMLDivElement = document.createElement('div');
      card.className = 'w3-card-4 w3-margin w3-white post-card';

      // Image for each post (random placeholder based on post ID)
      const img: HTMLImageElement = document.createElement('img');
      img.src = `https://picsum.photos/seed/${post.id}/800/400`;
      img.alt = 'Зображення для посту';
      card.appendChild(img);

      // Container for text
      const container: HTMLDivElement = document.createElement('div');
      container.className = 'w3-container';
      const h3: HTMLHeadingElement = document.createElement('h3');
      h3.innerHTML = `<b>${translatedTitle}</b>`;
      const p: HTMLParagraphElement = document.createElement('p');
      p.textContent = translatedBody;
      container.appendChild(h3);
      container.appendChild(p);
      card.appendChild(container);

      postsContainer.appendChild(card);
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
}

// Initialize event listeners when the DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('scroll', onScroll);
  openModalBtn.addEventListener('click', openModal);
  modalCloseBtn.addEventListener('click', closeModal);
  // Close modal when clicking outside of it
  window.addEventListener('click', (event: MouseEvent) => {
    if (event.target === modalElem) {
      closeModal();
    }
  });
  fetchAndRenderPosts().catch((err) => console.error(err));
});