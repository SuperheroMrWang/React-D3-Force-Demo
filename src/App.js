import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as d3 from 'd3';
import graph from './miserables.json';
import { DatePicker, Button, message, Layout, Menu, Breadcrumb, Icon,BackTop} from 'antd';
import 'antd/dist/antd.css';

// 布局
const { Header, Content, Footer, Sider } = Layout;
// const { SubMenu } = Menu;		// 第一种布局用到
const SubMenu = Menu.SubMenu;

// enter() : 获得数据集中比DOM元素集中多出来的数据
// exit() ：获得DOM元素集中比数据集中多出来的数据

class App extends Component {
	componentWillMount(){
		// 在渲染前调用,在客户端也在服务端。
		console.log('---componentWillMount---');
		this.renderRectSvg();
	};
	componentDidMount(){
		// 在第一次渲染后调用，只在客户端。之后组件已经生成了对应的DOM结构，可以通过this.getDOMNode()来进行访问。 如果你想和其他JavaScript框架一起使用，可以在这个方法中调用setTimeout, setInterval或者发送AJAX请求等操作(防止异部操作阻塞UI)。
		console.log('---componentDidMount---');
		console.log('---graph---', graph);
		this.renderForceSvg();
	};
	componentWillReceiveProps(){
		//  在组件接收到一个新的 prop (更新后)时被调用。这个方法在初始化render时不会被调用。
		console.log('---componentWillReceiveProps---');
	};
	shouldComponentUpdate(nextProps, nextState){
		// 返回一个布尔值。在组件接收到新的props或者state时被调用。在初始化时或者使用forceUpdate时不被调用。 
		// 可以在你确认不需要更新组件时使用
		console.log(nextProps, nextState,'---shouldComponentUpdate---');
		return true;
	};
	componentWillUpdate(){
		// 在组件接收到新的props或者state但还没有render时被调用。在初始化时不会被调用。
		console.log('---componentWillUpdate---');
	};
	componentDidUpdate(){
		//  在组件完成更新后立即调用。在初始化时不会被调用。
		console.log('---componentDidUpdate---');
	};
	componentWillUnmount(){
		// 在组件从 DOM 中移除的时候立刻被调用。
		console.log('---componentWillUnmount---');
	};
	// 第二种布局 --- 事件
	state = {
		collapsed: false,
		mode: 'inline',
	};
	onCollapse = (collapsed) => {
		console.log(collapsed);
		this.setState({
			collapsed,
			mode: collapsed ? 'vertical' : 'inline',
		});
	}
	// 
	renderRectSvg() {
		var width = 300,
				height = 300;     // 画布宽高
		var dataset = [250, 210, 170, 130, 90];  // 数据（表示矩形的宽度）
		var rectHeight = 25;   // 每个矩形所占的像素高度(包括空白)
		// 线性比例尺
		var linear = d3.scaleLinear()
			.domain([0, d3.max(dataset)])
			.range([0, 250]);
		var svg = d3.select('body')
			.append('svg')
			.style('width',width)
			.style('height',height);
		var rects = svg.selectAll("rect")  // 选择svg内所有的矩形
			.data(dataset)  //  绑定数据
			.enter()    //  指定选择集的enter部分
			.append("rect")   // 添加enter部分数量的rect矩形元素
			.attr("x", 40)
			.attr("y", function (d, i) {
				return i * rectHeight;
			})
			.transition()
			.duration(1000)
			// .ease("bounce")		// 效果 - 不好使
			// .delay(function (d, i) {	//延时 -  不好使
			// 	return 200 * i;
			// })
			.attr("width", function (d) {
				return linear(d);
			})
			.attr("height", rectHeight - 2)
			.attr("fill", "steelblue");
		
		
			// 过渡动画 - 不好使
			// .transition()
			// .duration(3000)
			// .ease("bounce")
			// .delay(function (d, i) {	//延时
			// 	return 200 * i;
			// })

		// var axis = d3.svg.axis()
		//   .scale(linear)      //指定比例尺
		//   .orient("bottom")   //指定刻度的方向
		//   .ticks(7);          //指定刻度的数量
		// svg.append("g")
		//   .attr("class", "axis")
		//   .attr("transform", "translate(20,130)")
		//   .call(axis);

		// 不好使
		// var circle = svg.append("circle");
		// circle.on("click", function () {
		//   //在这里添加交互内容
		//   console.log('this is a circle');
		// });

		// 点击事件
		// rects.on('click',function (val,index,arr) {
		// 	console.log(val,index,arr);
		// });

		// 不好使
		// var rects = svg.selectAll(".MyRect")
		//   .data(dataset)
		//   .enter()
		//   .append("rect")
		//   .attr("class", "MyRect")   //把类里的 fill 属性清空
		//   .attr("transform", "translate(" + padding.left + "," + padding.top + ")")
		//   .attr("x", function (d, i) {
		//     return xScale(i) + rectPadding / 2;
		//   })
		//   .attr("y", function (d) {
		//     return yScale(d);
		//   })
		//   .attr("width", xScale.rangeBand() - rectPadding)
		//   .attr("height", function (d) {
		//     return height - padding.top - padding.bottom - yScale(d);
		//   })
		//   .attr("fill", "steelblue")       //填充颜色不要写在CSS里
		//   .on("mouseover", function (d, i) {
		//     d3.select(this)
		//       .attr("fill", "yellow");
		//   })
		//   .on("mouseout", function (d, i) {
		//     d3.select(this)
		//       .transition()
		//       .duration(500)
		//       .attr("fill", "steelblue");
		//   });

		// 饼图
		// var pie = d3.pie();
		// var piedata = pie(dataset);
		// // 弧生成器
		// var outerRadius = 150; //外半径
		// var innerRadius = 0; //内半径，为0则中间没有空白
		// var arc = d3.arc()  //弧生成器
		//   .innerRadius(innerRadius)   //设置内半径
		//   .outerRadius(outerRadius);  //设置外半径
		// var arcs = svg.selectAll("g")
		//   .data(piedata)
		//   .enter()
		//   .append("g")
		//   .attr("transform", "translate(" + (width / 2) + "," + (width / 2) + ")");
		// arcs.append("path")
		//   .attr("fill", function (d, i) {
		//     return color(i);
		//   })
		//   .attr("d", function (d) {
		//     return arc(d);   //调用弧生成器，得到路径值
		//   });
		// var color = d3.category10();   //有十种颜色的颜色比例尺
		// arcs.append("text")
		//   .attr("transform", function (d) {
		//     return "translate(" + arc.centroid(d) + ")";
		//   })
		//   .attr("text-anchor", "middle")
		//   .text(function (d) {
		//     return d.data;
		//   });
		
		// 力导向图
		// var nodes = [{ name: "桂林" }, { name: "广州" },
		// { name: "厦门" }, { name: "杭州" },
		// { name: "上海" }, { name: "青岛" },
		// { name: "天津" }];

		// var edges = [{ source: 0, target: 1 }, { source: 0, target: 2 },
		// { source: 0, target: 3 }, { source: 1, target: 4 },
		// { source: 1, target: 5 }, { source: 1, target: 6 }];

		// var force = d3.layout.force()
		//   .nodes(nodes) //指定节点数组
		//   .links(edges) //指定连线数组
		//   .size([width, height]) //指定作用域范围
		//   .linkDistance(150) //指定连线长度
		//   .charge([-400]); //相互之间的作用力
		// force.start();    //开始作用
		// console.log(nodes,edges);
		// index：节点的索引号
		// px, py：节点上一个时刻的坐标
		// x, y：节点的当前坐标
		// weight：节点的权重
		// line，线段，表示连线。
		// circle，圆，表示节点。
		// text，文字，描述节点。
		//添加连线 
		// var svg_edges = svg.selectAll("line")
		//   .data(edges)
		//   .enter()
		//   .append("line")
		//   .style("stroke", "#ccc")
		//   .style("stroke-width", 1);

		// var color = d3.scale.category20();

		// //添加节点 
		// var svg_nodes = svg.selectAll("circle")
		//   .data(nodes)
		//   .enter()
		//   .append("circle")
		//   .attr("r", 20)
		//   .style("fill", function (d, i) {
		//     return color(i);
		//   })
		//   .call(force.drag);  //使得节点能够拖动

		// //添加描述节点的文字
		// var svg_texts = svg.selectAll("text")
		//   .data(nodes)
		//   .enter()
		//   .append("text")
		//   .style("fill", "black")
		//   .attr("dx", 20)
		//   .attr("dy", 8)
		//   .text(function (d) {
		//     return d.name;
		//   });
		// force.on("tick", function () { //对于每一个时间间隔
		//   //更新连线坐标
		//   svg_edges.attr("x1", function (d) { return d.source.x; })
		//     .attr("y1", function (d) { return d.source.y; })
		//     .attr("x2", function (d) { return d.target.x; })
		//     .attr("y2", function (d) { return d.target.y; });

		//   //更新节点坐标
		//   svg_nodes.attr("cx", function (d) { return d.x; })
		//     .attr("cy", function (d) { return d.y; });

		//   //更新文字坐标
		//   svg_texts.attr("x", function (d) { return d.x; })
		//     .attr("y", function (d) { return d.y; });
		// });
		
		//    用于坐标轴的线性比例尺
		var xScale = d3.scaleLinear().domain([0, 10]).range([0, 300]);
		var yScale = d3.scaleLinear().domain([10, 0]).range([0, 300]);
		//    定义坐标轴
		var xAxis = d3.axisBottom().scale(xScale);
		var yAxis = d3.axisLeft().scale(yScale)
			// .orient('left')  // 刻度与坐标轴方向
			// .ticks(5) // 分成5等分，有时d3会根据可用空间和它自己的计算多画几个或者少画几个
			// .tickSubdivide(4) // 每个大刻度之间再画4个等分刻度
			// .tickPadding(10)  // 刻度值与坐标轴之间的距离
			.tickFormat(function (v) { // 格式化刻度值
				return v + '天';
			});
		//    在svg中添加一个包含坐标轴各元素的g元素
		var gAxis = svg.append("g").attr("transform", "translate(40,280)");		//	平移到坐标（20,80）
		var ggAxis = svg.append("g").attr("transform", "translate(40,-20)");
		//    在gAxis中绘制坐标轴
		xAxis(gAxis);
		yAxis(ggAxis);
		// var axis_x = d3.svg.axis().scale(scale_x)
		// 	.orient('top')  // 刻度与坐标轴方向
		// 	.ticks(5) // 分成5等分，有时d3会根据可用空间和它自己的计算多画几个或者少画几个
		// 	.tickSubdivide(4) // 每个大刻度之间再画4个等分刻度
		// 	.tickPadding(10)  // 刻度值与坐标轴之间的距离
		// 	.tickFormat(function (v) { // 格式化刻度值
		// 		return v + '天';
		// 	});

		
		var rect = svg.selectAll('rect');
		console.log(this,d3,svg,rect,'--this,d3,svg,rect--');


	};
	// 力导向图
	renderForceSvg() {
		// zoom 缩放
		var zoom = d3.zoom()
			.scaleExtent([1 / 10, 10])
			.on('zoom', zoomed);
		// color 颜色
		var color = d3.scaleOrdinal(d3.schemeCategory10);

		var svg = d3.select(".force-svg")
			.call(zoom),
			width = +svg.attr("width"),
			height = +svg.attr("height");

		var simulation = d3.forceSimulation()
			.force("link", d3.forceLink().id(function (d) { return d.id; }))
			.force("charge", d3.forceManyBody())
			.force("center", d3.forceCenter(width / 2, height / 2));

		// d3.json("public/miserables.json", function (error, graph) {
			// if (error) throw error;

			var link = svg.append("g")
				.attr("class", "links")
				.selectAll("line")
				.data(graph.links)
				.enter().append("line");

			var node = svg.append("g")
				.attr("class", "nodes")
				.selectAll("circle")
				.data(graph.nodes)
				.enter().append("circle")
				.attr("r", 5)
				.attr("fill",function (d) {
					return color(d.group);
				})
				.call(d3.drag()
					.on("start", dragstarted)
					.on("drag", dragged)
					.on("end", dragended))
				.on('click',clickNode);

			node.append("title")
				.text(function (d) { return d.id; });

			simulation
				.nodes(graph.nodes)
				.on("tick", ticked);

			simulation.force("link")
				.links(graph.links);

			function ticked() {
				link
					.attr("x1", function (d) { return d.source.x; })
					.attr("y1", function (d) { return d.source.y; })
					.attr("x2", function (d) { return d.target.x; })
					.attr("y2", function (d) { return d.target.y; });

				node
					.attr("cx", function (d) { return d.x; })
					.attr("cy", function (d) { return d.y; });
			}
		// });

		function dragstarted(d) {
			if (!d3.event.active) simulation.alphaTarget(0.3).restart();
			d.fx = d.x;
			d.fy = d.y;
		}
		// dragged 拖拽
		function dragged(d) {
			// console.log(d3.event.x,d3.event.y,d3.event);
			// 第一种方法
			d.fx = d3.event.x;
			d.fy = d3.event.y;
			// 第二种方法
			// d3.event.subject.fx = d3.event.x;
			// d3.event.subject.fy = d3.event.y;
		}

		function dragended(d) {
			if (!d3.event.active) simulation.alphaTarget(0);
			d.fx = null;
			d.fy = null;
		}
		// zoom 缩放
		function zoomed() {
			svg.selectAll('g').attr('transform',d3.zoomTransform(this));
		}
		// 点击节点事件
		function clickNode(d,i,arr) {
			console.log(d,i,arr);
		}

	};
	constructor(props) {
		super(props);
		this.state = {
			date: '',
		};
	};
	handleChange(date) {
		console.log(date, '---date---');
		message.info('您选择的日期是: ' + date.toString());
		this.setState({ date });
	};
	render() {
		return (
			<div className="App">
				{/* <Layout>
					<Header>Header</Header>
					<Layout>
						<Sider>Sider</Sider>
						<Content>Content</Content>
					</Layout>
					<Footer>Footer</Footer>
				</Layout> */}

				{/* 顶部-侧边布局-通栏 */}
				{/* <Layout>
					<Header className="header">
						<div className="logo" />
						<Menu
							theme="dark"
							mode="horizontal"
							defaultSelectedKeys={['2']}
							style={{ lineHeight: '64px' }}
						>
							<Menu.Item key="1">nav 1</Menu.Item>
							<Menu.Item key="2">nav 2</Menu.Item>
							<Menu.Item key="3">nav 3</Menu.Item>
						</Menu>
					</Header>
					<Layout>
						<Sider width={200} style={{ background: '#fff' }}>
							<Menu
								mode="inline"
								defaultSelectedKeys={['1']}
								defaultOpenKeys={['sub1']}
								style={{ height: '100%' }}
							>
								<SubMenu key="sub1" title={<span><Icon type="user" />subnav 1</span>}>
									<Menu.Item key="1">option1</Menu.Item>
									<Menu.Item key="2">option2</Menu.Item>
									<Menu.Item key="3">option3</Menu.Item>
									<Menu.Item key="4">option4</Menu.Item>
								</SubMenu>
								<SubMenu key="sub2" title={<span><Icon type="laptop" />subnav 2</span>}>
									<Menu.Item key="5">option5</Menu.Item>
									<Menu.Item key="6">option6</Menu.Item>
									<Menu.Item key="7">option7</Menu.Item>
									<Menu.Item key="8">option8</Menu.Item>
								</SubMenu>
								<SubMenu key="sub3" title={<span><Icon type="notification" />subnav 3</span>}>
									<Menu.Item key="9">option9</Menu.Item>
									<Menu.Item key="10">option10</Menu.Item>
									<Menu.Item key="11">option11</Menu.Item>
									<Menu.Item key="12">option12</Menu.Item>
								</SubMenu>
							</Menu>
						</Sider>
						<Layout style={{ padding: '0 24px 24px' }}>
							<Breadcrumb style={{ margin: '12px 0' }}>
								<Breadcrumb.Item>Home</Breadcrumb.Item>
								<Breadcrumb.Item>List</Breadcrumb.Item>
								<Breadcrumb.Item>App</Breadcrumb.Item>
							</Breadcrumb>
							<Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
								Content
        					</Content>
						</Layout>
					</Layout>
				</Layout> */}

				{/* 第二种布局 --- 侧边布局 */}
				<Layout className="components-layout-demo-side">
					<Header style={{height: '150px',background: '#fff',padding: 0}}>
						<header className="App-header">
							<img src={logo} className="App-logo" alt="logo" />
							<h1 className="App-title">Welcome to React and D3</h1>
						</header>
					</Header>
					<Layout>
					<Sider
						collapsible
						collapsed={this.state.collapsed}
						onCollapse={this.onCollapse}
					>
						<div className="logo" />
						<Menu theme="dark" mode={this.state.mode} defaultSelectedKeys={['6']}>
							<SubMenu
								key="sub1"
								title={<span><Icon type="user" /><span className="nav-text">用户管理</span></span>}
							>
								<Menu.Item key="1">Tom</Menu.Item>
								<Menu.Item key="2">Bill</Menu.Item>
								<Menu.Item key="3">Alex</Menu.Item>
							</SubMenu>
							<SubMenu
								key="sub2"
								title={<span><Icon type="team" /><span className="nav-text">团队管理</span></span>}
							>
								<Menu.Item key="4">销售团队</Menu.Item>
								<Menu.Item key="5">开发团队</Menu.Item>
							</SubMenu>
							<Menu.Item key="6">
								<span>
									<Icon type="file" />
									<span className="nav-text">文件管理</span>
								</span>
							</Menu.Item>
						</Menu>
					</Sider>
					<Layout>
						{/* <Header style={{ background: '#fff', padding: 0 }} /> */}
						<Header style={{background: '#fff',padding: 0}}>
							
						</Header>
						<Content style={{ margin: '0 16px' }}>
							<Breadcrumb style={{ margin: '12px 0' }}>
								<Breadcrumb.Item>用户管理</Breadcrumb.Item>
								<Breadcrumb.Item>Bill</Breadcrumb.Item>
							</Breadcrumb>
							<div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
								Bill is a cat.Ha ha ha ~
            				</div>
						</Content>
						<Footer style={{ textAlign: 'center' }}>
							Naxions ©2018 Created by Superhero Mr Wang
          				</Footer>
					</Layout>
					</Layout>
				</Layout>

				
				{/* <p className="App-intro">
					To get started, edit <code>src/App.js</code> and save to reload.
				</p> */}
				<div id="test">
					
				</div>
				<svg className="force-svg" width="960" height="600"></svg>
				
				{/* ant - design */}
				<div className="antd-box" style={{ width: 400, margin: '100px auto' }}>
					<DatePicker onChange={value => this.handleChange(value)} />
					<Button type="primary">Primary</Button>
					<Button>Default</Button>
					<Button type="dashed">Dashed</Button>
					<Button type="danger">Danger</Button>
					<Button type="">按钮</Button>
				</div>
				<div className="antd-box" style={{ width: 400, margin: '100px auto' }}>

				</div>
				{/* 回到顶部 */}
				<BackTop />
				Scroll down to see the bottom-right
				<strong style={{ color: 'rgba(64, 64, 64, 0.6)' }}> gray </strong>
				button.
			</div>
		);
	}
}

