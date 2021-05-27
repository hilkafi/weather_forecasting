import React from 'react'
import { SunnyHigh, CloudDrizzle, CloudLighting, CloudRain, Snow, CloudHaze, Cloudy } from './WeatherIcons'

const GetIcon = ({code}) => {
    
    if(code >= 801 && code <= 804){
        return (<Cloudy />)
    }else if(code == 800){
        return <SunnyHigh />
    }else if(code >=701 && code <= 781){
        return <CloudHaze />
    }else if(code >= 600 && code <= 622){
        return <Snow />
    }else if(code >= 500 && code <= 531){
        return <CloudRain />
    }else if(code >= 300 && code <= 321) {
        return <CloudDrizzle />
    }else if(code >= 200 && code <= 232){
        return <CloudLighting />
    }

}

export default GetIcon;
