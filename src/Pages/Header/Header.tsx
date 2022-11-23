import React from 'react';
import { Wave } from './Components/Wave';
import { ControlPanel } from './Components/ControlPanel';
import { Menu } from './Components/Menu';

import './style.scss';

export const Header: React.FC = () => {

  // я сделал изменения цвета потому что я часто проверяю как работает продакшен версия и бывает такое что я не сразу
  // понимаю на какой версии я нахожусь поэтому сделал явное отличие чтобы не запутаться
  const localHost = window.location.hostname === 'localhost';

  return (
    <div className="header" style={localHost ? { backgroundColor: '#c16a12' } : { backgroundColor: '' }}>
      <div className="header__container">
        <Wave />
        <ControlPanel />
        <Menu />
      </div>
    </div>
  );
};
