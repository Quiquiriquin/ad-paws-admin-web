import React, { createContext, useState, useEffect } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { SIGN_IN_USER } from "@/lib/mutations/user.mutations";
import { USER } from "@/lib/queries/user.queries";
import { useRouter } from "@tanstack/react-router";

type User = {
  id: string;
  name: string;
  email: string;
  status: string;
  role: string;
  phone: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setUserIdToBeUsedForFetch: (id: Number) => void;
  setUser: (user: User | null) => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  login: async () => {},
  logout: () => {},
  setUserIdToBeUsedForFetch: () => {},
  setUser: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [userId, setUserId] = useState<Number | null>(null);
  const [signInUser, { data: signInData, loading: signInLoading }] =
    useMutation(SIGN_IN_USER);
  const [getUserInfo, { data: userData, loading: loadingUserData, error }] =
    useLazyQuery(USER);

  const fetchUser = async () => {
    await getUserInfo({
      variables: {
        userId: Number(userId),
      },
    });
  };

  useEffect(() => {
    const storedAccessToken = localStorage.getItem("accessToken");
    const storedRefreshToken = localStorage.getItem("refreshToken");
    if (storedAccessToken && storedRefreshToken) {
      fetchUser();
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setUser(null);
      router.navigate({ to: "/negocio/login" });
    }
  }, []);

  useEffect(() => {
    if (user) {
      console.log("User is logged in");
      console.log("User data:", user);
      const { status } = user;
      console.log(status);
      if (status === "INCOMPLETE") {
        console.log("User is incomplete");
        router.navigate({ to: "/completar-registro" });
      } else {
        console.log("User is complete");
        router.navigate({ to: "/negocio/dashboard/inicio" });
      }
    }
  }, [user]);

  const login = async (email: string, password: string) => {
    signInUser({
      variables: {
        input: {
          email,
          password,
        },
      },
    });
  };

  const logout = async () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const setUserIdToBeUsedForFetch = async (id: Number) => {
    setUserId(id);
  };

  useEffect(() => {
    if (signInData) {
      const { accessToken, refreshToken } = signInData.signUser;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      console.log("Access token:", accessToken);
      console.log("Refresh token:", refreshToken);
      console.log("User ID to be used for fetch:");
      setTimeout(() => {
        fetchUser();
      }, 1000);
    }
  }, [signInData]);

  useEffect(() => {
    if (userData) {
      const { user } = userData;
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [userData]);

  useEffect(() => {
    if (error) {
      console.error("Error fetching user data:", error);
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setUser(null);
      router.navigate({ to: "/negocio/login" });
    }
  });

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        setUserIdToBeUsedForFetch,
        loading: signInLoading || loadingUserData,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
