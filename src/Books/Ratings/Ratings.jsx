import React, { useEffect, useState } from 'react';
import { getRatingsForBook } from '../hooks';
import { getAverageRating, setAverageRating } from '../RatingForm/hooks';
import './Ratings.scss';

const Ratings = ({ book, bookId, clubId, averageRating, getBookRatings, updateRatings, setUpdateRatings }) => {

	const [bookRatings, setBookRatings] = useState(getBookRatings());

	useEffect(() => {
		async function getRatings() {
			try {
				const ratingsResult = await getRatingsForBook(bookId, clubId);
				setBookRatings(ratingsResult);
			} catch (err) {
				console.log('error getting ratings:', err);
			}
		};
		if (updateRatings) {
			getRatings();
			setUpdateRatings(false);
		}
	}, [updateRatings, setUpdateRatings, bookId, clubId]);

	useEffect(() => {
		async function updateAverageRating() {
			try {
				const newAverageRating = await getAverageRating(bookId, clubId);
				setAverageRating(book, newAverageRating);
			} catch (err) {
				console.log('error getting average rating:', err);
			}
		};
		if (averageRating === null) {
			updateAverageRating();
		}
	}, [averageRating, book, bookId, clubId]);

	return (
		<ul className="ratings">
		{ bookRatings?.length === 0 && (
			<li><em>No ratings yet</em></li>
		)}
		{ bookRatings?.map((rating, i) => (
			<li 
				key={i}
				className="rating"
			>
				<p className="name opaque-background">{ rating.name }</p>:
				<span className={`rating-number rating-${Math.floor(rating.rating)}`}>
					{ rating.rating }
				</span>
				{ rating.notes && (
					<>
						&nbsp;💬
						<span className="rating-notes">
							{ rating.notes }
						</span>
					</>
				)}
			</li>
		))}
		{ bookRatings?.length > 0 && (
			<li className="average-rating">
				<div className="average-rating-text">Average rating:</div>
				<p className={`rating-number average-rating-number rating-${Math.floor(averageRating)}`}>
						{averageRating?.toFixed(2)}
				</p>
			</li>
		)}

		{/* // <li>
		// 	<div className="search-links book-search-links">
		// 		<a className="rounded-link fixed-width-link" href="https://www.amazon.com/s?k=<%= book.title %>+<%= book.author %>
		// 			&ref=as_li_tl?ie=UTF8&tag=bookbros03-20&camp=15121&creative=330641&linkCode=as2&creativeASIN=1405206276"
		// 		target="_blank">
		// 			<img className="icon" src="/assets/amazon_icon.png" alt=""> 
		// 			<span className="text-after-icon">Amazon search</span>
		// 		</a>
		// 		<a className="rounded-link fixed-width-link" href="https://books.google.ca/books?id=<%= book.book %>"
		// 		target="_blank">
		// 			<img className="icon" src="/assets/google_icon.png" alt=""> 
		// 			<span className="text-after-icon">Google search</span>
		// 		</a>
		// 		<a className="rounded-link fixed-width-link" href="https://www.torontopubliclibrary.ca/search.jsp?Ntt=<%= book.title %>+<%= book.author %>" target="_blank">
		// 			<img className="icon library" src="/assets/library_icon.svg" alt=""> 
		// 			<span className="text-after-icon">Library search</span>
		// 		</a>
		// 	</div>
		// </li> */}
		
	</ul>
	)
}

export default Ratings;
