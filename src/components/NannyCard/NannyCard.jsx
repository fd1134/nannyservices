import { MapPin, Star, Heart } from "lucide-react";
import css from "./NannyCard.module.css";

const NannyCard = ({ nanny = {} }) => {
  return (
    <div className={css.nannyCard}>
      <div className={css.nannyAvatar}>
        <img
          src="/avatar.png"
          alt={`${nanny.name}'s avatar`}
          className={css.nannyAvatarImage}
          width={96}
          height={96}
        />
        <span className={css.nannyStatus}> </span>
        <span className={css.nannyStatusDot}></span>
      </div>
      <div className={css.nannyInfo}>
        <div className={css.nannyTop}>
          <div className={css.nannyName}>
            <span className={css.jopTitle}>Nanny </span>
            <h3 className={css.nannyNameTitle}>Maria Kovalenko</h3>
          </div>
          <div className={css.nannyService}>
            <div className={css.serviceInfo}>
              <span className={`${css.locationInfo} `}>
                {" "}
                <MapPin size={16} />
                Lviv, Ukraine{" "}
              </span>
              
              <span className={`${css.locationInfo} ${css.line}`}>
                {" "}
                <Star fill="#FFC531" stroke="none" size={16} />
                Rating: 4.5
              </span>
              <span className={`${css.locationInfo} ${css.line}`}>
                Price / 1 hour:<span className={css.price}>15$</span>
              </span>
            </div>
            <div className={css.heartWrapper}>
              <Heart size={26} />
            </div>
          </div>
        </div>
        <div className={css.nannyDetails}>
          <span className={css.nannyDetailsItem}>
            {" "}
            <strong className={`${css.nannyDetailsLabel}`}>Age: </strong> <span className={css.age}>32</span>
          </span>
          <span className={css.nannyDetailsItem}>
            {" "}
            <strong className={css.nannyDetailsLabel}>Experience: </strong> 7
            years
          </span>
          <span className={css.nannyDetailsItem}>
            {" "}
            <strong className={css.nannyDetailsLabel}>Kids Age: </strong> 6
            months to 8 years old
          </span>
          <span className={css.nannyDetailsItem}>
            {" "}
            <strong className={css.nannyDetailsLabel}>Characters: </strong>{" "}
            Compassionate, Knowledgeable, Adaptive, Trustworthy
          </span>
          <span className={css.nannyDetailsItem}>
            {" "}
            <strong className={css.nannyDetailsLabel}>Education: </strong>{" "}
            Master's in Child Psychology, CPR Certified
          </span>
        </div>
        <p className={css.about}>
          I have a passion for teaching and mentoring children. I aim to help
          them grow and learn in a safe and loving environment. I am also a
          trained child psychologist, which helps me in understanding and
          catering to the unique needs of every child.
        </p>
        <a href="#" className={css.nannyButton}>
          Read More
        </a>
      </div>
    </div>
  );
};

export default NannyCard;
