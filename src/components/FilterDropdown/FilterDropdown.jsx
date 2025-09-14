import { ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import styles from "./FilterDropdown.module.css";

const FilterDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("A to Z");
  const dropdownRef = useRef(null);

  const options = [
    { label: "A to Z", disabled: false },
    { label: "Z to A", disabled: false },
    { label: "Less than 10$", disabled: false },
    { label: "Greater than 10$", disabled: false },
    { label: "Popular", disabled: false },
    { label: "Not popular", disabled: false },
    { label: "Show all", disabled: false },
  ];

  const handleSelect = (option) => {
    if (!option.disabled) {
      setSelected(option.label);
      setIsOpen(false);
    }
  };

  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.wrapper} ref={dropdownRef}>
      <p className={styles.label}>Filters</p>

      <div className={styles.dropdown}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={styles.selected}
        >
          {selected}
          <span className={styles.arrow}><ChevronDown /></span>
        </button>

        {isOpen && (
          <div className={styles.menu}>
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelect(option)}
                disabled={option.disabled}
                className={`${styles.option} ${
                  option.disabled ? styles.disabled : ""
                }
                 ${selected === option.label ? styles.selectedOption : ""}`}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterDropdown;
