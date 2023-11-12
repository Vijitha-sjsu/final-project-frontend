import React, { createContext, useState, useContext } from 'react';

interface UserData {
  id: string;
  userId: string ;
  username: string ;
  tagline: string ;
  location: string ;
  email: string ;
  profileImageUrl: string ;
  coverImageUrl: string ;
  firstName: string ;
  lastName: string ;
  createdAt: string ;
  updatedAt: string ;
  followers: string[];
  following: string[];
}

interface UserDataContextType {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
}

const defaultUserData: UserData = {
  id: "",
  userId: "",
  username: "",
  tagline: "",
  location: "",
  email: "",
  profileImageUrl: "",
  coverImageUrl: "",
  firstName: "",
  lastName: "",
  createdAt: "",
  updatedAt: "",
  followers: [],
  following: []
};

const UserDataContext = createContext<UserDataContextType>({
  userData: defaultUserData,
  setUserData: () => {}
});

export const useUserData = () => useContext(UserDataContext);

export const UserDataProvider: React.FC = ({ children }: React.PropsWithChildren<{}>) => {
  const [userData, setUserData] = useState<UserData>(defaultUserData);

  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};
