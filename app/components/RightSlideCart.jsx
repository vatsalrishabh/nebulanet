'use client';

import { useEffect } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem, updateQuantity, clearCart } from "../../redux/cart/cartSlice";
import { openCart as openCartAction, closeCart, updateNumOfItems } from "../../redux/cart/openCartSlice";  // Import the updateNumOfItems action
import Link from 'next/link';
import Image from 'next/image';

export default function RightSlideCart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  const isCartOpen = useSelector((state) => state.openCart.isOpen);

  // Calculate total price
  const total = cartItems.reduce((sum, product) => sum + product.price * product.quantity, 0);

  // Calculate total number of items
  const totalItems = cartItems.reduce((sum, product) => sum + product.quantity, 0);

  // Dispatch the totalItems to the store whenever the cart changes
  useEffect(() => {
    dispatch(updateNumOfItems(totalItems)); // Update number of items in the cart
  }, [cartItems, dispatch, totalItems]);

  // Handle quantity change
  const handleQuantityChange = (id, action) => {
    const product = cartItems.find((item) => item.id === id);
    if (product) {
      const newQuantity = action === 'increase' ? product.quantity + 1 : product.quantity - 1;
      if (newQuantity > 0) {
        dispatch(updateQuantity({ id, quantity: newQuantity }));
      }
    }
  };

  // Remove product from cart
  const handleRemoveProduct = (id) => {
    dispatch(removeItem(id));
  };

  return (
    <Dialog open={isCartOpen} onClose={() => dispatch(openCartAction(false))} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out bg-pink-50">
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-lg font-medium text-pink-600">Shopping Cart</DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={() => dispatch(closeCart())}
                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                      >
                        <XMarkIcon className="w-6 h-6 text-pink-600" aria-hidden="true" />
                        <span className="sr-only">Close panel</span>
                      </button>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="flow-root">
                      <ul role="list" className="-my-6 divide-y divide-gray-200">
                        {cartItems.map((product,index) => (
                          <li key={index} className="flex py-6">
                            <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <Image
                                alt={product.imageOne}
                                src={product.imageOne}
                                 width={96} // width in pixels
    height={96} // height in pixels
                                className="size-full object-cover"
                              />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>
                                    <a href={product.href}>{product.name}</a>
                                  </h3>
                                  <p className="ml-4">₹{product.price}</p>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                              </div>
                              <div className="flex flex-1 items-end justify-between text-sm">
                                <div className="flex items-center">
                                  <button
                                    type="button"
                                    onClick={() => handleQuantityChange(product.id, 'decrease')}
                                    className="font-medium text-pink-600 hover:text-pink-500"
                                  >
                                    -
                                  </button>
                                  <p className="mx-2 text-gray-500">Qty {product.quantity}</p>
                                  <button
                                    type="button"
                                    onClick={() => handleQuantityChange(product.id, 'increase')}
                                    className="font-medium text-pink-600 hover:text-pink-500"
                                  >
                                    +
                                  </button>
                                </div>

                                <div className="flex">
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveProduct(product.id)}
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>${total.toFixed(2)}</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                  <div className="mt-6">
                    <Link
                      href="/checkout"
                      className="flex items-center justify-center rounded-md border border-transparent bg-pink-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-pink-700"
                    >
                      Checkout
                    </Link>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                      or{' '}
                      <button
                        type="button"
                        onClick={() => dispatch(closeCart())}
                        className="font-medium text-pink-600 hover:text-pink-500"
                      >
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
