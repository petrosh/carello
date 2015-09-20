---
---
fillCart = ->
  current = JSON.parse( localStorage.getItem("item") )
  if not current then current = {}
  ul = document.getElementById('cart')
  ul.innerHTML = ''
  subtotal = 0
  for ordine in current
    newLi = document.createElement("tr")
    totalino = ordine.price * ordine.quantity
    newLi.innerHTML = '<td><h3><a href="' + ordine.link + '" title="">' + ordine.item + '</a></h3>Number: ' + ordine.number + '<br>Price: € ' + ordine.price + '<br>Quantity: ' + ordine.quantity + '</td><td class="bis">€ ' + totalino.toFixed(2) + '</td><td class="bis"><a href="javascript:void(0);" class="remover" data-timestamp="' + ordine.timestamp + '">Remove this item</a></td>';
    subtotal += parseFloat( ordine.price ) * parseInt( ordine.quantity )
    ul.appendChild(newLi)

  sub = document.createElement("tr")
  sub.innerHTML = '<td></td><td class="bis"><h3>Subtotal: € <span id="subtotal"></span></h3></td><td></td>'
  ul.appendChild(sub)

  document.getElementById('subtotal').innerHTML = subtotal.toFixed(2)
  removers = document.getElementsByClassName("remover")
  for remover in removers
    remover.addEventListener('click', (e) ->
      timestamp = e.target.getAttribute("data-timestamp")
      updated = []
      for ordine in current
        updated.push(ordine) if ordine.timestamp != timestamp
      localStorage.setItem( 'item', JSON.stringify( updated ) )
      setInterval ->
        window.location = ""
      , 500
      return
    )

bodys = document.getElementsByTagName("body")
document.getElementById("carello").addEventListener('click', (e) ->
  window.location = "{{ site.baseurl }}/"
)

# CHECKOUT PAGE
if bodys[0].className == 'checkout'
  fillCart()
  document.getElementById("zone").addEventListener('change', (e) ->
    zone = document.getElementById("zone").value
    price = parseFloat( document.getElementById("subtotal").textContent )
    switch zone
      when "italy" then shipping = .07
      when "europe" then shipping = .10
      when "overseas" then shipping = .15
      else shipping = 0
    totalone = price + shipping
    document.getElementById("shipping").innerHTML = shipping.toFixed(2)
    document.getElementById("total").innerHTML = totalone.toFixed(2)
    # ADD PAYPAL BUTTON
    current = JSON.parse( localStorage.getItem("item") )
    paypalButton = '<script async src="http://0.0.0.0:4000/carello/paypal-button.min.js?merchant=raveup@tiscali.it"
      data-button="paynow"
      data-upload="1"
      data-type="form"
      data-currency="EUR"
      data-handling_cart="'+shipping+'"'
    for order,k in current by -1
      paypalButton += '
      data-item_name_'+(k+1)+'="'+order.item+'"
      data-amount_'+(k+1)+'="'+order.price+'"
      data-quantity_'+(k+1)+'="'+order.quantity+'"
      data-item_number_'+(k+1)+'="'+order.number+'"'

    paypalButton += '
  ></script>'
    document.getElementById('button').innerHTML = paypalButton
    paypal.button.process(document.getElementById('button'))
    return
  )

# CART PAGE
if bodys[0].className == 'cart'
  fillCart()

# RANDOM GENERATOR IF HOMEPAGE
if bodys[0].className == 'home'
  objects = [
    {
      item: "Tony - Super"
      link: "#0"
      price: "0.08"
      support: "7\""
      wholesale: "0.06"
      number: "rug-001"
    }, {
      item: "Sonic - Boing"
      link: "#1"
      price: "0.12"
      support: "lp"
      wholesale: "0.10"
      number: "rur-099"
    }, {
      item: "Michelle - Lestofant is Nude"
      link: "#2"
      price: "0.20"
      support: "dlp"
      wholesale: "0.18"
      number: "sex-099"
    }, {
      item: "Leslye - Miracle 63"
      link: "#3"
      price: "0.12"
      support: "lp"
      wholesale: "0.10"
      number: "meg-016"
    }, {
      item: "Stoppas - Jaz Matado"
      link: "#4"
      price: "0.08"
      support: "7\""
      wholesale: "0.06"
      number: "rug-777"
    }
  ]
  hash = window.location.hash
  if not hash then extracted = objects[Math.floor(Math.random() * objects.length)] else extracted = objects[parseInt(hash.slice(1, hash.length))]
  for k,v of extracted
    if k == 'link' then document.getElementById( k ).href = v else document.getElementById( k ).innerHTML = v

  document.getElementById("add").addEventListener('click', (e) ->
    document.getElementById("quantity").textContent++
    quantity = Number( document.getElementById("quantity").textContent )
    result = if quantity < 3 then quantity * Number( document.getElementById("price").textContent ) else quantity * Number( document.getElementById("wholesale").textContent )
    document.getElementById("subtotal").innerHTML = result.toFixed(2)
    return
  )
  document.getElementById("sub").addEventListener('click', (e) ->
    quantity = Number( document.getElementById("quantity").textContent )
    if quantity isnt 0
      document.getElementById("quantity").textContent--
      quantity--
      result = if quantity < 3 then quantity * Number( document.getElementById("price").textContent ) else quantity * Number( document.getElementById("wholesale").textContent )
      document.getElementById("subtotal").innerHTML = result.toFixed(2)
      return
  )
  document.getElementById("addcart").addEventListener('click', (e) ->
    quantity = Number( document.getElementById("quantity").textContent )
    if quantity isnt 0
      current = JSON.parse( localStorage.getItem("item") )
      if not current then current = []
      prezzo = if quantity < 3 then document.getElementById("price").textContent else document.getElementById("wholesale").textContent
      item = {
        number: document.getElementById("number").textContent
        timestamp: Date.now().toString()
        link: document.getElementById("link").href
        item: document.getElementById("item").textContent
        price: prezzo
        quantity: quantity
      }
      current.push(item)
      localStorage.setItem( 'item', JSON.stringify( current ) )
      for element in document.getElementsByTagName("button")
        do (element) ->
          element.setAttribute("disabled", "true")
      setInterval ->
        window.location = "cart/"
        return
      , 1000
      return
  )
  return
