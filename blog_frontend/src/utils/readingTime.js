/**
 * Вычисляет время чтения поста в минутах
 * @param {string} text - Текст поста (может быть markdown)
 * @returns {number} - Время чтения в минутах (минимум 1 минута)
 */
export const calculateReadingTime = (text) => {
  if (!text) return 1;
  
  // Удаляем markdown синтаксис для более точного подсчета
  const plainText = text
    .replace(/```[\s\S]*?```/g, '') // Удаляем блоки кода
    .replace(/`[^`]*`/g, '') // Удаляем inline код
    .replace(/\[([^\]]*)\]\([^\)]*\)/g, '$1') // Удаляем ссылки, оставляем текст
    .replace(/#{1,6}\s/g, '') // Удаляем заголовки
    .replace(/\*\*([^*]*)\*\*/g, '$1') // Удаляем жирный текст
    .replace(/\*([^*]*)\*/g, '$1') // Удаляем курсив
    .replace(/!\[([^\]]*)\]\([^\)]*\)/g, '') // Удаляем изображения
    .replace(/\n+/g, ' ') // Заменяем переносы строк на пробелы
    .trim();
  
  // Средняя скорость чтения: 200-250 слов в минуту
  // Используем 200 для более консервативной оценки
  const wordsPerMinute = 200;
  const wordCount = plainText.split(/\s+/).filter(word => word.length > 0).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  
  return Math.max(1, readingTime); // Минимум 1 минута
};

