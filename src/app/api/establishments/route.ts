import { NextResponse } from 'next/server';
import Establishment from '@/models/Establishment';
import connect from '@/database/mongodb';

export async function GET() {
  try {
    await connect();

    const establishmentItems = await Establishment.find();
    return NextResponse.json(establishmentItems, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: `Error fetching establishments: ${error}`,
      },
      { status: 500 }
    );
  }
}

export async function POST() {}
