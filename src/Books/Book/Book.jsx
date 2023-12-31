import React from 'react';
import '../Books.scss';
import RatingForm from '../RatingForm/RatingForm';
import { useState } from 'react';
import Ratings from '../Ratings/Ratings';

const Book = ({ book, ratings, clubId }) => {
	const objectId = book.id;
	const bookId = book.get('book_id');
	const user = book.get('user');
	const author = book.get('author');
	const title = book.get('title');

	const averageRating = book.get('average_rating');
	const [updateRatings, setUpdateRatings] = useState(false);

	const [ratingFormOpen, setRatingFormOpen] = useState(false);

	const getBookRatings = () => {
		const ratingList = [];
		ratings.forEach(r => {
			if (r.book_id === book.get('book_id')) {
				ratingList.push(r);
			}
		})
		return ratingList;
	}

	return (
		<section>
			<figure className="book-cover" id={bookId}>	
				<div 
					className="book-cover-link"
					onClick={() => setRatingFormOpen(!ratingFormOpen)}
				>
					<span className='selected-by'>
						Selected by <span className='name opaque-background'>{user}</span>
					</span>
					<span 
						className="book-image"
						title="Click to add a rating"
					>
						<img src={`https://books.google.com/books/content/images/frontcover/${bookId}?fife=w1200-h800`}
							alt={`${title} by ${author} (No book cover available)`} />
					</span>
				</div>
			
				<figcaption>
							
					<button
						type="button"
						className="rounded-link add-rating"
						id = {`form-${title}-button`}
						onClick={() => setRatingFormOpen(!ratingFormOpen)}
					>
						Add rating
					</button>

					<div className={`rating-form-wrapper ${ratingFormOpen && 'form-show'}`} id={`form-${title}-button`}>
						<RatingForm
							book={book}
							bookId={bookId}
							clubId={clubId}
							objectId={objectId}
							title={title}
							open={ratingFormOpen}
							setRatingFormOpen={setRatingFormOpen}
							setUpdateRatings={setUpdateRatings}
						/>
					</div>
				</figcaption>
			</figure>

			<div className="book-details-and-ratings">
				<ul>
					<li className='book-title-wrapper'>
						<span className="book-title">{title}</span>
					</li>
					{ author && (
						<li className='book-author-wrapper'>
							<span className="by">by </span>
							<span className="book-author">{author}</span>
						</li>
					)}
				</ul>

				<Ratings
					book={book}
					bookId={bookId}
					clubId={clubId}
					averageRating={averageRating}
					getBookRatings={getBookRatings}
					updateRatings={updateRatings}
					setUpdateRatings={setUpdateRatings}
				/>
			</div>
		</section>
	);
}

export default Book;
