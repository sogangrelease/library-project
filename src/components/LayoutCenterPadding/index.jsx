import styles from './LayoutCenterPadding.module.css';

function LayoutCenterPadding({ children }) {
    return <div className={styles.content}>
        {children}
    </div>
    ;
}

export default LayoutCenterPadding;