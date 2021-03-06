import { stateList } from '../../data/stateList';

const StateList = ({ handleLocationChange }) => {
  const stateListings = stateList.map((state, i) => {
    return (
      <option value={ state } key={ i }>
        { state }
      </option>
    );
  });

  return (
    <select
      className="input-signup"
      onChange={ (e) => handleLocationChange(e.target.value) }
    >
      { stateListings }
    </select>
  );
};

export default StateList;
