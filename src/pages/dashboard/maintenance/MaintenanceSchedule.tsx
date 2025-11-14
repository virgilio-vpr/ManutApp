import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { mockServiceOrders } from '../../../lib/mock-data';
import { ServiceOrder } from '../../../types';

const MaintenanceSchedule: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const startDate = new Date(startOfMonth);
  startDate.setDate(startDate.getDate() - startDate.getDay());
  const endDate = new Date(endOfMonth);
  endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));

  const calendarDays = [];
  let date = new Date(startDate);
  while (date <= endDate) {
    calendarDays.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  const getOrdersForDay = (day: Date): ServiceOrder[] => {
    return mockServiceOrders.filter(order => {
      const orderDate = new Date(order.createdAt);
      return orderDate.getFullYear() === day.getFullYear() &&
             orderDate.getMonth() === day.getMonth() &&
             orderDate.getDate() === day.getDate();
    });
  };

  const changeMonth = (amount: number) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + amount);
      return newDate;
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-foreground mb-6">Cronograma de Manutenção</h1>
      <div className="bg-card p-4 rounded-lg border">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground">
            {currentDate.toLocaleString('pt-BR', { month: 'long', year: 'numeric' }).replace(/^\w/, c => c.toUpperCase())}
          </h2>
          <div className="flex items-center gap-2">
            <button onClick={() => changeMonth(-1)} className="p-2 rounded-md hover:bg-accent">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button onClick={() => changeMonth(1)} className="p-2 rounded-md hover:bg-accent">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-px bg-border">
          {daysOfWeek.map(day => (
            <div key={day} className="text-center font-medium text-muted-foreground py-2 bg-card">{day}</div>
          ))}
          {calendarDays.map((day, index) => {
            const isCurrentMonth = day.getMonth() === currentDate.getMonth();
            const isToday = new Date().toDateString() === day.toDateString();
            const orders = getOrdersForDay(day);
            return (
              <div key={index} className={`relative p-2 h-32 flex flex-col bg-card ${isCurrentMonth ? '' : 'bg-muted/50'}`}>
                <time
                  dateTime={day.toISOString()}
                  className={`text-sm font-medium ${isToday ? 'flex items-center justify-center h-6 w-6 rounded-full bg-primary text-primary-foreground' : ''} ${isCurrentMonth ? 'text-foreground' : 'text-muted-foreground'}`}
                >
                  {day.getDate()}
                </time>
                <div className="mt-1 flex-grow overflow-y-auto custom-scrollbar">
                  {orders.map(order => (
                    <div key={order.id} className="text-xs bg-blue-500 text-white rounded px-1 py-0.5 mb-1 truncate" title={order.description}>
                      {order.id}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MaintenanceSchedule;
