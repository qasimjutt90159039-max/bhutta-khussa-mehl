import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

const STORAGE_KEY = "bkm_cart_items";

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = (product, { size, color, quantity = 1 }) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (i) => i.productId === product._id && i.size === size && i.color === color
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [
        ...prev,
        {
          productId: product._id,
          name: product.name,
          image: product.images?.[0] || "",
          price: product.price,
          size,
          color,
          quantity,
        },
      ];
    });
  };

  const updateQuantity = (productId, size, color, quantity) => {
    setItems((prev) =>
      prev
        .map((i) =>
          i.productId === productId && i.size === size && i.color === color
            ? { ...i, quantity }
            : i
        )
        .filter((i) => i.quantity > 0)
    );
  };

  const removeFromCart = (productId, size, color) => {
    setItems((prev) =>
      prev.filter((i) => !(i.productId === productId && i.size === size && i.color === color))
    );
  };

  const clearCart = () => setItems([]);

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addToCart, updateQuantity, removeFromCart, clearCart, subtotal, itemCount }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
