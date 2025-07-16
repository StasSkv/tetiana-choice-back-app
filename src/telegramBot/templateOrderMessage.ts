import Handlebars from 'handlebars';

const templateString = `
📦 *Замовлення №{{orderNumber}}*

👤 *Клієнт:*
• Ім'я: {{name}}
• Телефон: {{phone}}
• Авторизований: {{formatAuthorization authorization}}

🛒 *Товари:*
{{#each products}}
  {{increment @index}}. {{this.name}} — {{this.quantity}} шт. × {{this.price}} грн ({{this.points}} балів, ціна партнера: {{this.pricePartner}} грн)
{{/each}}

💰 *Підсумки:*
• Загальна сума: {{totalPrice}} грн
• Для партнера: {{totalPriceForPartner}} грн
• Нараховано балів: {{totalPoints}}

💳 *Оплата:* {{formatPaymentMethod paymentMethod}}

🏠 *Одержувач:*
{{#if recipient}}
• Ім'я: {{recipient.fullName}}
• Телефон: {{recipient.phone}}
• Місто: {{recipient.city}}
• Доставка: {{formatDeliveryMethod recipient.deliveryMethod}}
• Відділення: {{recipient.department}}
{{else}}
(немає даних)
{{/if}}

📅 *Дата замовлення:* {{formatDate createdAt}}
`;


Handlebars.registerHelper('increment', function (value, options) {
  return parseInt(value) + 1;
});

Handlebars.registerHelper('formatDate', function (datetime) {
  const date = new Date(datetime);
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();
  const hh = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');
  return `${dd}.${mm}.${yyyy} ${hh}:${min}`;
});

Handlebars.registerHelper('formatDeliveryMethod', function (method) {
  const map = {
    Nova_Poshta: 'Нова Пошта',
    Ukrposhta: 'Укрпошта',
    Self: 'Самовивіз',
  };
  return map[method as keyof typeof map] || 'Невідомо';
});

Handlebars.registerHelper('formatPaymentMethod', function (method) {
  const map = {
    card: 'Картка',
    cash: 'Готівка',
    overpayment: 'Передоплата',
  };
  return map[method as keyof typeof map] || 'Невідомо';
});

Handlebars.registerHelper('formatAuthorization', function (auth) {
  return auth ? 'Так' : 'Ні';
});

export const templateOrderMessage = Handlebars.compile(templateString);
