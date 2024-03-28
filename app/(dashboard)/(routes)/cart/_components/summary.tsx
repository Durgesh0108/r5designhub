// function Summary({
//     subTotal,
//     discount,
//     tax,
//     onEnterPromoCode,
//     checkPromoCode
//   }) {
//     const total = subTotal - discount + tax;
  
//     return (
//       <section className="container">
//         <div className="promotion">
//           <label htmlFor="promo-code">Have A Promo Code?</label>
//           <input type="text" onChange={onEnterPromoCode} />
//           <button type="button" onClick={checkPromoCode} />
//         </div>
  
//         <div className="summary">
//           <ul>
//             <li>
//               Subtotal <span>{formatCurrency(subTotal)}</span>
//             </li>
//             {discount > 0 && (
//               <li>
//                 Discount <span>{formatCurrency(discount)}</span>
//               </li>
//             )}
//             <li>
//               Tax <span>{formatCurrency(tax)}</span>
//             </li>
//             <li className="total">
//               Total <span>{formatCurrency(total)}</span>
//             </li>
//           </ul>
//         </div>
  
//         <div className="checkout">
//           <button type="button">Check Out</button>
//         </div>
//       </section>
//     );
//   }