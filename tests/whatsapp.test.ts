import assert from 'node:assert/strict';
import { test } from 'node:test';

import { business } from '../src/data/business.ts';
import { buildWhatsAppUrl, formatWhatsAppNumber } from '../src/utils/whatsapp.ts';

test('the confirmed business channel uses the normalized number and encoded message', () => {
  const previous = business.whatsapp;
  business.whatsapp = '5511971774720';
  assert.equal(buildWhatsAppUrl('Olá, vim pelo site da Otimiza.'), 'https://wa.me/5511971774720?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Otimiza.');
  assert.equal(formatWhatsAppNumber(), '(11) 97177-4720');
  business.whatsapp = previous;
});

test('a missing number never produces a WhatsApp destination', async () => {
  business.whatsapp = '';
  assert.equal(buildWhatsAppUrl('Olá'), null);
});

test('invalid or incomplete numbers do not create a destination', async () => {
  for (const value of ['', ' ', '11999999999', 'javascript:alert(1)', '5511', '5500000000000']) {
    business.whatsapp = value;
    assert.equal(buildWhatsAppUrl('Olá'), null, value);
  }
});

test('an international Brazilian number keeps accents and symbols in the message', async () => {
  business.whatsapp = '+55 (11) 97177-4720';
  assert.equal(buildWhatsAppUrl('Olá, A&B?'), 'https://wa.me/5511971774720?text=Ol%C3%A1%2C%20A%26B%3F');
  business.whatsapp = '5511971774720';
});
