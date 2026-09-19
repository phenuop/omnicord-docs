'use client';

import { RootProvider } from 'fumadocs-ui/provider/next';
import { staticClient } from 'fumadocs-core/search/client';
import type { ReactNode } from 'react';

export function SearchProvider({ children }: { children: ReactNode }) {
  return (
    <RootProvider
      search={{
        options: {
          type: 'static',
          client: staticClient,
        },
      }}
    >
      {children}
    </RootProvider>
  );
}