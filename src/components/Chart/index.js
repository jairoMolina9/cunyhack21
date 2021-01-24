import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  } from 'recharts';
import { Button, Image, Alert } from "react-bootstrap";

function Chart(props) {
    let symbol = props.symbol;
    let range = '1d';
    const [hStyle, setStyle] = useState();
    const [data, setData] = useState([]);
    const [companyName, setComapanyName] = useState();
    const [logoURL, setLogoURL] = useState();
    const [change, setChange] = useState();
    const [changePercent, setChangePercent] = useState();
    const [latestPrice, setLatestPrice] = useState();

    async function getData() {
        
        const result = await axios.get('https://cloud.iexapis.com/stable/stock/'+symbol+'/chart/'+range+'?token=pk_27a025c39ecd47fd8a262d5fd76ad215')
        
        setData(result.data)
    }

    async function getQuote(param) {
        const result = await axios.get('https://cloud.iexapis.com/stable/stock/'+symbol+'/quote/'+param+'?token=pk_27a025c39ecd47fd8a262d5fd76ad215')
        
        if(param === 'change') {
            if(result.data < 0){
                setStyle({color: 'red', fontWeight: 'bold'});
            } else {
                setStyle({color: 'green', fontWeight: 'bold'});
            }

            setChange(result.data);
        } else if(param === 'changePercent') {
            setChangePercent( (result.data * 100).toFixed(2));
        } else {
            setLatestPrice(result.data);
        }
    }

    async function getCompanyData() {
        const result = await axios.get('https://cloud.iexapis.com/stable/stock/'+symbol+'/company?token=pk_27a025c39ecd47fd8a262d5fd76ad215')
        setComapanyName(result.data.companyName)
    }

    async function getCompanyLogo() {
        const result = await axios.get('https://cloud.iexapis.com/stable/stock/'+symbol+'/logo?token=pk_27a025c39ecd47fd8a262d5fd76ad215')
        setLogoURL(result.data.url)
    }

    useEffect(() => {
        getData();
        getCompanyData();
        getCompanyLogo();
        getQuote('latestPrice');
        getQuote('change');
        getQuote('changePercent');
    },[]);
    
    return (
        <div>
            <Image src={logoURL} roundedCircle />
            
            <h1>{companyName} | ${latestPrice} USD</h1>
            <h2 style={hStyle}>{change} | {changePercent}%</h2>
            <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <XAxis hide = "true" dataKey="label" domain={['dataMin','dataMax']} angle={30}/>
        <YAxis hide = "true" type="number" domain={['dataMin','dataMax']}/>
        <Tooltip label = "label"/>
        <Line name = "USD" dot={false} type="monotone" dataKey="close" stroke="#82ca9d" />
      </LineChart>
        <Button variant="outline-success" onClick={()=> {range = '1d'; getData();}}> 1D </Button>{' '}
        <Button variant="outline-success" onClick={()=> {range = '5dm'; getData();}}> 5D </Button>{' '}
        <Button variant="outline-success" onClick={()=> {range = '1m'; getData();}}> 1M </Button>{' '}
        <Button variant="outline-success" onClick={()=> {range = '6m'; getData();}}> 6M </Button>{' '}
        <Button variant="outline-success" onClick={()=> {range = '1y'; getData();}}> 1Y </Button>
        </div>
        
        
    );
}

export default Chart;
