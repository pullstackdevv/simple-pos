import type { APIRoute } from 'astro';
import { runMigrations } from '../../lib/migrations';

export const POST: APIRoute = async () => {
  try {
    await runMigrations();
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Migrations completed successfully',
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Migration error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Migration failed',
        details: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};

// GET untuk check migration status
export const GET: APIRoute = async () => {
  try {
    await runMigrations();
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Database is ready',
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Database connection failed',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
