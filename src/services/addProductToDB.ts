import dotenv from 'dotenv';
dotenv.config();

import { ProductModel } from '../db/models/product.js';
import mongoose from 'mongoose';

const newProduct = {
  name: 'Day Cream AGE CONTROL',
  quantity: 0,
  rating: [],
  imgS: 'day-cream-age-control.png',
  imgL: 'day-cream-age-control.png',
  category: 'white-mandarine',
  brief: 'Омолодження шкіри / Запобігає появі зморшок',
  volume: '50 мл',
  price: '972',
  appointment:
    'Запобігання передчасним віковим змінам шкіри всіх типів і будь-якого віку. Для зрілої шкіри зі зморшками або з недостатньою пружністю.',
  description: [
    {
      name: 'Опис',
      desc: 'Денний засіб для помітного омолодження шкіри обличчя...',
    },
    // ...інші об'єкти description
  ],
  advantages: [
    'Натуральний склад.',
    'Швейцарські anti-age активи з доведеною ефективністю.',
    // ...
  ],
  actions: [
    'Пришвидшує розмноження клітин фібробластів...',
    // ...
  ],
  options: [
    {
      actions: [
        {
          name: 'Ферментована олія Шиунко',
          desc: 'Олія, яка отримується за допомогою унікальних запатентованих технологій...',
        },
        // ...інші дії
      ],
    },
    // ...інші опції
  ],
};

const addProduct = async () => {


  try {
    const product = await new ProductModel(newProduct);
    await product.save();
    console.log('Product saved successfully!');
  } catch (error) {
    console.error('Error saving product:', error);
  } finally {
    mongoose.disconnect();
  }
};

addProduct();
