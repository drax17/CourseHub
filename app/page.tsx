import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { FeaturedCourses } from '@/components/FeaturedCourses';
import { Testimonials } from '@/components/Testimonials';
import { MajorRecruiters } from '@/components/MajorRecruiters';
import { Footer } from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <section className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl font-bold mb-4">Welcome to CourseHub</h1>
              <p className="text-xl mb-6">
                Discover a world of learning opportunities with our diverse
                range of courses.
              </p>
              <Link href="/explore-courses">
                <Button size="lg">Explore Courses</Button>
              </Link>
            </div>
            <div className="relative h-64 md:h-96">
              <Image
                src="/placeholder.svg"
                alt="Course showcase"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          </div>
        </section>
        <FeaturedCourses />
        <Testimonials />
        <MajorRecruiters />
        <section className="container mx-auto px-4 py-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Admin Access</h2>
          <p className="mb-4">
            Are you an administrator? Sign in to access the dashboard.
          </p>
          <Link href="/sign-in">
            <Button>Admin Sign In</Button>
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
