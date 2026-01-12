1安装d3库（如果之前chartjs用的不是d3）

2为上周的barchart组件添加tab switch

3使用d3绘制bubble chart展示公司层级关系：
	
	点击zoom in/out交互实现层级跳跃
	鼠标hover在气泡上的详细信息tooltip展示（optional）
	图表内容的稳定性（浏览器当前页面比例缩放）
	风格选择和当前app风格一致



本周开发内容依旧使用dummy data，推荐的数据结构：
{
	{
		name: company level 1 ,
		child: {
				{
					name: company level 2
					child:{...}
				}
			}
	},
	**or**
	relationships:{
	
				}

}

official website
https://d3js.org/

参考d3样例网址：
https://observablehq.com/@d3/zoomable-circle-packing


录制：Daniel的快速会议
日期：2026-01-06 19:07:08
录制文件：https://meeting.tencent.com/crm/Kw9xbkM355