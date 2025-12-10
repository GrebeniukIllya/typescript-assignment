// src/modules/postService.ts
// Handles fetching posts from the JSONPlaceholder API and rendering them to the DOM.

import type { Post } from '../types/post';
import { translateText, dictionary } from './translation';

/**
 * Fetches a limited number of posts from the JSONPlaceholder API. If an error
 * occurs during the fetch, the promise is rejected.
 *
 * @param limit - The maximum number of posts to fetch
 * @returns A promise resolving to an array of Post objects
 */
export async function fetchPosts(limit: number = 3): Promise<Post[]> {
  const response: Response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}`);
  const posts: Post[] = await response.json();
  return posts;
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
export function renderPosts(posts: Post[], container: HTMLElement): void {
  // Clear any existing content
  container.innerHTML = '';
  posts.forEach((post) => {
    const translatedTitle: string = translateText(post.title, dictionary);
    const translatedBody: string = translateText(post.body, dictionary);
    const card: HTMLDivElement = document.createElement('div');
    card.className = 'w3-card-4 w3-margin w3-white post-card';
    // Image placeholder
    const img: HTMLImageElement = document.createElement('img');
    img.src = `https://picsum.photos/seed/${post.id}/800/400`;
    img.alt = 'Зображення для посту';
    card.appendChild(img);
    // Text container
    const containerDiv: HTMLDivElement = document.createElement('div');
    containerDiv.className = 'w3-container';
    const h3: HTMLHeadingElement = document.createElement('h3');
    h3.innerHTML = `<b>${translatedTitle}</b>`;
    const p: HTMLParagraphElement = document.createElement('p');
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
export async function fetchAndRenderPosts(container: HTMLElement, limit: number = 3): Promise<void> {
  try {
    const posts = await fetchPosts(limit);
    renderPosts(posts, container);
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
}