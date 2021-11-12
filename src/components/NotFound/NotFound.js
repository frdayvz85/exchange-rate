import React from 'react'
import { Link } from 'react-router-dom';
import styles from "./styles.module.scss";

const NotFound = () => {
    return (
        <div className={styles.notFound} data-testid="notFound-container">
             <h1 className={styles.notFound404}>
                <span className={styles.notFound4}>4</span>
                <span className={styles.notFound0}>0</span>
                <span className={styles.notFound4}>4</span>
            </h1>
            <h1 className={styles.notFoundText}>
                Sorry, but we dont have so page. Thank you
            </h1>
            <Link to="/" className={styles.backToHome}>Back to Home page</Link>
        </div>
    )
}

export default NotFound
