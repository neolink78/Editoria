import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { MyProfileQuery } from "../gql/graphql";
import { gql, useQuery } from "@apollo/client";

type User = {
  email: string;
  username: string;
  description: string;
};

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  refetch: () => void;
}

const defaultValue: UserContextType = {
  user: null,
  setUser: () => {},
  refetch: () => {},
};

const AuthContext = createContext<UserContextType>(defaultValue);

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

const GET_MY_PROFIL = gql`
  query MyProfile {
    myProfile {
      description
      email
      id
      username
    }
  }
`;

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const { data, refetch } = useQuery<MyProfileQuery>(GET_MY_PROFIL);

  useEffect(() => {
    if (data && data.myProfile) {
      setUser(data.myProfile);
    }
  }, [data]);

  return (
    <AuthContext.Provider value={{ user, setUser, refetch }}>
      {children}
    </AuthContext.Provider>
  );
};
