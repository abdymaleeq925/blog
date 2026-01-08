/**
 * Генерирует table of contents из markdown текста
 * @param {string} markdownText - Markdown текст поста
 * @returns {Array} - Массив объектов с информацией о заголовках
 */
export const generateTableOfContents = (markdownText) => {
  if (!markdownText) return [];
  
  const toc = [];
  const lines = markdownText.split('\n');
  
  lines.forEach((line, index) => {
    // Проверяем заголовки markdown (# ## ### и т.д.)
    const headerMatch = line.match(/^(#{1,6})\s+(.+)$/);
    
    if (headerMatch) {
      const level = headerMatch[1].length; // Уровень заголовка (1-6)
      const title = headerMatch[2].trim();
      
      // Создаем ID для заголовка (убираем спецсимволы, заменяем пробелы на дефисы)
      const id = title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '') // Удаляем спецсимволы
        .replace(/\s+/g, '-') // Заменяем пробелы на дефисы
        .replace(/-+/g, '-') // Убираем множественные дефисы
        .trim();
      
      toc.push({
        id,
        title,
        level,
        lineIndex: index
      });
    }
  });
  
  return toc;
};

/**
 * Скроллит к элементу с указанным ID
 * @param {string} id - ID элемента для скролла
 */
export const scrollToHeading = (id) => {
  const element = document.getElementById(id);
  if (element) {
    const offset = 100; // Отступ сверху для фиксированного header
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

