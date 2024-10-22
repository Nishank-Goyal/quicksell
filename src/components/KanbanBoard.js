import React, { useMemo } from 'react';
import TicketCard from './TicketCard';
import './KanbanBoard.css';
import { ReactComponent as AddIcon } from '../assets/add.svg';
import { ReactComponent as MoreIcon } from '../assets/3 dot menu.svg';
import { ReactComponent as TodoIcon } from '../assets/To-do.svg';
import { ReactComponent as InProgressIcon } from '../assets/in-progress.svg';
import { ReactComponent as DoneIcon } from '../assets/Done.svg';
import { ReactComponent as CancelledIcon } from '../assets/Cancelled.svg';
import { ReactComponent as BacklogIcon } from '../assets/Backlog.svg';
import { ReactComponent as UrgentIcon } from '../assets/SVG - Urgent Priority colour.svg';
import { ReactComponent as HighIcon } from '../assets/Img - High Priority.svg';
import { ReactComponent as MediumIcon } from '../assets/Img - Medium Priority.svg';
import { ReactComponent as LowIcon } from '../assets/Img - Low Priority.svg';
import { ReactComponent as NoPriorityIcon } from '../assets/No-priority.svg';

function KanbanBoard({ tickets, users, grouping, sorting }) {
  const groupedAndSortedTickets = useMemo(() => {
    let groups = {};

    // Group tickets
    if (grouping === 'status') {
      groups = tickets.reduce((acc, ticket) => {
        acc[ticket.status] = [...(acc[ticket.status] || []), ticket];
        return acc;
      }, {});
    } else if (grouping === 'user') {
      groups = tickets.reduce((acc, ticket) => {
        const user = users.find(u => u.id === ticket.userId);
        acc[user.name] = [...(acc[user.name] || []), ticket];
        return acc;
      }, {});
    } else if (grouping === 'priority') {
      const priorityNames = ['No priority', 'Low', 'Medium', 'High', 'Urgent'];
      groups = tickets.reduce((acc, ticket) => {
        acc[priorityNames[ticket.priority]] = [...(acc[priorityNames[ticket.priority]] || []), ticket];
        return acc;
      }, {});
    }

    // Sort tickets within each group
    Object.keys(groups).forEach(key => {
      groups[key].sort((a, b) => {
        if (sorting === 'priority') {
          return b.priority - a.priority;
        } else {
          return a.title.localeCompare(b.title);
        }
      });
    });

    return groups;
  }, [tickets, users, grouping, sorting]);

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

  const getGroupIcon = (group) => {
    if (grouping === 'user') {
      const user = users.find(u => u.name === group);
      const backgroundColor = getColorFromName(user.name);
      return (
        <div className="user-icon" style={{backgroundColor}}>
          {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
        </div>
      );
    } else if (grouping === 'priority') {
      switch (group) {
        case 'Urgent': return <UrgentIcon />;
        case 'High': return <HighIcon />;
        case 'Medium': return <MediumIcon />;
        case 'Low': return <LowIcon />;
        default: return <NoPriorityIcon />;
      }
    } else {
      switch (group.toLowerCase()) {
        case 'todo': return <TodoIcon />;
        case 'in progress': return <InProgressIcon />;
        case 'done': return <DoneIcon />;
        case 'cancelled': return <CancelledIcon />;
        case 'backlog': return <BacklogIcon />;
        default: return null;
      }
    }
  };

  return (
    <div className="kanban-board">
      {Object.entries(groupedAndSortedTickets).map(([group, tickets]) => (
        <div key={group} className="ticket-column">
          <div className="column-header">
            <div className="header-left">
              {getGroupIcon(group)}
              <h2>{group}</h2>
              <span className="ticket-count">{tickets.length}</span>
            </div>
            <div className="header-actions">
              <AddIcon className="action-icon" />
              <MoreIcon className="action-icon" />
            </div>
          </div>
          <div className="ticket-list">
            {tickets.map(ticket => (
              <TicketCard 
                key={ticket.id} 
                ticket={ticket} 
                user={users.find(u => u.id === ticket.userId)}
                showUserIcon={grouping !== 'user'}
                grouping={grouping}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default KanbanBoard;