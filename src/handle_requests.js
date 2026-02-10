export const handleListBooks = (library) => {
  const response = library.listBooks();
  return { response, status: 200 };
};

export const handleListByCategory = (library, body) => {
  const response = library
    .listByCategory(body.category);
  return { response, status: 200 };
};

export const handleAddBorrowRecord = (library, borrowRecord) => {
  const response = library
    .addBorrowRecord(borrowRecord);

  if (response.success) {
    return { response, status: 200 };
  }
  return { response, status: 401 };
};
