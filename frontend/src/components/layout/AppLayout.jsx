import {useContext} from "react";
import AppHeader from "./AppHeader.jsx";
import {Layout, Spin} from "antd";
import AppSlider from "./AppSlider.jsx";
import AppContent from "./AppContent.jsx";
import CryptoContext from "../../context/crypto-context.jsx";


export function AppLayout(){
    const {loading} = useContext(CryptoContext)
    if (loading) {
        return <Spin fullscreen/>
    }
    return <Layout>
        <AppHeader/>
        <Layout>
            <AppSlider/>
            <AppContent/>
        </Layout>
    </Layout>
}
