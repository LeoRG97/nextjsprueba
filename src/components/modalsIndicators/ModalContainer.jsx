import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { hideSubscribeAlert, hidePremiumAlert } from '@/reducers/alert';
import SubscriptionModal from '../subscriptionModal/subscriptionModal';
import PremiumModal from '../premiumModal/premiumModal';

const ModalContainer = () => {
  const alert = useSelector((state) => state.alert);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubscriptionModal = () => {
    dispatch(hideSubscribeAlert());
  };

  const handlePremiumModal = () => {
    dispatch(hidePremiumAlert());
  };

  const { showSubscribe, showPremium, backdrop } = alert;

  useEffect(() => {
    /*
      Este efecto se encarga de cerrar el modal de suscripción o de contenido exclusivo
      cuando el usuario navega a otra pantalla
    */
    router.events.on('routeChangeStart', () => {
      if (showPremium) {
        dispatch(hidePremiumAlert());
      }
      if (showSubscribe) {
        dispatch(hideSubscribeAlert());
      }
    });
    return () => {
      router.events.off('routeChangeStart', () => {});
    };
  }, [router.events, showSubscribe, showPremium]);

  return (
    <>
      <SubscriptionModal
        show={showSubscribe}
        setModal={handleSubscriptionModal}
        backdrop={backdrop}
      />
      <PremiumModal
        show={showPremium}
        setModal={handlePremiumModal}
        backdrop={backdrop}
      />
    </>
  );
};

export default ModalContainer;
