import { NextResponse } from 'next/server';

let courses = [
  {
    id: '1',
    title: 'Web Development Bootcamp',
    description: 'Learn full-stack web development from scratch',
    price: '$999',
    duration: 12,
    level: 'Beginner',
    seats: 30,
  },
  {
    id: '2',
    title: 'Data Science Fundamentals',
    description: 'Master the basics of data analysis and machine learning',
    price: '$1299',
    duration: 10,
    level: 'Intermediate',
    seats: 25,
  },
  {
    id: '3',
    title: 'UX/UI Design Essentials',
    description: 'Create stunning user interfaces and experiences',
    price: '$799',
    duration: 8,
    level: 'Beginner',
    seats: 20,
  },
];

export async function GET() {
  return NextResponse.json(courses);
}

export async function POST(request: Request) {
  const course = await request.json();
  const existingIndex = courses.findIndex(c => c.id === course.id);
  if (existingIndex !== -1) {
    courses[existingIndex] = course;
  } else {
    courses.push(course);
  }
  return NextResponse.json(courses);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  courses = courses.filter(course => course.id !== id);
  return NextResponse.json(courses);
}