export default App;


// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { push } from 'react-router-redux';
// import * as d3 from 'd3';
// import { Row, Form } from 'antd';

// import { chartReq } from './actionCreator';
// import './Chart.less';

// const WIDTH = 1900;
// const HEIGHT = 580;
// const R = 30;

// let simulation;

// class Chart extends Component {
//   constructor(props, context) {
//     super(props, context);
//     this.print = this.print.bind(this);
//     this.forceChart = this.forceChart.bind(this);
//     this.state = {

//     };
//   }

//   componentWillMount() {
//     this.props.dispatch(push('/Chart'));
//   }

//   componentDidMount() {
//     this.print();
//   }

//   print() {
//     let callback = (res) => { // callback获取后台返回的数据，并存入state
//       let nodeData = res.data.nodes;
//       let relationData = res.data.rels;
//       this.setState({
//         nodeData: res.data.nodes,
//         relationData: res.data.rels,
//       });
//       let nodes = [];
//       for (let i = 0; i < nodeData.length; i++) {
//         nodes.push({
//           id: (nodeData[i] && nodeData[i].id) || '',
//           name: (nodeData[i] && nodeData[i].name) || '',
//           type: (nodeData[i] && nodeData[i].type) || '',
//           definition: (nodeData[i] && nodeData[i].definition) || '',
//         });
//       }
//       let edges = [];
//       for (let i = 0; i < relationData.length; i++) {
//         edges.push({
//           id: (relationData[i] && (relationData[i].id)) || '',
//           source: (relationData[i] && relationData[i].start.id) || '',
//           target: (relationData[i] && relationData[i].end.id) || '',
//           tag: (relationData[i] && relationData[i].name) || '',
//         });
//       }
//       this.forceChart(nodes, edges); // d3力导向图内容
//     };
//     this.props.dispatch(chartReq({ param: param }, callback));
//   }

//   // func
//   forceChart(nodes, edges) {
//     this.refs['theChart'].innerHTML = '';

//     // 函数内其余代码请看下文的**【拆解代码】**

//   }

//   render() {
//     return (
//       <Row style={{ minWidth: 900 }}>
//         <div className="outerDiv">
//           <div className="theChart" id="theChart" ref="theChart">

//           </div>
//         </div>
//       </Row>
//     );
//   }
// }

// Chart.propTypes = {
//   dispatch: PropTypes.func.isRequired,
// };

// function mapStateToProps(state) {
//   return {

//   };
// }

// const WrappedChart = Form.create({})(Chart);
// export default connect(mapStateToProps)(WrappedChart);
