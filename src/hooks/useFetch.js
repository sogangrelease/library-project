import { useState, useEffect } from 'react';
import axios from "axios";

const API_BASE_URL = "http://localhost:8080"

export const useFetchPost = (url, sendData) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(`${API_BASE_URL}${url}`, {sendData}, {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}});
                if (!response.ok) {
                    throw new Error('Error');
                }
                const result = response.data;
                setData(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [url, sendData]);

    return { data, loading, error };
};

export const useFetchGet = (url, sendData) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}${url}`, {sendData}, {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}});
                if (!response.ok) {
                    throw new Error('Error');
                }
                const result = response.data;
                setData(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [url, sendData]);

    return { data, loading, error };
};
