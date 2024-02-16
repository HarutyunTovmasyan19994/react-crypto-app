import {Flex, Typography} from "antd";

export default function Coininfo({coin,withSymbol}){
return(
    <Flex>
        <img
            src={coin.icon}
            alt={coin.name}
            style={{width: 40, marginRight: 10}}
        />
        <Typography.Title level={2}>
            {withSymbol && <span>({coin.symbol})</span>}
            {coin.name}
        </Typography.Title>
    </Flex>
)
}
