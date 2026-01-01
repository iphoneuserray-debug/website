为company创建动态条形图组件：
	维度（dimension）：公司等级（level），国家（country），城市（city）
	过滤器：
		公司等级（level）dropdown多选
		国家（country）dropdown多选
		城市（city）dropdown多选
		加入供应链的日期 （范围）（founded_year）（start，end）
		年收入（范围）（min，max）
		员工数量（范围）（min，max）


    可参考request form:
    {
        dimension: level, country, city
        filter:{
            level:[1, 2, 3],
            country:[],
            city:[],
            founded_year:{
                start:,
                end:,
            },
            annual_revenue:{
                min:,
                max:,
            }
            employees:{
                min:,
                max:,
            }
        }
    }

worldbankgroup data display example:
https://data360.worldbank.org/en/indicator/WB_WDI_SE_XPD_TOTL_GD_ZS?view=trend&average=WLD%2CLCN%2CLAC&country=CHN%2CUSA%2CZAF%2CDZA%2CBRA%2CCOL&minYear=1983

录制：Daniel的快速会议
日期：2025-12-30 20:03:50
录制文件：https://meeting.tencent.com/crm/Kw9RXeQ0c0