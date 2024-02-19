import {useContext} from "react";
import {Layout, Card, Statistic, List, Typography, Tag} from "antd";
import {ArrowUpOutlined, ArrowDownOutlined} from '@ant-design/icons'
import {capitalize} from "../../utils.js";
import CryptoContext from "../../context/crypto-context.jsx";
import "../style/AppSlider.css"



export default function AppSlider() {
    const {assets} = useContext(CryptoContext)

    return (
        <Layout.Sider width="25%" className="sliderStyle">
            {
                assets.map(assets => (
                    <Card key={assets.id} style={{marginBottom: "1rem"}}>
                        <Statistic
                            title={capitalize(assets.id)}
                            value={assets.totalAMount}
                            precision={2}
                            valueStyle={{color: assets.grow ? '#3f8600' : '#cf1322'}}
                            prefix={assets.grow ? <ArrowUpOutlined/> : <ArrowDownOutlined/>}
                            suffix="$"
                        />

                        <List
                            size="small"
                            dataSource={[
                                {title: "Total Profit", value: assets.totalProfit, withTag: true},
                                {title: "Assets Amount", value: assets.amount, isPlain: true},
                                {title: " Difference", value: assets.growPercent}
                            ]}
                            renderItem={(item) => (
                                <List.Item>
                                    <span>{item.title}</span>
                                    <span>
                                        {
                                            item.withTag && <Tag color={assets.grow ? "green" : 'red'}>
                                                {assets.growPercent}%
                                            </Tag>
                                        }
                                        {
                                            item.isPlain && item.value.toFixed(2)}
                                        {
                                            !item.isPlain &&
                                            <Typography.Text
                                                type={assets.grow ? "success" : "danger"
                                                }
                                            >
                                                {item.value.toFixed(2)}$
                                            </Typography.Text>
                                        }
                                    </span>
                                </List.Item>
                            )}
                        />
                    </Card>
                ))
            }
        </Layout.Sider>
    )
}
