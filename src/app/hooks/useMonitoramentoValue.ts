import { useEffect, useState } from 'react';
import { getDatabase, onValue, ref } from 'firebase/database';
import {app} from "@/context/AuthContext";

const database = getDatabase(app);

export const useMonitoramentoValue = (key: string): string | number | null => {
    const [value, setValue] = useState<string | number | null>(null);

    useEffect(() => {
        // Connect to Firebase Realtime Database
        const valueRef = ref(database, `monitoramento/${key}`);

        return onValue(valueRef, (snapshot) => {
            const data = snapshot.val();
            setValue(data);
        });
    }, [key]);

    return value;
};