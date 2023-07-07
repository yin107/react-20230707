import { Form, Radio, DatePicker, Select, Button, Card, Table } from "antd";
import "moment/locale/zh-cn";
import locale from "antd/es/date-picker/locale/zh_CN";
import "./index.scss";
import { useEffect, useState } from "react";
import { http } from "@/utils";
function Article() {
  const radioItems = [
    { value: "-1", text: "全部" },
    { value: "0", text: "草稿" },
    { value: "1", text: "待审核" },
    { value: "2", text: "审核通过" },
    { value: "3", text: "审核失败" },
  ];
  let [data, changeData] = useState({ list: [], count: 0 });
  let [pageData, setPageData] = useState({ page: 1, pageSize: 10 });
  let [pageTotal, setTotal] = useState(1);
  const [params1, setParams] = useState({
    page: pageData.page,
    pageSize: pageData.pageSize,
  });

  //   删除列表
  const deleteItem = async (record, index) => {
    await http({ url: "/delete", method: "delete", params: {} });
    // 刷新列表---改变之前的params依赖
    setParams({
      page: 1,
      ...params1,
    });
  };

  const columns = [
    { title: "封面", dataIndex: "cover", key: "cover" },
    { title: "标题", dataIndex: "title", key: "title" },
    { title: "状态", dataIndex: "status", key: "status" },
    { title: "发布时间", dataIndex: "publishTime", key: "publishTime" },
    { title: "阅读数", dataIndex: "readNumber", key: "readNumber" },
    { title: "评论数", dataIndex: "commentNumber", key: "commentNumber" },
    { title: "点赞数", dataIndex: "likeNumber", key: "likeNumber" },
    {
      title: "操作",
      key: "action",
      render: (_, record, index) => (
        <>
          <Button onClick={() => deleteItem(record, index)}>删除</Button>
        </>
      ),
    },
  ];
  const [form] = Form.useForm();

  const submit = (values) => {
    const params = {};
    if (values.timeRange) {
      params.begin_pubdate = values.timeRange[0].format("YYYY-MM-DD");
      params.end_pubdate = values.timeRange[1].format("YYYY-MM-DD");
    }
    params.status = values.status;
    params.radio = values.radio;
    params.page = 1;
    setParams({ ...params1, ...params });
    setPageData({ page: 1, pageSize: pageData.pageSize }); //重置页码
    form.resetFields(); //重置表单
  };

  useEffect(() => {
    const getData = async () => {
      let res = await http({
        url: "/article/page",
        method: "get",
        params: params1,
      });
      const data1 = {
        list: res.data.data.dataList,
        count: res.data.data.count,
      };
      changeData(data1);
      setTotal(res.data.data.count);
    };
    getData();
  }, [params1]);

  const changePage = (page, pageSize) => {
    setPageData({ page: page, pageSize: pageSize });
    const params = {};
    params.page = page;
    params.pageSize = pageSize;
    setParams({ ...params1, ...params });
  };
  return (
    <div className="article">
      <Card
        style={{ marginTop: "30px", width: "90%", marginLeft: "40px" }}
        title={"首页>内容管理"}
      >
        <Form onFinish={(values) => submit(values)} form={form}>
          <Form.Item name="status" label="状态" initialValue={"-1"}>
            <Radio.Group>
              {radioItems.map((item) => (
                <Radio key={item.value} value={item.value}>
                  {item.text}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>
          <Form.Item name="radio" label="频道" initialValue={1}>
            <Select>
              <Select.Option key={1}>1</Select.Option>
              <Select.Option key={2}>2</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="timeRange" label="日期">
            <DatePicker.RangePicker locale={locale} />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit">筛选</Button>
          </Form.Item>
        </Form>
      </Card>

      <Card
        style={{ marginTop: "30px", width: "90%", marginLeft: "40px" }}
        title={data.count}
      >
        <Table
          dataSource={data.list}
          columns={columns}
          rowKey={(record, index) => record.title}
          pagination={{
            current: pageData.page,
            pageSize: pageData.pageSize,
            total: pageTotal,
            onChange: (page, pageSize) => changePage(page, pageSize),
          }}
        ></Table>
      </Card>
    </div>
  );
}

export default Article;
