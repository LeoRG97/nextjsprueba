/* eslint-disable no-bitwise */
import React, { createContext, useState } from 'react';
import { generateMongoID } from '../mongoIDGenerator';

export const CourseContext = createContext();

const CourseContextProvider = ({ children }) => {
  const [units, setUnits] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [course, setCourse] = useState({
    titulo: '',
    url_presentacion: '',
    duracion: '',
    objetivo: '',
    exclusivo: false,
    certificado: '',
    categorias: [],
    descripcion: '',
    portada: '',
    archivoPortada: '',
  });
  const [currentUnit, setCurrentUnit] = useState(null);
  const [currentLesson, setCurrentLesson] = useState({});
  const [showLessonModal, setShowLessonModal] = useState(false);

  const handleNewLessonModal = (unitId) => {
    setShowLessonModal(true);
    setCurrentUnit(unitId);
    setCurrentLesson({});
  };

  const handleEditLessonModal = (lessonId) => {
    setCurrentUnit(null);
    const item = lessons.find((lesson) => lesson._id === lessonId);
    setCurrentLesson(item);
    setShowLessonModal(true);
  };

  const handleUnitName = (id, value) => {
    const newUnits = units.map((unit) => {
      if (unit._id === id) {
        return { ...unit, titulo: value };
      }
      return unit;
    });
    setUnits([...newUnits]);
  };

  const handleAddUnit = () => {
    const _id = generateMongoID();
    setUnits([...units, {
      _id,
      titulo: '',
      numero: units.length + 1,
    }]);
  };

  const handleAddLesson = (lessonData) => {
    const _id = generateMongoID();
    setLessons([...lessons, {
      ...lessonData,
      _id,
      unidad: currentUnit,
    }]);
  };

  const handleUpdateLesson = (data) => {
    const updatedLessons = lessons.map((lesson) => (lesson._id === data._id ? data : lesson));
    setLessons([...updatedLessons]);
  };

  const handleSortUnits = (event) => {
    if (event.destination) {
      const prevUnits = [...units];
      const [movedItem] = prevUnits.splice(event.source.index, 1);
      prevUnits.splice(event.destination.index, 0, movedItem);
      const newUnits = prevUnits.map((unit, i) => {
        return {
          ...unit,
          numero: i + 1,
        };
      });
      setUnits([...newUnits]);
    }
  };

  const handleSortLessons = (event, unitId) => {
    if (event.destination) {
      const prevLessons = lessons.filter((lesson) => lesson.unidad === unitId);
      const unselected = lessons.filter((lesson) => lesson.unidad !== unitId);
      const [movedItem] = prevLessons.splice(event.source.index, 1);
      prevLessons.splice(event.destination.index, 0, movedItem);
      setLessons([...unselected, ...prevLessons]);
    }
  };

  return (
    <CourseContext.Provider value={{
      course,
      setCourse,
      units,
      setUnits,
      lessons,
      setLessons,
      handleUnitName,
      handleAddUnit,
      showLessonModal,
      setShowLessonModal,
      currentUnit,
      currentLesson,
      handleNewLessonModal,
      handleEditLessonModal,
      handleAddLesson,
      handleSortUnits,
      handleSortLessons,
      handleUpdateLesson,
    }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export default CourseContextProvider;
