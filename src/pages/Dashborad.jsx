import { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import LocationCard from '../components/LocationCard';
import PrivateLocation from '../components/PrivateLocation';
import PublicLocation from '../components/PublicLocation';
import { deletePrivateLocationAPI, deletePublicLocationAPI, userPrivateLocationsAPI, userPublicLocationsAPI } from '../services/allAPI';
import { addResponseContext, editResponseContext } from '../ContextShare/ContextShare'
import PublicLocationEdit from '../components/PublicLocationEdit';
import PrivateLocationEdit from '../components/PrivateLocationEdit';


const Dashboard = () => {
  const [userPublicLocation, setUserPublicLocation] = useState([])
  const [userPrivateLocation, setUserPrivateLocation] = useState([])
  const {editResponse,setEditResponse} = useContext(editResponseContext)
  const {addResponse,setAddResponse} = useContext(addResponseContext)
  const [allPublicLocation, setAllPublicLocation] = useState([]);
  const [allPrivateLocation, setAllPrivateLocation] = useState([]);

  useEffect(() => {
    getUserPublicLocation()
    getUserPrivateLocation()

  }, [addResponse,editResponse]);
  console.log(userPublicLocation);
  console.log(userPrivateLocation);
  
  

  // useEffect(() => {
  // }, []);

  const getUserPublicLocation = async () => {
    const token = sessionStorage.getItem("token")
    if (token) {
      const reqHeader = {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      }
      try {
        const result = await userPublicLocationsAPI(reqHeader)
        console.log(result);
        if (result.status == 200) {
          setUserPublicLocation(result.data)
        } else {
          console.log(result.response.data);
        }
      } catch (err) {
        console.log(err);

      }
    }
  }

  const getUserPrivateLocation = async () => {
    const token = sessionStorage.getItem("token")
    if (token) {
      const reqHeader = {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      }
      try {
        const result = await userPrivateLocationsAPI(reqHeader)
        console.log(result);
        if (result.status == 200) {
          setUserPrivateLocation(result.data)
        } else {
          console.log(result.response.data);
        }
      } catch (err) {
        console.log(err);

      }
    }
  }
  const handleDeletePublicLocation = async (pId)=>{
    const token = sessionStorage.getItem("token")
    if (token) {
      const reqHeader = {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      }
      try {
        const result = await deletePublicLocationAPI(pId,reqHeader)
        if (result.status==200) {
          getUserPublicLocation()
        }else{
          console.log(result);
          
        }
      } catch (err) {
        console.log(err);
        
      }
    }  
  }
  const handleDeletePrivateLocation = async (pId)=>{
    const token = sessionStorage.getItem("token")
    if (token) {
      const reqHeader = {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      }
      try {
        const result = await deletePrivateLocationAPI(pId,reqHeader)
        if (result.status==200) {
          getUserPrivateLocation()
        }else{
          console.log(result);
          
        }
      } catch (err) {
        console.log(err);
        
      }
    }  
  }
  return (
    <div className='font'>
      <Header insideDashborad={true} />
      <div className='d-flex justify-content-center m-2 p-1 gap-3'>
        <PublicLocation />
        <PrivateLocation />
      </div>

      <h2>Public Locations You Added</h2>
      <div className="d-flex flex-wrap">
        {userPublicLocation?.length > 0 ? (
          userPublicLocation.map((publiclocation) => (
            <div key={publiclocation?._id} className="col-md-4 mb-4">
              <LocationCard insideLocationCard={true} displayData={publiclocation} />
              <div>
                <i onClick={()=>handleDeletePublicLocation(publiclocation?._id)} className="fa-solid fa-trash text-danger ms-5 me-5" role="button" aria-label="Delete Location"></i>
                <PublicLocationEdit publiclocation={publiclocation}/>
              </div>
            </div>
          ))
        ) : (
          <div className="fw-bolder text-danger m-5 text-center">Public locations Not Found</div>
        )}
      </div>

      <h2>Private Locations You Added</h2>
      <div className="d-flex flex-wrap">
        {userPrivateLocation?.length > 0 ? (
          userPrivateLocation.map((privatelocation) => (
            <div key={privatelocation?._id} className="col-md-4 mb-4">
              <LocationCard insideLocationCard={true} displayData={privatelocation}/>
              <i onClick={()=>handleDeletePrivateLocation(privatelocation?._id)} className="fa-solid fa-trash text-danger ms-5 me-5" role="button" aria-label="Delete Location"></i>
              <PrivateLocationEdit privatelocation={privatelocation}/>
            </div>
          ))
        ) : (
          <div className="fw-bolder text-danger m-5 text-center">Private locations Not Found</div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
