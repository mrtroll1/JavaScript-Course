import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {isWeekend} from '../js-scripts/utils/dates.js';

export function getDeliveryOption(deliveryOptionId) {
  let deliveryOption;
  deliveryOptions.forEach((option) => {
    if (option.id == deliveryOptionId) {
      deliveryOption = option;
    }
  })

  return deliveryOption || deliveryOptions[0];
}

export function calculateDeliveryDate(deliveryOption) {
  const today = dayjs();
  let remainingDaysToAdd = deliveryOption.deliveryDays;
  let daysAdded = 1;
  while (remainingDaysToAdd > 0) {
    if (!isWeekend(today.add(daysAdded, 'days'))) {
      remainingDaysToAdd -= 1;
    }
    daysAdded += 1;
  }

  const deliveryDate = today.add(
    daysAdded,
    'days'
  );
  const dateString = deliveryDate.format('dddd, MMMM D');
  return dateString;
}


export const deliveryOptions = [{
  id: '1',
  deliveryDays: 7,
  priceCents: 0
}, {
  id: '2',
  deliveryDays: 3,
  priceCents: 499
}, {
  id: '3',
  deliveryDays: 1,
  priceCents: 999
}];