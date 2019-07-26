import { getTrainList } from '@/services/class';

export default {
  namespace: 'classTrain',
  state: {
    trainPage: {},
  },
  effects: {
    *fetchTrainList({ payload }, { call, put }) {
      const response = yield call(getTrainList, payload);
      yield put({
        type: 'saveTrain',
        payload: response,
      });
    },
  },
  reducers: {
    saveTrain(state, action) {
      return {
        ...state,
        trainPage: action.payload,
      };
    },
  },
};
