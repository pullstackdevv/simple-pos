import type { APIRoute } from 'astro';
import { query } from '../../lib/db';

// GET all products
export const GET: APIRoute = async () => {
  try {
    const results = await query('SELECT * FROM products');
    return new Response(JSON.stringify(results), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch products' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// POST create product
export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { name, price, category, available } = data;

    const sql = 'INSERT INTO products (name, price, category, available) VALUES (?, ?, ?, ?)';
    const result = await query(sql, [name, price, category, available || 0]);

    return new Response(JSON.stringify({ success: true, data: result }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to create product' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
