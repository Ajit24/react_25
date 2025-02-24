// Task : Given a Select All checkbox - toggle the children's checkboxes in such a way that
//  when the select all button is clicked, all the boxes are checked. 
// Similarly, when the button is toggled, the checkboxes become unchecked.

import React, { useState } from 'react';
import '../AllCheckboxes/AllCheckboxes.css';

export const list = [
  {
    id: 0,
    name: 'Kingfisher',
  },
  {
    id: 1,
    name: 'Heineken',
  },
  {
    id: 2,
    name: 'Bira',
  },
  {
    id: 3,
    name: 'Budweiser',
  },
  {
    id: 4,
    name: 'Hoegaarden',
  },
  {
    id: 5,
    name: 'Carlsberg',
  },
];

const AllCheckboxes = () => {
  const [checkedItems, setCheckedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = () => {
    if (selectAll) {
      setCheckedItems([]);
    } else {
      setCheckedItems(list.map(item => item.id));
    }
    setSelectAll(!selectAll);
  };

  const handleCheckboxChange = (id) => {
    if (checkedItems.includes(id)) {
      setCheckedItems(checkedItems.filter(item => item !== id));
      setSelectAll(false);
    } else {
      setCheckedItems([...checkedItems, id]);
      if (checkedItems.length + 1 === list.length) {
        setSelectAll(true);
      }
    }
  };

  return (
    <div className="checkbox-container">
      <h2 className="title">Beer Selection</h2>
      <div className="checkbox-list">
        <label className="checkbox-item select-all">
          <input
            type="checkbox"
            checked={selectAll}
            onChange={handleSelectAll}
            className="checkbox-input"
          />
          <span className="checkbox-label">Select All</span>
        </label>
        
        <div className="divider"></div>
        
        {list.map((item) => (
          <label key={item.id} className="checkbox-item">
            <input
              type="checkbox"
              checked={checkedItems.includes(item.id)}
              onChange={() => handleCheckboxChange(item.id)}
              className="checkbox-input"
            />
            <span className="checkbox-label">{item.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default AllCheckboxes;