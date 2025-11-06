/* eslint-disable react/prop-types */
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
const PageTitle = ({ title }) => {
  const [date, setDate] = useState('');
  useEffect(() => {
    const now = new Date();
    const formattedDate = format(now, 'EEEE, d MMM yyyy'); // Format ngày
    setDate(formattedDate);
  }, []);
  return (
    <div className="page_title">
      <h1>{title}</h1>
      <p>{date}</p>
    </div>
  );
};
export default PageTitle;
