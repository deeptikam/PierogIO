const { total } = require('../../src/total');
const { subtotal } = require('../../src/subtotal');
const { discounts } = require('../../src/discounts');
const { deliveryFee } = require('../../src/delivery');
const { tax } = require('../../src/tax');
// removed: const { it } = require('vitest');

describe('Order Calculations', () => {
  
  describe('total', () => {
    it('should calculate complete order total', () => {
      const order = {
        items: [
          {
            sku: 'P6-POTATO', // could be any valid SKU (see README.md for examples)
            title: '6-pack Potato',
            kind: 'hot', // could be 'hot' or 'frozen'
            filling: 'potato', // could be 'potato', 'cheese', 'meat', etc.
            qty: 6, // quantity of this item
            unitPriceCents: 699, // price per unit in cents
            addOns: [], // could include 'sour-cream', 'fried-onion', 'bacon-bits'
          }
        ]
      };
      
      const context = {
        profile: { tier: 'guest' }, // could be 'guest', 'regular', or 'vip'
        delivery: {
          zone: 'local', // could be 'local' or 'outer'
          rush: false, // boolean indicating rush delivery
        },
        // coupon is optional and omitted here
      };
      
      const orderTotal = total(order, context);
      expect(orderTotal).toBeGreaterThan(0);
      expect(Number.isInteger(orderTotal)).toBe(true);
    });

    it('tax applied to hot items', () => {
      const order = {
        items: [
          {
            sku: 'P6-POTATO',
            title: '6-pack Potato',
            kind: 'hot',
            filling: 'potato',
            qty: 6,
            unitPriceCents: 699,
            addOns: [],
          }
        ]
      };
      
      const delivery = {
        zone: 'local',
        rush: false,
      };
      
      const taxAmount = tax(order, delivery);
      expect(taxAmount).toBeGreaterThan(0);
      expect(Number.isInteger(taxAmount)).toBe(true);
    });
  });

});
