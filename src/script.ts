interface Post {
  id: number;
  title: string;
  body: string;
}

const openModalBtn = document.getElementById('openModalBtn') as HTMLButtonElement;
const closeModalBtn = document.getElementById('closeModalBtn') as HTMLSpanElement;
const modal = document.getElementById('modal') as HTMLDivElement;

openModalBtn.addEventListener('click', () => {
  modal.classList.add('show');
});

closeModalBtn.addEventListener('click', () => {
  modal.classList.remove('show');
});

// Close modal when clicking outside of it
window.addEventListener('click', (event: MouseEvent) => {
  if (event.target === modal) {
    modal.classList.remove('show');
  }
});

// Change header style on scroll
const header = document.querySelector('header') as HTMLElement;
window.addEventListener('scroll', () => {
  const scrollPosition: number = window.scrollY;
  if (scrollPosition > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Fetch and display posts
const postsContainer = document.getElementById('postsContainer') as HTMLElement;

function translatePost(post: Post): Post {
  const translations: { [key: number]: { title: string; body: string } } = {
    1: {
      title: 'Перша стаття',
      body: 'Це переклад першої статті. Вона містить демонстраційний текст українською мовою.',
    },
    2: {
      title: 'Друга стаття',
      body: 'Це переклад другої статті. Тут ви можете побачити приклад даних українською.',
    },
    3: {
      title: 'Третя стаття',
      body: 'Це переклад третьої статті. Цей текст також написаний українською.',
    },
  };

  if (translations[post.id]) {
    return {
      id: post.id,
      title: translations[post.id].title,
      body: translations[post.id].body,
    };
  }
  return post;
}

async function loadPosts(): Promise<void> {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=3');
    const posts: Post[] = await response.json();
    postsContainer.innerHTML = '';
    posts.forEach((post) => {
      const translated: Post = translatePost(post);
      const postElement: HTMLDivElement = document.createElement('div');
      postElement.className = 'post';
      postElement.innerHTML = `<h3>${translated.title}</h3><p>${translated.body}</p>`;
      postsContainer.appendChild(postElement);
    });
  } catch (error) {
    console.error('Помилка завантаження постів:', error);
    postsContainer.innerHTML = '<p>Не вдалося завантажити дані.</p>';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadPosts();
});
