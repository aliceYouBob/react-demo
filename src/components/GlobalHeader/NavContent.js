import React, { PureComponent } from 'react';
import { Menu, Icon } from 'antd';
import { urlToList } from '../_utils/pathTools';
import { getMenuMatches, getFlatMenuKeys } from '../SiderMenu/SiderMenuUtils';
import styles from './index.less';

export default class NavContent extends PureComponent {
  handleSelect = item => {
    if (item) {
      const { onNavSelect } = this.props;
      onNavSelect(item);
    }
  };

  getSelectedMenuKeys = pathname => {
    const { menuData } = this.props;
    const flatMenuKeys = getFlatMenuKeys(menuData);
    return urlToList(pathname).map(itemPath => getMenuMatches(flatMenuKeys, itemPath).pop());
  };

  render() {
    const {
      menuData,
      selectedNavKey,
      location: { pathname },
    } = this.props;
    let selectedKeys = this.getSelectedMenuKeys(pathname);
    if (!selectedNavKey.length && selectedKeys.length) {
      selectedKeys = [selectedKeys[0]];
    } else {
      selectedKeys = selectedNavKey;
    }
    return (
      <Menu
        mode="horizontal"
        selectedKeys={selectedKeys}
        onSelect={this.handleSelect}
        className={styles.topMenu}
      >
        {menuData.map(menu => (
          <Menu.Item key={menu.path}>
            <Icon type={menu.icon} />
            {menu.name}
          </Menu.Item>
        ))}
      </Menu>
    );
  }
}
