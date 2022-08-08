import { useContext, createContext, Dispatch } from 'react';
import { PageType } from 'types';

export const PageContext = createContext<PageType | null>(null);
export const PageDispatchContext = createContext<Dispatch<PageType> | null>(
  null
);

export const usePageContext = () => {
  const pageContext = useContext(PageContext);
  if (!pageContext) throw new Error('Cannot use Page provider');
  return pageContext;
};

export const usePageDispatchContext = () => {
  const dispatchPage = useContext(PageDispatchContext);
  if (!dispatchPage) throw new Error('Cannot use Page provider');
  return dispatchPage;
};
