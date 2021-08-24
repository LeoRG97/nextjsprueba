/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useState } from 'react';
import styles from './categorySelector.module.css';

const CategorySelector = React.memo(({
  data, initialSelectedItems, addCategory, deleteCategory, placeholder,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState(initialSelectedItems);
  const [unselectedItems, setUnselectedItems] = useState([]);

  const handleAdd = (newItem) => {
    setSelectedItems((items) => [...items, newItem]);
    setUnselectedItems((items) => items.filter((item) => item !== newItem));
    addCategory(newItem);
  };

  const handleRemove = (removedItem) => {
    setOpen(true);
    setSelectedItems((items) => items.filter((item) => item !== removedItem));
    setUnselectedItems((items) => [...items, removedItem]);
    deleteCategory(removedItem);
  };

  useEffect(() => {
    const diff = data.filter((p) => !selectedItems.includes(p));
    setUnselectedItems(diff);
  }, []);

  return (
    <>
      <div className={`${styles.selectMultiple} mb-2 ${open && styles.open}`}>
        <div>
          <span onClick={() => setOpen(!open)}>
            {selectedItems.length === 0 && placeholder}
          </span>
          <div className={styles.arrow} onClick={() => setOpen(!open)} />
          {selectedItems.map((item) => (
            <a className={`${styles.notShown} ${styles.shown}`}>
              <em>{item.nombre}</em>
              <i onClick={() => handleRemove(item)} />
            </a>
          ))}
        </div>
        <ul>
          {unselectedItems.map((item) => (
            <li className="" onClick={() => handleAdd(item)}>{item.nombre}</li>
          ))}
        </ul>
      </div>
    </>
  );
});

export default CategorySelector;
