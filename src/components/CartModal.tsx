/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { X, ShoppingBag, Trash2, Check, Ticket, Award, CreditCard } from "lucide-react";
import { Course, AppLanguage } from "../types";

interface CartModalProps {
  language: AppLanguage;
  isOpen: boolean;
  onClose: () => void;
  cartItemIds: string[];
  courses: Course[];
  onRemoveFromCart: (courseId: string) => void;
  onCheckout: () => void;
}

export default function CartModal({
  language,
  isOpen,
  onClose,
  cartItemIds,
  courses,
  onRemoveFromCart,
  onCheckout,
}: CartModalProps) {
  
  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [checkoutStep, setCheckoutStep] = useState<"cart" | "payment" | "success">("cart");

  // Payment form states
  const [cardNumber, setCardNumber] = useState("4111 2222 3333 4444");
  const [cardName, setCardName] = useState("SOK PHANITH");
  const [cardExpiry, setCardExpiry] = useState("12/28");

  if (!isOpen) return null;

  // Filter courses in cart
  const cartCourses = courses.filter((c) => cartItemIds.includes(c.id));

  // Compute total
  const subtotal = cartCourses.reduce((sum, c) => sum + c.price, 0);
  const discountAmount = subtotal * (discountPercent / 100);
  const finalTotal = subtotal - discountAmount;

  // Apply promo
  const applyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (code === "UDEMYKHMER" || code === "KHMER2026") {
      setDiscountPercent(50);
      setAppliedPromo(code);
      setPromoCode("");
      alert(language === "km" ? "បញ្ចូលកូដបញ្ចុះតម្លៃ ៥០% រួចរាល់!" : "Coupon applied! Enjoy 50% discount.");
    } else {
      alert(language === "km" ? "កូដបញ្ចុះតម្លៃមិនត្រឹមត្រូវទេ!" : "Invalid promo code!");
    }
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutStep("success");
  };

  const handleSuccessClose = () => {
    onCheckout();
    setCheckoutStep("cart");
    setAppliedPromo(null);
    setDiscountPercent(0);
    onClose();
  };

  const t = {
    title: language === "km" ? "កន្ត្រកទិញទំនិញរបស់អ្នក" : "Shopping Cart",
    empty: language === "km" ? "កន្ត្រករបស់អ្នកមិនទាន់មានវគ្គសិក្សាទេ!" : "Your cart is empty!",
    subtotal: language === "km" ? "តម្លៃសរុប៖" : "Subtotal:",
    discount: language === "km" ? "ការបញ្ចុះតម្លៃ៖" : "Discount:",
    total: language === "km" ? "តម្លៃចុងក្រោយ៖" : "Total:",
    promoLabel: language === "km" ? "កូដបញ្ចុះតម្លៃ" : "Redeem Promo Code",
    promoBtn: language === "km" ? "បញ្ជាក់កូដ" : "Apply",
    payBtn: language === "km" ? "លម្អិតការបង់ប្រាក់" : "Proceed to Payment",
    buySuccess: language === "km" ? "ការជាវទទួលបានជោគជ័យ!" : "Purchase Completed Successfully!",
    successDesc: language === "km" ? "សូមអបអរសាទរ! វគ្គសិក្សាថ្មីរបស់អ្នកត្រូវបានបន្ថែមទៅកាន់ កម្មវិធីការសិក្សារបស់ខ្ញុំ រួចរាល់ហើយ។" : "Congratulations! Your new courses are now available in your active learning space.",
    startStudy: language === "km" ? "ចាប់ផ្តើមរៀនឥឡូវនេះ" : "Start Learning Now",
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" id="cart-modal">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md transform bg-white text-gray-900 shadow-2xl transition-all flex flex-col h-full animate-slide-in">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-100 p-5 shrink-0">
            <h2 className="text-base font-bold text-gray-900 flex items-center space-x-2">
              <ShoppingBag className="h-5 w-5 text-indigo-600" />
              <span>{t.title}</span>
            </h2>
            <button onClick={onClose} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Cart Contents conditional stack */}
          {checkoutStep === "cart" && (
            <div className="flex-1 flex flex-col overflow-y-auto p-5">
              {cartCourses.length > 0 ? (
                <>
                  {/* List items */}
                  <div className="space-y-4 divide-y divide-gray-100 flex-1">
                    {cartCourses.map((c) => (
                      <div key={c.id} className="flex items-center justify-between pt-4 first:pt-0">
                        <div className="flex items-center space-x-3.5 pr-2">
                          <img
                            src={c.thumbnail}
                            alt={c.title}
                            referrerPolicy="no-referrer"
                            className="h-12 w-12 rounded-lg object-cover"
                          />
                          <div>
                            <h4 className="text-xs font-bold text-gray-900 line-clamp-1">{language === "km" && c.titleKh ? c.titleKh : c.title}</h4>
                            <p className="text-[10px] text-gray-400">{c.instructorName}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3 text-right">
                          <span className="text-sm font-extrabold text-slate-950">${c.price}</span>
                          <button
                            onClick={() => onRemoveFromCart(c.id)}
                            className="text-red-400 hover:text-red-500 p-1 rounded-sm"
                            title="Remove"
                            id={`remove-cart-item-${c.id}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Promo Input */}
                  <div className="mt-8 border-t border-gray-100 pt-6">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block mb-2">{t.promoLabel}</label>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="e.g. UDEMYKHMER"
                        className="flex-1 text-xs border border-gray-200 rounded-lg p-2 px-3 outline-none focus:border-indigo-500 uppercase font-bold"
                      />
                      <button
                        onClick={applyPromo}
                        className="h-9 px-4 rounded-lg bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors"
                        id="apply-promo-btn"
                      >
                        {t.promoBtn}
                      </button>
                    </div>
                    {appliedPromo && (
                      <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-sm inline-block mt-2 font-mono">
                        COUPON {appliedPromo} ACTIVE (-50%)
                      </span>
                    )}
                  </div>

                  {/* Prices aggregates */}
                  <div className="mt-6 border-t border-gray-100 pt-6 space-y-2.5">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{t.subtotal}</span>
                      <span className="font-semibold text-gray-700">${subtotal.toFixed(2)}</span>
                    </div>
                    {discountPercent > 0 && (
                      <div className="flex justify-between text-xs text-emerald-600">
                        <span>{t.discount}</span>
                        <span>-${discountAmount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm pt-2 border-t border-dashed border-gray-150">
                      <span className="font-extrabold text-gray-900">{t.total}</span>
                      <span className="text-lg font-black text-slate-900">${finalTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setCheckoutStep("payment")}
                    className="w-full mt-6 h-11 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-sm tracking-wide transition-all shadow-md shadow-indigo-100 flex items-center justify-center space-x-2"
                    id="proc-payment-btn"
                  >
                    <span>{t.payBtn}</span>
                  </button>
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center py-12" id="empty-cart-view">
                  <div className="rounded-full bg-slate-50 p-4 text-gray-400 mb-3">
                    <ShoppingBag className="h-6 w-6" />
                  </div>
                  <p className="text-xs font-semibold text-gray-500">{t.empty}</p>
                </div>
              )}
            </div>
          )}

          {/* Checkout Payment Form step */}
          {checkoutStep === "payment" && (
            <div className="flex-1 flex flex-col overflow-y-auto p-5">
              <div className="mb-4">
                <span className="text-xs text-gray-400 block font-bold uppercase">{language === "km" ? "បញ្ជាក់ការទូទាត់" : "Secure Payment Gateway"}</span>
                <p className="text-[11px] text-gray-400 mt-1 leading-normal">Your transactions are secured with military-grade simulated endpoints.</p>
              </div>

              {/* Styled Mock credit card */}
              <div className="rounded-xl bg-gradient-to-br from-indigo-700 via-indigo-600 to-purple-800 p-5 text-white shadow-lg mb-6 relative overflow-hidden">
                <div className="flex justify-between items-center mb-6">
                  <CreditCard className="h-8 w-8 text-indigo-300" />
                  <span className="text-xs font-bold tracking-widest font-mono">VISA</span>
                </div>
                <div className="space-y-4">
                  <span className="text-base font-bold font-mono tracking-widest block">{cardNumber}</span>
                  <div className="flex justify-between text-[10px] font-medium text-indigo-200">
                    <div>
                      <span className="block uppercase text-[8px] text-indigo-300">Cardholder</span>
                      <span className="font-bold">{cardName}</span>
                    </div>
                    <div>
                      <span className="block uppercase text-[8px] text-indigo-300">Expires</span>
                      <span className="font-bold font-mono">{cardExpiry}</span>
                    </div>
                  </div>
                </div>
                <div className="absolute right-0 bottom-0 translate-x-5 translate-y-5 h-20 w-20 rounded-full bg-white/5" />
              </div>

              {/* Form Input fields */}
              <form onSubmit={handleCheckoutSubmit} className="space-y-4 flex-1">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 block uppercase">Card Number</label>
                  <input
                    type="text"
                    required
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full text-xs font-mono border border-gray-200 rounded-lg p-2.5 outline-none focus:border-indigo-505"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 block uppercase">Expiry</label>
                    <input
                      type="text"
                      required
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full text-xs font-mono border border-gray-200 rounded-lg p-2.5 outline-none focus:border-indigo-505"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 block uppercase">CVV</label>
                    <input
                      type="password"
                      required
                      defaultValue="***"
                      className="w-full text-xs font-mono border border-gray-200 rounded-lg p-2.5 outline-none focus:border-indigo-505"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 block uppercase">Cardholder Name</label>
                  <input
                    type="text"
                    required
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    className="w-full text-xs font-mono border border-gray-200 rounded-lg p-2.5 outline-none focus:border-indigo-505"
                  />
                </div>

                {/* Amount details */}
                <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-xs text-gray-500">{language === "km" ? "ទឹកប្រាក់ត្រូវបង់៖" : "Amount to pay:"}</span>
                  <span className="text-lg font-black text-indigo-600">${finalTotal.toFixed(2)}</span>
                </div>

                <button
                  type="submit"
                  className="w-full mt-6 h-11 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-sm tracking-wide transition-all shadow-md shadow-indigo-100"
                  id="checkout-confirm-btn"
                >
                  {language === "km" ? `ទូទាត់ប្រាក់ $${finalTotal.toFixed(2)}` : `Pay $${finalTotal.toFixed(2)}`}
                </button>
              </form>
            </div>
          )}

          {/* Checkout Success Step */}
          {checkoutStep === "success" && (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6 bg-emerald-50/50" id="success-checkout-view">
              <div className="h-16 w-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4 border border-emerald-200 shadow-md">
                <Check className="h-8 w-8" />
              </div>
              <h3 className="text-base font-bold text-gray-900">{t.buySuccess}</h3>
              <p className="text-xs text-gray-500 leading-relaxed max-w-xs mt-2">{t.successDesc}</p>
              
              <button
                onClick={handleSuccessClose}
                className="w-full mt-8 h-11 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs flex items-center justify-center space-x-2"
                id="success-checkout-closed"
              >
                <span>{t.startStudy}</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
