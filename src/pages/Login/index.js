import { Card, Button, Checkbox, Form, Input, message } from "antd";
import "./index.scss";
import { useStore } from "@/store";
import { useNavigate } from "react-router-dom";
function Login() {
  const { loginStore } = useStore();
  const navigate = useNavigate();
  async function onFinish(values) {
    await loginStore.login({ phone: values.username, pass: values.Password });
    //跳转首页
    navigate("/", { replace: true });
    message.success("登录成功");
  }
  let onFinishFailed = () => {
    console.log(4343);
  };
  return (
    <div className="box_wrapper">
      <Card title="请登录">
        <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          validateTrigger={["onBlur"]}
        >
          <Form.Item
            label="手机号"
            name="username"
            rules={[
              {
                pattern: /^1[3-9]\d{9}$/,
                message: "请输入正确的手机号码",
                validateTrigger: "onBlur",
              },
              { required: true, message: "请输入账号" },
            ]}
          >
            <Input placeholder="请输入手机号"></Input>
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[
              { len: "6", validateTrigger: "onBlur" },
              { required: true, message: "请输入密码" },
            ]}
          >
            <Input.Password placeholder="请输入密码"></Input.Password>
          </Form.Item>
          <Form.Item
            name="remenber"
            valuePropName="checked"
            wrapperCol={{ offset: 6, span: 16 }}
            initialValue={true}
          >
            <Checkbox>我已同意协议</Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default Login;
