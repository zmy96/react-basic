import { Component } from 'react'
// 3. css样式
import './index.css'
// 导入图片
import tx from './images/avatar.png'

import dayjs from 'dayjs'
class App extends Component {
  // 2. 逻辑
  // 评论的数据(假数据)
  state = {
    // hot: 热度排序  time: 时间排序
    tabs: [
      {
        id: 1,
        name: '热度',
        type: 'hot',
      },
      {
        id: 2,
        name: '时间',
        type: 'time',
      },
    ],
    active: 'time', // 当前选中的tab
    content:'',
    // 评论列表数据
    list: [
      {
        id: 1,
        author: '刘德华',
        comment: '给我一杯忘情水',
        time: new Date('2021-10-10 09:09:00'),
        // 1: 点赞 0：无态度 -1:踩
        attitude: 1,
      },
      {
        id: 2,
        author: '周杰伦',
        comment: '哎哟，不错哦',
        time: new Date('2021-10-11 09:09:00'),
        // 1: 点赞 0：无态度 -1:踩
        attitude: 0,
      },
      {
        id: 3,
        author: '五月天',
        comment: '不打扰，是我的温柔',
        time: new Date('2021-10-11 10:09:00'),
        // 1: 点赞 0：无态度 -1:踩
        attitude: -1,
      },
    ],
  }
  /**
   *  == 点击切换tab栏 ==
   * 1. 绑定点击事件
   * 2. 根据当前点击的type值处理切换
   * @returns
   */
  /**
   *
   * @param {*} type 当前选中的type值
   */
  switchTab = (type, e) => {
    console.log('当前点击type：', type, e)
    this.setState({
      active: type,
    })
  }

  // 格式化方法
  formatTime = (time) => {
    return dayjs(time).format('YYYY年MM月DD日')
  }
  handleChange=(e)=>{
    this.setState({
      content:e.target.value
    }
     
    )
  }
  // 添加评论
  add=()=>{
    if(!this.state.content.trim()){
      return alert('评论内容不能为空')
    }
    console.log('获取新增评论：',this.state.content);
    const listAdd={
      id:Date.now(),  
      author:'迪丽热巴'+ Math.floor(Math.random()*5),
      comment:this.state.content,
      time:new Date(),
      attitude:0
    }
    this.setState({
      list:[listAdd,...this.state.list]
    })
    console.log(Date.now());

  }
  // 删除评论
  del=(id)=>{
  console.log(id);
  const NewArr=this.state.list.filter(item=>item.id!==id)
  this.setState({
  list:NewArr
  })
  }
  // 修改点赞状态
  changeatu=(id,attitude)=>{
    const newList1=this.state.list.map((item=>{
      if(item.id===id){
        return {
          ...item,
          attitude
        }
      }else{
        return item
      }
    }))
     
    this.setState({
       list:newList1
    })
  }
  // 1. html
  render() {
    return (
      <div className="App">
        <div className="comment-container">
          {/* 评论数 */}
          <div className="comment-head">
            <span>{this.state.list.length} 评论</span>
          </div>
          {/* 排序 */}
          <div className="tabs-order">
            <ul className="sort-container">
              {/* 1. tab列表渲染 */}
              {/* <li className="on">按热度排序</li>
            <li>按时间排序</li> */}
              {this.state.tabs.map((item) => (
                // className="on" 写死的
                // className={}   动态绑定(使用)
                <li
                  // react传参技巧：函数套函数
                  // 获取event对象
                  onClick={(e) => {
                    // console.log(e)
                    this.switchTab(item.type, e)
                  }}
                  key={item.id}
                  className={this.state.active === item.type ? 'on' : ''}>
                  按{item.name}排序
                </li>
              ))}
            </ul>
          </div>

          {/* 添加评论 */}
          <div className="comment-send">
            <div className="user-face">
              <img className="user-head" src={tx} alt="" />
            </div>
            <div className="textarea-container">
              <textarea
                cols="80"
                rows="5"
                placeholder="发条友善的评论"
                className="ipt-txt"
                value={this.state.content.value}
                onChange={this.handleChange}
              />
              <button className="comment-submit" onClick={this.add}>发表评论</button>
            </div>
            <div className="comment-emoji">
              <i className="face"></i>
              <span className="text">表情</span>
            </div>
          </div>

          {/* 评论列表 */}
          <div className="comment-list">
            {this.state.list.map((item) => (
              // 重复的结构
              <div className="list-item" key={item.id}>
                <div className="user-face">
                  <img className="user-head" src={tx} alt="" />
                </div>
                <div className="comment">
                  <div className="user">{item.author}</div>
                  <p className="text">{item.comment}</p>
                  <div className="info">
                    {/* 对象不能绑定渲染 */}
                    <span className="time">{this.formatTime(item.time)}</span>
                    {/* 对评论点赞 */}
                    {/* 
                     // 1: 点赞 0：无态度 -1:踩
                     数据： item.attitude
                     className="like liked" 写死
                     className={}
                     逻辑：
                     1. 不点赞（踩）：类名 = like
                     2. 点赞：类名 = like liked
                    */}
                    <span onClick={()=>{
                     this.changeatu(item.id,item.attitude===1?0:1) 
                    }}
                      className={item.attitude === 1 ? 'like liked' : 'like'}>
                      <i className="icon" />
                    </span>
                    {/* 对评论踩 */}
                    <span
                    onClick={()=>{
                      this.changeatu(item.id,item.attitude===-1?0:-1) 
                     }}
                      className={item.attitude === -1 ? 'hate hated' : 'hate'}>
                      <i className="icon" />
                    </span>
                    <span className="reply btn-hover" onClick={()=>{
                      this.del(item.id)
                    }}>删除</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}
export default App
