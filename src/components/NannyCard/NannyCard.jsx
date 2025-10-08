import { MapPin, Star, Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../../redux/favourites/slice";
import css from "./NannyCard.module.css";

const calculateAge = (birthDateString) => {
  if (!birthDateString) return null;
  const birthDate = new Date(birthDateString);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) age--;
  return age;
};

const NannyCard = ({ nanny = {} }) => {
  const dispatch = useDispatch();

  // ✅ Store key'i 'favourites', slice içindeki array ismi 'favorites'
  const favorites = useSelector((state) => state.favourites.favorites);
  const isFavorite = favorites.includes(nanny.id);

  const handleFavoriteClick = () => {
    dispatch(toggleFavorite(nanny.id));
  };

  return (
    <div className={css.nannyCard}>
      <div className={css.nannyAvatar}>
        <img
          src={nanny.avatar_url || "https://via.placeholder.com/96"}
          alt={`${nanny.name}'s avatar`}
          className={css.nannyAvatarImage}
          width={96}
          height={96}
        />
        <span className={css.nannyStatus}></span>
        <span className={css.nannyStatusDot}></span>
      </div>
      <div className={css.nannyInfo}>
        <div className={css.nannyTop}>
          <div className={css.nannyName}>
            <span className={css.jopTitle}>Nanny </span>
            <h3 className={css.nannyNameTitle}>{nanny.name}</h3>
          </div>
          <div className={css.nannyService}>
            <div className={css.serviceInfo}>
              <span className={`${css.locationInfo}`}>
                <MapPin size={16} />
                {nanny.location || "Lviv, Ukraine"}
              </span>
              <span className={`${css.locationInfo} ${css.line}`}>
                <Star fill="#FFC531" stroke="none" size={16} />
                Rating: {nanny.rating || 4.5}
              </span>
              <span className={`${css.locationInfo} ${css.line}`}>
                Price / 1 hour: <span className={css.price}>{nanny.price_per_hour || 15}$</span>
              </span>
            </div>
            <div className={css.heartWrapper} onClick={handleFavoriteClick}>
              <Heart 
                size={26} 
                color={isFavorite ? "red" : undefined} 
                fill={isFavorite ? "red" : "none"} 
              />
            </div>
          </div>
        </div>

        <div className={css.nannyDetails}>
          <span className={css.nannyDetailsItem}>
            <strong className={`${css.nannyDetailsLabel}`}>Age: </strong>
            <span className={css.age}>{calculateAge(nanny.birthday) || 0}</span>
          </span>
          <span className={css.nannyDetailsItem}>
            <strong className={css.nannyDetailsLabel}>Experience: </strong> {nanny.experience || 0}
          </span>
          <span className={css.nannyDetailsItem}>
            <strong className={css.nannyDetailsLabel}>Kids Age: </strong> {nanny.kids_age || "6 months to 8 years old"}
          </span>
          <span className={css.nannyDetailsItem}>
            <strong className={css.nannyDetailsLabel}>Characters: </strong>
            {nanny.characters?.join(", ") || "Caring, Patient, Energetic"}
          </span>
          <span className={css.nannyDetailsItem}>
            <strong className={css.nannyDetailsLabel}>Education: </strong>
            {nanny.education || "Bachelor's Degree in Early Childhood Education"}
          </span>
        </div>

        <p className={css.about}>
          {nanny.about || "I am a dedicated and loving nanny with over 5 years of experience caring for children of various ages. I prioritize safety, creativity, and fun in all my interactions."}
        </p>

        <a href="#" className={css.nannyButton}>Read More</a>
      </div>
    </div>
  );
};

export default NannyCard;
