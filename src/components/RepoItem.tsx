
import './RepoItem.css';
import { IonItem, IonLabel, IonThumbnail } from '@ionic/react';


interface RepoProps {
    name : string;
    imageUrl : string;
}
const RepoItem: React.FC<RepoProps> = ({ name, imageUrl }) => {
    return (
        <IonItem button detail={true}>
            <IonThumbnail slot="start">
                <img src={imageUrl} alt={name} />
            </IonThumbnail>
            <IonLabel>{name}</IonLabel>
        </IonItem>
    );
};

export default RepoItem;