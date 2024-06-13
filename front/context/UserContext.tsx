import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode
} from "react";
import { MyProfileQuery, SignOUtMutation } from "../gql/graphql";
import { gql, useMutation, useQuery } from "@apollo/client";

type User = {
  email: string;
  username: string;
  description: string;
};

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  refetch: () => void;
  signOut: () => Promise<void>;
}

const defaultValue: UserContextType = {
  user: null,
  setUser: () => {},
  refetch: () => {},
  signOut: () => Promise.resolve()
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

const SIGN_OUT = gql`
  mutation SignOUt {
    signOut
  }
`;

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const { data, refetch } = useQuery<MyProfileQuery>(GET_MY_PROFIL);

  const [signOutMutation] = useMutation<SignOUtMutation>(SIGN_OUT);

  useEffect(() => {
    if (data && data.myProfile) {
      setUser(data.myProfile);
    }
  }, [data]);

  const signOut = async () => {
    try {
      signOutMutation();
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, refetch, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
