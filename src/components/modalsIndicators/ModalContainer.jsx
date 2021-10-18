import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideSubscribeAlert } from '@/reducers/alert';
import SubscriptionModal from '../subscriptionModal/subscriptionModal';

const ModalContainer = () => {
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  const handleSubscriptionModal = () => {
    dispatch(hideSubscribeAlert());
  };

  const { showSubscribe } = alert;

  return (
    <>
      <SubscriptionModal
        show={showSubscribe}
        setModal={handleSubscriptionModal}
      />
    </>
  );
};

export default ModalContainer;
