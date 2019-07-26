import React from 'react';

export interface NavContentProps {
  menuData?: object;
  selectedNavKey?: [string];
  onNavSelect?: ({ key: string }) => void;
}

export default class NavContent extends React.Component<NavContentProps, any> {}
