(function() {
  var bodys, extracted, fillCart, hash, k, objects, v;

  fillCart = function() {
    var current, newLi, ordine, remover, removers, sub, subtotal, ul, _i, _j, _len, _len1, _results;
    current = JSON.parse(localStorage.getItem("item"));
    ul = document.getElementById('cart');
    ul.innerHTML = '';
    subtotal = 0;
    for (_i = 0, _len = current.length; _i < _len; _i++) {
      ordine = current[_i];
      newLi = document.createElement("tr");
      newLi.innerHTML = '<td><h3><a href="' + ordine.link + '" title="">' + ordine.item + '</a></h3>Number: ' + ordine.number + '<br>Price: €' + ordine.price + '<br>Quantity: ' + ordine.quantity + '</td><td class="bis">€' + ordine.price * ordine.quantity + '</td><td class="bis"><a href="javascript:void(0);" class="remover" data-timestamp="' + ordine.timestamp + '">Remove this item</a></td>';
      subtotal += parseInt(ordine.price * ordine.quantity);
      ul.appendChild(newLi);
    }
    sub = document.createElement("tr");
    sub.innerHTML = '<td></td><td class="bis"><h3>Subtotal: €<span id="subtotal"></span></h3></td><td></td>';
    ul.appendChild(sub);
    document.getElementById('subtotal').innerHTML = subtotal;
    removers = document.getElementsByClassName("remover");
    _results = [];
    for (_j = 0, _len1 = removers.length; _j < _len1; _j++) {
      remover = removers[_j];
      _results.push(remover.addEventListener('click', function(e) {
        var timestamp, updated, _k, _len2;
        timestamp = e.target.getAttribute("data-timestamp");
        updated = [];
        for (_k = 0, _len2 = current.length; _k < _len2; _k++) {
          ordine = current[_k];
          if (ordine.timestamp !== timestamp) {
            updated.push(ordine);
          }
        }
        localStorage.setItem('item', JSON.stringify(updated));
        setInterval(function() {
          return window.location = "";
        }, 500);
      }));
    }
    return _results;
  };

  bodys = document.getElementsByTagName("body");

  document.getElementById("carello").addEventListener('click', function(e) {
    return window.location = "/carello.js/";
  });

  if (bodys[0].className === 'checkout') {
    fillCart();
    document.getElementById("zone").addEventListener('change', function(e) {
      var current, k, order, paypalButton, price, shipping, zone, _i;
      zone = document.getElementById("zone").value;
      price = parseInt(document.getElementById("subtotal").textContent);
      switch (zone) {
        case "italy":
          shipping = 7;
          break;
        case "europe":
          shipping = 10;
          break;
        case "overseas":
          shipping = 15;
          break;
        default:
          shipping = 0;
      }
      document.getElementById("shipping").innerHTML = shipping;
      document.getElementById("total").innerHTML = price + shipping;
      current = JSON.parse(localStorage.getItem("item"));
      paypalButton = '<script async src="http://0.0.0.0:4000/carello/paypal-button.min.js?merchant=raveup@tiscali.it" data-button="paynow" data-upload="1" data-type="form" data-currency="EUR" data-handling_cart="' + shipping + '"';
      for (k = _i = current.length - 1; _i >= 0; k = _i += -1) {
        order = current[k];
        paypalButton += 'data-item_name_' + (k + 1) + '="' + order.item + '" data-amount_' + (k + 1) + '="' + order.price + '" data-quantity_' + (k + 1) + '="' + order.quantity + '" data-item_number_' + (k + 1) + '="' + order.number + '"';
      }
      paypalButton += '></script>';
      document.getElementById('button').innerHTML = paypalButton;
      paypal.button.process(document.getElementById('button'));
    });
  }

  if (bodys[0].className === 'cart') {
    fillCart();
  }

  if (bodys[0].className === 'home') {
    objects = [
      {
        item: "Tony - Super",
        link: "#0",
        price: "8",
        support: "7\"",
        wholesale: "6",
        number: "rug-001"
      }, {
        item: "Sonic - Boing",
        link: "#1",
        price: "12",
        support: "lp",
        wholesale: "10",
        number: "rur-099"
      }, {
        item: "Michelle - Lestofant is Nude",
        link: "#2",
        price: "20",
        support: "dlp",
        wholesale: "18",
        number: "sex-099"
      }, {
        item: "Leslye - Miracle 63",
        link: "#3",
        price: "12",
        support: "lp",
        wholesale: "10",
        number: "meg-016"
      }, {
        item: "Stoppas - Jaz Matado",
        link: "#4",
        price: "8",
        support: "7\"",
        wholesale: "6",
        number: "rug-777"
      }
    ];
    hash = window.location.hash;
    if (!hash) {
      extracted = objects[Math.floor(Math.random() * objects.length)];
    } else {
      extracted = objects[parseInt(hash.slice(1, hash.length))];
    }
    for (k in extracted) {
      v = extracted[k];
      if (k === 'link') {
        document.getElementById(k).href = v;
      } else {
        document.getElementById(k).innerHTML = v;
      }
    }
    document.getElementById("add").addEventListener('click', function(e) {
      var quantity;
      document.getElementById("quantity").textContent++;
      quantity = document.getElementById("quantity").textContent;
      document.getElementById("subtotal").innerHTML = quantity < 3 ? document.getElementById("quantity").textContent * document.getElementById("price").textContent : document.getElementById("quantity").textContent * document.getElementById("wholesale").textContent;
    });
    document.getElementById("sub").addEventListener('click', function(e) {
      var quantity;
      quantity = document.getElementById("quantity").textContent;
      if (quantity !== "0") {
        document.getElementById("quantity").textContent--;
        quantity--;
        document.getElementById("subtotal").innerHTML = quantity < 3 ? document.getElementById("quantity").textContent * document.getElementById("price").textContent : document.getElementById("quantity").textContent * document.getElementById("wholesale").textContent;
      }
    });
    document.getElementById("addcart").addEventListener('click', function(e) {
      var current, element, item, prezzo, quantity, _fn, _i, _len, _ref;
      quantity = document.getElementById("quantity").textContent;
      if (quantity !== "0") {
        current = JSON.parse(localStorage.getItem("item"));
        prezzo = quantity < 3 ? document.getElementById("price").textContent : document.getElementById("wholesale").textContent;
        item = {
          number: document.getElementById("number").textContent,
          timestamp: Date.now().toString(),
          link: document.getElementById("link").href,
          item: document.getElementById("item").textContent,
          price: prezzo,
          quantity: quantity
        };
        current.push(item);
        localStorage.setItem('item', JSON.stringify(current));
        _ref = document.getElementsByTagName("button");
        _fn = function(element) {
          return element.setAttribute("disabled", "true");
        };
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          element = _ref[_i];
          _fn(element);
        }
        setInterval(function() {
          window.location = "cart/";
        }, 1000);
      }
    });
    return;
  }

}).call(this);
