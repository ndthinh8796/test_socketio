import React, { useEffect, useState } from 'react';
import './App.css';

import { authenticate, newOrder, updatedOrder, deletedOrder } from './sockets'
import { publicRequest } from './service'

function App() {
  const [orders, setOrders] = useState([]);
  const [recentLogs, setRecentLogs] = useState([]);

  // const [order, ]
  useEffect(() => {
    authenticate((hey, info) => {
      console.log(info);
    });
    publicRequest('/api/sessions/orders/items/', {
      method: 'GET'
    }).then(res => {
      setOrders(res.data.results);
    })
  }, []);

  useEffect(() => {
    newOrder((order) => {
      setOrders([...orders, ...order.session_order_items]);
      setRecentLogs([...recentLogs, {method: 'New Order Added', item_id: order.id}]);
    });

    updatedOrder((order) => {
      const updatedOrders = orders.map(ord => {
        if (ord.id === order.id) {
          return order;
        }
        return ord;
      })
      setOrders(updatedOrders);
      setRecentLogs([...recentLogs, {method: 'Order Updated', item_id: order.id}]);
    });

    deletedOrder((order) => {
      const updatedOrders = orders.filter(ord => {
        return ord.id !== order.id;
      });
      setOrders(updatedOrders);
      setRecentLogs([...recentLogs, {method: 'Order Deleted', item_id: order.id}]);
    })
  }, [orders, setOrders, recentLogs, setRecentLogs]);


  const abc = () => {
    publicRequest('/api/sessions/1/orders/', {
      method: 'POST',
      data: {
        "session_order_items": [{
          "quantity": 1,
          "recipe_price": 1,
          "note": "khong cay"
        }, {
          "quantity": 3,
          "recipe_price": 6,
          "note": "lam cay"
        }],
        "note": "note"
      }
    }).then(res => console.log(res))
  }
  return (
    <div className="App">
      <div id="content" style={{ overflow: 'scroll', width: "50%", height: "500px", border: "1px solid", textAlign: 'left', lineHeight: 1.5 }}>
        {orders && orders.map(order => (
          <li>{order.id}: {order.status.name}- {order.note}</li>
        ))}
      </div>

      <div id="logs" style={{ width: "50%" }}>
        {recentLogs && recentLogs.map((log) => (
          <li>
            {log.method}: {log.item_id}
          </li>
        ))}
      </div>
      <div id="actions" style={{ width: "50%" }}>
        <label>Create menu orders </label><button onClick={abc}>Create</button>
        <label>Update menu order items status</label>
      </div>
    </div>
  );
}

export default App;
