import { message } from 'antd'

import {
  useCreateCommodityMutation,
  useCommoditiesLazyQuery,
  client,
  GoodsOrdersDocument,
  GoodsOrdersQuery,
  GoodsOrdersQueryVariables,
} from '../../services'
import { pageToStart } from '../../helpers/params'
import { SAccessory, GoodsOrder } from './goods.d'

function useCreateCommodityApi() {
  const [create, { loading }] = useCreateCommodityMutation({ fetchPolicy: 'no-cache' })

  const createCommodit = async (data: SAccessory[]) => {
    try {
      await create({
        variables: {
          data: {
            accessories: data,
          },
        },
      })

      message.success('创建商品成功')
    } catch {
      message.error('创建商品失败')
    }
  }

  return { createCommodit, loading }
}

function useCommoditiesApi() {
  const [fetch, { data, loading }] = useCommoditiesLazyQuery()

  const fetchCommodities = (page?: number, size?: number) => {
    const [start, limit] = pageToStart(page, size)
    fetch({
      variables: {
        start,
        limit,
      },
    })
  }

  return {
    data,
    loading,
    fetchCommodities,
  }
}

async function fetchGoodsOrders(variables: GoodsOrdersQueryVariables & { Authorization?: string | undefined }) {
  try {
    const { data } = await client.query<GoodsOrdersQuery, GoodsOrdersQueryVariables>({
      query: GoodsOrdersDocument,
      variables,
      fetchPolicy: 'network-only',
    })

    return { data: (data?.orders?.values ?? []) as GoodsOrder[], total: data?.orders?.aggregate?.count ?? 0 }
  } catch {
    return { data: [], total: 0 }
  }
}

export { useCreateCommodityApi, useCommoditiesApi, fetchGoodsOrders }
