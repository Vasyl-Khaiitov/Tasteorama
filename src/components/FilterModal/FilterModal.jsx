import Icon from "../../shared/Icon";
import style from "./FilterModal.module.css";

export default function FilterModal({
  isOpen,
  onClose,
  categories,
  ingredients,
  selectedCategory,
  selectedIngredient,
  handleFilterChange,
  handleReset,
}) {
  if (!isOpen) return null;

  return (
    <div className={style.modalOverlay} onClick={onClose}>
      <div
        className={style.modalContent}
        onClick={(e) => e.stopPropagation()} >
        
        <div className={style.modalHeader}>
          <h3 className={style.title}>Filters</h3>
          <button onClick={onClose} className={style.closeBtn}>
            <Icon name="close" classname={style.closeIcon} />
          </button>
        </div> 
        
        {/* Category */}
        <select
          className={style.select}
          value={selectedCategory}
          onChange={(e) => handleFilterChange("category", e.target.value)}
          required
        >
          <option value="" disabled hidden>
            Category
          </option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* Ingredient */}
        <select
          className={style.select}
          value={selectedIngredient}
          onChange={(e) => handleFilterChange("ingredient", e.target.value)}
          required
        >
          <option value="" disabled hidden>
            Ingredient
          </option>
          {ingredients.map((ing) => (
            <option key={ing._id} value={ing._id}>
              {ing.name}
            </option>
          ))}
        </select>
  
        <button onClick={handleReset} className={style.resetBtn}>Reset filters</button>
        
      
      </div>
    </div>
  );
}
