import { useTypeSelector } from "../hooks/use-typed-selector"

const CellList: React.FC = () => {
  // Getting store values
  const cells = useTypeSelector(({ cells: { order, data } }) => {
    return order.map(id => {
      return data[id]
    })
  })
  return <div>cell list</div>
}

export default CellList