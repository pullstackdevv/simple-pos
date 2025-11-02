import type { APIRoute } from 'astro';
import { query } from '../../../lib/db';

// GET product by ID
export const GET: APIRoute = async ({ params }) => {
  try {
    const { id } = params;
    const results = await query('SELECT * FROM products WHERE id = ?', [id]);

    if (!results || (Array.isArray(results) && results.length === 0)) {
      return new Response(JSON.stringify({ error: 'Product not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify(results[0]), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch product' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// PUT update product
export const PUT: APIRoute = async ({ params, request }) => {
  try {
    const { id } = params;
    const data = await request.json();
    const { name, price, category, available } = data;

    const sql = 'UPDATE products SET name = ?, price = ?, category = ?, available = ? WHERE id = ?';
    await query(sql, [name, price, category, available, id]);

    return new Response(JSON.stringify({ success: true, message: 'Product updated' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to update product' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// DELETE product
export const DELETE: APIRoute = async ({ params }) => {
  try {
    const { id } = params;
    await query('DELETE FROM products WHERE id = ?', [id]);

    return new Response(JSON.stringify({ success: true, message: 'Product deleted' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to delete product' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
