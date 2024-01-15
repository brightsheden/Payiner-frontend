import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Datepicker, Button } from 'flowbite-react';
import BottomNavigation from '../../Components/Tabs';

const DailyCheckinsPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dailyCheckins, setDailyCheckins] = useState([]);

  const daysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getMonthStartDay = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const generateCalendar = () => {
    const startDay = getMonthStartDay(selectedDate);
    const totalDays = daysInMonth(selectedDate);
    const calendar = [];

    // Add empty cells for days before the start of the month
    for (let i = 0; i < startDay; i++) {
      calendar.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= totalDays; day++) {
      calendar.push(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day));
    }

    return calendar;
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const fetchDailyCheckins = async () => {
    try {
      const response = await axios.get('YOUR_API_ENDPOINT', {
        params: {
          // Include any necessary parameters for your API call
          date: selectedDate.toISOString(),
        }, 
        headers: {
          Authorization: `Bearer YOUR_ACCESS_TOKEN`,
        },
      });

      setDailyCheckins(response.data);
    } catch (error) {
      console.error('Error fetching daily check-ins:', error);
    }
  };

  useEffect(() => {
    fetchDailyCheckins();
  }, [selectedDate]); // Fetch check-ins when the selected date changes

  return (
    <div className="container mx-auto my-8">
      <Datepicker value={selectedDate} onChange={handleDateChange} />

      <div className="grid grid-cols-7 gap-4 mt-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
          <div key={index} className="text-center font-bold">
            {day}
          </div>
        ))}

        {generateCalendar().map((day, index) => (
          <div key={index} className="text-center">
            {day && (
              <Button
                onClick={() => console.log(`Clicked on ${day.toLocaleDateString()}`)}
                variant={dailyCheckins.includes(day.toISOString()) ? 'outline-primary' : 'danger'}
              >
                {day.getDate()}
              </Button>
            )}
          </div>
        ))}
      </div>

      <BottomNavigation/>
    </div>
  );
};

export default DailyCheckinsPage;
