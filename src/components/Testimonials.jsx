import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { testimonials } from '../site.config.js';

export const Testimonials = () => {
	const [page, setPage] = useState(0);
	const pageCount = Math.ceil(testimonials.length / 2);
	const visibleTestimonials = testimonials.slice(page * 2, page * 2 + 2);

	const showPrevious = () => setPage((currentPage) => Math.max(0, currentPage - 1));
	const showNext = () => setPage((currentPage) => Math.min(pageCount - 1, currentPage + 1));

	return (
		<section id="testimonials" className="testimonials-section" aria-labelledby="testimonials-heading">
			<div className="testimonials-inner">
				<div className="testimonials-intro">
					<div className="testimonials-heading-row">
						<h2 id="testimonials-heading">Trusted By Clients</h2>
						<div className="testimonials-controls" aria-label="Testimonial carousel controls">
							<button
								type="button"
								className="testimonials-arrow testimonials-arrow--previous"
								onClick={showPrevious}
								disabled={page === 0}
								aria-label="Previous testimonials"
							>
								<ChevronLeft size={25} strokeWidth={1.8} aria-hidden="true" />
							</button>
							<button
								type="button"
								className="testimonials-arrow testimonials-arrow--next"
								onClick={showNext}
								disabled={page === pageCount - 1}
								aria-label="Next testimonials"
							>
								<ChevronRight size={25} strokeWidth={1.8} aria-hidden="true" />
							</button>
						</div>
					</div>
				</div>

				<div className="testimonials-grid" key={page}>
					{visibleTestimonials.map((testimonial) => (
						<blockquote key={testimonial.author} className="testimonial-card">
							<Quote className="testimonial-quote-icon" size={43} strokeWidth={1.5} aria-hidden="true" />
							<p className="testimonial-quote">{testimonial.quote}</p>
							<footer className="testimonial-footer">
								<div>
									<cite>{testimonial.author}</cite>
									<span>{testimonial.company}</span>
								</div>
								<strong>{testimonial.impact}</strong>
							</footer>
						</blockquote>
					))}
				</div>
			</div>
		</section>
	);
};

export default Testimonials;
