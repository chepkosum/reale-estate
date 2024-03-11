import { useEffect, useState } from "react";
import {Link} from 'react-router-dom'

const Contact = ({ listing }) => {
  const [landlord, setLandlord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('')

  const handleChange = (e)=>{
    setMessage(e.target.value);
  }

  useEffect(() => {
    const fetchLandlord = async () => {
        try {
          const res = await fetch(`/api/user/${listing.userRef}`);
          
          // Check if the response status is OK before attempting to parse JSON
          if (!res.ok) {
            throw new Error(`Error: ${res.status} ${res.statusText}`);
          }
      
          const data = await res.json();
          setLandlord(data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching landlord data:", error);
          setError("Error fetching landlord data. Please try again later.");
          setLoading(false);
        }
      };
      

    fetchLandlord();
  }, [listing.userRef]);

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-700">Error: {error}</p>}
      {landlord && (
        <div className="flex flex-col gap-2">
          <p>Contact <span className="font-semibold">{landlord.username}</span> for:  
          <span className="font-semibold">{listing.name.toLowerCase()}</span></p>
          <textarea onChange={handleChange}  name="message" id="message" value={message} rows="2"></textarea>
          
          <Link to={`mailto:${landlord.email}?subject=Regarding
           ${listing.name}&body=${message}`}
           className="bg-slate-700 text-white text-center
           p-3 uppercase rounded-lg hover:opacity-95">
            Send Message
          </Link>
        </div>
      )}
    </>
  );
};

export default Contact;
