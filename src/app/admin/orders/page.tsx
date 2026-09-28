"use client";

import React, { useState } from "react";
import { useShop } from "@/context/shop-context";
import { Package } from "lucide-react";
import { toast } from "sonner";

interface AdminOrder {
  _id: string;
  items: {
    name: string;
    quantity: number;
    size: string;
  }[];
  address: {
    name: string;
    street: string;
    city: string;
    state: string;
    country: string;
    phone: string;
  };
  amount: number;
  paymentMethod: string;
  paymentStatus: boolean;
  date: string;
  status: "Order Placed" | "Packing" | "Shipped" | "Out for delivery" | "Delivered";
}

export default function AdminOrdersPage() {
  const { currency } = useShop();

  const [orders, setOrders] = useState<AdminOrder[]>([
    {
      _id: "ord_101",
      items: [
        { name: "Men Tapered Fit Flat-Front Trousers", quantity: 1, size: "M" },
        { name: "Boy Round Neck Pure Cotton T-shirt", quantity: 2, size: "L" },
      ],
      address: {
        name: "Adnan Hasan",
        street: "Gulshan Avenue 12",
        city: "Dhaka",
        state: "Dhaka",
        country: "Bangladesh",
        phone: "+8801700000000",
      },
      amount: 183,
      paymentMethod: "Stripe",
      paymentStatus: true,
      date: "28/09/2026",
      status: "Order Placed",
    },
    {
      _id: "ord_102",
      items: [
        { name: "Women Zip-Front Relaxed Fit Jacket", quantity: 1, size: "S" },
      ],
      address: {
        name: "Sarah Miller",
        street: "742 Evergreen Terrace",
        city: "Springfield",
        state: "Oregon",
        country: "USA",
        phone: "+1 555-0199",
      },
      amount: 78,
      paymentMethod: "COD",
      paymentStatus: false,
      date: "27/09/2026",
      status: "Packing",
    },
  ]);

  const handleStatusChange = (orderId: string, newStatus: any) => {
    setOrders((prev) =>
      prev.map((order) =>
        order._id === orderId ? { ...order, status: newStatus } : order
      )
    );
    toast.success("Order status updated to " + newStatus);
  };

  return (
    <div>
      <p className="mb-4 font-semibold text-lg text-gray-800">Order Page</p>

      <div className="flex flex-col gap-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] md:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-4 items-start border-2 border-gray-200 p-5 md:p-6 my-2 text-xs sm:text-sm text-gray-700 bg-white rounded shadow-xs"
          >
            <div className="p-3 bg-gray-100 rounded flex items-center justify-center w-12 h-12">
              <Package className="w-6 h-6 text-gray-700" />
            </div>

            <div>
              <div className="font-medium text-gray-900">
                {order.items.map((item, i) => (
                  <p key={i}>
                    {item.name} x {item.quantity}{" "}
                    <span className="text-gray-500 font-normal">({item.size})</span>
                  </p>
                ))}
              </div>
              <p className="mt-3 mb-1 font-semibold text-gray-800">{order.address.name}</p>
              <p className="text-gray-500">{order.address.street}, {order.address.city}, {order.address.state}, {order.address.country}</p>
              <p className="text-gray-500">{order.address.phone}</p>
            </div>

            <div>
              <p className="font-medium">Items: {order.items.length}</p>
              <p className="mt-2 text-gray-500">Method: <span className="font-semibold text-gray-700">{order.paymentMethod}</span></p>
              <p className="text-gray-500">Payment: <span className={order.paymentStatus ? "text-green-600 font-medium" : "text-orange-500 font-medium"}>{order.paymentStatus ? "Done" : "Pending"}</span></p>
              <p className="text-gray-500">Date: {order.date}</p>
            </div>

            <p className="text-sm sm:text-[15px] font-semibold text-gray-900">
              {currency}
              {order.amount}
            </p>

            <select
              value={order.status}
              onChange={(e) => handleStatusChange(order._id, e.target.value)}
              className="p-2 font-semibold border rounded bg-white text-xs outline-none cursor-pointer"
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}
