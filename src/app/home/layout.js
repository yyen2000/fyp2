import React from 'react';
import styles from '../styles/Layout.module.css';
import SideNav from '../components/layout/sideNav';

const Layout = ({ children }) => {
  return (
    <div className={styles.layoutContainer}>
        <SideNav />
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
