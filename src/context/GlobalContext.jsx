import React, { createContext, useContext, useState, useCallback } from 'react';

const GlobalContext = createContext();

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
};

export const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    studentId: '',
    department: ''
  });
  const [mbtiResult, setMbtiResult] = useState({
    E: 0,
    I: 0,
    S: 0,
    N: 0,
    T: 0,
    F: 0,
    J: 0,
    P: 0
  });
  const [scores, setScores] = useState({
    l1: 0,
    l2: 0,
    l3: 0,
    l4: 0,
    l5: 0
  });

  const login = useCallback((data) => {
    setUserData(data);
    setIsLoggedIn(true);
  }, []);

  const updateMbti = useCallback((type) => {
    setMbtiResult(prev => ({
      ...prev,
      [type]: prev[type] + 1
    }));
  }, []);

  const updateScore = useCallback((level, score) => {
    setScores(prev => ({
      ...prev,
      [level]: score
    }));
  }, []);

  const value = {
    isLoggedIn,
    userData,
    mbtiResult,
    scores,
    login,
    updateMbti,
    updateScore
  };

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
};
