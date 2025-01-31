import { NextResponse } from 'next/server';

let testimonials = [
  {
    id: '1',
    name: 'John Doe',
    role: 'Web Developer',
    content:
      'The Web Development Bootcamp was exactly what I needed to kickstart my career. Highly recommended!',
    avatar: 'JD',
  },
  {
    id: '2',
    name: 'Jane Smith',
    role: 'Data Analyst',
    content:
      'Thanks to the Data Science Fundamentals course, I landed my dream job at a top tech company.',
    avatar: 'JS',
  },
  {
    id: '3',
    name: 'Mike Johnson',
    role: 'UX Designer',
    content:
      "The UX/UI Design Essentials course helped me understand the principles of great design. It's been invaluable in my work.",
    avatar: 'MJ',
  },
];

export async function GET() {
  return NextResponse.json(testimonials);
}

export async function POST(request: Request) {
  const testimonial = await request.json();
  const existingIndex = testimonials.findIndex(t => t.id === testimonial.id);
  if (existingIndex !== -1) {
    testimonials[existingIndex] = testimonial;
  } else {
    testimonials.push(testimonial);
  }
  return NextResponse.json(testimonials);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  testimonials = testimonials.filter(testimonial => testimonial.id !== id);
  return NextResponse.json(testimonials);
}
