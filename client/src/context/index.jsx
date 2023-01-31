import React, { useContext, createContext } from "react"

import { useAddress, useContract, useMetamask, useContractWrite } from "@thirdweb-dev/react"
import { ethers } from "ethers"

const StateContext = createContext()


export const StateContextProvider = ({ children }) => {

    const { contract } = useContract('0xEcAB1847D6D884cab38Fe34540DB01740eAe311d')
    const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign')

    const address = useAddress()
    const connect = useMetamask()

    const publishCampaign = async (form) => {

        try {

            const data  = await createCampaign([
                address, //owner
                form.title, // title
                form.description, // story description
                form.target, // ethereum target
                new Date(form.deadline).getTime(), // deadline
                form.image // image url
            ])

            console.log("contract call success:", data)

        } catch (error) {

            console.log(`contract call failure: ${error}`)
        }
    }

    return (
        <StateContext.Provider
            value={{ address, contract, connect, createCampaign: publishCampaign }}
        >
            {children}
        </StateContext.Provider>
    )

}


export const useStateContext = () => useContext(StateContext)
