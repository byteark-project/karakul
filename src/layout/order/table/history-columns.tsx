import type { TOrderHistories } from '../order'
import { ColumnProps } from '../../../components'
import moment from 'moment'

const columns: ColumnProps<TOrderHistories>[] = [
  {
    title: '订单名称',
    dataIndex: ['order', 'name'],
    key: 'name',
    ellipsis: true,
  },
  {
    title: '详情',
    dataIndex: 'detail',
    ellipsis: true,
  },
  {
    title: '数量',
    dataIndex: 'amount',
  },

  {
    title: '交付时间',
    dataIndex: 'delivery_time',
    ellipsis: true,
  },
  {
    title: '操作人',
    dataIndex: ['user', 'username'],
    ellipsis: true,
  },

  {
    title: '更新时间',
    dataIndex: 'updatedAt',
    ellipsis: true,
    render: text => moment(text).format('YYYY-MM-DD hh:mm:ss'),
  },
]

export default columns