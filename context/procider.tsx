import { NaverMap } from '@/types/map';
import { Store } from '@/types/store';
import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

interface Props {
  children: ReactNode;
}

interface StateProps {
  stores: Store[];
  map: NaverMap | null;
  currentStore: Store | null;
}

interface ActionProps {
  setStores: (stores: Store[]) => void;
  setMap: (map: NaverMap) => void;
  setCurrentStore: (store: Store) => void;
  clearCurrentStore: () => void;
}

const ValueContext = createContext<StateProps | null>(null);
const ActionContext = createContext<ActionProps | null>(null);

function Provider({ children }: Props) {
  const [state, setState] = useState<StateProps>({
    stores: [],
    map: null,
    currentStore: null,
  });

  const actions = useMemo<ActionProps>(
    () => ({
      setStores(stores: Store[]) {
        setState((prev) => ({ ...prev, stores }));
      },
      setMap(map: NaverMap) {
        setState((prev) => ({ ...prev, map }));
      },
      setCurrentStore(store: Store) {
        setState((prev) => ({ ...prev, currentStore: store }));
      },
      clearCurrentStore() {
        setState((prev) => ({ ...prev, currentStore: null }));
      },
    }),
    []
  );

  return (
    <ActionContext.Provider value={actions}>
      <ValueContext.Provider value={state}>{children}</ValueContext.Provider>
    </ActionContext.Provider>
  );
}

export default Provider;

export function useValues() {
  const value = useContext(ValueContext);
  if (value === null) {
    throw new Error('useValues should be used within CounterProvider');
  }
  return value;
}

export function useActions() {
  const value = useContext(ActionContext);
  if (value === null) {
    throw new Error('useActions should be used within CounterProvider');
  }
  return value;
}
