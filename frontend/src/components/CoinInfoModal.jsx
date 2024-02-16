import {Flex, Tag, Typography, Divider} from "antd"
import Coininfo from "./Coininfo.jsx";

// eslint-disable-next-line react/prop-types
export default function CoinInfoModal({coin}) {
    return (
        <>
         <Coininfo coin={coin} withSymbol/>
            <Divider/>
            <Typography.Paragraph>
                <Typography.Text strong> 1 hour:</Typography.Text>
                {/* eslint-disable-next-line react/prop-types */}
                <Tag color={coin.priceChange1h > 0 ? "green" : 'red'}>
                    {/* eslint-disable-next-line react/prop-types */}
                    {coin.priceChange1h}
                </Tag>
                <Typography.Text strong> 1 day:</Typography.Text>
                {/* eslint-disable-next-line react/prop-types */}
                <Tag color={coin.priceChange1d > 0 ? "green" : 'red'}>
                    {/* eslint-disable-next-line react/prop-types */}
                    {coin.priceChange1d}
                </Tag>
                <Typography.Text strong> 1 week:</Typography.Text>
                {/* eslint-disable-next-line react/prop-types */}
                <Tag color={coin.priceChange1w > 0 ? "green" : 'red'}>
                    {/* eslint-disable-next-line react/prop-types */}
                    {coin.priceChange1w}
                </Tag>
            </Typography.Paragraph>
            <Typography.Paragraph>
                <Typography.Text strong>Price:</Typography.Text>
                {coin.price.toFixed(2)}$
            </Typography.Paragraph>
            <Typography.Paragraph>
                <Typography.Text strong>Price BTC:</Typography.Text>
                {coin.priceBtc}
            </Typography.Paragraph>
            <Typography.Paragraph>
                <Typography.Text strong>Market Cap:</Typography.Text>
                {coin.marketCap}$
            </Typography.Paragraph>
            {
                coin.contractAddress &&
                <Typography.Paragraph>
                    <Typography.Text strong>Contract Address:</Typography.Text>
                    {coin.contractAddress}
                </Typography.Paragraph>
            }

        </>
    )
}
