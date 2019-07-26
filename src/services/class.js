import request from '@/utils/request';

export async function getTrainList(params) {
  return request('/class/train/list', {
    method: 'POST',
    data: params,
  });
}
