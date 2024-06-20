import React, { createContext, useState, useContext } from 'react';

// Tạo context
const LikeContext = createContext();

export const LikeProvider = ({ children }) => {
  const [checkLike, setCheckLike] = useState(false);

  return (
    <LikeContext.Provider value={{ checkLike, setCheckLike }}>
      {children}
    </LikeContext.Provider>
  );
};

export const useLike = () => useContext(LikeContext);
