// src/modules/translation.ts
// Provides a simple dictionary-based translation function for basic English to Ukrainian words.

import type { TranslationDictionary } from '../types/translation';

/**
 * A dictionary mapping lower-case English words to their Ukrainian equivalents.
 * Feel free to extend this dictionary with additional terms as needed.
 */
export const dictionary: TranslationDictionary = {
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

/**
 * Translates a string from English to Ukrainian using a provided dictionary. Words not
 * found in the dictionary remain unchanged. Separators (spaces and punctuation) are preserved.
 *
 * @param text - The input string to translate
 * @param dict - A translation dictionary mapping lowercase English words to Ukrainian
 * @returns The translated string
 */
export function translateText(text: string, dict: TranslationDictionary): string {
  return text
    .split(/(\s+|\W+)/)
    .map((token) => {
      const lower = token.toLowerCase();
      return dict[lower] ? dict[lower] : token;
    })
    .join('');
}