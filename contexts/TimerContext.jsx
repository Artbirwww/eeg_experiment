import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";

const TimerContext = createContext();

export const useTimer = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error("useTimer must be used within TimerProvider");
  }
  return context;
};

export const TimerProvider = ({ children, sequence = [] }) => {
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [currentComponentIndex, setCurrentComponentIndex] = useState(-1);
  const [showButton, setShowButton] = useState(true);
  const [componentStates, setComponentStates] = useState({});
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  const startTimer = () => {
    setShowButton(false);
    setElapsedTime(0);
    setIsTimerRunning(true);

    const startTime = Date.now();

    intervalRef.current = setInterval(() => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      setElapsedTime(elapsed);
    }, 2);

    if (sequence.length > 0) {
      showComponent(0);
    }
  };

  const showComponent = (index) => {
    if (index >= sequence.length) {
      console.log("Все компоненты завершены");
      return;
    }

    setCurrentComponentIndex(index);
    const component = sequence[index];

    setComponentStates((prev) => ({
      ...prev,
      [component.id]: true,
    }));

    console.log(
      `Запущен компонент: ${component.id}, duration: ${component.duration}`,
    );

    if (component.duration && component.duration > 0) {
      timeoutRef.current = setTimeout(() => {
        console.log(`Автоматическое завершение: ${component.id}`);
        completeComponent(component.id);
      }, component.duration);
    }
  };

  const completeComponent = (componentId) => {
    const componentIndex = sequence.findIndex(
      (item) => item.id === componentId,
    );
    if (componentIndex !== -1) {
      setComponentStates((prev) => ({
        ...prev,
        [componentId]: false,
      }));

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      console.log(`Компонент завершен: ${componentId}, переход к следующему`);
      showComponent(componentIndex + 1);
    }
  };

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsTimerRunning(false);
    setCurrentComponentIndex(-1);
    setComponentStates({});
    setShowButton(true);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <TimerContext.Provider
      value={{
        isTimerRunning,
        elapsedTime,
        currentComponentIndex,
        componentStates,
        showButton,
        startTimer,
        stopTimer,
        completeComponent,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};
