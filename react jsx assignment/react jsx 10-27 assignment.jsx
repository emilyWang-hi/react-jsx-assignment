import { useState } from 'react'
import './App.css'
import AddCVForm from './components/AddCVForm'
import EditCVForm from './components/EditCVForm'
import CVInfo from './components/CVInfo'

function App() {
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [info, setInfo] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentEditID, setCurrentEditID] = useState("");

    function reset() {
      setFullName('')
      setPhone('')
    }
    
    function handleSubmit(e) {
      e.preventDefault()
      let id = new Date().getTime();
      let nm = fullName;
      let pn = phone;
      setInfo((prevInfo)=>{
        let updatedInfo = [...prevInfo, {id:id, fname:nm, contactPhone:pn}];
        console.log(updatedInfo);
        return updatedInfo;
      });
      reset();
    }

    function handleEdit(CVInfoItem) {
      setIsEditing(true);
      setFullName(CVInfoItem.fname);
      setPhone(CVInfoItem.contactPhone);
      setCurrentEditID(CVInfoItem.id);
      console.log('Editing');
    }

    function handleUpdateCV(e) {
      e.preventDefault();
      let updatedName = fullName;
      let updatedPhone = phone;
      let updatedCVInfo = info.map((item) => {
        if(item.id === currentEditID){
          item.fname = updatedName;
          item.contactPhone = updatedPhone;
        }
        return item;
      });
      setInfo([...updatedCVInfo]);
      setIsEditing(false);
      reset();
    }
    function handleDelete(CVInfoItem) {
      setInfo((prevInfo) => {
        let updatedInfo = prevInfo.filter((item)=>item.id !== CVInfoItem.id);
        return updatedInfo;
      });
    }
    function handleReset(e) {
        e.preventDefault()
        setIsEditing(false)
        reset();
    }
  return (
    <>
      {!isEditing && <AddCVForm fullName={fullName} setFullName={setFullName} phone={phone} setPhone={setPhone} handleSubmit={handleSubmit}/>}

     {isEditing && <EditCVForm fullName={fullName} setFullName={setFullName} phone={phone} setPhone={setPhone} handleUpdateCV={handleUpdateCV} handleReset={handleReset}/>}

      {info.map((item) =>{
        return <CVInfo key={item.id} CVInfoItem={item} handleEdit={handleEdit} handleDelete={handleDelete}/>
      })}
    </>
  )
}

export default App