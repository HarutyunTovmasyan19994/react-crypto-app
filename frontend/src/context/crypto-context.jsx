import {createContext, useContext, useEffect, useState} from "react"
import {fakeFetchCrypto, fetchAssets} from "../api.js";
import {percentDifference} from "../utils.js";


const CryptoContext = createContext({
    assets: [],
    crypto: [],
    loading: false
})

function mapAssets(assets, result) {
    return assets.map(assets => {
        const coin = result.find(c => c.id === assets.id)
        return {
            grow: assets.price < coin.price,
            growPercent: percentDifference(assets.price, coin.price),
            totalAMount: assets.amount * coin.price,
            totalProfit: assets.amount * coin.price - assets.amount * assets.amount,
            name:coin.name,
            ...assets
        }
    })
}


// eslint-disable-next-line react/prop-types
export function CryptoContextProvider({children}) {
    const [loading, setLoading] = useState(false)
    const [crypto, setCrypto] = useState([])
    const [assets, setAssets] = useState([])

    useEffect(() => {
        async function preload() {
            setLoading(true)
            const {result} = await fakeFetchCrypto()
            const assets = await fetchAssets()

            setCrypto(result)
            setAssets(mapAssets(assets, result))
            setLoading(false)
        }

        preload()
    }, [])

    function addAssets(newAssets) {
        setAssets(prev => mapAssets([...prev, newAssets],crypto))
    }

    return <CryptoContext.Provider value={{loading, assets, crypto, addAssets}}> {children}</CryptoContext.Provider>
}

export default CryptoContext

export function useCrypto() {
    return useContext(CryptoContext)
}
