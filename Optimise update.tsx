import React, { useState } from 'react';

interface MyObject {
  id: number;
  name: string;
}

const ExampleComponent: React.FC = () => {
  const [myState, setMyState] = useState<MyObject[]>([]);

  const updateOrAddObject = (id: number, newName: string) => {
    setMyState((prevState) => {
      const updatedState = prevState.reduce((accumulator, obj) => {
        if (obj.id === id) {
          // Update the existing object's name
          return [...accumulator, { ...obj, name: newName }];
        }
        return [...accumulator, obj];
      }, [] as MyObject[]);

      if (!updatedState.some((obj) => obj.id === id)) {
        // Add a new object to the state if it doesn't exist
        updatedState.push({ id, name: newName });
      }

      return updatedState;
    });
  };

  return (
    <div>
      {/* Display the state */}
      <ul>
        {myState.map((obj) => (
          <li key={obj.id}>{`${obj.id}: ${obj.name}`}</li>
        ))}
      </ul>

      {/* Button to update or add object */}
      <button onClick={() => updateOrAddObject(1, 'New Name')}>Update/Add Object</button>
    </div>
  );
};

export default ExampleComponent;
