import { IonSpinner } from '@ionic/react';
import './loadingSpinner.css';

interface LoadingSpinnerProps {
    isOpen: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ isOpen }) => {
    if (!isOpen) return null;
    return (
        <div className="loading-overlay"> 
            <IonSpinner name="crescent" color="secondary" className="loading-spinner"></IonSpinner>
        </div>
    );
}
export default LoadingSpinner;