import React, { useEffect, useState, useRef } from 'react';
import './BookSearch.scss';
import { useSearchParams } from "react-router-dom";
import { fetchGoogleBooks } from './hooks';
import BookResult from './BookResult/BookResult';
import Navbar from '../Navbar/Navbar';

const BookSearch = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const bookSearch = searchParams.get('book_search');
	const [bookResults, setBookResults] = useState([]);
	const activeSearch = useRef(false);

	const noResults = bookSearch !== null && bookResults?.length === 0;

	function formHandler(e) {
		activeSearch.current = true;
		setSearchParams(e.target.value);
	}

	useEffect(() => {
		if (bookSearch) {
			fetchGoogleBooks(bookSearch, setBookResults);
			activeSearch.current = false;
		}
	}, [bookSearch, activeSearch])


	return (
		<main>
			<Navbar />
			<div>
				{ !bookSearch &&
					<>
						<h2>Add a book</h2>
						<p className="tinted-background">Search by title, author, or both.</p>
					</>	
				}
				
				<form id="book_search_form" onSubmit={(e) => formHandler(e)}>
					<input type="text" id="book_search" name="book_search" required />
					<input className="rounded-link solid-link" type="submit" value="Search books" />
				</form>

				{ noResults && (
					<p>
						No results found for {bookSearch}
					</p>
				)}

				{ (bookSearch && bookResults) && (
					<>
						<p className="tinted-background">
							Showing results for { bookSearch }. Now select a book for your club!
						</p>
						<ul id="book-search-results">
							{bookResults.map(book => (
								<BookResult
									key={book.id}
									book={book}
								/>
							)
							)}
						</ul>
					</>
				)}

			</div>
		</main>

	);
}

export default BookSearch;

// <% content_for :title, "Book Search" %>

// <main>
// 	<% if !params[:book_search]  %>
// 		<h2>Find a book</h2>
// 		<p class="tinted-background">Search by title, author, or both.</p>
// 	<% end %>

// 	<form action="/books" method="GET" id="book_search_form">
// 		<input type="text" id="book_search" name="book_search" required="true" minlength="3" maxlength="50" 
// 		value="<%= @search %>" autofocus>
// 		<input class="rounded-link solid-link" type="submit" value="Search books">
// 	</form>

// 	<% if params[:book_search] %>
// 		<p class="tinted-background">
// 			Showing results for '<%= @search %>'. Now select a book for your club!
// 	<% end %>

// 	<%= form_with model: @book, id: 'template' do |f| %>
// 	<% end %>

// 	<ul id="book-search-results"></ul>
// 	<% if @search %>
// 		<script src="https://www.googleapis.com/books/v1/volumes?q=<%= @search %>&callback=googleBooksApiResponse"></script>
// 	<% end %>
// </main>
