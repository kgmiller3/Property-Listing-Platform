import React, {
    useState,
    useEffect
} from 'react';
import PropertyCard from './PropertyCard.js';
import './index.css';

function Home() {
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [filters, setFilters] = useState({
        minPrice: '',
        maxPrice: '',
        minRooms: '',
        maxRooms: ''
    });

    useEffect(() => {
        // Fetch properties from the backend
        fetch('http://localhost:5000/properties')
            .then(response => response.json())
            .then(data => {
                setProperties(data);
                setFilteredProperties(data);
            })
            .catch(error =>
                console.error(
                    'Error fetching properties:', error));
    }, []);

    const applyFilters = () => {
        let filtered = properties;

        if (filters.minPrice !== '' && filters.maxPrice !== '') {
            filtered = filtered.filter(
                property => property.price >= filters.minPrice &&
                    property.price <= filters.maxPrice);
        }

        if (filters.minRooms !== '' && filters.maxRooms !== '') {
            filtered = filtered.filter(
                property => property.room >= filters.minRooms &&
                    property.room <= filters.maxRooms);
        }

        setFilteredProperties(filtered);
    };

    const handleFilterChange = event => {
        const { name, value } = event.target;
        setFilters({ ...filters, [name]: value });
    };

    return (
        <div className="home-container">
            <div className="filter">
                <label>Minimum Price:</label>
                <input type="number" name="minPrice"
                    value={filters.minPrice} onChange={handleFilterChange} />
                <label>Maximum Price:</label>
                <input type="number" name="maxPrice"
                    value={filters.maxPrice} onChange={handleFilterChange} />
                <label>Minimum Rooms:</label>
                <input type="number" name="minRooms"
                    value={filters.minRooms} onChange={handleFilterChange} />
                <label>Maximum Rooms:</label>
                <input type="number" name="maxRooms"
                    value={filters.maxRooms} onChange={handleFilterChange} />
                <button onClick={applyFilters}>Apply</button>
            </div>
            <div className='parent-property'>
                <div className="property-list">
                    {filteredProperties.length > 0 ? (
                        filteredProperties.map(property => (
                            <PropertyCard key={property.id}
                                property={property} />
                        ))
                    ) : (
                        <p>No properties found</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;