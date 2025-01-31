'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import {
  type Course,
  type Testimonial,
  type Recruiter,
  type Enrollment,
  getCourses,
  getTestimonials,
  getRecruiters,
  getEnrollments,
  saveCourse,
  saveTestimonial,
  saveRecruiter,
  deleteCourse,
  deleteTestimonial,
  deleteRecruiter,
} from '@/lib/courseManagement';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

export default function Dashboard() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [recruiters, setRecruiters] = useState<Recruiter[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [newCourse, setNewCourse] = useState<Course>({
    id: '',
    title: '',
    description: '',
    price: '',
    duration: 0,
    level: '',
    seats: 0,
  });
  const [newTestimonial, setNewTestimonial] = useState<Testimonial>({
    id: '',
    name: '',
    role: '',
    content: '',
    avatar: '',
  });
  const [newRecruiter, setNewRecruiter] = useState<Recruiter>({
    id: '',
    name: '',
    logo: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      const [
        fetchedCourses,
        fetchedTestimonials,
        fetchedRecruiters,
        fetchedEnrollments,
      ] = await Promise.all([
        getCourses(),
        getTestimonials(),
        getRecruiters(),
        getEnrollments(),
      ]);
      setCourses(fetchedCourses);
      setTestimonials(fetchedTestimonials);
      setRecruiters(fetchedRecruiters);
      setEnrollments(fetchedEnrollments);
    };
    fetchData();
  }, []);

  const handleCourseInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCourse(prev => ({
      ...prev,
      [name]:
        name === 'duration' || name === 'seats'
          ? Number.parseInt(value) || 0
          : value,
    }));
  };

  const handleTestimonialInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setNewTestimonial(prev => ({ ...prev, [name]: value }));
  };

  const handleRecruiterInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    setNewRecruiter(prev => ({ ...prev, [name]: value }));
  };

  const handleCourseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const courseToSave = {
      ...newCourse,
      id: newCourse.id || Date.now().toString(),
    };
    const updatedCourses = await saveCourse(courseToSave);
    setCourses(updatedCourses);
    setNewCourse({
      id: '',
      title: '',
      description: '',
      price: '',
      duration: 0,
      level: '',
      seats: 0,
    });
  };

  const handleTestimonialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const testimonialToSave = {
      ...newTestimonial,
      id: newTestimonial.id || Date.now().toString(),
    };
    const updatedTestimonials = await saveTestimonial(testimonialToSave);
    setTestimonials(updatedTestimonials);
    setNewTestimonial({
      id: '',
      name: '',
      role: '',
      content: '',
      avatar: '',
    });
  };

  const handleRecruiterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const recruiterToSave = {
      ...newRecruiter,
      id: newRecruiter.id || Date.now().toString(),
    };
    const updatedRecruiters = await saveRecruiter(recruiterToSave);
    setRecruiters(updatedRecruiters);
    setNewRecruiter({
      id: '',
      name: '',
      logo: '',
    });
  };

  const handleDeleteCourse = async (id: string) => {
    const updatedCourses = await deleteCourse(id);
    setCourses(updatedCourses);
  };

  const handleDeleteTestimonial = async (id: string) => {
    const updatedTestimonials = await deleteTestimonial(id);
    setTestimonials(updatedTestimonials);
  };

  const handleDeleteRecruiter = async (id: string) => {
    const updatedRecruiters = await deleteRecruiter(id);
    setRecruiters(updatedRecruiters);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Admin Dashboard</h1>
      <Link href="/">
        <Button className="mb-4">Back to Home</Button>
      </Link>

      <Tabs defaultValue="courses" className="w-full">
        <TabsList>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
          <TabsTrigger value="recruiters">Recruiters</TabsTrigger>
          <TabsTrigger value="enrollments">Enrollments</TabsTrigger>
        </TabsList>
        <TabsContent value="courses">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Add/Edit Course</CardTitle>
              <CardDescription>Enter course details below</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCourseSubmit}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      name="title"
                      value={newCourse.title}
                      onChange={handleCourseInputChange}
                      required
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      name="description"
                      value={newCourse.description}
                      onChange={handleCourseInputChange}
                      required
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      name="price"
                      value={newCourse.price}
                      onChange={handleCourseInputChange}
                      required
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="duration">Duration (weeks)</Label>
                    <Input
                      id="duration"
                      name="duration"
                      type="number"
                      value={newCourse.duration}
                      onChange={handleCourseInputChange}
                      required
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="level">Level</Label>
                    <Input
                      id="level"
                      name="level"
                      value={newCourse.level}
                      onChange={handleCourseInputChange}
                      required
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="seats">Number of Seats</Label>
                    <Input
                      id="seats"
                      name="seats"
                      type="number"
                      value={newCourse.seats}
                      onChange={handleCourseInputChange}
                      required
                    />
                  </div>
                </div>
                <Button type="submit" className="mt-4">
                  Save Course
                </Button>
              </form>
            </CardContent>
          </Card>

          <h2 className="text-2xl font-bold mb-4">Course List</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.map(course => (
              <Card key={course.id}>
                <CardHeader>
                  <CardTitle>{course.title}</CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Price: {course.price}</p>
                  <p>Duration: {course.duration} weeks</p>
                  <p>Level: {course.level}</p>
                  <p>Available Seats: {course.seats}</p>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="destructive"
                    onClick={() => handleDeleteCourse(course.id)}>
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="testimonials">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Add/Edit Testimonial</CardTitle>
              <CardDescription>Enter testimonial details below</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleTestimonialSubmit}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={newTestimonial.name}
                      onChange={handleTestimonialInputChange}
                      required
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="role">Role</Label>
                    <Input
                      id="role"
                      name="role"
                      value={newTestimonial.role}
                      onChange={handleTestimonialInputChange}
                      required
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      name="content"
                      value={newTestimonial.content}
                      onChange={handleTestimonialInputChange}
                      required
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="avatar">Avatar</Label>
                    <Input
                      id="avatar"
                      name="avatar"
                      value={newTestimonial.avatar}
                      onChange={handleTestimonialInputChange}
                      required
                    />
                  </div>
                </div>
                <Button type="submit" className="mt-4">
                  Save Testimonial
                </Button>
              </form>
            </CardContent>
          </Card>

          <h2 className="text-2xl font-bold mb-4">Testimonial List</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {testimonials.map(testimonial => (
              <Card key={testimonial.id}>
                <CardHeader>
                  <CardTitle>{testimonial.name}</CardTitle>
                  <CardDescription>{testimonial.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{testimonial.content}</p>
                  <p>Avatar: {testimonial.avatar}</p>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="destructive"
                    onClick={() => handleDeleteTestimonial(testimonial.id)}>
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="recruiters">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Add/Edit Recruiter</CardTitle>
              <CardDescription>Enter recruiter details below</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleRecruiterSubmit}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={newRecruiter.name}
                      onChange={handleRecruiterInputChange}
                      required
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="logo">Logo URL</Label>
                    <Input
                      id="logo"
                      name="logo"
                      value={newRecruiter.logo}
                      onChange={handleRecruiterInputChange}
                      required
                    />
                  </div>
                </div>
                <Button type="submit" className="mt-4">
                  Save Recruiter
                </Button>
              </form>
            </CardContent>
          </Card>

          <h2 className="text-2xl font-bold mb-4">Recruiter List</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recruiters.map(recruiter => (
              <Card key={recruiter.id}>
                <CardHeader>
                  <CardTitle>{recruiter.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Logo URL: {recruiter.logo}</p>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="destructive"
                    onClick={() => handleDeleteRecruiter(recruiter.id)}>
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="enrollments">
          <h2 className="text-2xl font-bold mb-4">Enrollment List</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {enrollments.map(enrollment => {
              const course = courses.find(c => c.id === enrollment.courseId);
              return (
                <Card key={enrollment.id}>
                  <CardHeader>
                    <CardTitle>{enrollment.name}</CardTitle>
                    <CardDescription>{enrollment.email}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Phone: {enrollment.phone}</p>
                    <p>
                      Submitted:{' '}
                      {new Date(enrollment.submittedAt).toLocaleString()}
                    </p>
                    <h4 className="font-semibold mt-4">Course Details:</h4>
                    {course ? (
                      <>
                        <p>Title: {course.title}</p>
                        <p>Price: {course.price}</p>
                        <p>Duration: {course.duration} weeks</p>
                        <p>Level: {course.level}</p>
                      </>
                    ) : (
                      <p>Course not found</p>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
