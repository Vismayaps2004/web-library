export const handleListBooks = (library) => library.listBooks();

export const handleListByCategory = (library, category) =>
  library.listByCategory(category);

export const handleAddBorrowRecord = (library, borrowRecord) => {
  const response = library.addBorrowRecord(borrowRecord);
  return response;
};
