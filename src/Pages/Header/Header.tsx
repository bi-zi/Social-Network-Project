import React from 'react';
import { Wave } from './Components/Wave';
import { ControlPanel } from './Components/ControlPanel';
import { Menu } from './Components/Menu';
import './style.scss';

export const Header: React.FC = () => {
  return (
    <div className="header">
      <div className="header_container">
        <Wave />
        <ControlPanel />
        <Menu />
      </div>
    </div>
  );
};
