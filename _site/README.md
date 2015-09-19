# carello

- [paypal/JavaScriptButtons](https://github.com/paypal/JavaScriptButtons)
- [HTML Variables for PayPal Payments Standard](https://developer.paypal.com/webapps/developer/docs/classic/paypal-payments-standard/integration-guide/Appx_websitestandard_htmlvariables/)

#### Widget:

- Quantity +
  if `title + item` in localStorage `cart`, add quantity++
  else create item with quantity 1

- Quantity -
  if `title + item` in localStorage `cart`, sub quantity--

- Show Subtotal
  list items of this page, summing total price (or wholesale)

- Add to Cart
  store item and go (wait) to page `cart.html`
  list items, summing total price (or wholesale)

- Shipping & Checkout
  store item and go (wait) to page `checkout.html`
  list items, summing total price (or wholesale) & total weight
  display Subtotal
  required shipping:
    select zone, add shipping as weight
    create button "BUY NOW"


#### localStorage objects:

```json
"cart": {
  [
    {
      "title": "v/a",
      "item": "boston bootleg vol 3",
      "category": "rur",
      "support": "dlp",
      "quantity": "1",
      "price": "20",
      "wholesale": "18"
    },
    {
      ...
    }

  ]

}

shipping: 0
```
