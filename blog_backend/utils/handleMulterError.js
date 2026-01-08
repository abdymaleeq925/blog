// utils/handleMulterError.js
export const handleMulterError = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          message: 'Файл слишком большой. Максимальный размер — 5 МБ.',
        });
      }
      return res.status(400).json({ message: err.message });
    }
  
    if (err) {
      return res.status(400).json({ message: err.message });
    }
  
    next();
  };