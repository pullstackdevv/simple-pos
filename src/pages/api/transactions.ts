import type { APIRoute } from 'astro';
import { query } from '../../lib/db';

// GET all transactions
export const GET: APIRoute = async () => {
  try {
    const results = await query('SELECT * FROM transactions ORDER BY created_at DESC');
    return new Response(JSON.stringify(results), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch transactions' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// POST create transaction
export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { customer_name, items, subtotal, tax, total, payment_method } = data;

    // Insert transaction
    const transactionSql = `
      INSERT INTO transactions (customer_name, subtotal, tax, total, payment_method, created_at)
      VALUES (?, ?, ?, ?, ?, NOW())
    `;
    const transactionResult = await query(transactionSql, [
      customer_name,
      subtotal,
      tax,
      total,
      payment_method,
    ]);

    // Insert transaction items
    if (items && Array.isArray(items)) {
      for (const item of items) {
        const itemSql = `
          INSERT INTO transaction_items (transaction_id, product_id, quantity, price)
          VALUES (?, ?, ?, ?)
        `;
        await query(itemSql, [transactionResult.insertId, item.product_id, item.quantity, item.price]);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        transaction_id: transactionResult.insertId,
        message: 'Transaction created successfully',
      }),
      {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Transaction error:', error);
    return new Response(JSON.stringify({ error: 'Failed to create transaction' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
