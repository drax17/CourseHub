'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getRecruiters, type Recruiter } from '@/lib/courseManagement';

export function MajorRecruiters() {
  const [recruiters, setRecruiters] = useState<Recruiter[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecruiters = async () => {
      try {
        const fetchedRecruiters = await getRecruiters();
        setRecruiters(fetchedRecruiters);
      } catch (err) {
        setError('Failed to load recruiters. Please try again later.');
        console.error('Error fetching recruiters:', err);
      }
    };
    fetchRecruiters();
  }, []);

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <section className="bg-secondary py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Major Recruiters
        </h2>
        {recruiters.length === 0 ? (
          <p className="text-center">No recruiters available at the moment.</p>
        ) : (
          <div className="flex flex-wrap justify-center items-center gap-8">
            {recruiters.map(recruiter => (
              <div key={recruiter.id} className="w-32 h-32 relative">
                <Image
                  src={recruiter.logo ?? '/placeholder.svg'}
                  alt={recruiter.name ?? 'Recruiter'}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
