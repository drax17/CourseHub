export interface Course {
  id: string;
  title: string;
  description: string;
  price: string;
  duration: number; // in weeks
  level: string;
  seats: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar: string;
}

export interface Recruiter {
  id: string;
  name: string;
  logo: string;
}

export interface Enrollment {
  id: string;
  name: string;
  email: string;
  phone: string;
  courseId: string;
  submittedAt: string;
}

export async function getCourses(): Promise<Course[]> {
  try {
    const response = await fetch('/api/courses');
    if (!response.ok) {
      throw new Error('Failed to fetch courses');
    }
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching courses:', error);
    return [];
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const response = await fetch('/api/testimonials');
    if (!response.ok) {
      throw new Error('Failed to fetch testimonials');
    }
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
}

export async function getRecruiters(): Promise<Recruiter[]> {
  try {
    const response = await fetch('/api/recruiters');
    if (!response.ok) {
      throw new Error('Failed to fetch recruiters');
    }
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching recruiters:', error);
    return [];
  }
}

export async function getEnrollments(): Promise<Enrollment[]> {
  try {
    const response = await fetch('/api/enrollments');
    if (!response.ok) {
      throw new Error('Failed to fetch enrollments');
    }
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching enrollments:', error);
    return [];
  }
}

export async function saveCourse(course: Course): Promise<Course[]> {
  try {
    const response = await fetch('/api/courses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(course),
    });
    if (!response.ok) {
      throw new Error('Failed to save course');
    }
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error saving course:', error);
    return [];
  }
}

export async function saveTestimonial(
  testimonial: Testimonial,
): Promise<Testimonial[]> {
  try {
    const response = await fetch('/api/testimonials', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testimonial),
    });
    if (!response.ok) {
      throw new Error('Failed to save testimonial');
    }
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error saving testimonial:', error);
    return [];
  }
}

export async function saveRecruiter(
  recruiter: Recruiter,
): Promise<Recruiter[]> {
  try {
    const response = await fetch('/api/recruiters', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recruiter),
    });
    if (!response.ok) {
      throw new Error('Failed to save recruiter');
    }
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error saving recruiter:', error);
    return [];
  }
}

export async function deleteCourse(id: string): Promise<Course[]> {
  try {
    const response = await fetch('/api/courses', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
    if (!response.ok) {
      throw new Error('Failed to delete course');
    }
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error deleting course:', error);
    return [];
  }
}

export async function deleteTestimonial(id: string): Promise<Testimonial[]> {
  try {
    const response = await fetch('/api/testimonials', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
    if (!response.ok) {
      throw new Error('Failed to delete testimonial');
    }
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    return [];
  }
}

export async function deleteRecruiter(id: string): Promise<Recruiter[]> {
  try {
    const response = await fetch('/api/recruiters', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
    if (!response.ok) {
      throw new Error('Failed to delete recruiter');
    }
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error deleting recruiter:', error);
    return [];
  }
}
