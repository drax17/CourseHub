import { NextResponse } from 'next/server';

let recruiters = [
  { id: '1', name: 'Google', logo: '/logos/google.svg' },
  { id: '2', name: 'Microsoft', logo: '/logos/microsoft.svg' },
  { id: '3', name: 'Amazon', logo: '/logos/amazon.svg' },
  { id: '4', name: 'Apple', logo: '/logos/apple.svg' },
  { id: '5', name: 'Facebook', logo: '/logos/facebook.svg' },
];

export async function GET() {
  return NextResponse.json(recruiters);
}

export async function POST(request: Request) {
  const recruiter = await request.json();
  const existingIndex = recruiters.findIndex(r => r.id === recruiter.id);
  if (existingIndex !== -1) {
    recruiters[existingIndex] = recruiter;
  } else {
    recruiters.push(recruiter);
  }
  return NextResponse.json(recruiters);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  recruiters = recruiters.filter(recruiter => recruiter.id !== id);
  return NextResponse.json(recruiters);
}
