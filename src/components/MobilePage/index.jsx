import styles from './MobilePage.module.css';
import MobileHeader from '@/components/MobileHeader';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import releaseLogo from '@/assets/release-black-small.webp';

function MobilePage({ children }) {

    const [isOpen, setIsOpen] = useState(false);

    const handlersOpen = useSwipeable({
        onSwipedLeft: () => setIsOpen(true),
        trackMouse: true
    });

    const handlersClose = useSwipeable({
        onSwipedRight: () => setIsOpen(false),
        trackMouse: true
    });

    return (
        <div className={styles.page}>
            <MobileHeader />
            <div className={styles.pageOutline}>
                <Link to="/" className={styles.logoButton}>
                    <img src={releaseLogo} alt="Release logo" className={styles.releaseLogo} />
                </Link>
                <div className={styles.container}>
                    {children}
                </div>
                <div {...handlersOpen} className={styles.sidebarOpenHandler} />

                {isOpen && (
                    <div onClick={() => setIsOpen(false)} className={styles.backdrop} />
                )}
                <aside {...handlersClose} className={styles.sidebar} style={{ transform: isOpen ? 'translateX(0)' : 'translateX(100%)' }}>

                </aside>
            </div>
        </div>
    );
}

export default MobilePage;