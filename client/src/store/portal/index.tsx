import { createPortal } from 'react-dom';

const portalStore = (() => {
  let portalRoot: HTMLElement;
  function setPortalRoot(newPortalRoot: HTMLElement) {
    portalRoot = newPortalRoot;
  }

  function makePortal() {
    return ({ children }: { children: React.ReactNode }) =>
      createPortal(children, portalRoot);
  }

  return { makePortal, setPortalRoot };
})();

export default portalStore;
