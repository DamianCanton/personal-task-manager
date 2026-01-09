import { useTasks } from '../../hooks/useTasks';
import Header from '../layout/Header';

export default function DayNavigator() {
  const { currentDate, navigateDay } = useTasks();

  return (
    <Header
      date={currentDate}
      onPrev={() => navigateDay(-1)}
      onNext={() => navigateDay(1)}
    />
  );
}
