import { create } from "zustand";
import axios from "axios";

import type { User } from "@/types";
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  setToLocalStorage,
} from "@/utils/locastorage";

const API_URL = import.meta.env.VITE_API_URL;

console.log("API URL IS ", API_URL);

interface AuthState {
  user: User | null;
  token: string | null;
  authIsLoading: boolean;
  signup: (
    firstname: string,
    lastname: string,
    identifier: string
  ) => Promise<any>;
  verifySignup: (identifier: string, otp: string) => Promise<any>;
  signin: (identifier: string) => Promise<any>;
  verifySignin: (identifier: string, otp: string) => Promise<any>;
  loadUser: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: getFromLocalStorage("user") ? getFromLocalStorage("user") : null,
  token: getFromLocalStorage("token") ? getFromLocalStorage("token") : null,
  authIsLoading: false,

  signup: async (firstname, lastname, email) => {
    set({ authIsLoading: true });
    try {
      const res = await axios.post(`${API_URL}/auth/signup`, {
        firstname,
        lastname,
        email,
      });

      if (res.status === 201 && res.data.success) {
        return { success: true, message: res.data.message };
      }
    } catch (error: any) {
      console.error("Signup error:", error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.message || error.message,
      };
    } finally {
      set({ authIsLoading: false });
    }
  },

  signin: async (identifier) => {
    set({ authIsLoading: true });
    try {
      const res = await axios.post(`${API_URL}/auth/signin`, { identifier });

      if (res.data.success) {
        const { message } = res.data;
        return { success: true, message: message };
      } else {
        return {
          success: false,
          error: res.data.message || "Invalid credentials",
        };
      }
    } catch (error: any) {
      console.error("Login error:", error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data.message || error.message,
      };
    } finally {
      set({ authIsLoading: false });
    }
  },

  verifySignin: async (identifier, otp) => {
    set({ authIsLoading: true });
    try {
      const res = await axios.post(`${API_URL}/auth/verify-signin-otp`, {
        identifier,
        otp,
      });

      if (res.data.success) {
        const { user, token, message } = res.data;
        setToLocalStorage("user", user);
        setToLocalStorage("token", token);
        set({ token: token });
        set({ user: user });
        return { success: true, message: message || "OTP verified." };
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data.message || error.message,
      };
    } finally {
      set({ authIsLoading: false });
    }
  },

  verifySignup: async (identifier, otp) => {
    set({ authIsLoading: true });
    try {
      const res = await axios.post(`${API_URL}/auth/verify-signup-otp`, {
        identifier,
        otp,
      });

      if (res.data.success) {
        const { user, token, message } = res.data;
        setToLocalStorage("user", user);
        setToLocalStorage("token", token);
        set({ token: token });
        set({ user: user });
        return { success: true, message: message || "OTP verified." };
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data.message || error.message,
      };
    } finally {
      set({ authIsLoading: false });
    }
  },

  loadUser: () => {
    try {
      const storedUser = getFromLocalStorage("user");
      const storedToken = getFromLocalStorage("token");
      // console.log("STORESD USER IS ", storedUser);
      if (storedUser && storedToken) {
        set({
          user: storedUser,
          token: storedToken,
        });
      }
      return;
    } catch (error) {
      console.error("Error loading user from storage:", error);
    }
  },

  logout: () => {
    removeFromLocalStorage("user");
    removeFromLocalStorage("token");
    set({ user: null, token: null });
  },
}));
