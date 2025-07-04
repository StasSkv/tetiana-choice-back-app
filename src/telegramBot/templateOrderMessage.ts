import Handlebars from 'handlebars';

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

const templateString = `
Замовлення №{{orderNumber}}
Ім'я: {{name}}
Телефон: {{phone}}
Авторизований: {{authorization}}
Товари:
{{#each products}}
  {{increment @index}}. {{this.name}} - {{this.quantity}} шт. - {{this.price}} грн.
{{/each}}
Загальна сума: {{totalPrice}} грн.
Метод оплати: {{paymentMethod}}

Одержувач:
{{#if recipient}}
 Ім'я: {{recipient.fullName}}
 Телефон: {{recipient.phone}}
 Місто: {{recipient.city}}
 Служба доставки: {{recipient.deliveryMethod}}
 Відділення: {{recipient.department}}
{{/if}}

Дата замовлення: {{formatDate createdAt}}
`;

export const templateOrderMessage = Handlebars.compile(templateString);