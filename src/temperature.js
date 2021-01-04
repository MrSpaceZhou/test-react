import React from "react";

// 全局声明输入框对象
const scaleName={
    c:"Celsius",
    f:"Fahrenheit",
};

// 华氏 转 摄氏算法
function toCelsius(fahrenheit){
    return(fahrenheit -32) *5 / 9;
}

// 摄氏 转 华氏算法
function toFahrenheit(celsius){
    return(celsius * 9 / 5) + 32;
}

// 过滤输入为非数字时，返回为空
function tryConvert(temperature,convert){
    const input = parseFloat(temperature);
    if(Number.isNaN(input)){
        return "";
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000)/1000;
    return rounded.toString();
}

// 提示开水的组件
function BoilingVerdict(props){
    return props.celsius >=100
        ? <p>The water would boil.</p>
        : <p>The water would not boil.</p>
}

// 温度输入框组件
class  TemperatureInput extends React.Component{
    constructor(props){
        super(props);
        // this.state={temperature: " "};
        this.handleChange= this.handleChange.bind(this);
    }
    handleChange(event){
        // this.setState({temperature: event.target.value});
        this.props.onTemperatureChange(event.target.value);
    }

    render(){
        const temperature= this.props.temperature;
        const scale= this.props.scale;
        return(
            <fieldset>
                <legend>Enter temperature in {scaleName[scale]}</legend>
                <input
                    value={temperature}
                    onChange={this.handleChange} />
            </fieldset>
        );
    }
}

// 温度计算器父组件
class Calculator extends React.Component{
    constructor(props){
        super(props);
        this.state={                        //组件使用同一个state，同步更新数据，通过输入框类型去改变数据类型，调用转换方法
            temperature: "",
            scale:"",
        };
        this.handleCelsiusChange=this.handleCelsiusChange.bind(this);
        this.handleFahrenheitChange=this.handleFahrenheitChange.bind(this);
    }

    handleCelsiusChange(temperature){
        this.setState({scale:"c",temperature});
    }

    handleFahrenheitChange(temperature){
        this.setState({scale:"f",temperature});
    }

    render(){
        const scale= this.state.scale;
        const temperature = this.state.temperature;
        const celsius= scale === "f"? tryConvert(temperature,toCelsius):temperature;
        const fahrenheit = scale === "c"? tryConvert(temperature,toFahrenheit):temperature;

        return(
            <div>
                <TemperatureInput
                    scale="c"
                    temperature={celsius}
                    onTemperatureChange={this.handleCelsiusChange}/>
                <TemperatureInput
                    scale="f"
                    temperature={fahrenheit}
                    onTemperatureChange={this.handleFahrenheitChange}/>
                <BoilingVerdict
                    celsius={parseFloat(celsius)} />
            </div>
        );
    }
}
export default Calculator;