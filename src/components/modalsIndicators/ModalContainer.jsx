import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideSubscribeAlert, hidePremiumAlert } from '@/reducers/alert';
import SubscriptionModal from '../subscriptionModal/subscriptionModal';
import PremiumModal from '../premiumModal/premiumModal';

const ModalContainer = () => {
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  const handleSubscriptionModal = () => {
    dispatch(hideSubscribeAlert());
  };

  const handlePremiumModal = () => {
    dispatch(hidePremiumAlert());
  };

  const { showSubscribe, showPremium } = alert;

  return (
    <>
      <SubscriptionModal
        show={showSubscribe}
        setModal={handleSubscriptionModal}
      />
      <PremiumModal
        show={showPremium}
        setModal={handlePremiumModal}
      />
    </>
  );
};

export default ModalContainer;
