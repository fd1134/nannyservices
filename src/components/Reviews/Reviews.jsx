import css from './Reviews.module.css';
const Reviews = () => {
    return <div className={css.reviews}>
        <div className={css.review}>
            <div className={css.reviewHeader}>
                <span className={css.reviewAvatar} width={48} height={48} ></span>
                <div className={css.reviewUserInfo}>
                    <h4 className={css.reviewUserName}>John Doe</h4>
                    <span className={css.reviewStars}>★★★★☆</span>
                </div>
                
            </div>
            <p className={css.reviewText}>Review 1</p>
        </div>
      </div>;
};

export default Reviews;