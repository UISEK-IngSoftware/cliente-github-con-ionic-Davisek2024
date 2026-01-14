import React, { useEffect, useRef, useState } from 'react';
import { RepositoryItem } from '../interfaces/Repositoryitem';
import './RepoItem.css';
import {
  IonItem,
  IonLabel,
  IonThumbnail,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonIcon,
  IonSpinner,
  IonButton
} from '@ionic/react';
import { create, trash, chevronForward } from 'ionicons/icons';

const RepoItem: React.FC<{
  repo: RepositoryItem;
  onEdit?: (r: RepositoryItem) => void;
  onDelete?: (r: RepositoryItem) => void;
  isProcessing?: boolean;
}> = ({ repo, onEdit, onDelete, isProcessing = false }) => {
  const slidingRef = useRef<HTMLIonItemSlidingElement | null>(null);
  const itemRef = useRef<HTMLIonItemElement | null>(null);
  const chevronRef = useRef<HTMLIonButtonElement | null>(null);

  const [isOpen, setIsOpen] = useState(false);

  /* Sync real state from Ionic */
  useEffect(() => {
    const el = slidingRef.current as unknown as HTMLElement | null;
    if (!el) return;

    const onDidOpen = () => setIsOpen(true);
    const onDidClose = () => setIsOpen(false);

    el.addEventListener('ionDidOpen', onDidOpen as EventListener);
    el.addEventListener('ionDidClose', onDidClose as EventListener);

    return () => {
      el.removeEventListener('ionDidOpen', onDidOpen as EventListener);
      el.removeEventListener('ionDidClose', onDidClose as EventListener);
    };
  }, []);

  /* Click ANYWHERE except options → close */
  useEffect(() => {
    const handler = (e: Event) => {
      if (!isOpen) return;

      const target = e.target as Node | null;
      if (!target) return;

      const chevronEl = chevronRef.current as unknown as HTMLElement | null;
      const itemEl = itemRef.current as unknown as HTMLElement | null;
      const optionsEl = slidingRef.current
        ?.querySelector('ion-item-options') as HTMLElement | null;

      // Click on chevron
      if (chevronEl && chevronEl.contains(target)) {
        slidingRef.current?.close?.();
        setIsOpen(false);
        return;
      }

      // Click on edit/delete → do nothing
      if (optionsEl && optionsEl.contains(target)) {
        return;
      }

      // Click on the SAME item (red or green zone)
      if (itemEl && itemEl.contains(target)) {
        slidingRef.current?.close?.();
        setIsOpen(false);
        return;
      }

      // Click outside completely
      slidingRef.current?.close?.();
      setIsOpen(false);
    };

    document.addEventListener('click', handler);
    document.addEventListener('touchstart', handler);

    return () => {
      document.removeEventListener('click', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, [isOpen]);

  /* Chevron toggle */
  const toggleSlide = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    const sliding = slidingRef.current;
    if (!sliding) return;

    if (isOpen) {
      sliding.close?.();
      setIsOpen(false);
    } else {
      sliding.open?.('end');
      setIsOpen(true);
    }
  };

  return (
    <IonItemSliding ref={slidingRef}>
      <IonItem ref={itemRef}>
        <IonThumbnail slot="start">
          <img
            src={repo.imageUrl ?? 'https://naftic.com/wp-content/uploads/2024/11/github.jpg'}
            alt={repo.name}
          />
        </IonThumbnail>

        <IonLabel>
          <h2>{repo.name}</h2>
          <p>{repo.description}</p>
          <p>Propietario: {repo.owner}</p>
          <p>Lenguaje: {repo.language}</p>
        </IonLabel>

        <IonButton
          ref={chevronRef}
          slot="end"
          fill="clear"
          className={`swipe-toggle ${isOpen ? 'open' : ''}`}
          onClick={toggleSlide}
          disabled={isProcessing}
        >
          <IonIcon icon={chevronForward} />
        </IonButton>
      </IonItem>

      <IonItemOptions side="end">
        <IonItemOption
          color="primary"
          disabled={isProcessing}
          onClick={() => {
            slidingRef.current?.close?.();
            onEdit?.(repo);
          }}
        >
          {isProcessing ? <IonSpinner /> : <IonIcon icon={create} slot="icon-only" />}
        </IonItemOption>

        <IonItemOption
          color="danger"
          disabled={isProcessing}
          onClick={() => {
            slidingRef.current?.close?.();
            onDelete?.(repo);
          }}
        >
          {isProcessing ? <IonSpinner /> : <IonIcon icon={trash} slot="icon-only" />}
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default RepoItem;
