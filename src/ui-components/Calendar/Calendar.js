import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import styles from './Calendar.module.scss';

const CalendarComponent = () => {
  return (
    <div className={styles.container}>
      <div className="rounded-md bg-[#F2F4F7] p-4">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          headerToolbar={{ start: 'title', end: 'prev,next' }}
          events={[
            {
              title: '',
              start: '2023-06-28',
              end: '2023-07-04',
              backgroundColor: 'blue',
            },
            // Add more events as needed
          ]}
          // themeSystem="standard"
          theme={{
            backgroundColor: '#F2F4F7',
          }}
        />
      </div>
    </div>
  );
};

export default CalendarComponent;
