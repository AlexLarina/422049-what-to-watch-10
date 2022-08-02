import type {AppDispatch, State} from '../types/state';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
