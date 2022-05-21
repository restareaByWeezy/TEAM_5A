import { TypedUseSelectorHook, useSelector } from 'react-redux';
import type { RootState } from 'states';

// instead of plain `useSelector`
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
