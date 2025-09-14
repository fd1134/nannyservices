import { ArrowUpRight, ArrowRight } from "lucide-react";
import css from "./Home.module.css";
import heroImg from "../../assets/hero.png";
import { Link } from "react-router-dom";
import NavHome from "../../components/NavHome/NavHome";
import FilterDropdown from "../../components/FilterDropdown/FilterDropdown";

const Home = () => {
  return (
    <main className={css.container}>
      <NavHome />
      <FilterDropdown />
      <div className={css.hero}>
        <h1 className={css.title}>Make Life Easier for the Family:</h1>
        <p className={css.description}>
          Find Babysitters Online for All Occasions
        </p>

       <Link to="/nannies" className={css.button}>
  Get started
  <span className={css.iconWrapper}>
    <span className={css.iconDefault}><ArrowUpRight size={24} /></span>
    <span className={css.iconHover}><ArrowRight size={24} /></span>
  </span>
</Link>
      </div>

      <div className={css.imageContainer}>
        <img src={heroImg} alt="Nanny Services" className={css.image} />
      </div>
    </main>
  );
};

export default Home;
