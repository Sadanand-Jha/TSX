import {create} from 'zustand'
import { persist } from 'zustand/middleware'

type EmailStore = {
    email: string,
    setEmail: (email: string) => void
    emailStatus: boolean
    setEmailStatus: () => void
}

export const useEmailStore = create<EmailStore>() (
    persist(
        (set, get) => ({
            email: "",
            emailStatus: false,
            setEmailStatus: () => set({emailStatus: true}),
            setEmail: (email) => set({email}),
        }),
        {
            name: "camvo-email-verification"
        },
    ),
)