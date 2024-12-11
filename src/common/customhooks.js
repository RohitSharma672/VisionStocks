import { useState, useEffect } from 'react';
import axios from 'axios';

const FetchDataHooks = () => {
  const [populationData, setPopulationData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await axios.get('https://datausa.io/api/data?drilldowns=Nation&measures=Population');
        setPopulationData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { populationData, loading, error };
};

export default FetchDataHooks;