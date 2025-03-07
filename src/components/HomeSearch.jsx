import React, { useEffect, useState } from 'react'
import { FaFireAlt } from "react-icons/fa";
import '../styles/HomeSearch.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const HomeSearch = () => {

  const navigate = useNavigate();

  const [search, setSearch] = React.useState('');

  const [searchType, setSearchType] = useState('bodyPart');

  const handleSearch = () => {
    if (search !== '' && searchType === 'bodyPart') {
      navigate(`/bodyPart/${search}`);
      setSearch('');
    } else if (search !== '' && searchType === 'equipment') {
      navigate(`/equipment/${search}`);
      setSearch('');
    }
  }

  const [bodyParts, setBodyParts] = useState([])
  const [equipment, setEquipment] = useState([])

  const bodyPartsOptions = {
    method: 'GET',
    url: 'https://exercisedb.p.rapidapi.com/exercises/bodyPartList',
    headers: {
      'X-RapidAPI-Key': 'd62db1e04emsh5c1ff92c80f1ccdp168c73jsn7989a6a3f48f',
      'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
    }
  };

  const equipmentOptions = {
    method: 'GET',
    url: 'https://exercisedb.p.rapidapi.com/exercises/equipmentList',
    headers: {
      'X-RapidAPI-Key': 'd62db1e04emsh5c1ff92c80f1ccdp168c73jsn7989a6a3f48f',
      'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
    }
  };

  useEffect(() => { 

    fetchData();
  }, [])

  const fetchData = async () =>{
    try {
      const bodyPartsData = await axios.request(bodyPartsOptions);
      console.log(bodyPartsData.data);
      setBodyParts(bodyPartsData.data);

      const equipmentData = await axios.request(equipmentOptions);
      console.log(equipmentData.data);
      setEquipment(equipmentData.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='home-search-component' id='search'>
        <h3>Search for Your Perfect Workout</h3>
        <div className="search-type-buttons">
          <h4>Search by: </h4>
          <span>
            <button className={searchType === 'bodyPart' ? 'active': ''} onClick={()=> setSearchType('bodyPart')} >Body Parts</button>
            <button className={searchType === 'equipment' ? 'active': ''} onClick={()=> setSearchType('equipment')} >Equipment</button>
          </span>
        </div>
        <div className='search-body'>
          {searchType === 'bodyPart' ? 
          
            <select onChange={(e)=> setSearch(e.target.value)} value={search} >
              <option value="">Choose body part</option>
              {bodyParts.map((bodyPart, index) => (
                <option key={index} value={bodyPart}>{bodyPart}</option>
              ))}
            </select>
          :
            <select  onChange={(e)=> setSearch(e.target.value)} value={search}>
              <option value="">Choose Equipment</option>
              {equipment.map((equip, index) => (
                <option key={index} value={equip}>{equip}</option>
              ))}
            </select>
          
          }
            <button onClick={() => handleSearch()} >Search</button>
        </div>
        <div className="popular-categories-container">
            <span>
                <h5>Popular Categories</h5>
                <FaFireAlt className="fire-icon" />
            </span>
            <div className="popular-categories">

              <div className="popular-category" onClick={()=> navigate("/bodyPart/back")} >
                <img src="data:image/jpeg;base64,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" alt="" />
                <p>Back</p>
              </div>
              <div className="popular-category" onClick={()=> navigate("/bodyPart/cardio")}>
                <img src="data:image/jpeg;base64,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" alt="" />
                <p>Cardio</p>
              </div>
              <div className="popular-category" onClick={()=> navigate("/equipment/dumbbell")}>
                <img src="data:image/jpeg;base64,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" alt="" />
                <p>Dumbbells</p>
              </div>
              <div className="popular-category" onClick={()=> navigate("/bodyPart/chest")}>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUccLBhrTXSaQNxl_knjzXl-ACQqr4ANIweQ&usqp=CAU" />
                <p>Chest</p>
              </div>

            </div>
        </div>
    </div>
  )
}

export default HomeSearch