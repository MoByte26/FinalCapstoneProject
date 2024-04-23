// const express = require('express');
// const stripe = require('stripe')('sk_test_51P72eAAmi8K5S7v9fi9yduD7wfLpvgGe7OBfVgvfBhfme0DjDdhiwKOTnp4g99ptZKUaaBDUy5I7oGtbDobnaXoE00fBhL9i0e');
// const app = express();

// const PORT = process.env.PORT || 3000;

// app.use(express.static('public'));
// app.use(express.json());

// app.post('/create-checkout-session', async (req, res) => {
//   try {
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       line_items: [
//       {
//         Product_data: {name:'shirt'}
//       // pass your products via req.body
//       }],
//       mode: 'payment',
//     });

//     res.json({ id: session.id });
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });

// app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));