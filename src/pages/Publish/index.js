import {
  Card,
  Breadcrumb,
  Form,
  Input,
  Select,
  Radio,
  Upload,
  Button,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React, { useEffect, useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import style from "./index.module.scss";
import { useStore } from "@/store/index";
import { observer } from "mobx-react-lite";
import { http } from "@/utils";
import { useNavigate, useSearchParams } from "react-router-dom";

function Publish() {
  const [maxCoverNumber, setNumber] = useState(1);
  const [params] = useSearchParams();
  const title = (
    <>
      <Breadcrumb
        items={[
          { title: "首页" },
          { title: params.get("id") ? "编辑文章" : "发布文章" },
        ]}
      ></Breadcrumb>
    </>
  );
  //   使用useRef当一个暂存仓库
  const cacheImgLList = useRef();
  const { channelStore } = useStore();
  const [fileList, setFileList] = useState([]);
  const onUploadChange = ({ fileList }) => {
    setFileList(fileList);
    if (maxCoverNumber === 3) {
      // 同时将图片列表传入仓库
      cacheImgLList.current = fileList;
    } else if (
      maxCoverNumber === 1 &&
      fileList.length &&
      cacheImgLList.current
    ) {
      if (cacheImgLList.current.length === 3) {
        cacheImgLList.current.shift();
      }
      cacheImgLList.current.unshift(fileList[0]);
    }
  };
  const [form] = Form.useForm();
  const id = params.get("id");
  useEffect(() => {
    const get = async () => {
      const params1 = { id: id };
      const res = await http({ url: "/getIdData", method: "get", params1 });
      const ini = {
        title: "111",
        radio: 0,
        cover:3,
        content: "111",
      };
      form.setFieldsValue(ini);
	//   回填图片
	setFileList([{url:"http://geek.itheima.net/uploads/1688819740096.png"}])
    };
    if(id){
		get();
	}
  }, [id]);

  useEffect(() => {
    // 当cover数量发生改变的时候,从苍鹭中取对应的图片数量，给filList
    if (cacheImgLList.current) {
      if (maxCoverNumber === 1) {
        const cur = cacheImgLList.current.length
          ? [cacheImgLList.current[0]]
          : [];
        setFileList(cur);
      } else if (maxCoverNumber === 3) {
        setFileList(cacheImgLList.current);
      }
    }
  }, [maxCoverNumber]);

  const removeFile = (file) => {
    const curFile = fileList.filter((item) => item.uid !== file.uid);
    setFileList(curFile);
  };

  const navigate = useNavigate();

  const changeCoveNumber = (e) => {
    const number = e.target.value;
    setNumber(number);
  };

  const submit = async (values) => {
    const { title, radio, cover, content } = values;
    const images =fileList.map((item) => item?.response?item.response.data.url:item.url);
    const params = {
      title,
      id: radio,
      cover,
      content,
      image: {
        type: cover,
        images: images,
      },
    };
	console.log(fileList);
    await http({ url: "/publish", method: "get", params });
    navigate("/article");
  };

  return (
    <div className={style.box}>
      <Card title={title}>
        <Form
          style={{ width: "600px", margin: "0 auto" }}
          onFinish={(values) => submit(values)}
          form={form}
        >
          <Form.Item
            label="标题"
            rules={[{ required: true, message: "请输入内容" }]}
            name="title"
          >
            <Input placeholder="请输入标题" />
          </Form.Item>
          <Form.Item
            name="radio"
            label="频道"
            rules={[{ required: true, message: "请选择频道" }]}
          >
            <Select>
              {channelStore.channelList.map((item, index) => (
                <Select.Option key={item.key}>{item.value}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="cover"
            label="封面"
            initialValue={1}
            rules={[{ required: true }]}
          >
            <Radio.Group onChange={(e) => changeCoveNumber(e)}>
              <Radio key={1} value={1}>
                单图
              </Radio>
              <Radio key={3} value={3}>
                三图
              </Radio>
              <Radio key={0} value={0}>
                无图
              </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item wrapperCol={{ span: 20, offset: 2 }}>
            {maxCoverNumber > 0 && (
              <Upload
                listType="picture-card"
                name="image"
                showUploadList
                action="http://geek.itheima.net/v1_0/upload"
                fileList={fileList}
                onChange={onUploadChange}
                onRemove={(file) => removeFile(file)}
                maxCount={maxCoverNumber}
                multiple={maxCoverNumber > 1}
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined></PlusOutlined>
                </div>
              </Upload>
            )}
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: "请输入内容" }]}
            style={{ height: "130px" }}
            initialValue={"content"}
          >
            <ReactQuill theme="snow"></ReactQuill>
          </Form.Item>
          <Button htmlType="submit">
            {params.get("id") ? "更新文章" : "发布文章"}
          </Button>
        </Form>
      </Card>
    </div>
  );
}

export default observer(Publish);
