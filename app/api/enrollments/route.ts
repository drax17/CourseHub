import { NextResponse } from 'next/server';

export interface Enrollment {
  id: string;
  name: string;
  email: string;
  phone: string;
  courseId: string;
  submittedAt: string;
}

const enrollments: Enrollment[] = [];

export async function GET() {
  return NextResponse.json(enrollments);
}

export async function POST(request: Request) {
  const enrollment = await request.json();
  const newEnrollment: Enrollment = {
    ...enrollment,
    id: Date.now().toString(),
    submittedAt: new Date().toISOString(),
  };
  enrollments.push(newEnrollment);
  return NextResponse.json(newEnrollment);
}
