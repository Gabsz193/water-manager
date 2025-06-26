import { useEffect, useState } from 'react';
import { getFirestore, collection, onSnapshot, query, QueryConstraint, addDoc } from 'firebase/firestore';
import {app} from "@/context/AuthContext";

const db = getFirestore(app);

export function useFirestoreCollection<T>(
    collectionName: string,
    queryConstraints: QueryConstraint[] = []
): { data: T[] | null; loading: boolean; error: Error | null, createDocument: (data: Omit<T, 'id'>) => Promise<string> } {
    const [data, setData] = useState<T[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    async function createDocument<T>(
        data: Omit<T, 'id'>
    ): Promise<string> {
        try {
            const collectionRef = collection(db, collectionName);

            const docRef = await addDoc(collectionRef, data);
            return docRef.id;
        } catch (error) {
            console.error('Error creating document:', error);
            throw error;
        }
    }

    useEffect(() => {
        try {
            // Create a reference to the collection
            const collectionRef = collection(db, collectionName);

            // Create a query with any constraints
            const queryRef = query(collectionRef, ...queryConstraints);

            const unsubscribe = onSnapshot(queryRef,
                (snapshot) => {
                const items = snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data(),
                    })) as T[];

                    setData(items);
                    setLoading(false);
                },
                (err) => {
                    setError(err);
                    setLoading(false);
                }
            );

            // Cleanup subscription on unmount
            return () => unsubscribe();
        } catch (err) {
            console.log(err);

            setError(err as Error);
            setLoading(false);
        }
    }, [collectionName]);

    return { data, loading, error, createDocument };
}
