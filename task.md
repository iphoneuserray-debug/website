1. 创建一个next.js项目
2. 完成navigation bar（可扩展）
3. 完成user和company表格(页面）（使用dummy data无需api）

用户table：
  姓名
  邮箱
  title/role
  status
  编辑（edit button)
  操作  (actions button)

公司table：
名称
等级
国家
盈利效率（背景着色）annual revenue/employees

二级table：
城市
创始日期（founded year）
年盈利额 （annual revenue）
员工数量 （employees）


考虑页面布局和美化

    // <TableContainer component={Paper}>
    //   <Table aria-label="collapsible table">
    //     <TableHead>
    //       <TableRow>
    //         <TableCell />
    //         <TableCell>Company Name</TableCell>
    //         <TableCell>Level</TableCell>
    //         <TableCell>Country</TableCell>
    //         <TableCell>annual revenue/employees</TableCell>
    //       </TableRow>
    //     </TableHead>
    //     <TableBody>
    //       {rows.map((row, index) => (
    //         <Row key={`${row.name}-${index}`} row={row} />
    //       ))}
    //     </TableBody>
    //   </Table>
    // </TableContainer>
