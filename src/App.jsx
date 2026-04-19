import React from 'react';
import { TimerProvider } from '../contexts/TimerContext';
import Button from './components/Button/Button';
import Command from './components/Command/Сommand';
import BtnSec from './components/Button/BtnSec/BtnSec';
import Practice from "./Tests/Practice/Practice";
import Test2 from "./Tests/Test2/Test2";
import Test3 from "./Tests/Test3/Test3";
import Plus from './components/Screens/Plus'


function App() {
  const sequence = [
    {
      id: 'calibration_closed',
      duration: 5000
    },
    {
      id: 'calibration_open',
      duration: 5000
    },
    {
      id: 'plus',
      duration: 5000
    },
    {
      id: 'practice_cmd',
      duration: 5000
    },
    {
      id: 'practice',
      duration: null
    },
    {
      id: 'test2_cmd',
      duration: 5000
    },
    {
      id: 'test2',
      duration: null,
    },
    {
      id: 'calibration_closed_2',
      duration: 5000
    },
    {
      id: 'calibration_open_2',
      duration: 5000
    },
    {
      id: 'plus_2',
      duration: 5000
    },
    {
      id: 'test3_cmd',
      duration: 5000
    },
    {
      id: 'test3',
      duration: null,
    },
    {
      id: 'calibration_closed_3',
      duration: 5000
    },
    {
      id: 'calibration_open_3',
      duration: 5000
    },
    {
      id: 'plus_3',
      duration: 5000
    },
  ];

  return (
    <TimerProvider sequence={sequence}>

      <Button />
      <BtnSec />
      
      <Command id="calibration_closed" Text={"Закройте глаза, идёт калибровка с закрытыми глазами. Мы скажем, когда можно открыть глаза."} />
      <Command id="calibration_closed" Text={"Закройте глаза, идёт калибровка с закрытыми глазами. Мы скажем, когда можно открыть глаза."} />
      <Command id="calibration_open" Text={"Откройте глаза, идёт калибровка с открытыми глазами. Смотрите на экран."} />
      <Plus id="plus"></Plus>
      <Command id="practice_cmd" Text={"Выберите то, что вам больше нравится. Выбор осуществляется клавишами F и J. На выбор даётся 10 секунд."} />      
      <Practice />
      <Command id="test2_cmd" Text={"Теперь начинаем эксперимент. Выберите ту деятельность, которая вам больше нравится. Выбор осуществляется клавишами F и J. На выбор даётся 10 секунд. Поехали"} />
      <Test2 />
      <Command id="calibration_closed_2" Text={"Закройте глаза, идёт калибровка с закрытыми глазами. Мы скажем, когда можно открыть глаза."} />
      <Command id="calibration_open_2" Text={"Откройте глаза, идёт калибровка с открытыми глазами. Смотрите на экран."} />
      <Plus id="plus_2"></Plus>

      <Command id="test3_cmd" Text={"Продолжаем эксперимент. Выберите ту деятельность, которая вам больше нравится. Выбор осуществляется клавишами F и J. На выбор даётся 10 секунд. Поехали"} />
      <Test3 />
      <Command id="calibration_closed_3" Text={"Закройте глаза, идёт калибровка с закрытыми глазами. Мы скажем, когда можно открыть глаза."} />
      <Command id="calibration_open_3" Text={"Откройте глаза, идёт калибровка с открытыми глазами. Смотрите на экран."} />
      <Plus id="plus_3"></Plus>


    </TimerProvider>
  );
}

export default App;