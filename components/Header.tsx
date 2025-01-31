'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getCourses, type Course } from '@/lib/courseManagement';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const fetchedCourses = await getCourses();
        setCourses(Array.isArray(fetchedCourses) ? fetchedCourses : []);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setCourses([]);
      }
    };
    fetchCourses();
  }, []);

  const handleMouseEnter = () => setIsOpen(true);

  return (
    <header className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          CourseHub
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/">
                <Button variant="ghost">Home</Button>
              </Link>
            </li>
            <li>
              <Link href="/explore-courses">
                <Button variant="ghost">Explore Courses</Button>
              </Link>
            </li>
            <li onMouseEnter={handleMouseEnter} className="relative">
              <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="cursor-pointer">
                    Courses
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="absolute">
                  {Array.isArray(courses) && courses.length > 0 ? (
                    courses.map(course => (
                      <DropdownMenuItem
                        key={course.id}
                        onSelect={() => setIsOpen(false)}>
                        <Link href={`/course/${course.id}`} className="w-full">
                          {course.title}
                        </Link>
                      </DropdownMenuItem>
                    ))
                  ) : (
                    <DropdownMenuItem disabled>
                      No courses available
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
            <li>
              <Link href="/sign-in">
                <Button variant="ghost">Admin Sign In</Button>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
