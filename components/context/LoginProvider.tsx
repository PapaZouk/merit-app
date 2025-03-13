import { createContext, h } from "preact";
import { Signal, useSignal } from "@preact/signals";
import { useContext, useEffect } from "preact/hooks";
import { UserRole, UserRoleEnum } from "../utils/auth/types/userRoles.ts";
import { getAuthClient } from "../utils/auth/auth-client/authClient.ts";
import { User } from "../utils/api-client/types/User.ts";
import {AppwriteException} from "npm:appwrite";

type LoginContextProps = {
  userId: string | null;
  user: User | null;
  userRoles: UserRole[] | string[];
  setUserRole: (roles: UserRole[]) => void;
  isLoggedIn: () => boolean;
  handleLogin: (
    login: string,
    password: string,
  ) => void;
  handleLogout: () => void;
  validateUserRoles: (
    roles: string[],
    expectedRoles: UserRoleEnum[],
  ) => boolean;
  isLoading: boolean;
  loginError: boolean;
  handleOtpVerification: () => void;
  loginErrorCode: number | null;
};

const LoginContext = createContext<LoginContextProps | undefined>(undefined);

type LoginProviderProps = {
  children: h.JSX.Element;
};

export const LoginProvider = (
  { children }: LoginProviderProps,
) => {
  const userId: Signal<string | null> = useSignal<string | null>(null);
  const user: Signal<User | null> = useSignal<User | null>(null);
  const userRoles: Signal<UserRole[] | string[]> = useSignal<
    UserRole[] | string[]
  >([
    UserRoleEnum.GUEST,
  ]);
  const isLoading: Signal<boolean> = useSignal<boolean>(true);
  const loginError: Signal<boolean> = useSignal<boolean>(false);
  const loginErrorCode: Signal<number | null> = useSignal<number | null>(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const userResponse = await getAuthClient().get();

        const response = await fetch(`/api/users/${userResponse.$id}`);
        const userDetails = (await response.json()).result as User;
        userRoles.value = userDetails.roles ?? [];

        user.value = {
          ...userDetails,
        };

        userId.value = userResponse.$id;
      } catch (_error) {
        userRoles.value = [UserRoleEnum.GUEST];
      } finally {
        isLoading.value = false;
      }
    };

    fetchUserRole();
  }, []);

  const isLoggedIn = (): boolean => {
    return !(userRoles.value.length === 0 ||
      (userRoles.value.length === 1 &&
        userRoles.value[0] === UserRoleEnum.GUEST));
  };

  const handleLogin = async (
    login: string,
    password: string,
  ) => {
    try {
      await getAuthClient().createEmailPasswordSession(login, password);
      const userAuthResponse = await getAuthClient().get();

      if (!userAuthResponse) {
        console.error("Failed to login. No user response found.");
        return;
      }

      const userResponse = await fetch(`/api/users/${userAuthResponse.$id}`);
      const userDetails = (await userResponse.json()).result as User;

      if (userDetails.otpEnabled && userDetails.otpConfirmed) {
        await fetch(`/api/users/update/${userAuthResponse.$id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...userDetails,
            otpConfirmed: false,
          }),
        });
      }

      if (userDetails.roles) {
        userRoles.value = userDetails.roles;
      } else {
        userRoles.value = [UserRoleEnum.GUEST];
      }

      loginError.value = false;
      userId.value = userAuthResponse.$id;

      user.value = {
        ...userDetails,
      };
    } catch (e) {
      if (e instanceof AppwriteException) {
        console.error("Appwrite exception during login:", e);
        loginErrorCode.value = e.code;
      }
      console.error("Error during login:", e);
      loginError.value = true;
      setTimeout(() => {
        loginError.value = false;
      }, 3000);
      userRoles.value = [UserRoleEnum.GUEST];
    }
  };

  const handleLogout = async () => {
    try {
      await getAuthClient().deleteSessions();
      userRoles.value = [UserRoleEnum.GUEST];
      user.value = null;
      userId.value = null;
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  const setUserRoles = (roles: UserRole[]) => {
    userRoles.value = roles;
  };

  const validateUserRoles = (
    roles: string[],
    expectedRoles: UserRoleEnum[],
  ): boolean => {
    return roles.some((role: string) =>
      expectedRoles.includes(role as UserRoleEnum)
    );
  };

  const handleOtpVerification = async () => {
    try {
      if (user && user.value) {
        const userUpdate = {
          ...user.value,
          otpConfirmed: true,
        };

        const authId = user.value.authId;

        if (!authId) {
          throw new Error("authId is missing from user object");
        }

        const response = await fetch(`/api/users/update/${authId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userUpdate),
        });

        if (!response.ok) {
          throw new Error(`Failed to update user OTP confirmation: ${response.statusText}`);
        }

        setTimeout(() => {
          globalThis.location.reload();
        }, 1000);
      }
    } catch (error) {
      console.error("Failed to update user OTP confirmation:", error);
    }
  };

  return (
    <LoginContext.Provider
      value={{
        userId: userId.value,
        user: user.value,
        userRoles: userRoles.value,
        setUserRole: setUserRoles,
        isLoggedIn,
        handleLogin,
        handleLogout,
        validateUserRoles: validateUserRoles,
        isLoading: isLoading.value,
        loginError: loginError.value,
        handleOtpVerification: handleOtpVerification,
        loginErrorCode: loginErrorCode.value,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = (): LoginContextProps => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error("useLogin must be used within a LoginProvider");
  }
  return context;
};
