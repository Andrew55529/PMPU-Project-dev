import {ReactNode} from 'react';

export interface ListProps {
    children?: ReactNode;
}

export interface ListItemProps {
    ip?: string;
    ua?: string;
    first_enter: string;
    last_action: string;
    sessionId: number;
}