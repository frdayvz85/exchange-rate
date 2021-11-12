import React from 'react';
import styles from './styles.module.scss';


const Layout = ({ children }) => {
  return (
    <section className={styles.container} data-testid="layout-container">
      {children}
    </section>
  );
};
export default Layout;