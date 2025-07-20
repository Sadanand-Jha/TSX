import {create} from 'zustand'

type EmailStore = {
    email: string,
    setEmail: (email: string) => void
    emailStatus: boolean
    setEmailStatus: () => void
}

export const useEmailStore = create<EmailStore>((set) => ({
    email: "",
    emailStatus: false,
    setEmailStatus: () => set({emailStatus: true}),
    setEmail: (email) => set({email}),
}))