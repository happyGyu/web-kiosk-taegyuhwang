import { useState } from 'react';
import { PageType } from 'types';
import { PageContext, PageDispatchContext } from './pageContext';

export function PageProvider({ children }: { children: React.ReactNode }) {
  const [currPageType, setCurrPageType] = useState<PageType>('ENTRANCE');
  return (
    <PageContext.Provider value={currPageType}>
      <PageDispatchContext.Provider value={setCurrPageType}>
        {children}
      </PageDispatchContext.Provider>
    </PageContext.Provider>
  );
}

export default PageProvider;
