import Navigation from "../../components/Navigation/Navigation";
import css from "./Nannies.module.css";
import FilterDropdown from "../../components/FilterDropdown/FilterDropdown";
import NannyList from "../../components/NannyList/NannyList";

const Nannies = () => {
  return (
    <div className={css.nannies}>
       <Navigation />
      <div className={css.nanniesContainer}>    
        <FilterDropdown />
      <NannyList  />
      </div>
     
    </div>
  );
};

export default Nannies;
    