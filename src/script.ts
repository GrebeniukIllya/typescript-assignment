interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

// Toggle mobile navigation
function toggleMobileNav(): void {
    const mobileNav = document.getElementById('mobileNav') as HTMLElement;
    if (mobileNav.classList.contains('w3-show')) {
        mobileNav.classList.remove('w3-show');
    } else {
        mobileNav.classList.add('w3-show');
    }
}

// Change navbar style on scroll
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar') as HTMLElement;
    if (window.scrollY > 0) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Translation dictionary for posts (by id)
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

function translatePost(post: Post): Post {
    const translated = translations[post.id];
    if (translated) {
        return { ...post, title: translated.title, body: translated.body };
    }
    return post;
}

async function fetchAndRenderPosts(): Promise<void> {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=3');
        const posts: Post[] = await response.json();
        const container = document.getElementById('postsContainer') as HTMLElement;
        container.innerHTML = '';
        posts.forEach((post) => {
            const translated: Post = translatePost(post);
            const card = document.createElement('div');
            card.className = 'post-card';
            card.innerHTML = `<h3>${translated.title}</h3><p>${translated.body}</p>`;
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Помилка завантаження постів:', error);
        const container = document.getElementById('postsContainer') as HTMLElement;
        container.innerHTML = '<p>Не вдалося завантажити дані.</p>';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchAndRenderPosts();
});
