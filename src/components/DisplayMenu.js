import React, { useState } from 'react';
import './DisplayMenu.css';
import { ReactComponent as DisplayIcon } from '../assets/Display.svg';
import { ReactComponent as DownArrow } from '../assets/down.svg';

function DisplayMenu({ grouping, sorting, onGroupingChange, onSortingChange }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="display-menu">
      <button onClick={() => setIsOpen(!isOpen)} className="display-button">
        <DisplayIcon className="display-icon" />
        <span>Display</span>
        <DownArrow className={`arrow ${isOpen ? 'up' : 'down'}`} />
      </button>
      {isOpen && (
        <div className="menu-dropdown">
          <div className="menu-item">
            <span>Grouping</span>
            <select
              value={grouping}
              onChange={(e) => onGroupingChange(e.target.value)}
            >
              <option value="status">Status</option>
              <option value="user">User</option>
              <option value="priority">Priority</option>
            </select>
          </div>
          <div className="menu-item">
            <span>Ordering</span>
            <select
              value={sorting}
              onChange={(e) => onSortingChange(e.target.value)}
            >
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}

export default DisplayMenu;