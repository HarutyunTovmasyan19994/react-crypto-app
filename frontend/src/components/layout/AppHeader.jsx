import {Layout, Select, Space, Button, Modal, Drawer} from "antd";
import {useCrypto} from "../../context/crypto-context.jsx";
import {useEffect, useState} from "react";
import CoinInfoModal from "../CoinInfoModal.jsx";
import AddAssetsForm from "../AddAssetsForm.jsx";
import "../style/AppHeader.css"

const headerStyle = {
    width: "100%",
    textAlign: 'center',
    height: 60,
    padding: "1rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
};


export default function AppHeader() {
    const [select, setSelect] = useState(false)
    const [modal, setModal] = useState(null)
    const [coin, setCoin] = useState(false)
    const [drawer, setDrawer] = useState(false)
    const {crypto} = useCrypto()

    useEffect(() => {
        const keypress = (event) => {
            if (event.key === '/') {
                setSelect(prev => !prev)
            }
        }
        document.addEventListener("keypress", keypress)
        return () => document.removeEventListener("keypress", keypress)
    }, [])


    function handleSelect(value) {
        setCoin(crypto.find(c => c.id === value))
        setModal(true)
    }

    return (
        <Layout.Header style={headerStyle}>
            <Select
                className="selected"
                open={select}
                onSelect={handleSelect}
                onClick={() => setSelect(prev => !prev)}
                value="press / to open"
                options={crypto.map(coin => ({
                    label: coin.name,
                    value: coin.id,
                    icon: coin.icon
                }))}
                optionRender={(option) => (
                    <Space>
                        <img
                            style={{width: 20}}
                            src={option.data.icon}
                            alt={option.data.value}/> {option.data.label}
                    </Space>
                )}
            />
            <Button type="primary" onClick={() => setDrawer(true)}>Add Asset</Button>
            <Modal
                open={modal}
                onCancel={() => setModal(false)}
                footer={null}
            >
                <CoinInfoModal coin={coin}/>
            </Modal>
            <Drawer
                width={600}
                title="Add Assets"
                onClose={() => setDrawer(false)}
                open={drawer}
                destroyOnClose
            >
                <AddAssetsForm onClose={()=>setDrawer(false)}/>
            </Drawer>
        </Layout.Header>
    )
}
