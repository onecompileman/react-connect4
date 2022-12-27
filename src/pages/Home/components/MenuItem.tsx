import React from 'react';
import { Link } from 'react-router-dom';

import './MenuItem.scss';

type MenuItemProps = {
    className: string;
    children: any;
    path?: string;
}

function MenuItem(props: MenuItemProps) {
  return (
    <Link to={props.path || ''}>
        <div className={`menu-item ${props.className}`}>
            {props.children}
        </div>
    </Link>
  );
}

export default MenuItem;
