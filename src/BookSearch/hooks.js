export const fetchGoogleBooks = async (search, setBookResults) => {
	const query = `https://www.googleapis.com/books/v1/volumes?q=${search}&limit=5`;
	fetch(query, {
    method: "GET",
  }).then(async (response) => {
		const books = await response.json();
		setBookResults(books.items);
	});
}
