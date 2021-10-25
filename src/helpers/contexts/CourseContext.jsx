import React, { createContext, useState } from 'react';

export const CourseContext = createContext();

const CourseContextProvider = ({ children }) => {
  const [units, setUnits] = useState([]);
  const [lessons, setLessons] = useState([]);

  const makeid = () => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = 36;
    for (let i = 0; i < 8; i += 1) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const handleUnitName = (index, value) => {
    const newUnits = units.map((unit) => {
      if (unit.no_unidad === index) {
        return { ...unit, nombre: value };
      }
      return unit;
    });
    setUnits(newUnits);
  };

  const handleAddUnit = () => {
    const editorIndex = makeid();
    setUnits([...units, {
      nombre: '',
      no_unidad: units.length + 1,
      editorIndex,
    }]);
  };

  return (
    <CourseContext.Provider value={{
      units,
      setUnits,
      lessons,
      setLessons,
      handleUnitName,
      handleAddUnit,
    }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export default CourseContextProvider;
