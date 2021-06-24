import { UPDATE_MENU } from './actionTypes';

export const updateMenu = (key: string) => ({type: UPDATE_MENU, payload: key});

export type MenuAction = 
    | ReturnType<typeof updateMenu>;