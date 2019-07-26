import React, { PureComponent, Fragment } from 'react';
import {
  Card,
  Button,
  Form,
  Row,
  Col,
  Select,
  Input,
  Icon,
  Tooltip,
  Divider,
  Popconfirm,
} from 'antd';
import { connect } from 'dva';
import Link from 'umi/link';
import router from 'umi/router';
import { stringify } from 'querystring';
import Ellipsis from '@/components/Ellipsis';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import StandardTable from '@/components/StandardTable';
import styles from './Train.less';

const FormItem = Form.Item;

const { Option } = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

@Form.create()
@connect(({ classTrain }) => ({ classTrain }))
class Train extends PureComponent {
  state = {
    loading: false,
  };

  columns = [
    {
      title: '单位编码',
      align: 'center',
      dataIndex: 'code',
    },
    {
      title: '单位名称',
      dataIndex: 'name',
    },
    {
      title: '单位简称',
      dataIndex: 'nick',
    },
    {
      title: '类型',
      dataIndex: 'type',
    },
    {
      title: '联系人',
      dataIndex: 'contact',
    },
    {
      title: '地址',
      dataIndex: 'address',
      render: val => (
        <Ellipsis className={styles.item} length={10}>
          {val}
        </Ellipsis>
      ),
    },

    {
      title: '状态',
      dataIndex: 'status',
      sorter: true,
      render: val => this.renderStatus(val),
    },
    {
      title: '操作',
      width: 120,
      render: (text, record) => (
        <Fragment>
          <Link
            to={`/admission/class/train/trainList/${record.key}?${stringify(
              record
            )}&actionType=detail`}
          >
            <Tooltip title="详情">
              <Icon type="eye" />
            </Tooltip>
          </Link>
          <Divider type="vertical" />
          <Link
            to={`/admission/class/train/trainList/${record.key}?${stringify(
              record
            )}&actionType=edit`}
          >
            <Tooltip title="编辑">
              <Icon type="edit" />
            </Tooltip>
          </Link>
          <Divider type="vertical" />
          <Tooltip title="删除">
            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
              <a href="">
                <Icon type="delete" />
              </a>
            </Popconfirm>
          </Tooltip>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'classTrain/fetchTrainList',
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'classTrain/fetchTrainList',
      payload: params,
    });
  };

  // 删除功能-调用后台接口
  handleDelete = () => {
    //
  };

  renderSimpleForm = () => {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 16, xl: 24 }}>
          <Col md={6} sm={24}>
            <FormItem label="关键词">
              {getFieldDecorator('name')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="类型">
              {getFieldDecorator('type')(
                <Select placeholder="--请选择--" style={{ width: '100%' }}>
                  <Option value="0">部委</Option>
                  <Option value="1">合作</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="使用状态">
              {getFieldDecorator('status')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit" icon="search">
                查询
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  };

  renderStatus = val => {
    let statusName = '';
    switch (val.toString()) {
      case '0':
        statusName = '正常';
        break;
      case '1':
        statusName = '关闭';
        break;
      default:
        break;
    }
    return statusName;
  };

  handleAdd = () => {
    router.push(`/admission/class/train/trainList/newInfo?actionType=add`);
  };

  render() {
    const { loading } = this.state;
    const {
      classTrain: { trainPage: data },
    } = this.props;
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              {this.renderSimpleForm()}
              <div className={styles.tableListOperator}>
                <h2>Welcome to React</h2>
                <Button icon="plus" type="primary" onClick={() => this.handleAdd()}>
                  新建
                </Button>
              </div>
            </div>

            <StandardTable
              rowKey={record => record.key}
              loading={loading}
              data={data}
              columns={this.columns}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Train;
