import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "axios";

const API_END_POINT = "http://localhost:8000/api/v1/user";
axios.defaults.withCredentials = true;

export const useUserStore = create()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isCheckingAuth: true,
      loading: false,

      // For API
      signup: async (input: SignupInputState) => {
        try {
          set({ loading: true });
          const response = await axios(`${API_END_POINT}/signup`, input, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          if(response.data.success) {
            console.log(response.data);
            set({
                loading:false,
                user:response.data.user,
            })
          }
        } catch (error) {}
      },
    }),
    {
      name: "user-name",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
