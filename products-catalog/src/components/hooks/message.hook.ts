import { HubConnection } from '@microsoft/signalr';
import { useCallback, useEffect, useState } from 'react';
import { secureLocalStorage } from './secureLocalStorage.hook';
import Message from '../../Models/Message';

export const useMessage = () => {
    const [profileMessages, setProfileMessages] = useState<Message[] | null>([]);
    const [unreadCount, setUnreadCount] = useState<number>(0);

    const addMessage = useCallback((message: Message): void => {
        setProfileMessages(prevMessages => prevMessages ? [...prevMessages, message] : [message]);
        setUnreadCount(prevCount => prevCount + 1);
    }, []);

    const clearUnreadCount = useCallback((): void => {
        setUnreadCount(0);
    }, []);

    return { addMessage,clearUnreadCount, profileMessages, unreadCount};
}