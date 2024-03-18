import axios from "axios"
import { atom, selector } from "recoil"


export const firstNameAtom = atom({
    key: "firstNameAtom",
    default: ""
})

export const lastNameAtom = atom({
    key: "lastNameAtom",
    default: ""
})

export const usernameAtom = atom({
    key: "usernameAtom",
    default: ""
})

export const passwordAtom = atom({
    key: "passwordAtom",
    default: ""
})

export const balanceAtom = atom({
    key: "balanceAtom",
    default: selector({
        key: "balanceAtomSelector",
        get: async ({get}) => {

            try {
                const response =  await axios.post("http://localhost:3000/api/v1/account/balance", {}, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                })
                return response.data.balance
            } catch (error) {
                console.log( "Error fetching Balance" + error)
                throw error
            }
            
        }
    })
})
