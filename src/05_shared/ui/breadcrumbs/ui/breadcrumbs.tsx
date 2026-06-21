'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/05_shared/ui/shadcn/breadcrumb';
import { Route } from 'next';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react';
import { routeDictionary } from '../lib/dictionaries';

interface Props {
  dynamicNames?: Record<string, string>;
}

export function Breadcrumbs({ dynamicNames = {} }: Props) {
  const segments = usePathname().split('/').filter(Boolean);

  const items = [
    { label: 'Garage', href: '/' },
    ...segments.map((segment, index) => {
      const href = `/${segments.slice(0, index + 1).join('/')}`;
      const label = dynamicNames[segment] || routeDictionary[segment] || segment;

      return { label, href };
    }),
  ];

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <Fragment key={item.href}>
              <BreadcrumbItem>
                {isLast
                  ? (
                      <BreadcrumbPage className="text-slate-200">
                        {item.label}
                      </BreadcrumbPage>
                    )
                  : (
                      <BreadcrumbLink asChild>
                        <Link
                          href={item.href as Route}
                          className="text-slate-400 hover:text-white transition-colors"
                        >
                          {item.label}
                        </Link>
                      </BreadcrumbLink>
                    )}
              </BreadcrumbItem>

              {!isLast && <BreadcrumbSeparator className="text-slate-600" />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
