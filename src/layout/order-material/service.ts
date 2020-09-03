import {
  client,
  OrderMaterialsQueryVariables,
  OrderMaterial,
  OrderMaterialsConnectionQuery,
  OrderMaterialsConnectionQueryVariables,
  OrderMaterialsConnectionDocument,
  useCreateOrderMaterialsMutation,
  MaterialsInput,
} from '../../services'
import { getLocalStore } from 'src/helpers/cookie'

export type OrderMaterialType = Pick<
  OrderMaterial,
  'id' | 'createdAt' | 'updatedAt' | 'order_id' | 'material' | 'amount' | 'model'
>

export type OMConnectionType = NonNullable<OrderMaterialsConnectionQuery['orderMaterialsConnection']>

async function fetchOrderMaterials(
  val: OrderMaterialsConnectionQueryVariables & { Authorization?: string | undefined }
): Promise<OMConnectionType> {
  try {
    const { data } = await client.query<OrderMaterialsConnectionQuery, OrderMaterialsQueryVariables>({
      query: OrderMaterialsConnectionDocument,
      variables: val,
      fetchPolicy: 'network-only',
    })

    return data?.orderMaterialsConnection ?? {}
  } catch (e) {
    return {} as OMConnectionType
  }
}

function useCreateOrderMaterialsApi() {
  const [create, { loading }] = useCreateOrderMaterialsMutation()

  const user = getLocalStore('userId') || ''
  const submit = async (data: MaterialsInput[], id: string) => {
    await create({
      variables: {
        input: { order_id: id, materials: data, user },
      },
      fetchPolicy: 'no-cache',
    })
  }

  return {
    submit,
    loading,
  }
}

export { fetchOrderMaterials, useCreateOrderMaterialsApi }
