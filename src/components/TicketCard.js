import React, { useState } from 'react';
import './TicketCard.css';
import { ReactComponent as UrgentIcon } from '../assets/SVG - Urgent Priority colour.svg';
import { ReactComponent as HighIcon } from '../assets/Img - High Priority.svg';
import { ReactComponent as MediumIcon } from '../assets/Img - Medium Priority.svg';
import { ReactComponent as LowIcon } from '../assets/Img - Low Priority.svg';
import { ReactComponent as NoPriorityIcon } from '../assets/No-priority.svg';

function TicketCard({ ticket, user, showUserIcon, grouping }) {
  const [isChecked, setIsChecked] = useState(false);

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 4: return <UrgentIcon />;
      case 3: return <HighIcon />;
      case 2: return <MediumIcon />;
      case 1: return <LowIcon />;
      default: return <NoPriorityIcon />;
    }
  };

  const getColorFromName = (name) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const c = (hash & 0x00FFFFFF)
      .toString(16)
      .toUpperCase();
    return "#" + "00000".substring(0, 6 - c.length) + c;
  };

  const renderTickbox = () => (
    <div 
      className={`tickbox ${isChecked ? 'checked' : ''}`} 
      onClick={() => setIsChecked(!isChecked)}
    >
      {isChecked && (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </div>
  );

  return (
    <div className="ticket-card">
      <div className="ticket-header">
        <span className="ticket-id">{ticket.id}</span>
        {showUserIcon && (
          <div 
            className="user-avatar" 
            style={{backgroundColor: getColorFromName(user.name)}}
          >
            {user.name[0].toUpperCase()}
          </div>
        )}
      </div>
      <div className="ticket-title">
        {(grouping === 'user' || grouping === 'priority') && renderTickbox()}
        <span>{ticket.title}</span>
      </div>
      <div className="ticket-footer">
        {getPriorityIcon(ticket.priority)}
        {ticket.tag.map((tag, index) => (
          <span key={index} className="tag">
            <span className="tag-dot"></span>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default TicketCard;