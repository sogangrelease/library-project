import styles from './LayoutWidthConstraint.module.css';

function LayoutWidthConstraint({ children }) {
    return <div className={styles.content}>
        {children}
    </div>
    ;
}

export default LayoutWidthConstraint;