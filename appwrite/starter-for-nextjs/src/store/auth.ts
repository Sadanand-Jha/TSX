import {immer} from "zustand/middleware/immer"
import {persist} from "zustand/middleware"
import {create} from "zustand"

import { AppwriteException, ID, Models } from "appwrite"
import { account } from "../models/client/config"


export interface userPrefs{
    reputation: number
}

interface IAuthStore{
    session: Models.Session | null
    jwt: string | null
    hydrated: boolean
    user: Models.User<userPrefs> | null

    setHydrated: () => void
    verifySession: () => Promise<void>
    login(
        email: string,
        password: string
    ): Promise<
    {
        success: boolean,
        error?: AppwriteException | null
    }
    >
    createAccount(
        name: string,
        email: string,
        password: string
    ): Promise<
    {
        success: boolean;
        error?: AppwriteException| null
    }>
    logout(): Promise<void>

}

export const useAuthStore = create<IAuthStore>()(
    persist(
        immer((set) => ({
            session: null,
            jwt: null,
            user: null,
            hydrated: false,

            setHydrated(){
                set({hydrated: true})
            },
            async verifySession(){
                try {
                    const session = await account.getSession("current")
                    set({session}) 
                } catch (error) {
                    console.log(error)
                }
            },
            async login(email: string, password: string){
                try {
                    const session = await account.createEmailPasswordSession(email, password)
                    const [user, {jwt}] = await Promise.all([
                        account.get<userPrefs>(),
                        account.createJWT()
                    ])
                    if (!user.prefs?.reputation) await account.updatePrefs<userPrefs>({
                        reputation: 0
                    })

                    set({session, user, jwt})
                    
                    return { success: true}

                } catch (error) {
                    console.log(error)
                    return {
                        success: false,
                        error: error instanceof AppwriteException ? error: null,
                        
                    }
                }
            },
            async createAccount(name:string, email: string, password: string) {
                try {
                await account.create(ID.unique(), email, password, name)
                return {success: true}
                } catch (error) {
                    console.log(error)
                    console.log("error occured at createAccount in auth section")
                    return {
                        success: false,
                        error: error instanceof AppwriteException ? error: null,
                        
                    }
                }
            },
             async logout() {
                try {
                await account.deleteSessions()
                set({session: null, jwt: null, user: null})
                
                } catch (error) {
                console.log(error, "error ")
                }
            },
            })),
    {
        name : 'auth',
        onRehydrateStorage(){
            return (state, error) => {
                if(!error) state?.setHydrated();
            }
        }
    }
)

)