import React, { Component, Suspense } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { Row, Col, Card, List, Avatar } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Radar } from '@/components/Charts';
import { getTimeDistance } from '@/utils/utils';
import styles from './Analysis.less';

const SalesCard = React.lazy(() => import('./SalesCard'));

const ProportionSales = React.lazy(() => import('./ProportionSales'));

@connect(({ chart, loading }) => ({
  chart,
  loading: loading.effects['chart/fetch'],
}))
class Analysis extends Component {
  state = {
    salesType: 'all',
    activitiesLoading: false,
    rangePickerValue: getTimeDistance('year'),
  };

  componentDidMount() {
    const { dispatch } = this.props;
    this.reqRef = requestAnimationFrame(() => {
      dispatch({
        type: 'chart/fetch',
      });
      dispatch({
        type: 'chart/fetchActivitiesList',
      });
    });
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.reqRef);
  }

  handleChangeSalesType = e => {
    this.setState({
      salesType: e.target.value,
    });
  };

  handleRangePickerChange = rangePickerValue => {
    const { dispatch } = this.props;
    this.setState({
      rangePickerValue,
    });

    dispatch({
      type: 'chart/fetchSalesData',
    });
  };

  selectDate = type => {
    const { dispatch } = this.props;
    this.setState({
      rangePickerValue: getTimeDistance(type),
    });

    dispatch({
      type: 'chart/fetchSalesData',
    });
  };

  isActive = type => {
    const { rangePickerValue } = this.state;
    const value = getTimeDistance(type);
    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return '';
    }
    if (
      rangePickerValue[0].isSame(value[0], 'day') &&
      rangePickerValue[1].isSame(value[1], 'day')
    ) {
      return styles.currentDate;
    }
    return '';
  };

  renderActivities() {
    const {
      chart: { list = [] },
    } = this.props;
    return list.map(item => {
      const events = item.template.split(/@\{([^{}]*)\}/gi).map(key => {
        if (item[key]) {
          return (
            <a href={item[key].link} key={item[key].name}>
              {item[key].name}
            </a>
          );
        }
        return key;
      });
      return (
        <List.Item key={item.id} actions={[<a>edit</a>, <a>more</a>]}>
          <List.Item.Meta
            avatar={<Avatar src={item.user.avatar} />}
            title={
              <span>
                <a className={styles.username}>{item.user.name}</a>
                &nbsp;
                <span className={styles.event}>{events}</span>
              </span>
            }
            description={
              <span className={styles.datetime} title={item.updatedAt}>
                {item.updatedAt}
              </span>
            }
          />
        </List.Item>
      );
    });
  }

  renderMembers() {
    const {
      chart: { notices },
    } = this.props;
    return notices.map(item => (
      <List.Item key={item.id}>
        <List.Item.Meta title={<span className={styles.member}>{item.title}</span>} />
        <div>{item.time}</div>
      </List.Item>
    ));
  }

  renderLinks() {
    const {
      chart: { notices },
    } = this.props;
    return notices.map(item => (
      <List.Item key={item.id}>
        <List.Item.Meta title={<span className={styles.member}>{item.title}</span>} />
      </List.Item>
    ));
  }

  render() {
    const { rangePickerValue, salesType, activitiesLoading } = this.state;
    const { chart, loading } = this.props;
    const {
      offlineChartData,
      offlineData,
      radarData,
      salesTypeData,
      salesTypeDataOnline,
      salesTypeDataOffline,
    } = chart;
    let salesPieData;
    if (salesType === 'all') {
      salesPieData = salesTypeData;
    } else {
      salesPieData = salesType === 'online' ? salesTypeDataOnline : salesTypeDataOffline;
    }

    return (
      <PageHeaderWrapper>
        <Row gutter={24}>
          <Col xl={16} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={null}>
              <SalesCard
                rangePickerValue={rangePickerValue}
                offlineData={offlineData}
                offlineChartData={offlineChartData}
                isActive={this.isActive}
                handleRangePickerChange={this.handleRangePickerChange}
                loading={loading}
                selectDate={this.selectDate}
              />
            </Suspense>

            <Card
              style={{ marginTop: 24 }}
              bodyStyle={{ padding: 0 }}
              bordered={false}
              className={styles.activeCard}
              title="动态"
              extra={<Link to="/">more</Link>}
              loading={activitiesLoading}
            >
              <List loading={activitiesLoading} size="large">
                <div className={styles.activitiesList}>{this.renderActivities()}</div>
              </List>
            </Card>
          </Col>
          <Col xl={8} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={null}>
              <ProportionSales loading={loading} salesPieData={salesPieData} />
            </Suspense>
            <Card
              style={{ marginTop: 24 }}
              bordered={false}
              title="XX 指数"
              loading={radarData.length === 0}
            >
              <div className={styles.chart}>
                <Radar hasLegend height={343} data={radarData} />
              </div>
            </Card>
            <Card
              style={{ marginTop: 24 }}
              bodyStyle={{ paddingTop: 12, paddingBottom: 12 }}
              bordered={false}
              extra={<Link to="/">more</Link>}
              title="团队"
            >
              <div className={styles.members}>{this.renderMembers()}</div>
            </Card>

            <Card
              style={{ marginTop: 24 }}
              bodyStyle={{ paddingTop: 12, paddingBottom: 12 }}
              bordered={false}
              extra={<Link to="/">more</Link>}
              title="友情链接"
            >
              <div className={styles.members}>{this.renderLinks()}</div>
            </Card>
          </Col>
        </Row>
      </PageHeaderWrapper>
    );
  }
}

export default Analysis;
