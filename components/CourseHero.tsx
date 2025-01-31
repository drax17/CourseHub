'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';

interface CourseHeroProps {
  id: string;
  title: string;
  description: string;
  price: string;
  duration: string;
  level: string;
}

export function CourseHero({
  id,
  title,
  description,
  price,
  duration,
  level,
}: CourseHeroProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/enrollments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, phone, courseId: id }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit enrollment');
      }

      toast({
        title: 'Enrollment Submitted',
        description: 'Thank you for your interest! We will contact you soon.',
      });

      setName('');
      setEmail('');
      setPhone('');
    } catch (error) {
      console.error('Error submitting enrollment:', error);
      toast({
        title: 'Enrollment Failed',
        description: 'An error occurred. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-12 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl font-bold mb-4">{title}</h1>
            <p className="text-xl mb-6">{description}</p>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div>
                <h3 className="font-semibold">Price</h3>
                <p>{price}</p>
              </div>
              <div>
                <h3 className="font-semibold">Duration</h3>
                <p>{duration}</p>
              </div>
              <div>
                <h3 className="font-semibold">Level</h3>
                <p>{level}</p>
              </div>
            </div>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Enroll Now</CardTitle>
              <CardDescription>
                Fill out this form and we'll contact you with more information.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <CardFooter className="flex justify-between mt-4 px-0">
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </Button>
                </CardFooter>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
