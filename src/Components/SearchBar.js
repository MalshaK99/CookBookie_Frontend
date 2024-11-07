import {React,useState,useEffect} from "react";  
import axios from "axios";

export default function FormElementsSearchRoundedBaseBasic() {  
  const [query,setQuery]=useState("");
  const[results,setResults]=useState([]);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const fetchResults = async (searchQuery) => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/recipes/search?q=${searchQuery}`);
      setResults(response.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle input change with a debounce to optimize API calls
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query) {
        fetchResults(query);
      } else {
        setResults([]); // Clear results if search query is empty
      }
    }, 300); // Adjust delay as needed

    return () => clearTimeout(delayDebounceFn); // Cleanup the timer
  }, [query]);

  
  return (  
    <>  
      <div className="relative my-6">  
        <input  
          id="id-s03"  
          type="search"  
          name="id-s03"  
          placeholder="Search here"  
          aria-label="Search content"
          value={query}
          onChange={(e)=>setQuery(e.target.value)}  
          className="search-input peer relative h-10 w-full rounded-full border border-gray-300 px-4 pr-12 text-sm text-gray-700 outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-500"  
        />  
        <svg  
          xmlns="http://www.w3.org/2000/svg"  
          className="absolute right-4 top-2.5 h-5 w-5 cursor-pointer text-gray-400"  
          fill="none"  
          viewBox="0 0 24 24"  
          stroke="currentColor"  
          strokeWidth="1.5"  
          aria-hidden="true"  
          aria-label="Search icon"  
          role="graphics-symbol"  
        >  
          <path  
            strokeLinecap="round"  
            strokeLinejoin="round"  
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"  
          />  
        </svg>  
        <div className="search-results mt-4">
        {results.length > 0 ? (
          results.map((result) => (
            <div key={result._id} className="search-result p-2 border-b border-gray-200">
              <h3 className="text-lg font-semibold">{result.name}</h3>
              <p className="text-sm text-gray-600">{result.description}</p>
            </div>
          ))
        ) : (
          noResults && <p className="text-gray-500 mt-2">No results found.</p>
        )}
      </div>
    </div>
  
    </>  
  );  
}