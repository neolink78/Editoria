import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { MyProfileQuery, SignOUtMutation } from "../gql/graphql";
import { gql, useMutation, useQuery } from "@apollo/client";

type User = {
  email: string;
  username: string;
  description: string;
  id: string;
};

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  refetch: () => void;
  signOut: () => Promise<void>;
  loading: boolean;
  currentUserData: MyProfileQuery | undefined;
}

const defaultValue: UserContextType = {
  user: null,
  setUser: () => {},
  refetch: () => {},
  signOut: () => Promise.resolve(),
  loading: false,
  currentUserData: undefined,
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
      image
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
  const {
    data: currentUserData,
    refetch,
    loading,
  } = useQuery<MyProfileQuery>(GET_MY_PROFIL);

  const [signOutMutation] = useMutation<SignOUtMutation>(SIGN_OUT, {
    update: (cache) => {
      cache.evict({ fieldName: "myProfile" });
      cache.gc();
    },
  });

  useEffect(() => {
    if (currentUserData && currentUserData.myProfile) {
      setUser(currentUserData.myProfile);
    }
  }, [currentUserData]);

  const signOut = async () => {
    try {
      signOutMutation();
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, refetch, signOut, loading, currentUserData }}
    >
      {children}
    </AuthContext.Provider>
  );
};
