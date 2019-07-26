import React, { PureComponent } from 'react';
import { Button, Icon, Card, Row, Col, Form, Input, Select } from 'antd';
import router from 'umi/router';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import DescriptionList from '@/components/DescriptionList';

const { Option } = Select;
const { TextArea } = Input;
const { Description } = DescriptionList;

@Form.create()
class TrainDetail extends PureComponent {
  renderEditForm = () => {
    const {
      location: { query },
      form: { getFieldDecorator },
    } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
        md: { span: 16 },
      },
    };
    const formItemNameLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
        md: { span: 16 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };
    const rowConfig = {
      type: 'flex',
      justify: 'center',
    };
    const {
      code = '',
      type = '',
      status = '',
      nick = '',
      contact = '',
      address = '',
      note = '',
      name = '',
    } = query;
    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Row gutter={24} type="flex" justify="center">
          <Col lg={8} md={12} sm={24}>
            <Form.Item label="单位编码">
              <span>{code}</span>
            </Form.Item>
          </Col>
          <Col xl={{ span: 8, offset: 1 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
            <Form.Item label="类型">
              <span>{type}</span>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col lg={{ span: 22, offset: 1 }} md={24} sm={24}>
            <Form.Item label="单位名称" {...formItemNameLayout}>
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '请输入名称' }],
                initial: name,
              })(<Input placeholder="请输入名称" />)}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24} {...rowConfig}>
          <Col lg={8} md={12} sm={24}>
            <Form.Item label="简称">
              {getFieldDecorator('nick', {
                rules: [{ required: true, message: '请选择审批员' }],
                initial: nick,
              })(<Input placeholder="请输入名称" />)}
            </Form.Item>
          </Col>
          <Col xl={{ span: 8, offset: 1 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
            <Form.Item label="联系人">
              {getFieldDecorator('contact', {
                rules: [{ required: true, message: '请选择生效日期' }],
                initial: contact,
              })(<Input />)}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24} {...rowConfig}>
          <Col lg={8} md={12} sm={24}>
            <Form.Item label="状态">
              {getFieldDecorator('status', {
                rules: [{ required: true, message: '请选择' }],
                initial: status,
              })(
                <Select placeholder="请选择">
                  <Option value="xiao">正常</Option>
                  <Option value="mao">关闭</Option>
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col xl={{ span: 8, offset: 1 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
            <Form.Item label="地址">
              {getFieldDecorator('address', {
                rules: [{ required: true, message: '请输入地址' }],
                initial: address,
              })(<Input />)}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col lg={{ span: 22, offset: 1 }} md={24} sm={24}>
            <Form.Item label="备注" {...formItemNameLayout}>
              {getFieldDecorator('note', {
                rules: [{ required: true, message: '请输入备注' }],
                initial: note,
              })(<TextArea placeholder="请输入备注" autosize={{ minRows: 2, maxRows: 6 }} />)}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Form.Item {...submitFormLayout} style={{ marginTop: 32 }}>
            <Button>取消</Button>
            <Button style={{ marginLeft: 8 }} type="primary" htmlType="submit">
              保存
            </Button>
          </Form.Item>
        </Row>
      </Form>
    );
  };

  renderDetailForm = () => {
    const {
      location: { query },
    } = this.props;
    const { code, type, status, nick, contact, address, note, name } = query;
    return (
      <DescriptionList size="large" col={2} style={{ margin: '0 64px 32px 64px' }}>
        <Description term="单位编码">{code}</Description>
        <Description term="单位名称">{name}</Description>
        <Description term="单位简称">{nick}</Description>
        <Description term="单位类型">{type}</Description>
        <Description term="状态">{status}</Description>
        <Description term="地址">{address}</Description>
        <Description term="联系方式">{contact}</Description>
        <Description term="备注">{note}</Description>
      </DescriptionList>
    );
  };

  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'form/submitRegularForm',
          payload: values,
        });
      }
    });
  };

  render() {
    const {
      location: { query },
    } = this.props;
    const { actionType = '' } = query;
    let pageTitle = actionType === 'add' ? '新增' : '详情';
    if (actionType === 'edit') {
      pageTitle = '编辑';
    }
    return (
      <PageHeaderWrapper
        title={pageTitle}
        extra={[
          <Button key="1" type="primary" onClick={() => router.goBack()}>
            <Icon type="left" />
            返回
          </Button>,
        ]}
      >
        <Card bordered={false}>
          {actionType !== 'detail' ? this.renderEditForm() : this.renderDetailForm()}
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default TrainDetail;
