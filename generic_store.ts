// generic_store.ts
//
// Розробка базових компонентів інтернет‑магазину з використанням generic типів у TypeScript.
//
// У цьому файлі реалізовано типи товарів (базовий товар і спеціалізовані категорії),
// функції для пошуку та фільтрації товарів, а також обробку кошика. Всі функції
// використовують generics для забезпечення типобезпечності, що дозволяє легко
// працювати з різними видами товарів.

// Базовий тип для будь‑якого товару. Містить ідентифікатор, назву, ціну та
// необов’язковий опис. Ви можете розширити цей тип додатковими полями за потреби.
export type BaseProduct = {
  id: number;
  name: string;
  price: number;
  description?: string;
};

// Специфічний тип для електроніки. Містить базові поля та додаткові
// характеристики, притаманні електронним товарам, такі як гарантія та бренд.
export type Electronics = BaseProduct & {
  category: 'electronics';
  brand: string;
  warrantyMonths: number;
};

// Специфічний тип для одягу. Крім базових властивостей, додаються розмір та матеріал.
export type Clothing = BaseProduct & {
  category: 'clothing';
  size: string;
  material: string;
};

// Специфічний тип для книг. Містить автора та кількість сторінок.
export type Book = BaseProduct & {
  category: 'book';
  author: string;
  pages: number;
};

// Generic функція для знаходження товару за ідентифікатором.
// Приймає масив товарів та ID, повертаючи знайдений товар або undefined, якщо
// товар не знайдено.
export const findProduct = <T extends BaseProduct>(products: T[], id: number): T | undefined => {
  // Перевіряємо коректність вхідних даних
  if (!Array.isArray(products)) throw new Error('Products must be an array');
  return products.find((product) => product.id === id);
};

// Generic функція для фільтрації товарів за максимальною ціною.
// Повертає масив товарів, ціна яких не перевищує maxPrice.
export const filterByPrice = <T extends BaseProduct>(products: T[], maxPrice: number): T[] => {
  if (!Array.isArray(products)) throw new Error('Products must be an array');
  if (typeof maxPrice !== 'number' || maxPrice < 0) throw new Error('maxPrice must be a non‑negative number');
  return products.filter((product) => product.price <= maxPrice);
};

// Тип елемента кошика. Використовує generic тип T, щоб зберігати будь‑який
// тип товару з обмеженням BaseProduct.
export type CartItem<T extends BaseProduct> = {
  product: T;
  quantity: number;
};

// Додає товар до кошика. Якщо товар вже є у кошику, збільшує кількість.
// Повертає новий масив кошика з оновленнями.
export const addToCart = <T extends BaseProduct>(
  cart: CartItem<T>[],
  product: T,
  quantity: number
): CartItem<T>[] => {
  if (quantity <= 0) throw new Error('Quantity must be greater than zero');
  // Копіюємо масив, щоб уникнути небажаних мутацій
  const newCart = [...cart];
  const existingItemIndex = newCart.findIndex((item) => item.product.id === product.id);
  if (existingItemIndex >= 0) {
    // Збільшуємо кількість існуючого товару
    newCart[existingItemIndex].quantity += quantity;
  } else {
    // Додаємо новий товар до кошика
    newCart.push({ product, quantity });
  }
  return newCart;
};

// Обчислює загальну вартість кошика, сумуючи ціну кожного товару,
// помножену на його кількість.
export const calculateTotal = <T extends BaseProduct>(cart: CartItem<T>[]): number => {
  return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
};

// ---- Приклад використання ----

// Тестові дані для електроніки
const electronicsProducts: Electronics[] = [
  {
    id: 1,
    name: 'Смартфон',
    price: 10000,
    category: 'electronics',
    brand: 'BrandX',
    warrantyMonths: 24,
    description: 'Сучасний смартфон з великим екраном'
  },
  {
    id: 2,
    name: 'Ноутбук',
    price: 25000,
    category: 'electronics',
    brand: 'BrandY',
    warrantyMonths: 12
  }
];

// Тестові дані для одягу
const clothingProducts: Clothing[] = [
  {
    id: 3,
    name: 'Футболка',
    price: 500,
    category: 'clothing',
    size: 'L',
    material: 'Cotton',
    description: 'Зручна футболка з бавовни'
  },
  {
    id: 4,
    name: 'Штани',
    price: 1200,
    category: 'clothing',
    size: 'M',
    material: 'Denim'
  }
];

// Тестові дані для книг
const bookProducts: Book[] = [
  {
    id: 5,
    name: 'Книга з програмування',
    price: 300,
    category: 'book',
    author: 'Джон Доу',
    pages: 350,
    description: 'Підручник з TypeScript'
  },
  {
    id: 6,
    name: 'Роман',
    price: 200,
    category: 'book',
    author: 'Джейн Сміт',
    pages: 280
  }
];

// Приклади використання функцій

// Знаходимо товар за ID
const foundPhone = findProduct(electronicsProducts, 1);
const foundShirt = findProduct(clothingProducts, 3);
const foundBook = findProduct(bookProducts, 5);
// Фільтрація за ціною
const cheapElectronics = filterByPrice(electronicsProducts, 15000);

// Робота з кошиком
let cart: CartItem<BaseProduct>[] = [];
if (foundPhone) cart = addToCart(cart, foundPhone, 1);
if (foundShirt) cart = addToCart(cart, foundShirt, 2);
if (foundBook) cart = addToCart(cart, foundBook, 1);

const totalCost = calculateTotal(cart);

// Вивід результатів у консоль для демонстрації роботи функцій
console.log('Найдені товари:', { foundPhone, foundShirt, foundBook });
console.log('Електроніка дешевша за 15000:', cheapElectronics);
console.log('Кошик:', cart);
console.log('Загальна вартість:', totalCost);