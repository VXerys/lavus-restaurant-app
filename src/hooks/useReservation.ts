import { useState } from 'react';

interface UseReservationReturn {
  selectedDate: Date;
  selectedTime: Date;
  peopleCount: number;
  setSelectedDate: (date: Date) => void;
  handleMonthChange: (monthOffset: number) => void;
  handlePeriodChange: (period: 'AM' | 'PM') => void;
  handleHourChange: (hour: number) => void;
  handleMinuteChange: (minute: number) => void;
  incrementPeople: () => void;
  decrementPeople: () => void;
  handleReservation: () => void;
  monthName: string;
}

export const useReservation = (): UseReservationReturn => {
  const today = new Date();

  // State for selected date and time
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [selectedTime, setSelectedTime] = useState<Date>(() => {
    const time = new Date();
    time.setHours(9, 28, 0, 0);
    return time;
  });
  const [peopleCount, setPeopleCount] = useState(2);

  // Get month name
  const monthName = selectedDate.toLocaleString('en-US', { month: 'long' });

  const handleMonthChange = (monthOffset: number) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(selectedDate.getMonth() + monthOffset);
    setSelectedDate(newDate);
  };

  const handlePeriodChange = (period: 'AM' | 'PM') => {
    const newTime = new Date(selectedTime);
    const currentHour = newTime.getHours() % 12 || 12;

    if (period === 'AM') {
      newTime.setHours(currentHour === 12 ? 0 : currentHour);
    } else {
      newTime.setHours(currentHour === 12 ? 12 : currentHour + 12);
    }

    setSelectedTime(newTime);
  };

  const handleHourChange = (hour: number) => {
    const newTime = new Date(selectedTime);
    const isPM = newTime.getHours() >= 12;

    if (isPM) {
      newTime.setHours(hour === 12 ? 12 : hour + 12);
    } else {
      newTime.setHours(hour === 12 ? 0 : hour);
    }

    setSelectedTime(newTime);
  };

  const handleMinuteChange = (minute: number) => {
    const newTime = new Date(selectedTime);
    newTime.setMinutes(minute);
    setSelectedTime(newTime);
  };

  const incrementPeople = () => {
    if (peopleCount < 8) {
      setPeopleCount(peopleCount + 1);
    }
  };

  const decrementPeople = () => {
    if (peopleCount > 0) {
      setPeopleCount(peopleCount - 1);
    }
  };

  const handleReservation = () => {
    const reservationData = {
      date: selectedDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      time: selectedTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }),
      people: peopleCount,
    };

    console.log('Reservation Details:', reservationData);
    // TODO: Submit to backend API
  };

  return {
    selectedDate,
    selectedTime,
    peopleCount,
    setSelectedDate,
    handleMonthChange,
    handlePeriodChange,
    handleHourChange,
    handleMinuteChange,
    incrementPeople,
    decrementPeople,
    handleReservation,
    monthName,
  };
};
