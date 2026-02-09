export const createBookCatalog = () => [];

export const addBook = (bookCatalog, bookDetails) => {
  bookCatalog.push(bookDetails);
  return { success: true };
};
