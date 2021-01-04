import React from 'react';
import ReactDOM from 'react-dom';
import Calculator from './temperature'
import WelcomeDialog from "./combined"
import FilterableProductTable from "./filterable"
// import './index.css';
// import App from './App';
// import Counter from './Counter';
// import reportWebVitals from './reportWebVitals';

// function formantName(user){
//     return user.firstName+ " " + user.lastName;
// }
// const user = {
//     firstName: "Hello",
//     lastName: "World!",
// };
// const element = (
//     <div>
//         <h1>Hello {formantName(user)}!</h1>
//         <h2>It is {new Date().toLocaleTimeString()}.</h2>
//     </div>
// );

// function Welcome(props){
//     return <h1>Welcome,{props.name}</h1>
// };
//
// const element =(
//     <div>
//         <Welcome name="Home1" />
//         <Welcome name="Home2" />
//         <Welcome name="Home3" />
//     </div>
//    );
/*-------------------------------计时器------------------------------------*/
class Clock extends React.Component {
    constructor(props){
        super(props);
        this.state={
            date: new Date()
        };
    }
//生命周期函数，加载后渲染后调用
    componentDidMount(){
        this.timerId = setInterval(
            ()=> this.tick(),
            1000
        );
    }
//生命周期函数，卸载前清理
    componentWillUnmount() {
        clearInterval(this.timerId);
    }
//计时器方法
    tick(){
        this.setState({
            date: new Date()
        });
    }

//渲染Clock组件
    render() {
        return (
            <div>
                <h1>Hello World!</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}</h2>
            </div>
        );
    }
}

/*-------------------------------是否按钮------------------------------------*/
class YNButton extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isClick: true
        };
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(){
        this.setState(state => ({
            isClick: !state.isClick
        }));
    }

    render() {
        return (
            <button onClick={this.handleClick}>
                {this.state.isClick ? "Yes" : "No"}
            </button>
        )
    }
}
/*-------------------------------按条件展示的登录登出按钮------------------------------------*/
class LonginControl extends React.Component{
    constructor(props){
        super(props);
        this.state={isLoggedIn: false};
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
    }

    handleLoginClick(){
        this.setState({isLoggedIn :true});
    }

     handleLogoutClick(){
        this.setState({isLoggedIn :false});
     }
//function for 显示内容
     render(){
        const isLoggedIn = this.state.isLoggedIn;
        let button;
        // if(isLoggedIn){
        //     button =<LogoutButton onClick={this.handleLogoutClick} />
        // }else{
        //     button =<LoginButton onClick={this.handleLoginClick} />
        // }
         button = isLoggedIn
             ? <LogoutButton onClick={this.handleLogoutClick}/>
             :<LoginButton onClick={this.handleLoginClick} />
        return(
            <div>
                <Greeting isLoggedIn={isLoggedIn} />
                {button}
            </div>
        )
     }

}
//登入按钮组件
function LoginButton(props){
    return(
        <button onClick={props.onClick}>
            Login
        </button>
    );
}
//登出按钮组件，带参需要props
function LogoutButton(props){
    return(
        <button onClick={props.onClick}>
            Logout
        </button>
    )
}
//登入文本提示,不带参不需要props
function UserGreeting(){
        return <h1>Welcome back!</h1>;
}
//登出文本提示
function GuestGreeting(){
        return <h1>Please sign up.</h1>
}
//根据条件展示文本
function Greeting(props){
        const isLoggedIn = props.isLoggedIn;
        if(isLoggedIn){
            return <UserGreeting />;
        }
        return <GuestGreeting />;
}

/*-------------------------------名字提交组件-------------------------------------*/
class NameForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            value: " "
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit= this.handleSubmit.bind(this);
    }
    handleChange(event){
        this.setState({value:event.target.value});
    }
    handleSubmit(event){
        alert("提交的名字：" + this.state.value);
        event.preventDefault();
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <label>
                    名字：
                    <input type="text" placeholder="大爷来玩啊~~" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="提交" />
            </form>
        );
    }

}



/*-------------------------------textarea标签使用---------------------------------*/

class EssayForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            value:"Try It!",
        };
        this.handleChange= this.handleChange.bind(this);
        this.handleSubmit= this.handleSubmit.bind(this);
    }

    handleChange(event){
        this.setState({value:event.target.value});
    }

    handleSubmit(event){
        alert("提交的文章：" + this.state.value);
        event.preventDefault();
    }
    render(){
        return(
          <form onSubmit={this.handleSubmit}>
              <label>
                  文章：
                  <textarea value={this.state.value} onChange={this.handleChange} />
              </label>
              <input type="submit" value="提交" />
          </form>
        );
    }
}

/*-------------------------------select标签的使用--------------------------------*/

class FlavorForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
          value:"coconut",
        };
        this.handleChange= this.handleChange.bind(this);
        this.handleSubmit= this.handleSubmit.bind(this);
    }

    handleChange(event){
        this.setState({value:event.target.value});
    }

    handleSubmit(event){
        alert("你喜欢的项目是："+ this.state.value);
        event.preventDefault();
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <label>
                    <select onChange={this.handleChange} value={this.state.value}>
                        <option value="毒龙钻">毒龙钻</option>
                        <option value="漫游">漫游</option>
                        <option value="B52" >B52</option>
                    </select>
                </label>
                <input type="submit" value="开车！" />
            </form>
        );
    }
}
/*-------------------------------处理多个输入-------------------------------------*/

class Reservation extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isGoing: true,
            numberOfGuests: 2,
        };
        this.handleInputChange= this.handleInputChange.bind(this);
    }

    handleInputChange(event){
        const target= event.target;
        const value= target.type === "checkbox" ? target.checked : target.value;
        const name= target.name;

        this.setState({[name]: value});
    }
    render(){
        return(
            <form>
                <label>
                    参与：
                    <input
                        name="isGoing"
                        type="checkbox"
                        checked={this.state.isGoing}
                        onChange={this.handleInputChange}/>
                </label>
                <br/>
                <label>
                    来宾人数：
                    <input
                        name="numberOfGuests"
                        type="number"
                        value={this.state.numberOfGuests}
                        onChange={this.handleInputChange}/>
                </label>
            </form>
        )
    }
}

/*--------------------------------数据-----------------------------------------------*/

const PRODUCTS =[
    {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
    {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
    {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
    {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
    {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
    {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];


/*-------------------------------统一渲染区域------------------------------------*/
function App(){
    return(
        <div>
            <Clock />
            <Clock />
            <Clock />
            <br/>
            <LonginControl />
            <br/>
            <YNButton />
            <br/>
            <NameForm />
            <br/>
            <EssayForm />
            <br/>
            <FlavorForm />
            <br/>
            <Reservation />
            <br/>
            <Calculator />
            <br/>
            <WelcomeDialog />
            <br/>
            <FilterableProductTable products={PRODUCTS}/>
        </div>
    )
}


ReactDOM.render(
    // element,
    // element2,
    // <h1>Hello World!</h1>,
    <App />,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
