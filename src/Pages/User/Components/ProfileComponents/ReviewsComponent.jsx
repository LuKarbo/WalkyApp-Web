import { FiStar } from "react-icons/fi";
import { format } from "date-fns";

const ReviewsComponent = ({ reviews }) => (
    <div className="bg-foreground-userProfile p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-xl font-heading mb-4 text-background">Reviews</h2>
        {reviews.length === 0 ? (
            <p className="text-accent dark:text-muted">No reviews yet.</p>
        ) : (
            reviews.map((review, index) => (
                <div key={index} className="border-b pb-4 mb-4">
                    <h3 className="font-semibold text-background">{review.tripName}</h3>
                    <div className="flex items-center mb-2">
                        {[...Array(review.rating)].map((_, i) => (
                            <FiStar key={i} className="text-yellow-red fill-current" />
                        ))}
                    </div>
                    <p className="text-accent dark:text-muted mb-1">{review.text}</p>
                    <p className="text-sm text-accent dark:text-muted">
                        {format(new Date(review.date), "MMMM dd, yyyy")}
                    </p>
                </div>
            ))
        )}
    </div>
);

export default ReviewsComponent;
