import { useEffect, useState } from 'react'
import JournalCard from '../JournalCard/JournalCard'
import JournalForm from '../JournalForm/JournalForm'
import NavBar from '../NavBar/NavBar'
import './JournalIndex.css'
import { useQuery } from '@apollo/client'
import Error from '../Error/Error'
import { LOAD_SELECTED_USER } from '../../GraphQL/Queries'
import AddJournalButton from '../../images/AddJournalButton.png';

const JournalIndex = ( { currentUserID } ) => {
  const [showForm, setShowForm] = useState(false)
  const [userPersonalInfo, setUserPersonalInfo] = useState({})
  const [userJournals, setUserJournals] = useState(null)

  const { error, loading, data } = useQuery(
    LOAD_SELECTED_USER,
    {
      variables: { id: currentUserID }
    }
  )

 useEffect(() => {
    if (data) {
      setUserJournals(data.user.journalEntries)
      setUserPersonalInfo({
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        userCity: data.user.city,
        userState: data.user.state})
    }
  }, [data]);

  const handleChange = (newJournal) => {
    setUserJournals([...userJournals, newJournal])
  }


  if (loading) return <p>Loading ...</p>;
  if (error) {
    return(
      <>
        `Error! ${error}`
        <Error />
      </>
    )
  };

  return (
    <div className='main-journal-div'>
       <NavBar userPersonalInfo={ userPersonalInfo }/>
       <button className="show-form" onClick= { () => setShowForm(true) }><img className="image-button" src={AddJournalButton} alt='add journal button'/></button>
       <div className='journal-index'>
       { showForm &&
          <div>
            <JournalForm 
              userId={ currentUserID }
              handleChange={ handleChange }/>
          </div> }
        <h1 className='form-header seed-header'>Seed Journals:</h1>
        { userJournals && <JournalCard
          userJournals={ userJournals }
          /> }
      </div>
    </div>
  )
}

export default JournalIndex
