import { useTypeSelector } from "../hooks/use-typed-selector"
import CellListItem from "./cell-list-item"

const CellList: React.FC = () => {
  // Getting store values
  const cells = useTypeSelector(({ cells: { order, data } }) => {
    return order.map(id => {
      return data[id]
    })
  })
  const renderCELLS = cells.map(cell => <CellListItem key={cell.id} cell={cell} />)
  return <div>{renderCELLS}</div>
}

export default CellList