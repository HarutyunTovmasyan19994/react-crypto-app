import {useState,useRef} from "react";
import {
    Flex,
    Select,
    Space,
    Typography,
    Divider,
    Form,
    Button,
    InputNumber,
    DatePicker,
    Result
} from "antd";
import {useCrypto} from "../context/crypto-context.jsx";
import Coininfo from "./Coininfo.jsx";

const validateMessage = {
    required: '${label} is required',
    types: {
        number: "${label} is not valid number"
    },
    number: {
        range: "${label} must be between ${min} and ${max}",
    },
}

export default function AddAssetsForm({onClose}) {
    const [form] = Form.useForm()
    const {crypto,addAssets} = useCrypto()
    const [coin, setCoin] = useState(null)
    const [submitted, setSubmitted] = useState(false)
    const assetsRef = useRef()


    if (submitted) {
        return (
            <Result
                status="success"
                title="New Assets Added"
                subTitle={`Added ${assetsRef.current.amount} of ${coin.name} by price${assetsRef.current.price}`}
                extra={[
                    <Button type="primary" key="console" onClick={onClose}>
                        Go Console
                    </Button>
                ]}
            />
        )
    }

    if (!coin) {
        return <Select
            style={{
                width: "100%",
            }}
            onSelect={v => setCoin(crypto.find(c => c.id === v))}
            placeholder="select Coin"
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
    }

    function onFinish(value) {
        const newAsset = {
            id:coin.id,
            amount:value.amount,
            price:value.price,
            date:value.date?.$d ?? new Date()
        }
        assetsRef.current = newAsset
        setSubmitted(true)
        addAssets(newAsset)
    }

    function handleAmountChange(value) {
        const price = form.getFieldValue("price")
        form.setFieldsValue({
            total: +(value * price).toFixed(2)
        })
    }

    function handlePriceChange(value) {
        const amount = form.getFieldValue("amount")
        form.setFieldsValue({
            total: +(amount * value).toFixed(2)
        })
    }

    return (
        <Form
            form={form}
            name="basic"
            labelCol={{
                span: 4,
            }}
            wrapperCol={{
                span: 10,
            }}
            style={{
                maxWidth: 600,
            }}
            initialValues={{
                price: +coin.price.toFixed(2)
            }}
            onFinish={onFinish}
            validateMessages={validateMessage}
        >

            <Coininfo coin={coin}/>
            <Divider/>

            <Form.Item
                label="Amount"
                name="amount"
                rules={[
                    {
                        required: true,
                        type: "number",
                        min: 0,
                    },
                ]}
            >
                <InputNumber
                    placeholder="Enter coin amount"
                    onChange={handleAmountChange}
                    style={{width: "100%"}}

                />
            </Form.Item>
            <Form.Item label="Price" name="price">
                <InputNumber onChange={handlePriceChange} style={{width: "100%"}}/>
            </Form.Item>
            <Form.Item label="Date & Time" name="date">
                <DatePicker showTime />
            </Form.Item>
            <Form.Item label="Total" name="total">
                <InputNumber disabled style={{width: "100%"}}/>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Add Assets
                </Button>
            </Form.Item>
        </Form>
    )
}
