import axios from 'axios';

import { showAlert } from './alerts';

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API
    const session = await axios(`${location.origin}/api/v1/bookings/checkout-session/${tourId}`);

    // 2) Create checkout form + chanre credit card
    await Stripe(
      'pk_test_51MeAZ9JGXxWj3qqhXvpJxmL59A7vpdk7ogQZLwxHJ8w008fbfqYDjyxdQ3nLIOR83Jt754VEWfJDSI8if2bHn31v00vwiGebzn'
    ).redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
