'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Breadcrumb({ currentTitle }) {
  const pathname = usePathname();
    // console.log(pathname);
  // Split and filter out empty strings
  const pathSegments = pathname.split('/').filter(seg => seg);

  // Build breadcrumbs
  const breadcrumbs = pathSegments.map((segment, index) => {
    const path = '/' + pathSegments.slice(0, index + 1).join('/');
    const name = segment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    return { name, path };
  });

  return (
    <section className="breadcrumbs__section">
      <div className="container">
        <div className="breadcrumbs">
          <Link href="/">Home</Link>
          {breadcrumbs.map((crumb, idx) => (
            <span key={crumb.path}>
              <span className="divider"> &gt; </span>
              {idx === breadcrumbs.length - 1 ? (
                <span className="current__item">
                  {currentTitle || crumb.name}
                </span>
              ) : (
                <Link href={crumb.path}>{crumb.name}</Link>
              )}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
