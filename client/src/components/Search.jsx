import SavedSearches from "./SavedSearches";

const Search = () => {
  const [filters, setFilters] = useState({
    ageMin: "",
    ageMax: "",
    profession: "",
    location: "",
    religion: "",
  });
  const [results, setResults] = useState([]);

  const handleChange = (e) =>
    setFilters({ ...filters, [e.target.name]: e.target.value });

  const handleSearch = async () => {
    try {
      const query = new URLSearchParams(filters).toString();
      const { data } = await axios.get(`/api/search?${query}`);
      setResults(data);
    } catch (error) {
      console.error(error);
    }
  };

  const applySearch = (savedFilters) => {
    setFilters(savedFilters);
    const query = new URLSearchParams(savedFilters).toString();
    axios.get(`/api/search?${query}`).then((res) => setResults(res.data));
  };

  return (
    <div className="p-4">
      {/* ... existing search form and results ... */}
      <SavedSearches applySearch={applySearch} /> {/* <-- Add here */}
    </div>
  );
};
