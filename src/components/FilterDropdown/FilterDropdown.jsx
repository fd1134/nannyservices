import { ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./FilterDropdown.module.css";
import { setFilter } from "../../redux/nannies/slice"; 

const FilterDropdown = () => {
  const dispatch = useDispatch();
  const currentFilter = useSelector((state) => state.nannies.filter); 
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const options = [
    "A to Z",
    "Z to A",
    "Less than 10$",
    "Greater than 10$",
    "Popular",
    "Not popular",
    "Show all",
  ];

  const handleSelect = (option) => {
    dispatch(setFilter(option)); 
    setIsOpen(false);
  };

 
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.wrapper} ref={dropdownRef}>
      <p className={styles.label}>Filters</p>

      <div className={styles.dropdown}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={styles.selected}
        >
          {currentFilter}
          <span className={styles.arrow}><ChevronDown /></span>
        </button>

        {isOpen && (
          <ul className={styles.menu}>
            {options.map((option, index) => (
              <li key={index}>
                <button
                  onClick={() => handleSelect(option)}
                  className={`${styles.option} ${
                    currentFilter === option ? styles.selectedOption : ""
                  }`}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FilterDropdown;
