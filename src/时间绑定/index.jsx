import { Component } from "react"

class App extends Component {
  // handlerClick(e){
  //   console.log(e.target);
  // }
  handlerClick=()=>{
    this.setState({
      count:10
    })
  }
  handlerClick1=()=>{
   console.log('获取表单输入的值:',this.state.count)
  }
  state ={
    count:0,
    info:{
      name:'张三',
      age:18
    }
    
  }
   // 输入框输入变化执行
   changeValue = (e) => {
    // 获取输入框最新值：e.target.value
    // console.log(e.target.value)
    this.setState({
      count: e.target.value,
    })
  }
  render(){
    return(
      <div>
        <div>计数器:{this.state.count} 
      </div>,
      <button onClick={this.handlerClick}>按钮</button>,
      <div>姓名：{this.state.info.name} 年龄：{this.state.info.age}</div>
      <input type="text" 
      value={this.state.count} 
      onChange={this.changeValue}
      />
      <button onClick={this.handlerClick1}>登录</button>
      </div>
      
    )

  }
}
export default App