
import { RepositoryItem } from '../interfaces/Repositoryitem';
import './RepoItem.css';
import { IonItem, IonLabel, IonThumbnail } from '@ionic/react';


const RepoItem: React.FC<{repo: RepositoryItem}> = ({ repo}) => {
    return (
        <IonItem button detail={true}>
            <IonThumbnail slot="start">
                <img src={repo.imageUrl ?? "https://naftic.com/wp-content/uploads/2024/11/github.jpg"} alt={repo.name} />
            </IonThumbnail>
            <IonLabel>
                <h2>{repo.name}</h2>
                <p>{repo.description}</p>
                <p>Propietario: {repo.owner}</p>
                <p>Lenguaje: {repo.language}</p>
            </IonLabel>
        </IonItem>
    );
};

export default RepoItem;